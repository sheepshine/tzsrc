var address=angular.module('shopList',[])
address.controller('shopListCtr',['$scope',function($scope){
	$scope.searchValue1=""
	$scope.goSearch=function(e){
		var keycode = window.event?e.keyCode:e.which;
		localStorage.searchValue1=$scope.searchValue;
		if(keycode==13){
			localStorage.autoSearch=true;
			location.href="shop_item_search.html"
		}
	}
$.ajax({
		url: 'http://usrapp.tuozhen.com/application-usrapp/productInfo/queryProductInfo.tz',
        type: 'post',
        dataType: 'json',
       	async:false,
       	data:{
       		shopId:localStorage.shopItemId
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
        	localStorage.shopItemId="";
        	if(data.code=="00000"){
        		$scope.$watch($scope.searchitemdata)
        		$scope.searchitemdata=data.result.result.list
        		console.log(data.result.result.list)
        		$scope.itemdata=JSON.parse(localStorage.shopDataItemitemdata)
        		
        		$scope.shopdata=JSON.parse(localStorage.shopDataItem)
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

	$scope.viewDeatil=function(id){
		localStorage.productId=id;
		localStorage.searchData=JSON.stringify($scope.searchitemdata);
		localStorage.searchValue=$scope.searchValue;
		location.href="good_item.html";
	}

	
}])


