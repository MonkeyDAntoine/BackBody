var app=angular.module("bodywired",['ngRoute','ui.bootstrap']);

app.config(['$routeProvider',
    function($routeProvider) {
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
