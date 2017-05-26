angular.module('campiansApp', []).controller('champiansCtrl', function($scope,$window,$http) {
    $scope.profile={
    		  "uri": "/profile/cheriyan",
    		  "fname": "Cheriyan",
    		  "lname": "KM",
    		  "groups": [
    		    "/groups/heros",
    		    "/groups/batch13"
    		  ],
    		  "mob":"9633282270",
    		  "paswrd":"1234",
    		  "scores":[
    			  {
    				  "match":"/games/match1",
    				  "score":12
    			  },
    			  {
    				  "match":"/games/match2",
    				  "score":15
    			  }
    		  ]
    		};
    $scope.groups = [
    	  {
    		    "uri": "/groups/heros",
    		    "name": "Heros",
    		    "members": [
    		      "/profile/cheriyan",
    		      "/profile/arjun"
    		    ]
    		  },
    		  {
    		    "uri": "/groups/batch13",
    		    "name": "Batch '13",
    		    "members": [
    		      "/profile/cheriyan",
    		      "/profile/hari",
    		      "/profile/bibin"
    		    ]
    		  }
    		];
    $scope.memberResult = [
    	{
    		"uri":"/score/match1",
    		"fname":"Cheriyan",
    		"lname":"KM",
    		"score":12
    	},
    	{
    		"uri":"/score/match1",
    		"fname":"Arjun",
    		"lname":"KM",
    		"score":121
    	}
    ]
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

    $scope.quizAnsw = [
    	{
    		"uri":"/quiz/q1",
    		"qz":"Who is going to win this game?",
    		"multi":true,
    		"ans":""
    	},
    	{
    		"uri":"/quiz/q1",
    		"qz":"How much runs will score by first batting team?",
    		"multi":false,
    		"ans":""
    	},
    	{
    		"uri":"/quiz/q1",
    		"qz":"Number of wickets fall on first bat?",
    		"multi":false,
    		"ans":""
    	}
    	,{
    		"uri":"/quiz/q1",
    		"qz":"Number of wickets fall on second bat?",
    		"multi":false,
    		"ans":""
    	}
    ];
    $scope.chartTitle="Point Table";
    var d = $scope.gamePlans[0].date;
	 $scope.gamePlan = $scope.gamePlans[0];
	 $scope.gameToPredict = $scope.gamePlans[14];
    angular.forEach($scope.gamePlans,function(value, index){
    	if($scope.gamePlan.date<=value.date && value.fscore!=undefined){
    		d = value.date;
    		$scope.gamePlan = value;
    	}
    	else if(value.fscore==undefined && $scope.gameToPredict.date>value.date){
    		$scope.gameToPredict = {};
    		$scope.gameToPredict = value;
    	}
    	
    });
    $scope.mobNoOfUser = localStorage.getItem("user");
    $scope.matchChange = function(){
    	
    };
    $scope.changeGroup = function(index,group){
    	localStorage.setItem("group", JSON.stringify(group));
    	localStorage.setItem("groupIndex", index);
    	$window.location.href = 'groupPage.html';
    };
    $scope.initGroupPage = function(){
    	$scope.group = JSON.parse(localStorage.getItem("group"));
    	$scope.groupIndex = localStorage.getItem("groupIndex");
    	$scope.select=[];
    	for(var i=0;i<=$scope.groupIndex;i++){
	    	console.log($scope.groupIndex+"--"+i);
    		if(i==$scope.groupIndex){
    			$scope.select.push('selected');
    		}
    		else{
    			$scope.select.push('');
    		}
    	}
    }

	$scope.yesitissend = false;
    $scope.submitPrediction = function(){
    	//send to asset
    	$scope.yesitissend = true;
    };
    
    $scope.getTotalScore = function(){
    	$scope.sum=0;
    	angular.forEach($scope.profile.scores, function(value){
    		$scope.sum = $scope.sum + value.score;
    	});
    	return $scope.sum;
    };
    $scope.getMatchPoint = function(uri){
    	$scope.score=0;
    	angular.forEach($scope.profile.scores, function(value){
    		if(value.match==uri){
    			console.log(uri+"-"+value.match);
    			$scope.score = value.score;
    		}
    	});
    	return $scope.score;
    };
    
    $scope.logout = function(){
		if(typeof(Storage) !== "undefined"){
    		localStorage.setItem("user", undefined);
    		$window.location.href = 'login.html';
		}
		else{}
	};
	
	$(function() {
		$('#container')
				.highcharts(
						{
							chart : {
								type : 'column'
							},
							title : {
								text : $scope.chartTitle
							},
							subtitle : {
								text : 'Click the columns to view versions. Source: <a href="http://netmarketshare.com">netmarketshare.com</a>.'
							},
							xAxis : {
								type : 'category'
							},
							yAxis : {
								title : {
									text : 'Total percent market share'
								}

							},
							legend : {
								enabled : false
							},
							plotOptions : {
								series : {
									borderWidth : 0,
									dataLabels : {
										enabled : true,
										format : '{point.y:.1f}%'
									}
								}
							},

							tooltip : {
								headerFormat : '<span style="font-size:11px">{series.name}</span><br>',
								pointFormat : '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
							},

							series : [ {
								name : 'Member',
								colorByPoint : true,
								data : [ {
									name : 'Arjun',
									y : 56.33,
									drilldown : 'Arjun'
								}, {
									name : 'Chrome',
									y : 24.03,
									drilldown : 'Chrome'
								}, {
									name : 'Firefox',
									y : 10.38,
									drilldown : 'Firefox'
								}, {
									name : 'Safari',
									y : 4.77,
									drilldown : 'Safari'
								}, {
									name : 'Opera',
									y : 0.91,
									drilldown : 'Opera'
								}, {
									name : 'Proprietary or Undetectable',
									y : 0.2,
									drilldown : null
								} ]
							} ],
							drilldown : {
								series : [
										{
											name : 'Arjun',
											id : 'Arjun',
											data : [ 
													[ 'Match 1', 24.13 ],
													[ 'Match 2', 17.2 ],
													[ 'Match 3', 8.11 ],
													[ 'Match 4', 5.33 ],
													[ 'Match 5', 1.06 ],
													[ 'Match 6', 0.5 ] ]
										},
										{
											name : 'Chrome',
											id : 'Chrome',
											data : [ [ 'v40.0', 5 ],
													[ 'v41.0', 4.32 ],
													[ 'v42.0', 3.68 ],
													[ 'v39.0', 2.96 ],
													[ 'v36.0', 2.53 ],
													[ 'v43.0', 1.45 ],
													[ 'v31.0', 1.24 ],
													[ 'v35.0', 0.85 ],
													[ 'v38.0', 0.6 ],
													[ 'v32.0', 0.55 ],
													[ 'v37.0', 0.38 ],
													[ 'v33.0', 0.19 ],
													[ 'v34.0', 0.14 ],
													[ 'v30.0', 0.14 ] ]
										},
										{
											name : 'Firefox',
											id : 'Firefox',
											data : [ [ 'v35', 2.76 ],
													[ 'v36', 2.32 ],
													[ 'v37', 2.31 ],
													[ 'v34', 1.27 ],
													[ 'v38', 1.02 ],
													[ 'v31', 0.33 ],
													[ 'v33', 0.22 ],
													[ 'v32', 0.15 ] ]
										},
										{
											name : 'Safari',
											id : 'Safari',
											data : [ [ 'v8.0', 2.56 ],
													[ 'v7.1', 0.77 ],
													[ 'v5.1', 0.42 ],
													[ 'v5.0', 0.3 ],
													[ 'v6.1', 0.29 ],
													[ 'v7.0', 0.26 ],
													[ 'v6.2', 0.17 ] ]
										},
										{
											name : 'Opera',
											id : 'Opera',
											data : [ [ 'v12.x', 0.34 ],
													[ 'v28', 0.24 ],
													[ 'v27', 0.17 ],
													[ 'v29', 0.16 ] ]
										} ]
							}
						});
	});
	
});