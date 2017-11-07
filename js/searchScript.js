angular.module('searchApp', []).controller('searchController', function($scope, $window, $http, $q, $filter, $timeout) {
					
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
		},function(error){
			
		});
	},function(error){
		
	});
});