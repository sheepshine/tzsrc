var search=angular.module('search',[])

search.controller('searchClassCtr',['$scope','searchClassSer','searchItemSera',function($scope,searchClassSer,searchItemSera){
	//获取商品分类
	$scope.datas=searchClassSer.result.pageResultList.result;

	//获取对应分类下的商品
	//$scope.finditem=searchItemSer(id);
	//console.log($scope.finditem)
	$scope.itemList=searchItemSera.searchItem(1).result.result.list;
	$scope.finditem=function(id){
		$scope.itemList=searchItemSera.searchItem(id).result.result.list;
		if($scope.itemList.length==0){
			$scope.noresout=false;
		}
	}
	$scope.viewDeatil=function(id){
		localStorage.productId=id;
		location.href="good_item.html";
	}
	$scope.minfliter=function(){
		$scope.showChiliListShowCtr=false;
	}
	$scope.searchAjax=function(searchData){
		var keycode = window.event?e.keyCode:e.which;
		localStorage.searchValue=$scope.searchValue;
		if(keycode==13){
			$.ajax({
				url: 'http://usrapp.tuozhen.com/application-usrapp/productInfo/queryProductInfo.tz',
		        type: 'post',
		        dataType: 'json',
		       	async:false,
		       	data:{
				   	title:searchData
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
		        		$scope.$watch($scope.searchitemdata)
		        		$scope.itemList=data.result.result.list
		        		console.log(data.result.result.list)
		        		if(data.result.result.list.length==0){
		        			$scope.noresout=true;
		        		}else{
		        			$scope.noresout=false;
		        		}
		        	}
		        },
		        error: function(data){
		            alert(data.errMsg);
		        }
			})


		}
		
	}
}])

search.service("searchClassSer",function(){
	var datas="";
	$.ajax({
		url: 'http://usrapp.tuozhen.com/application-usrapp/productItem/selectProductItem.tz',
        type: 'post',
        dataType: 'json',
       	async:false,
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
})

search.service("searchItemSera",function(){
	return {
		searchItem:function(id){
			var datas="";
			$.ajax({
				url: 'http://usrapp.tuozhen.com/application-usrapp/productInfo/queryProductInfo.tz',
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