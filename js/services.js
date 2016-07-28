var services = angular.module('services',[]);

services.factory('racelistService', ['$http', function($http){
	return {
		getRace:function(){
			var promise = $http({
				method:'GET',
				url:'json/zc.json',
			});
			return promise;
		}
	};
}]);

services.factory('caculateService',function(){
	return {
		getObjectKey:function(obj){
			var array = new Array();
			for(var i in obj){
				array.push(i);
			}
			array.sort(function(e1,e2){
				return e1-e2;
			});
			return array;
		},
	}
});