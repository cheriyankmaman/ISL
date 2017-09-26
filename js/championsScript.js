angular.module('campiansApp', []).controller(
				'champiansCtrl',
				function($scope, $window, $http, $q) {
					/*
					 * $scope.profile = { "uri" : "/profile/cheriyan", "fname" :
					 * "Cheriyan", "lname" : "KM", "groups" : [ "/groups/heros",
					 * "/groups/batch13" ], "mob" : "9633282270", "paswrd" :
					 * "1234", "scores" : [] };
					 */
					
					$scope.chart_type='column';
					$scope.option_3d={};
					$scope.opt={enabled: true,format: '{point.y:.1f}'};
					$scope.contentLoaded=true;
					/*$scope.groups = [
							{
								"uri" : "/groups/heros",
								"name" : "Heros",
								"members" : [ "/profile/cheriyan",
										"/profile/arjun" ]
							},
							{
								"uri" : "/groups/batch13",
								"name" : "Batch '13",
								"members" : [ "/profile/cheriyan",
										"/profile/hari", "/profile/bibin" ]
							} ];*/
					$scope.memberResult = [];
					$scope.gamePlans = [];
					$scope.quizAnsw = [];
					;
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
					
					$scope.initGroupPage = function(value) {

						if(value=="index"){
							localStorage.setItem("group", '');
							localStorage.setItem("groupIndex", undefined);
							$scope.dash="selected";
							$scope.select=[];
						}
						else{
							$scope.group = JSON.parse(localStorage.getItem("group"));
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
										url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/score',
										headers : {
											'Authorization' : 'Bearer '+ uaaToken,
											'Content-Type' : 'application/json',
											'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
											}
										};
									$http(req).then(function(response1) {
											$scope.memberResult = response1.data;
											
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
										},function(error) {
											console.log("get score: "+ error);
											});
									
									var req = {
											method : 'GET',
											url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/predict',
											headers : {
												'Authorization' : 'Bearer '+ uaaToken,
												'Content-Type' : 'application/json',
												'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
											}
										};
										$http(req).then(function(response5) {
											$scope.allPredictions = response5.data;
										},
										function(error) {
											console.log("get score: "+ error);
										});
									
								angular.forEach(response1.data[0].groups, function(value){
									var req = {
										method : 'GET',
										url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io'+value,
										headers : {
											'Authorization' : 'Bearer '+ uaaToken,
											'Content-Type' : 'application/json',
											'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
										}
									};
									$http(req).then(function(response) {
										$scope.allGroups.push(response.data[0]);
										$scope.createChartDatas();
										$scope.contentLoaded = false;
									},
									function(error) {
										console.log("get score: "+ error);
									});

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
							$scope.gamePlans = response1.data;
							if (response1.data[0].fbat != undefined) {
								$scope.notStarted = false;
								var d = $scope.gamePlans[0].date;
								$scope.gamePlan = $scope.gamePlans[0];
								$scope.gameToPredict = null;
								angular.forEach($scope.gamePlans,function(value,index) {
									if ($scope.gamePlan.date <= value.date && value.fscore != undefined) {
										d = value.date;
										$scope.gamePlan = value;
									}
									if (value.fscore == undefined) {
										if($scope.gamePlan.date < value.date && $scope.gameToPredict == null){
											$scope.gameToPredict = value;
										}
									}
								});
							} else {3
							
								angular.forEach(response1.data,function(value,index) {
									if (value.date == 1) {
										$scope.gameToPredict = value;
									}
								});
								$scope.notStarted = true;
							}
						},
						function(error) {
							console.log("game plan: "+ error);
						});
					}, function() {});
				};

					$scope.getQuiz = function() {
						$scope.getAccessToken().then(function(uaaToken) {
							var req = {
									method : 'GET',
									url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/quiz',
									headers : {
										'Authorization' : 'Bearer '+ uaaToken,
										'Content-Type' : 'application/json',
										'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
									}
								};
								$http(req).then(function(response1) {
									$scope.quizAnsw = response1.data;
								},
								function(error) {
									console.log("get score: "+ error);
								});
							}, function() {});
					};

					
					$scope.submitPrediction = function() {
						$scope.submitPopUp = true;
						// send to asset
						$scope.getAccessToken().then(function(uaaToken) {
							var req = {
							method : 'GET',
							url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/active/me',
							headers : {
								'Authorization' : 'Bearer '+ uaaToken,
								'Content-Type' : 'application/json',
								'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
									}
							};
							$http(req).then(function(response1) {
								$scope.active = response1.data[0].status;
								if(response1.data[0].status=="true"){
									$scope.yesitissend = true;
									angular.forEach($scope.quizAnsw, function(value) {
										if (value.ans == '' || value.ans == null) {
											$scope.yesitissend = false;
										}
									});
									if ($scope.yesitissend == true) {
										
										$scope.getAccessToken().then(function(uaaToken) {
											var name = $scope.profile[0].uri;
											var nameArray = name.split("/");
											var req = {
											method : 'GET',
											url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/predict/'+nameArray[2],
											headers : {
												'Authorization' : 'Bearer '+ uaaToken,
												'Content-Type' : 'application/json',
												'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
												}
											};
											$http(req).then(function(response) {
												$scope.predictedOrNot=false;
												angular.forEach(response.data[0].predict, function(value){
													if(value.matchUri==$scope.gameToPredict.uri){
														$scope.predictedOrNot=true;
													}
												});
												if($scope.predictedOrNot==false){
												$scope.predictObj={"matchUri" : $scope.gameToPredict.uri,"predict":$scope.quizAnsw};
												//response.data.predict.push($scope.predictObj);
												response.data[0].predict.push($scope.predictObj);
												var req = {
														method : 'PUT',
														url : 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/predict/'+nameArray[2],
														headers : {
															'Authorization' : 'Bearer '+ uaaToken,
															'Content-Type' : 'application/json',
															'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
															},
														data:response.data
														};
														$http(req).then(function(response1) {
															
														},function(error) {
															console.log("get profile: "+ error);
														});
														alert("Thank you! Enjoy the match");
												}
												else{
													alert("You have already predicted!");
												}
											},function(error) {
												console.log("get profile: "+ error);
											});
										}, function() {});
									} else {
										alert("Please fill all the fields!");
									}
									}
									else{
										alert("Time up :-(");
									}
							},function(error){});
						},function(error){});
						
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
					$scope.getQuiz();

					$scope.logout = function() {
						if (typeof (Storage) !== "undefined") {
							localStorage.setItem("user", undefined);
							$window.location.href = 'login.html';
						} else {
						}
					};
					

					$scope.getChart = function(data1,data2,type){
					$(function() {
						$('#container')
								.highcharts(
										{
											chart : {
												type : $scope.chart_type,
												options3d: $scope.option_3d
											},
											title : {
												text : $scope.chartTitle
											},
											subtitle : {
												text : 'Champions Trophy - point graph'
											},
											xAxis : {
												type : 'category'
											},
											yAxis : {
												title : {
													text : 'Total points'
												}

											},
											legend : {
												enabled : false
											},
											plotOptions : {
												series : {
													borderWidth : 0,
													dataLabels : $scope.opt
												},
												pie: {
										            innerSize: '50%',
										            depth: 45
										        }
											},

											tooltip : {
												headerFormat : '<span style="font-size:11px">{series.name}</span><br>',
												pointFormat : '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>'
											},

											series : data1,
											drilldown : data2
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
						});