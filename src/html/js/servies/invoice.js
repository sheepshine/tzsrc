var invoice=angular.module('invoice',[])
invoice.controller('invoiceCtr',['$scope',function($scope){
	$scope.titlename="";
	$scope.backward=function(){
		localStorage.invoiceName=$scope.titlename;
		window.location.href=window.history.back(-1);
	}
	
}])