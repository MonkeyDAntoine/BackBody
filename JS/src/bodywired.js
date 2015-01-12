var path="http://iagl-server.cloudapp.net/api";

var app=angular.module("bodywired",['ngRoute','ui.bootstrap']);     

app.config(['$routeProvider','$httpProvider',
    function($routeProvider,$httpProvider) {
      $routeProvider
        .when('/aliments', {
          templateUrl: 'aliments.html',
	  controller: 'alimentsController'
        })
        .when('/menus', {
          templateUrl: 'menus.html',
	  controller: 'menusController'
        })
	.otherwise({
		redirectTo:'/aliments'
	});
	//$httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
    	$httpProvider.defaults.useXDomain = true;
    }
]);

app.controller("globalController",['$scope','$location',function($scope,$location){
	$scope.menus=menu;
}]);

app.controller("menuItemController",['$scope','$location',function ($scope,$location) {
		$scope.getClass = function(path){
			if ("#"+$location.path() == path) {
	    		return "active"
	    	} else {
	    		return ""
	    	}
		};		
}]);
