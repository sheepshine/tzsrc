var shopcar=angular.module('shopcar',[])

shopcar.controller('shopcarCtr',['$scope',function($scope){
	$scope.totalPrice=0;
	$.ajax({
			url: 'http://211.149.150.213:9091/application-usrapp/user_shopCart/queryShopCart.tz',
	        type: 'post',
	        dataType: 'json',
	       	async:false,
	       	data:{
			   	usrUserId:localStorage.usrUserId
			},
	        headers: {
	            "imei":"asdaSA",
		        "mobileOperators":"IOS8",
		        "originateEnum":"APP_USER_AND",
		        "version":"2_0",
		        "sysVersion":"ios9",
		        "phoneModel":"iphone"
			},
	        success: function(data){
	        	if(data.code=="00000"){
	        		$scope.itemdata=data.result.result.list
	        		$($scope.itemdata).each(function(index){
	        			$scope.totalPrice+=($($scope.itemdata)[index].mallprice)*($($scope.itemdata)[index].number)
	        		})
	        		//$scope.shopdata=data.result.result.shopInfo
	        	}
	        },
	        error: function(data){
	            alert(data.errMsg);
	        }
		})
	$scope.editCtr=true;
	$scope.editCtr2=false;
	$scope.editTil="编辑"
	$scope.shopCarEdit=function(){
		$scope.editCtr=false;
		$scope.editCtr2=true;
		$(".selectBtn").show();
		$scope.editTil="完成"
	}
	
}])

