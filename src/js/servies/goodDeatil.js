var goodDeatil=angular.module('goodDeatil',[])

goodDeatil.controller('goodDeatilCtr',['$scope',function($scope){
	$.ajax({
			url: 'http://211.149.150.213:9090/application-shopapp/productInfo/queryProductInfoById.tz',
	        type: 'post',
	        dataType: 'json',
	       	async:false,
	       	data:{
			   	productId:localStorage.productId
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
	        		$scope.itemdata=data.result.result.productList[0]
	        		$scope.shopdata=data.result.result.shopInfo
	        	}
	        },
	        error: function(data){
	            alert(data.errMsg);
	        }
		})
	
	$scope.addShopcar=function(){
		$.ajax({
			url: 'http://211.149.150.213:9091/application-usrapp/user_shopCart/addShopCart.tz',
	        type: 'post',
	        dataType: 'json',
	       	async:false,
	       	data:{
			   	usrUserId:localStorage.usrUserId,
			   	number:1,
			   	shopProductId:localStorage.productId,
			   	shopInfoId:$scope.shopdata.id
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
	        		alert(data.errMsg)
	        	}
	        },
	        error: function(data){
	            alert(data.errMsg);
	        }
		})
	
	}
	$scope.collectShop=function(){
		$.ajax({
			url: 'http://211.149.150.213:9091/application-usrapp/userCollectProduct/addUsrCollectProduct.tz',
	        type: 'post',
	        dataType: 'json',
	       	async:false,
	       	data:{
			   	usrUserId:localStorage.usrUserId,
			   	shopProductId:localStorage.productId,
			   	isdel:0
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
	        		alert(data.errMsg)
	        	}
	        },
	        error: function(data){
	            alert(data.errMsg);
	        }
		})
	}
}])

