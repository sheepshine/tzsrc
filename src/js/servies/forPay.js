var forPay=angular.module('forPay',[])
forPay.controller('forPayCtr',['$scope',function($scope){
	$scope.orderDates=JSON.parse(localStorage.orderDate);
	$scope.viewCtr=0;
	$scope.viewAll=function(arrS){
		$scope.viewCtr=arrS;
		$scope.allDis=false;
	}
	$scope.viewAllDis=function(){
		$scope.viewCtr=999;
		$scope.orderDates2=JSON.parse(localStorage.orderDate);
		$scope.allDis=true;
	}
	if(localStorage.forPayType){
		$scope.viewAll(localStorage.forPayType)
	}
}])