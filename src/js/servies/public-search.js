var index=angular.module('index',[])
index.controller('indexCtr',['$scope',function($scope){
	$scope.searchValue=""
	$scope.goSearch=function(){
		localStorage.searchValue=$scope.searchValue;
		localStorage.autoSearch=true;
		location.href="shop_item_search.html"
	}
	
}])


