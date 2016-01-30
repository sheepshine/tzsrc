var index=angular.module('index',[])
index.controller('indexCtr',['$scope',function($scope){
	$scope.searchValue=""
	$scope.goSearch=function(e){
		var keycode = window.event?e.keyCode:e.which;
		localStorage.searchValue=$scope.searchValue;
		if(keycode==13){
			localStorage.autoSearch=true;
			location.href="shop_item_search.html"
		}
	}
	
}])


