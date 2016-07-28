var directives = angular.module('directives',[]);

directives.directive('msgtip', ['$timeout', function($timeout){
	// Runs during compile
	return {
		 restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		 template: "<div class='msgTip' ng-if='info.showTips'>{{info.tips}}</div>",
		 replace: true,
		link: function(scope) {
			scope.info = {showTips:false,tips:''};
			scope.$on('trigger-tips',function(event, tips){
				    scope.info.tips = tips;
                    scope.info.showTips = true;
                    $timeout(function () {
                        scope.info.showTips = false;
                    }, 800);
			});
		}
	};
}]).directive('loading', ['$timeout', function($timeout){
	// Runs during compile
	return {
		restrict: 'E', 
		templateUrl: 'module/loader.html',
		replace: true,
		link: function(scope, iElm, iAttrs, controller) {
			scope.info = {showloader:false,tips:''};
			scope.$on('openLoader',function(event){
                    scope.info.showloader = true;
			});
			scope.$on('closeLoader',function(event){
                    scope.info.showloader = false;
			});
		}
	};
}]).directive('deleteitem', ['$location','$rootScope', function($location,$rootScope){
	// Runs during compile
	return {
		 scope: false, // {} = isolate, true = child, false/undefined = no change
		 restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		link: function(scope, iElm, iAttrs, controller) {
 			
			iElm.bind('click',function(event) {
						var _parentId = scope.$parent.$index;
						var _index = scope.$index;
				        var vm = $rootScope.selectArray[_parentId];
				        var type = vm['types'][_index];
				        vm['types'].splice(_index, 1);
				        delete $rootScope.selectObj[vm.matchNo][type];
				        if(vm['types'].length <1 ){
				            $rootScope.selectArray.splice(_parentId, 1);
				            $rootScope.betCount--;
				            delete $rootScope.selectObj[vm.matchNo];
				        }
				        scope.$apply('selectObj');
			});
		}
	};
}]).directive('deleterace', ['$location','$rootScope', function($location,$rootScope){
	// Runs during compile
	return {
		 scope: false, // {} = isolate, true = child, false/undefined = no change
		 restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		link: function(scope, iElm, iAttrs, controller) {
			iElm.bind('click',function(event) {
				var index = iAttrs.deleterace;
		        var vm =  $rootScope.selectArray[index];
		        delete $rootScope.selectObj[vm.matchNo];
		        $rootScope.selectArray.splice(index,1);
		        $rootScope.betCount--;
		        if($rootScope.selectArray.length<1){
		             $location.path('/list');
		        }
		        scope.$apply();
			});
		}
	};
}]);