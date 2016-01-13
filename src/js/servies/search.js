var search=angular.module('search',[])

search.controller('searchClassCtr',['$scope','searchClassSer','searchItemSera',function($scope,searchClassSer,searchItemSera){
	//获取商品分类
	$scope.datas=searchClassSer.result.pageResultList.result;
	//获取对应分类下的商品
	//$scope.finditem=searchItemSer(id);
	//console.log($scope.finditem)
	$scope.finditem=searchItemSera.searchItem
	console.log(searchItemSera.datasa)
	// function(id){
	// 	$.ajax({
	// 		url: 'http://211.149.150.213:9090/application-shopapp/productInfo/queryProductInfo.tz',
	// 	    type: 'post',
	// 	    dataType: 'json',
	// 	   	async:false,
	// 	    headers: {
	// 	         "imei":"asdaSA",
	// 	    "mobileOperators":"IOS8",
	// 	    "originateEnum":"APP_USER_AND",
	// 	    "version":"2_0",
	// 	    "sysVersion":"ios9",
	// 	    "phoneModel":"iphone"

	// 	    },
	// 	    data:{
	// 	    	shopItemClassId:id

	// 	    },
	// 	    success: function(data){
		    	
	// 	    },
	// 	    error: function(data){
	// 	        alert(data);
	// 	    }
	// 	})
		
	// }
}])

search.service("searchClassSer",function(){
	var datas="";
	$.ajax({
		url: 'http://211.149.150.213:9090/application-shopapp/productItem/selectProductItem.tz',
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
			var datasa="";
			$.ajax({
				url: 'http://211.149.150.213:9090/application-shopapp/productInfo/queryProductInfo.tz',
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
		        	datasa=data
		        },
		        error: function(data){
		            alert(data);
		        }
			})
		}

	}
})