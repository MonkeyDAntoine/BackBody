app.controller("alimentsController",['$scope','$http','$modal',function($scope,$http,$modal){
	$scope.nbAliments=0;
	$scope.currentPage=1;
	$scope.aliments=[];

	var loadAliments=function(){
		var url=path+'/aliment/lister?offset='+(($scope.currentPage-1)*10)+'&limite=10';
		$http.get(url).success(function(data,status){
			$http.get(path+'/aliment/total').success(function(data2,status){
				$scope.aliments=angular.fromJson(data);
				$scope.nbAliments=data2;
			});
		});
	};

	$scope.parseEtat=function(etats){
		var etats_tab=[];
		for(var i=0;i<etats.length;i++){
			etats_tab.push(etats[i].nom);
		}
		return etats_tab.join(', ');
	};

	$scope.add=function(){
		var modalInstance = $modal.open({
			templateUrl: 'aliments/formulaireAliments.html',
			controller: 'formulaireAlimentsCtrl',
			size: 'lg'
    		});
	};

	$scope.addDeclinaison=function(){
		var modalInstance = $modal.open({
			templateUrl: 'aliments/formulaireDeclinaison.html',
			controller: 'formulaireDeclinaisonsCtrl',
			size: 'lg'
    		});
	};

	$scope.pageChanged=function(){
		loadAliments();
	};

	loadAliments();
}]);

app.controller('formulaireAlimentsCtrl',['$scope','$alimentService','$http','$modalInstance', function ($scope,$http, $modalInstance) {
	$scope.categories=[];
	$scope.categorieSelect=[];

	loadCategorie=function(){
		$http.get(path+'/categories/lister').success(function(data,status){
			$scope.categories=angular.fromJson(data);
		});
	};

	$scope.save = function (){
		var tab=[];
		for(var i in $scope.categorieSelect){
			tab.push({id:$scope.categorieSelect[i]});
		}
		var data={nom:$scope.nom,categories:tab};
		$http({url:path+'/aliment/ajouter',method:'POST',data:{data:angular.toJson(data)}}).success(function(data,status){
			$modalInstance.close();
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

	loadCategorie();
}]);

app.controller('formulaireDeclinaisonsCtrl',['$scope','$http','$modalInstance', function ($scope,$http, $modalInstance) {
	$scope.nutrimentsUnused=[];
	$scope.nutrimentsUsed=[];
	$scope.nutrimentsUnusedSelected=[];
	$scope.nutrimentsUsedSelected=[];

	$scope.etats=[];

	var loadNutriments=function(){
		$http.get(path+"/nutriments/types").success(function(data,status){
			$scope.nutrimentsUnused=[];
			for(var i=0;i<data.length;i++){
				$scope.nutrimentsUnused.push({name:data[i]});
			}
		});
	};

	var loadEtat=function(){
		$http.get(path+"/declinaison/etat/lister").success(function(data,status){
			$scope.etats=data;
		});
	};

	$scope.toUsed=function(){
		var decalage=0;
		for(var i in $scope.nutrimentsUnusedSelected){
			var selected=$scope.nutrimentsUnusedSelected[i];
			$scope.nutrimentsUsed.push($scope.nutrimentsUnused[selected]);
		}
		for(var i in $scope.nutrimentsUnusedSelected){
			var selected=$scope.nutrimentsUnusedSelected[i];
			$scope.nutrimentsUnused.splice(selected-decalage,1);
			decalage++;
		}
	};

	$scope.onChangeUnused=function(items){
		$scope.nutrimentsUnusedSelected=items;
	};

	$scope.toUnused=function(){
		var decalage=0;
		for(var i in $scope.nutrimentsUsedSelected){
			var selected=$scope.nutrimentsUsedSelected[i];
			$scope.nutrimentsUnused.push($scope.nutrimentsUsed[selected]);
		}
		for(var i in $scope.nutrimentsUsedSelected){
			var selected=$scope.nutrimentsUsedSelected[i];
			$scope.nutrimentsUsed.splice(selected-decalage,1);
			decalage++;
		}
	};

	$scope.onChangeUsed=function(items){
		$scope.nutrimentsUsedSelected=items;
	};
	

	$scope.save = function (){
		var data={nom:$scope.nom,categorie:$scope.categorie};
		$http.post('/declinaison/ajouter',{data:angular.toJson(data)}).success(function(data,status){
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

	loadNutriments();
	loadEtat();
}]);
