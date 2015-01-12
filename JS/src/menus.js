app.controller("menusController",['$scope','$modal',function($scope,$modal){
	$scope.nbMenus=0;
	$scope.currentPage=1;
	$scope.menus=[];

	var loadAliments=function(){
		$scope.menus=[
			{id:1,
			nom:'boeuf carotte',
			categorie:'plat',
			}
		];
	};

	$scope.add=function(){
		var modalInstance = $modal.open({
			templateUrl: 'formulaireMenus.html',
			controller: 'formulaireMenusCtrl',
			size: 'lg'
    		});
	};

	loadAliments();
}]);

app.controller('formulaireMenusCtrl', function ($scope, $modalInstance) {
	$scope.tempsPrepaH=0;
	$scope.tempsPrepaM=0;
	$scope.tempsCuissonH=0;
	$scope.tempsCuissonM=0;
	$scope.tempsRefrigH=0;
	$scope.tempsRefrigM=0;
	$scope.nbPers=1;
	$scope.aliments={};

	$scope.addAliment=function(){
		var nom=$scope.alimentMenu;
		$scope.aliments[nom]={name:nom,nb:0};
	};

	$scope.removeAliment=function(nom){
		delete $scope.aliments[nom];
	};
	
	$scope.save = function (){
		//TODO
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});
