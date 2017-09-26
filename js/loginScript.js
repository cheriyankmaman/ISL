angular.module('loginApp', []).controller('loginCtrl', function($scope,$window,$http,$q) {
	
	
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
	
	
	
			$scope.contentLoaded = false;
    $scope.login = function(){
    	if($scope.mob==undefined || $scope.paswd==undefined || $scope.mob=='' || $scope.paswd=='')
    		{
    			alert("something wrong on - "+$scope.mob+" or "+$scope.paswd);
    		}
    	else{
			$scope.contentLoaded = true;
				if (typeof(Storage) !== "undefined") {
    				// Store
					$scope.getAccessToken().then(function(uaaToken){
						
						var req = {
							method : 'GET',
							url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/profile?filter=mob='+$scope.mob+':paswrd='+$scope.paswd,
							headers : {
								'Authorization' : 'Bearer ' +uaaToken,
								'Content-Type' : 'application/json',
								'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
							}
						};
						$http(req).then(function(response1) {
							$scope.profile = response1.data;
							if(response1.data.length==0){
								$scope.contentLoaded = false;
								alert("Wrong credentials!")
							}
							else{
								if(response1.data[0].mob==$scope.mob){
									console.log(response1.data[0].mob+"=="+$scope.mob);
									localStorage.setItem("user", $scope.mob);
									localStorage.setItem("pass", $scope.paswd);
									// Retrieve
									$window.location.href = 'index.html';
								}
							}
						}, function(error) {
							//console.log(error);
							// deferred.reject('Error fetching Options' +
							// error);
						});

						},function(){});
    				
				}
				else {
    				alert("hihihihi");
				}
    	}
    		
    };
   
    
    
   $scope.profiles=[];
});