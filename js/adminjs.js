angular.module('adminApp', []).controller('adminCtrl', function($scope,$window,$http) {
    $scope.profile={fname:"Cheriyan",lname:"KM"};
    
    $scope.gamePlans = [
  {
    "uri": "/games/match1",
    "match": "match 1",
    "date": 1,
    "venue": "Kennington Oval,London",
    "op1": "England",
    "op2": "Bangladesh",
    "fbat": "England",
    "sbat": "Bangladesh",
    "fscore": 267,
    "sscore": 239,
    "ffow": 5,
    "sfow": 8,
    "fover": "50.0",
    "sover": "50.0",
    "motm": "cock"
  },
  {
    "uri": "/games/match2",
    "match": "match 2",
    "date": "2",
    "venue": "Edgbaston, Birmingham",
    "op1": "Australia",
    "op2": "New Zealand",
    "fbat": "Australia",
    "sbat": "New Zealand",
    "fscore": 266,
    "sscore": 266,
    "ffow": 6,
    "sfow": 4,
    "motm": "Johnson",
    "fover": "50.0",
    "sover": "50.0"
  },
  {
    "uri": "/games/match3",
    "match": "match 3",
    "date": 3,
    "venue": "Kennington Oval,London",
    "op1": "Sri Lanka",
    "op2": "South Africa"
  },
  {
    "uri": "/games/match4",
    "match": "match 4",
    "date": 4,
    "venue": "Edgbaston, Birmingham",
    "op1": "India",
    "op2": "Pakistan"
  },
  {
    "uri": "/games/match5",
    "match": "match 5",
    "date": 5,
    "venue": "Kennington Oval,London",
    "op1": "Australia",
    "op2": "Bangladesh"
  },
  {
    "uri": "/games/match6",
    "match": "match 6",
    "date": 6,
    "venue": "Sophia Gardens, Cardiff",
    "op1": "England",
    "op2": "New Zealand"
  },
  {
    "uri": "/games/match7",
    "match": "match 7",
    "date": 7,
    "venue": "Edgbaston, Birmingham",
    "op1": "Pakistan",
    "op2": "South Africa"
  },
  {
    "uri": "/games/match8",
    "match": "match 8",
    "date": 8,
    "venue": "Kennington Oval,London",
    "op1": "India",
    "op2": "Sri Lanka"
  },
  {
    "uri": "/games/match9",
    "match": "match 9",
    "date": 9,
    "venue": "Sophia Gardens, Cardiff",
    "op1": "New Zealand",
    "op2": "Bangladesh"
  },
  {
    "uri": "/games/match10",
    "match": "match 10",
    "date": 10,
    "venue": "Edgbaston, Birmingham",
    "op1": "England",
    "op2": "Australia"
  },
  {
    "uri": "/games/match11",
    "match": "match 11",
    "date": 11,
    "venue": "Kennington Oval,London",
    "op1": "India",
    "op2": "South Africa"
  },
  {
    "uri": "/games/match12",
    "match": "match 12",
    "date": 12,
    "venue": "Sophia Gardens, Cardiff",
    "op1": "Sri Lanka",
    "op2": "Pakistan"
  },
  {
    "uri": "/games/match13",
    "match": "match 13",
    "date": "14",
    "venue": "Sophia Gardens, Cardiff",
    "op1": "",
    "op2": ""
  },
  {
    "uri": "/games/match14",
    "match": "match 14",
    "date": 15,
    "venue": "Edgbaston, Birmingham",
    "op1": "",
    "op2": ""
  },
  {
    "uri": "/games/match15",
    "match": "match 15",
    "date": 18,
    "venue": "Kennington Oval, London",
    "op1": "",
    "op2": ""
  }
];
    var d = $scope.gamePlans[0].date;
    $scope.gamePlan = $scope.gamePlans[14];
    angular.forEach($scope.gamePlans,function(value){
    	if($scope.gamePlan.date>=value.date && value.fscore==undefined){
    		d = value.date;
    		$scope.gamePlan = value;
    	}
    	
    });
    $scope.mobNoOfUser = localStorage.getItem("user");
    $scope.matchChange = function(){
    	
    };
    $scope.logout = function(){
		if(typeof(Storage) !== "undefined"){
    		localStorage.setItem("user", undefined);
    		$window.location.href = 'login.html';
		}
		else{}
	};
});