var app = angular.module('app',['ui.router','RaceControllers','directives','ngAnimate','filters','ngTouch']);

app.config(function($stateProvider, $urlRouterProvider,$locationProvider) { ///*$routeProvider*/

    $urlRouterProvider.otherwise("/list");
    $stateProvider.state("list", {
            url: "/list",
            templateUrl: "template/raceList.html",
            controller:'RaceListController'
        }) .state("bet", {
            url:"/bet",
            templateUrl:'template/raceBet.html',
            controller: 'BetController'
        });
}).run(['$rootScope', '$location',function($rootScope, $location) { 
    $rootScope.$on('$stateChangeStart', function(evt, next, current) {
        $rootScope.$emit("openLoader");
    });
    $rootScope.$on('$stateChangeSuccess', function(evt, next, previous) {
        $rootScope.$emit("closeLoader");
    });
    $rootScope.$on('$viewContentLoading',function(){
        $rootScope.$emit("closeLoader");
    });
}]);