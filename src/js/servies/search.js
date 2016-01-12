var search=angular.module('search',[])

search.controller('searchClassCtr',['$scope',function($scope){
	//获取商品分类
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
        	$scope.datas=data.result.pageResultList.result;
        	console.log($scope.datas)
        },
        error: function(data){
            alert(data);
        }
	})
	//获取对应分类下的商品
	$scope.finditem=function(id){
		alert(id)
	}
}])
