angular.module('campiansApp', []).controller(
				'champiansCtrl',
				function($scope, $window, $http, $q, $filter, $timeout) {
					/*
					 * $scope.profile = { "uri" : "/profile/cheriyan", "fname" :
					 * "Cheriyan", "lname" : "KM", "groups" : [ "/groups/heros",
					 * "/groups/batch13" ], "mob" : "9633282270", "paswrd" :
					 * "1234", "scores" : [] };
					 */
					
					$scope.chart_type='column';
					$scope.option_3d={};
					$scope.contentLoaded=true;
					$scope.alreadyPredicted = false;
					$scope.tab1 = true;
					$scope.tab2 = false;
					$scope.myPrediction={"matchUri":"","opt1":{"name":"","goal":0},"opt2":{"name":"","goal":0},"kickoff":""};
					
					$scope.memberResult = [];
					$scope.gamePlans = [];
					$scope.quizAnsw = [];
					$scope.chartTitle = "Point Table";

					$scope.mobNoOfUser = localStorage.getItem("user");

					$scope.matchChange = function() {

					};
					if (typeof (Storage) !== "undefined") {
						if (localStorage.getItem("user") == 'undefined' || localStorage.getItem("user") == null) {
							$window.location.href = 'login.html';
						}
					}
					$scope.changeGroup = function(index, group) {
							$scope.dash="";
							localStorage.setItem("group", JSON.stringify(group));
							localStorage.setItem("groupIndex", index);
							$window.location.href = 'groupPage.html';
					};

					$scope.createChartDatas = function(){
						
					};
					$scope.selectKickOff = function(teamName){
						$scope.myPrediction.kickoff = teamName;
						$scope.tab1 = false;
						$scope.tab2 = true;
					};
					$scope.goBack = function(){
						$scope.tab1 = true;
						$scope.tab2 = false;
					};
					
					$scope.initGroupPage = function(value) {
						$scope.teamImage = {
								"ATK":"Atletico_Kolkata_FC",
								"KERALA BLASTERS FC":"Kerala_Blasters_FC	",
								"NORTHEAST UNITED FC":"NorthEast_United_FC",
								"JAMSHEDPUR FC":"Jamshedpur_FC",
								"CHENNAIYIN FC":"Chennaiyin_FC",
								"FC GOA":"FC_Goa",
								"BENGALURU FC":"Bengaluru_FC",
								"MUMBAI CITY FC":"Mumbai_City_FC",
								"FC PUNE CITY":"FC_Pune_City",
								"DELHI DYNAMOS FC":"Delhi_Dynamos"
						}
						if(value=="index"){
							localStorage.setItem("group", '');
							localStorage.setItem("groupIndex", undefined);
							$scope.dash="selected";
							$scope.select=[];
						}
						else{
							//$scope.group = JSON.parse(localStorage.getItem("group"));
							$scope.groupIndex = localStorage.getItem("groupIndex");
							$scope.select = [];
							for (var i = 0; i <= $scope.groupIndex; i++) {
								if (i == $scope.groupIndex) {
									$scope.select.push('selected');
								} else {
									$scope.select.push('');
								}
							}
						}
					};


					$scope.getTotalScore = function() {
						$scope.sum = 0;
						angular.forEach($scope.my_score, function(value) {
							$scope.sum = $scope.sum + value.score;
						});
						return $scope.sum;
					};
					$scope.getMatchPoint = function(uri, my_score) {
						$scope.score = 0;
						angular.forEach(my_score, function(value) {
							if (uri == value.matchUri) {
								$scope.score = value.score;
							}
						});
						return $scope.score;
					};
					
					$scope.opt1plus = function(){
						if($scope.myPrediction.opt1.goal<20){
							$scope.myPrediction.opt1.goal++;
						}
					};
					$scope.opt1minus = function(){
						if($scope.myPrediction.opt1.goal>0){
							$scope.myPrediction.opt1.goal--;
						}
					};
					$scope.opt2plus = function(){
						if($scope.myPrediction.opt2.goal<20){
							$scope.myPrediction.opt2.goal++;
						}
					};
					$scope.opt2minus = function(){
						if($scope.myPrediction.opt2.goal>0){
							$scope.myPrediction.opt2.goal--;
						}
					};

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
					

					$scope.predict = function(){
						$scope.contentLoaded=true;
						$scope.myPrediction.matchUri = $scope.gameToPredict.uri;
						$scope.myPrediction.opt1.name = $scope.gameToPredict.opt1.name;
						$scope.myPrediction.opt2.name = $scope.gameToPredict.opt2.name;
						$scope.getAccessToken().then(function(uaaToken) {
							
							var req = {
							method : 'GET',
							url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/predict/'+ $scope.mobNoOfUser,
							headers : {
								'Authorization' : 'Bearer '+ uaaToken,
								'Content-Type' : 'application/json',
								'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
									}
							};
							$http(req).then(function(response) {
								$scope.predictionObject = response.data;
								angular.forEach($scope.predictionObject[0].predictions, function(value){
									if(value.matchUri == $scope.myPrediction.matchUri){
										$scope.predictionObject[0].predictions.splice($scope.predictionObject[0].predictions.indexOf(value), 1);
										
									}
								});
								$scope.predictionObject[0].predictions.push($scope.myPrediction);
								var req = {
									method : 'PUT',
									url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/predict/'+ $scope.mobNoOfUser,
									headers : {
										'Authorization' : 'Bearer '+ uaaToken,
										'Content-Type' : 'application/json',
										'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
											},
									data:$scope.predictionObject[0]
									};
									$http(req).then(function(response) {
										$scope.alreadyPredicted = true;
										$scope.contentLoaded=false;
										$window.location.reload();
									},function(error){
										console.log("error in add prediction");
									});
							},function(error){
								console.log("error in get prdictions");
							});
						},function(error){
							
						});
					};
					
					$scope.allGroups=[];
					$scope.getProfile = function() {
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
								$scope.scoreSubString="";
								$scope.predictSubString="";
								$scope.scoreSubString = $scope.scoreSubString + "uri=/score/"+$scope.mobNoOfUser;
								$scope.predictSubString = $scope.predictSubString + "uri=/predict/"+$scope.mobNoOfUser;
								angular.forEach(response1.data[0].follow, function(value){
									$scope.scoreSubString = $scope.scoreSubString + "|uri=/score/"+value;
									$scope.predictSubString = $scope.predictSubString + "|uri=/predict/"+value;
								});
								var name = $scope.profile[0].uri;
								var nameArray = name.split("/");
								var req = {
									method : 'GET',
									url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/score/'+ nameArray[2],
									headers : {
										'Authorization' : 'Bearer '+ uaaToken,
										'Content-Type' : 'application/json',
										'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
										}
									};
								$http(req).then(function(response1) {
										$scope.my_score = response1.data[0].scores;
									},function(error) {
										console.log("get score: "+ error);
										});
								
								var req = {
										method : 'GET',
										url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/score?filter='+$scope.scoreSubString,
										headers : {
											'Authorization' : 'Bearer '+ uaaToken,
											'Content-Type' : 'application/json',
											'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
											}
										};
									$http(req).then(function(response1) {
											$scope.memberResult = response1.data;
											console.log(response1.data);
											/*Chart Generation*/
											$scope.score=0;
											$scope.data=[];
											$scope.completeDataArray=[];
											$scope.drilldownObj = {};
											$scope.drillSeriesArray = [];
											$scope.drillTempObjs = {};
											angular.forEach(response1.data, function(value){
												$scope.drillObjDataAry1 = [];
												$scope.score=0;
												angular.forEach(value.scores, function(value1){
													$scope.score = $scope.score + value1.score;
													$scope.drillObjDataAry = [];
													$scope.drillObjDataAry.push(value1.matchUri.split("/")[2]);
													$scope.drillObjDataAry.push(value1.score);
													$scope.drillObjDataAry1.push($scope.drillObjDataAry);
												});
												$scope.drillTempObjs = {name:value.fname,id:value.fname,data:$scope.drillObjDataAry1};
												$scope.tempScoreObj={name:value.fname,y:Math.round($scope.score*100)/100,drilldown:value.fname};
												$scope.data.push($scope.tempScoreObj);
												$scope.drillSeriesArray.push();
												$scope.tempScoreObj={};
												$scope.drillSeriesArray.push($scope.drillTempObjs);
											});
											$scope.completeData = {name: 'Member',colorByPoint: true,data:$scope.data};
											$scope.completeDataArray.push($scope.completeData);
											$scope.drilldownObj = {series:$scope.drillSeriesArray};
											console.log($scope.completeDataArray);
											console.log($scope.drilldownObj);
											$scope.getChart($scope.completeDataArray,$scope.drilldownObj);
											
											/*End of chart generation*/
											
											$scope.sArray=[];
											angular.forEach(response1.data, function(value){
												$scope.tempObj={};
												$scope.tScore=0;
												angular.forEach(value.scores, function(value1){
													$scope.tScore=$scope.tScore+value1.score;
												});
												$scope.tempObj={"score":$scope.tScore,"name":value.fname};
												$scope.sArray.push($scope.tempObj);
											});
											$scope.val = $scope.sArray[0].score; 
											angular.forEach($scope.sArray, function(value){
												if(value.score>=$scope.val){
													$scope.val =value.score;
													$scope.highName=value.name;
												}
											});
											var req = {
													method : 'GET',
													url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/predict?filter='+$scope.predictSubString,
													headers : {
														'Authorization' : 'Bearer '+ uaaToken,
														'Content-Type' : 'application/json',
														'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
													}
												};
												$http(req).then(function(response5) {
													$scope.allPredictions = response5.data;
													var req = {
															method : 'GET',
															url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/predict/'+ $scope.mobNoOfUser,
															headers : {
																'Authorization' : 'Bearer '+ uaaToken,
																'Content-Type' : 'application/json',
																'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
																	}
															};
															$http(req).then(function(response) {
																$scope.predictionObject = response.data;
																
																angular.forEach($scope.predictionObject[0].predictions, function(value){
																	if(value.matchUri == $scope.gameToPredict.uri){
																		//$scope.predictionObject[0].predictions.splice($scope.predictionObject[0].predictions.indexOf(value), 1);
																		$scope.alreadyPredicted = true;
																	}
																});
																$scope.contentLoaded = false;
															},function(error){});
													$scope.createChartDatas();
												},
												function(error) {
													console.log("get score: "+ error);
												});
										},function(error) {
											console.log("get score: "+ error);
											});
							},function(error) {
								console.log("get profile: "+ error);
							});
						}, function() {
							
						});
					};
					$scope.notStarted = false;
					$scope.getGamePlans = function() {
						$scope.getAccessToken().then(function(uaaToken) {
							var req = {
							method : 'GET',
							url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/games',
							headers : {
								'Authorization' : 'Bearer '+ uaaToken,
								'Content-Type' : 'application/json',
								'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
							}
						};
						$http(req).then(function(response1) {
							$scope.gamePlans = $filter('orderBy')(response1.data, 'match', false);
							$scope.gamePlan = $scope.gamePlans[0];
							$scope.gameToPredict = $scope.gamePlans[0];
							angular.forEach($scope.gamePlans, function(value){
								if(value.winner != "" && $scope.gamePlan.match<=value.match){
									$scope.gamePlan = value;
									if($scope.gamePlans.indexOf(value)!=$scope.gamePlans.length)
										$scope.gameToPredict = $scope.gamePlans[$scope.gamePlans.indexOf(value)+1];
								}
							});
						},
						function(error) {
							console.log("game plan: "+ error);
						});
					}, function() {});
				};
				$scope.getGamePlan = function(value){
					$scope.gamePlan = $scope.gamePlans[$scope.gamePlan.match+(2*value)]
				};
				$scope.changeChartType = function(){
					if($scope.chart_type=='pie'){
						$scope.option_3d={enabled: true,alpha: 45};
						$scope.opt={enabled : true,format : '{point.name}:{point.y:.1f}'};
					}
					else{
						$scope.option_3d={};
						$scope.opt={enabled: true,format: '{point.y:.1f}'};
					}
					$scope.getChart($scope.completeDataArray,$scope.drilldownObj);
				};
					
					$scope.getGamePlans();
					$scope.getProfile();
					//$scope.getScores();

					$scope.logout = function() {
						if (typeof (Storage) !== "undefined") {
							localStorage.setItem("user", undefined);
							$window.location.href = 'login.html';
						} else {
						}
					};
					

					$scope.getChart = function(data1,data2){
					$(function() {
						$('#container')
								.highcharts(
										{
											chart: {
										        type: 'column'
										    },
										    title: {
										        text: 'ISL Stars'
										    },
										    subtitle: {
										        text: 'Indian Super League Point table'
										    },
										    xAxis: {
										        type: 'category'
										    },
										    yAxis: {
										        title: {
										            text: 'Total Score'
										        }

										    },
										    legend: {
										        enabled: false
										    },
										    plotOptions: {
										        series: {
										            borderWidth: 0,
										            dataLabels: {
										                enabled: true,
										                format: '{point.y}'
										            }
										        }
										    },

										    tooltip: {
										        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
										        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
										    },

										    series: data1,
										    drilldown: data2
										});
					});
					};
				}).filter('filterData', function(){
					  return function(data, uri, muri, firstParam, secondParam){
						    var returnData = [];
						    angular.forEach(data, function(value, index){
						      if(value.uri==uri){
						      angular.forEach(value[firstParam], function(val, ind){
						        if(val.matchUri==muri){
						        angular.forEach(val[secondParam], function(v, i){
						          returnData.push(v)
						        });
						        }
						      });
						      }
						    });
						    return returnData;
						  }
						}).filter('makePositive', function() {
						    return function(num) { return Math.abs(num); }
						});