angular.module('adminApp', []).controller('adminCtrl', function($scope,$window,$http, $q, $timeout) {
    $scope.profile={fname:"Cheriyan",lname:"KM"};
    
    $scope.gamePlans = [];
    
    
    $scope.mobNoOfUser = localStorage.getItem("user");
    $scope.matchChange = function(){
    	
    };
    if($scope.mobNoOfUser!=9633282270)
	{
		$window.location.href = 'index.html';
	}
    $scope.getAccessToken = function() {
		var deferred = $q.defer();
		var req1 = {
			method : 'POST',
			url : 'https://assetuaa.predix-uaa.run.aws-usw02-pr.ice.predix.io/oauth/token',
			data : 'grant_type=client_credentials',
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded',
				'Authorization' : 'Basic YXNzZXRfY2xpZW50OmFzc2V0Q2xpZW50'
			}
		};
		var accessToken = null;
		$http(req1).then(function(response) {
			deferred.resolve(response.data.access_token);
		}, function(error) {
			
		});
		return deferred.promise;
	};
	
	$scope.getAccessToken().then(function(uaaToken){
			
			var req = {
						method : 'GET',
						url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/predict',
						headers : {
							'Authorization' : 'Bearer ' +uaaToken,
							'Content-Type' : 'application/json',
							'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
						}
					};
			$http(req).then(function(response) {
				$scope.allPredictions = response.data;
			},function(error){});
	},function(error){});
	
	$scope.updateGame = function(){
		$scope.contentLoaded = true;
		$scope.getAccessToken().then(function(uaaToken){
			
			var req = {
				method : 'PUT',
				url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io'+$scope.gamePlan.uri,
				headers : {
					'Authorization' : 'Bearer ' +uaaToken,
					'Content-Type' : 'application/json',
					'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
				},
				data : $scope.gamePlan
			};
			$http(req).then(function(response) {
				// do the logics.
				var req = {
						method : 'GET',
						url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/predict',
						headers : {
							'Authorization' : 'Bearer ' +uaaToken,
							'Content-Type' : 'application/json',
							'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
						}
					};
					$http(req).then(function(response1) {
						
					}, function(error1) {
						
					});
			}, function(error) {
				
			});
		},function(){});
	};
	
	$scope.putScore = function(tempObj, name){
		$scope.getAccessToken().then(function(uaaToken){
		var req = {
				method : 'GET',
				url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/score/'+name,
				headers : {
					'Authorization' : 'Bearer ' +uaaToken,
					'Content-Type' : 'application/json',
					'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
				}
			};
			$http(req).then(function(response2) {
				response2.data[0].scores.push(tempObj);
				console.log(response2.data);
				var req = {
						method : 'PUT',
						url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/score/'+name,
						headers : {
							'Authorization' : 'Bearer ' +uaaToken,
							'Content-Type' : 'application/json',
							'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
						},
						data:response2.data
					};
					$http(req).then(function(response3) {
						$scope.contentLoaded = false;
					},function(error){
						
					});
			},function(error){
				
			});
		},function(){});
	}
	
	$scope.getGamePlans = function() {
		$scope.getAccessToken().then(function(uaaToken){
			
		var req = {
			method : 'GET',
			url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/games',
			headers : {
				'Authorization' : 'Bearer ' +uaaToken,
				'Content-Type' : 'application/json',
				'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
			}
		};
		$http(req).then(function(response1) {
			$scope.gamePlans = response1.data;
			var d = $scope.gamePlans[0].date;
		    $scope.gamePlan = $scope.gamePlans[$scope.gamePlans.length-1];
		    angular.forEach($scope.gamePlans,function(value){
		    	if($scope.gamePlan.date>=value.date && value.fscore==undefined){
		    		d = value.date;
		    		$scope.gamePlan = value;
		    	}
		    	
		    });
		}, function(error) {
			//console.log(error);
			// deferred.reject('Error fetching Options' +
			// error);
		});

		},function(){});
	};
	
	$scope.contentLoaded = false;
	$scope.switchState = function(val){
		$scope.arr=[];
		$scope.contentLoaded = true;
		$scope.ob={"uri":"/active/me","status":val};
		$scope.arr.push($scope.ob);
		$scope.getAccessToken().then(function(uaaToken){
		var req = {
				method : 'POST',
				url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/active',
				headers : {
					'Authorization' : 'Bearer ' +uaaToken,
					'Content-Type' : 'application/json',
					'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
				},
				data:$scope.arr
			};
			$http(req).then(function(response2) {
				$scope.contentLoaded = false;
			},function(error){});
		},function(){});
	};

	
	
	$scope.getGamePlans();
	
	
	$scope.clock = "loading clock..."; // initialise the time variable
	  $scope.tickInterval = 1000 //ms

	  $scope.flag1=true;
	  $scope.flag2=true;
	  var tick = function() {
	    $scope.clock = Date.now() // get the current time
	    $timeout(tick, $scope.tickInterval); // reset the timer

	    var d = new Date();
	    if(d.getHours()==14 && d.getMinutes()==50){
	    	if($scope.flag1==true){
	    		$scope.switchState("false");
	    		$scope.flag1=false;
	    	}
	    }
	    else{
	    }
	    if (d.getMonth() + 1 == 1 && d.getDate == 7 && d.getHours == 11) { //January is 0, February is 1, and so on
	      //Your code goes here...
	    }
	  }

	  // Start the timer
	  $timeout(tick, $scope.tickInterval);
	
    $scope.logout = function(){
		if(typeof(Storage) !== "undefined"){
    		localStorage.setItem("user", undefined);
    		$window.location.href = 'login.html';
		}
		else{}
	};
});