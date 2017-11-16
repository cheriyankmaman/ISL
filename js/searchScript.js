angular.module('searchApp', []).controller('searchController', function($scope, $window, $http, $q, $filter, $timeout) {
					
	$scope.result={};
	$scope.followings=[];
	$scope.contentLoaded = true;
	$scope.clickedOnFollow = true;
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
	
	$scope.mobNoOfUser = localStorage.getItem("user");
	
	$scope.getAccessToken().then(function(uaaToken) {
		
		var req = {
		method : 'GET',
		url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/profile?filter=mob='+ $scope.mobNoOfUser,
		headers : {
			'Authorization' : 'Bearer '+ uaaToken,
			'Content-Type' : 'application/json',
			'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
				}
		};
		$http(req).then(function(response1) {
			$scope.profile = response1.data;
			angular.forEach($scope.profile[0].follow,function(value){
				var req = {
						method : 'GET',
						url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/score/'+ value,
						headers : {
							'Authorization' : 'Bearer '+ uaaToken,
							'Content-Type' : 'application/json',
							'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
								}
						};
						$http(req).then(function(response1) {
							$scope.followings.push(response1.data[0]);
						},function(error){
							
						});
			});
			$scope.contentLoaded = false;
		},function(error){
			
		});
	},function(error){
		
	});
	
	$scope.search = function(){
		$scope.contentLoaded = true;
		if($scope.mobNum == $scope.profile[0].mob){
			$scope.contentLoaded = false;
		}
		else{
			$scope.result.follow="Follow";
			angular.forEach($scope.profile[0].follow, function(value){
				if(value == $scope.mobNum){
					$scope.result.follow="Following";
				}
			});
			$scope.getAccessToken().then(function(uaaToken) {
				
				var req = {
				method : 'GET',
				url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/profile?filter=mob='+ $scope.mobNum,
				headers : {
					'Authorization' : 'Bearer '+ uaaToken,
					'Content-Type' : 'application/json',
					'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
						}
				};
				$http(req).then(function(response1) {
					$scope.searchResult = response1.data;
					$scope.result.msg = "No Result";
					$scope.contentLoaded = false;
				},function(error){
					
				});
			},function(error){
				
			});
		}
	};
	
	$scope.follow = function(){
		$scope.clickedOnFollow = false;
		$scope.profile[0].follow.push($scope.mobNum);
		$scope.getAccessToken().then(function(uaaToken) {
			
			var req = {
			method : 'PUT',
			url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/profile/'+ $scope.profile[0].mob,
			headers : {
				'Authorization' : 'Bearer '+ uaaToken,
				'Content-Type' : 'application/json',
				'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
					},
			data : $scope.profile[0]
			};
			
			$http(req).then(function(response1) {
				$scope.result.follow="Following";
				$scope.followings.push($scope.searchResult[0]);
				$scope.clickedOnFollow = true;
			},function(error){
				
			});
		},function(error){
			
		});
	};
	$scope.unfollow = function(item,index){
		$scope.contentLoaded = true;
		$scope.searchResult = [];
		$scope.profile[0].follow.splice($scope.profile[0].follow.indexOf(parseInt(item.split("/")[2])),1);
		
		$scope.getAccessToken().then(function(uaaToken) {
			
			var req = {
			method : 'PUT',
			url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/profile/'+ $scope.profile[0].mob,
			headers : {
				'Authorization' : 'Bearer '+ uaaToken,
				'Content-Type' : 'application/json',
				'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
					},
			data : $scope.profile[0]
			};
			
			$http(req).then(function(response1) {
				$scope.result.follow="Following";
				$scope.followings.splice(index,1);
				$scope.contentLoaded = false;
			},function(error){
				
			});
		},function(error){
			
		});
	}
});