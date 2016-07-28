var raceControllers = angular.module('RaceControllers', ['services']);

raceControllers.controller('RaceListController', ['$scope','racelistService','$location','caculateService','$rootScope','$timeout',
    function($scope,racelistService,$location,caculateService,$rootScope,$timeout) {       
       $rootScope.paintClass="slideRight";
       var promise = racelistService.getRace();
        promise.success(function(data){
            $scope.racelist = data.raceList;
        });
        $rootScope.selectArray=$rootScope.selectArray ==undefined ? [] : $rootScope.selectArray;
        $rootScope.selectObj=$rootScope.selectObj ==undefined ? {} :$rootScope.selectObj;
        //设置数量
        $rootScope.betCount = $rootScope.betCount == undefined ? 0 :$rootScope.betCount;
        if($rootScope.betCount<2){
             $scope.buttonMsg ='请选择最少两场赛事';
        }else{
             $scope.buttonMsg ='下一步';
         }
        $scope.selectItem= function(item,type){
        	if(!$rootScope.selectObj[item.matchNo]){
        		$rootScope.selectObj[item.matchNo] = {};
                var types =[];
                types.push(type);
                types.sort(function(e1,e2){
                    return e1-e2;
                });
                var obj ={"matchNo":item.matchNo,"guestTeam":item.guestTeam,"homeTeam":item.homeTeam,"concede":item.concede,"types":types};
                $rootScope.selectArray.push(obj);
                $rootScope.selectArray.sort(function(e1,e2){
                    return e1.matchNo-e2.matchNo;
                });
        	}else{
                var vm = $rootScope.selectArray;
                for(var z=0;z<vm.length;z++){
                    if(item.matchNo == vm[z].matchNo){
                        var target = vm[z];
                        var hasType = false;
                        for(var y =0;y<target.types.length;y++){
                            if(target.types[y] == type){
                                hasType=true;
                                target.types.splice(y,1);
                            }
                        }
                        if(!hasType){
                           target.types.push(type);
                        }
                        target.types.sort(function(e1,e2){
                            return e2-e1;
                        });
                    }
                    if(vm[z].types.length == 0){
                        vm.splice(z,1);
                    }
                }   
            }
        	$rootScope.selectObj[item.matchNo][type] = !$rootScope.selectObj[item.matchNo][type];
        	if(!$rootScope.selectObj[item.matchNo][type]){
        		delete $rootScope.selectObj[item.matchNo][type];
        		if(caculateService.getObjectKey($rootScope.selectObj[item.matchNo]).length<1){
        			delete $rootScope.selectObj[item.matchNo];
        		}
        	}
           $rootScope.betCount  = $rootScope.selectArray.length;
            if($rootScope.betCount<2){
                 $scope.buttonMsg ='请选择最少两场赛事';
            }else{
                 $scope.buttonMsg ='下一步';
            }
        },

        /*添加到购物车*/
        $scope.addCart = function(){
            if($rootScope.betCount<2){
                $rootScope.$emit("trigger-tips", "最少选择两场比赛！");
                return false;
            }
            if($rootScope.betCount>10){
                 $rootScope.$emit("trigger-tips", "最多选择10场比赛！");
                return false;
            }
        	if(!$rootScope.selecetObj){
                $location.path('/bet');
        	}else{
        		$location.path('/bet');
        	}
        },
        $scope.ul = {};
        $scope.toggleUl = function(value){
            $scope.ul[value] = !$scope.ul[value];
        },
        $scope.li ={}
        $scope.hideli = function(value){
            $scope.recoverStyle = true;
            $scope.showRecover = true;
            $timeout(function(){
                 $scope.recoverStyle = false;
            },500);
            $scope.li[value] = true;
        },
        $scope.recover = function(event){
            for(var i in  $scope.li){
                $scope.li[i] = false;
            }
             $scope.showRecover = false;
            event.stopPropagation();
        },
        $scope.swipeleft= function(){
            $rootScope.$broadcast("trigger-tips", "你好！");
        }
        /**显示用户体验**/
        $scope.detailShow = {};
        $scope.showDetail = function(matchNo){
        	$scope.detailShow[matchNo] = !$scope.detailShow[matchNo];
        	if(!$scope.detailShow[matchNo]){
        		delete $scope.detailShow[matchNo];
        	}
        	for(var i in $scope.detailShow){
        		if( i != matchNo){
        			delete $scope.detailShow[i];
        		}
        	}
        }
    }
]);
raceControllers.controller('BetController', ['$scope','$rootScope','$location', function($scope,$rootScope,$location){

    if(!$rootScope.selectArray || $rootScope.selectArray.length<1){
        $location.path('/list');
    }
    $scope.contiuneBet = function(){
        $location.path('/list');
    }
    $scope.deleteItem = function(index){
        var vm =  $rootScope.selectArray[index];
        delete $rootScope.selectObj[vm.matchNo];
        $rootScope.selectArray.splice(index,1);
        $rootScope.betCount--;
        if($rootScope.selectArray.length<1){
             $location.path('/list');
        }
    }
    $scope.swipeRight = function(){
        $location.path('/list');
    }
}]);