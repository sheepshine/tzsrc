var orderView=angular.module('orderView',[])

orderView.controller('orderViewCtr',['$scope',function($scope){
	$scope.totalPrice=0;
	$.ajax({
			url: 'http://211.149.150.213:9091/application-usrapp/user_shopOrder/selectShopOrderById.tz',
	        type: 'post',
	        dataType: 'json',
	       	async:false,
	       	data:{
			   	usrUserId:localStorage.productId,
			   	shopOrderId:localStorage.orderId
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

