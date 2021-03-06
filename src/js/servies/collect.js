var collect=angular.module('collect',[])
collect.controller('collectCtr',['$scope',function($scope){
	$scope.theshop=false;
	$scope.thegoods=false;
	$scope.getcollectgoods=function(){
		$.ajax({
				url: 'http://usrapp.tuozhen.com/application-usrapp/userCollectProduct/queryUsrCollectProduct.tz',
		        type: 'post',
		        dataType: 'json',
		       	async:false,
		       	data:{
				   	usrUserId:localStorage.usrUserId
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
		        		$scope.goodsinfos=data.result.result.list;
		        		$scope.theshop=false;
						$scope.thegoods=true;
		        	}
		        },
		        error: function(data){
		            alert(data.errMsg);
		        }
			})
	}
	$scope.getcollectshop=function(){
		$.ajax({
				url: 'http://usrapp.tuozhen.com/application-usrapp/userCollectShop/queryUsrCollectShop.tz',
		        type: 'post',
		        dataType: 'json',
		       	async:false,
		       	data:{
				   	usrUserId:localStorage.usrUserId
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
		        		$scope.shopinfos=data.result.result.list;
		        		console.log($scope.shopinfos.length)
						$scope.theshop=true;
						$scope.thegoods=false;
					}
		        },
		        error: function(data){
		            alert(data.errMsg);
		        }
			})
	}
	$scope.viewDeatil=function(id){
		localStorage.productId=id;
		// localStorage.searchData=JSON.stringify($scope.searchitemdata);
		// localStorage.searchValue=$scope.searchValue;
		location.href="good_item.html";
	}
	$scope.addShopCar=function(proId,shopId){
		if(!localStorage.usrUserId){
			alert("请先登录");
			location.href="../../personal.html"
		}
		$.ajax({
			url: 'http://usrapp.tuozhen.com/application-usrapp/user_shopCart/addShopCart.tz',
	        type: 'post',
	        dataType: 'json',
	       	async:false,
	       	data:{
			   	usrUserId:localStorage.usrUserId,
			   	number:1,
			   	shopProductId:proId,
			   	shopInfoId:shopId
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
	        		alert("加入购物车成功")
	        		$scope.shopcarNum++;
	        	}
	        },
	        error: function(data){
	            alert(data.errMsg);
	        }
		})
	}
	$scope.viewShopContent=function(id){
		localStorage.shopItemId=id;
		window.location.href='shop_list.html'
	}
	$scope.getcollectgoods()
	$scope.getcollectshop()
	$("#thegoods").tap(function(){
		$(".shop").removeClass("active")
		$("#thegoods").addClass("active")
		$scope.getcollectgoods()
		$("#thecollectgoodswarp").show()
		$("#thecollectshopwarp").hide()
		return false;
	})
	$("#theshop").tap(function(){
		$(".shop").removeClass("active")
		$("#theshop").addClass("active")
		$scope.getcollectshop()
		$("#thecollectgoodswarp").hide()
		$("#thecollectshopwarp").show()
		return false;
	})
	
}])