angular.module('registerApp', []).controller('registerCtrl', function($scope, $window, $http, $q, $filter) {
	$scope.contentLoaded = true;
	
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
	
	$scope.registerToApp = function(){
		$scope.contentLoaded = true;
		$scope.profile.uri="/profile/"+$scope.profile.mob;
		$scope.emptyArray=[];
		$scope.profile.score = $scope.emptyArray;
		$scope.score = {};
		$scope.score.uri = "/score/"+$scope.profile.uri.split("/")[2];
		$scope.score.profileUri  =$scope.profile.uri;
		$scope.score.fname = $scope.profile.fname;
		$scope.score.lname = $scope.profile.lname;
		$scope.score.scores = $scope.emptyArray;
		$scope.predict = {};
		$scope.predict.uri = "/predict/"+$scope.profile.uri.split("/")[2];
		$scope.predict.fname = $scope.profile.fname;
		$scope.predict.lname = $scope.profile.lname;
		$scope.predict.predictions = $scope.emptyArray;
		
		$scope.getAccessToken().then(function(uaaToken) {
			
			var req = {
			method : 'PUT',
			url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io'+$scope.profile.uri,
			headers : {
				'Authorization' : 'Bearer '+ uaaToken,
				'Content-Type' : 'application/json',
				'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
					},
			data:$scope.profile
			};
			$http(req).then(function(response) {
						var req = {
							method : 'PUT',
							url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io'+$scope.score.uri,
							headers : {
								'Authorization' : 'Bearer '+ uaaToken,
								'Content-Type' : 'application/json',
								'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
									},
							data:$scope.score
						};
						$http(req).then(function(response) {
							var req = {
									method : 'PUT',
									url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io'+$scope.predict.uri,
									headers : {
										'Authorization' : 'Bearer '+ uaaToken,
										'Content-Type' : 'application/json',
										'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
											},
									data:$scope.predict
								};
								$http(req).then(function(response) {
									$scope.contentLoaded = false;
									$window.location.href = 'login.html';
								},function(error){ 
									console.log("Error in registration3:"+JSON.stringify(error));
								});
						},function(error){ 
							console.log("Error in registration2:"+JSON.stringify(error));
						});
			},function(error){ 
				console.log("Error in registration1:"+JSON.stringify(error));
			});
		},function(error){
			console.log("Access token fetch error!");
		});
		
		
	};
	$scope.contentLoaded = false;
});