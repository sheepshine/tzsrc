var itemNav=angular.module('itemNav',[])

itemNav.controller('itemNavClassCtr',['$scope','searchClassSer',function($scope,searchClassSer){
	//获取商品分类
	$scope.datas=searchClassSer.searchItem().result.pageResultList.result;
	$scope.itemList=searchClassSer.searchItem(1).result.pageResultList.result;
	$scope.finditem=function(id){
		$scope.itemList=searchClassSer.searchItem(id).result.pageResultList.result;
	}
	$scope.searchValue=""
	$scope.goSearch=function(e){
		var keycode = window.event?e.keyCode:e.which;
		localStorage.searchValue1=$scope.searchValue;
		if(keycode==13){
			localStorage.autoSearch=true;
			location.href="shop_item_search.html"
		}
	}
	$scope.goSearchBtn=function(e){
		console.log(e)
		localStorage.searchValue2=e;
		localStorage.autoSearch1=true;
		location.href="shop_item_search.html"
		
	}
}])

itemNav.service("searchClassSer",function(){
	return {
		searchItem:function(id){
			var datas="";
			$.ajax({
				url: 'http://usrapp.tuozhen.com/application-usrapp/productItem/selectProductItem.tz',
		        type: 'post',
		        dataType: 'json',
		       	async:false,
		       	data:{
				   	shopItemClassId:id
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
		        	datas=data
		        },
		        error: function(data){
		            alert(data);
		        }
			})
			return datas
		}
	}
})
