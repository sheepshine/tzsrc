var searchItem=angular.module('searchItem',[])

searchItem.controller('searchItemCtr',['$scope',function($scope){
	$scope.list1=false;
	$scope.list2=false;
	$scope.isActive=false;
	$scope.viewclass=function(){
		$scope.list1=!$scope.list1;
		$scope.rankshow=false;
		
	}
	$scope.viewclass2=function(){
		$scope.list2=!$scope.list2;
		$scope.isActive=true;
	}
	$scope.selectClass=function(){
		$scope.isActive2=true;
	}
	$scope.rankClass=function(){
		$scope.rankshow=!$scope.rankshow;
		$scope.list1=false;
	}
	$scope.filterShow=function(){
		$scope.filterShowCtr=!$scope.filterShowCtr
	}
	$scope.showChiliList=function(){
		$scope.showChiliListShowCtr=!$scope.showChiliListShowCtr
	}
	$scope.showChiliListClass=function(){
		$scope.filterClassCtr=!$scope.filterClassCtr
	}
}])

