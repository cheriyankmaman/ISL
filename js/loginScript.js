angular.module('loginApp', []).controller('loginCtrl', function($scope,$window,$http) {
    $scope.login = function(){
    	if($scope.mob==undefined || $scope.paswd==undefined || $scope.mob=='' || $scope.paswd=='')
    		{
    			alert("something wrong on - "+$scope.mob+" or "+$scope.paswd);
    		}
    	else{
				if (typeof(Storage) !== "undefined") {
    				// Store
    				localStorage.setItem("user", $scope.mob);
    				// Retrieve
    				$window.location.href = 'index.html';
    				
				}
				else {
    				alert("hihihihi");
				}
    	}
    		
    };
   
   $scope.profiles=[];
   var req1 = {
		method: 'GET',
		url: 'Data/profile.json'
   };
   $http(req1)
   .then(function(response){
   	console.dir("response: "+response);
   },function(error){
   	console.dir("error: "+error);
   });
    document.querySelector("#mobEntry").addEventListener("keypress", function (evt) {
    	if (evt.which < 48 || evt.which > 57)
    	{
        evt.preventDefault();
    	}
	});
});