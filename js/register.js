angular.module('registerApp', []).controller('registerCtrl', function($scope, $window, $http, $q, $filter) {
	$scope.contentLoaded = true;
	$scope.registerToApp = function(){
		console.log($scope.profile);
	};
});