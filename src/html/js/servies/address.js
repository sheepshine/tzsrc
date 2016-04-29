var address=angular.module('address',[])
address.controller('addressCtr',['$scope',function($scope){
	$scope.addressData={
		name:'',
		phone:'',
		addressone:'',
		addresstwo:'',
		defultCtr:false
	}
	$scope.submitData=function(){
		if(!$scope.addressData.name){
			alert("请输入姓名")
			return false
		}else if(!$scope.addressData.phone){
			alert("请输入联系方式")
			return false
		}else if(!$scope.addressData.addressone){
			alert("请输入地区")
			return false
		}else if(!$scope.addressData.addresstwo){
			alert("请输入地址")
			return false
		}
		localStorage.addressTil=JSON.stringify($scope.addressData);
		location.href="order_confirm.html"
	}
}])