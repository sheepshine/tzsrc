var orderView=angular.module('orderView',[])

orderView.controller('orderViewCtr',['$scope',function($scope){
	$scope.totalPrice=0;
	$.ajax({
			url: 'http://usrapp.tuozhen.com/application-usrapp/user_shopOrder/selectShopOrderById.tz',
	        type: 'post',
	        dataType: 'json',
	       	async:false,
	       	data:{
			   	usrUserId:localStorage.productId,
			   	shopOrderId:localStorage.orderId
			},
	        headers: {
	        	 "imei":"123",
	 	        "mobileoperators":"123",
	 	        "originateenum":"APP_USER_AND",
	 	        "version":"V2_0Android_AppUser",
	 	        "sysversion":"123",
	 	        "phonemodel":"123"
			},
	        success: function(data){
	        	if(data.code=="00000"){
	        		$scope.shopAddress=data.result.result.shoppingAddressEntity
	        		$scope.shopList=data.result.result.list
	        		$($scope.shopList).each(function(index){
	        			$scope.totalPrice+=($($scope.shopList)[index].mallprice)*($($scope.shopList)[index].number)
	        		})
	        	}
	        },
	        error: function(data){
	            alert(data.errMsg);
	        }
		})
	
	
	
}])

