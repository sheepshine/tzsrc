var goodDeatil=angular.module('goodDeatil',[])

goodDeatil.controller('goodDeatilCtr',['$scope','$sce',function($scope,$sce){
	$.ajax({
			url: 'http://usrapp.tuozhen.com/application-usrapp/productInfo/queryProductInfoById.tz',
	        type: 'post',
	        dataType: 'json',
	       	async:false,
	       	data:{
			   	productId:localStorage.productId
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
	        		$scope.itemdata=data.result.result.productList[0]
	        		localStorage.shopDataItemitemdata=JSON.stringify(data.result.result.productList[0])
	        		$scope.shopdata=data.result.result.shopInfo
	        		localStorage.shopDataItem=JSON.stringify(data.result.result.shopInfo)
	        		$scope.intrdocutre=$sce.trustAsHtml($scope.itemdata.introduction)
	        	}
	        },
	        error: function(data){
	            alert(data.errMsg);
	        }
		})
	
	$scope.addShopcar=function(){
		$.ajax({
			url: 'http://usrapp.tuozhen.com/application-usrapp/user_shopCart/addShopCart.tz',
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
	        	 "imei":"123",
	 	        "mobileoperators":"123",
	 	        "originateenum":"APP_USER_AND",
	 	        "version":"V2_0Android_AppUser",
	 	        "sysversion":"123",
	 	        "phonemodel":"123"
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
		if($("#collect-ico").attr("class")=="bg fl icoactive"){
			$.ajax({
			url: 'http://usrapp.tuozhen.com/application-usrapp/userCollectProduct/deleteCollectProduct.tz',
	        type: 'post',
	        dataType: 'json',
	       	async:false,
	       	data:{
			   	id:localStorage.CollectId
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
	        		alert('取消收藏成功')
	        	}
	        	$("#collect-ico").removeClass("icoactive")
	        },
	        error: function(data){
	            alert(data.errMsg);
	        }
		})
		}else{
			$.ajax({
			url: 'http://usrapp.tuozhen.com/application-usrapp/userCollectProduct/addUsrCollectProduct.tz',
	        type: 'post',
	        dataType: 'json',
	       	async:false,
	       	data:{
			   	usrUserId:localStorage.usrUserId,
			   	shopProductId:localStorage.productId,
			   	isdel:0
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
	        		localStorage.CollectId=""
	        		localStorage.CollectId=data.result.id
	        		alert('添加收藏成功')
	        	}
	        	$("#collect-ico").addClass("icoactive")
	        },
	        error: function(data){
	            alert(data.errMsg);
	        }
		})

		}
		
		
	}

	$scope.viewShopContent=function(id){
		localStorage.shopItemId=id;
		window.location.href='shop_list.html'
	}
}])

