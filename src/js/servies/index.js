var address=angular.module('index',[])
address.controller('indexCtr',['$scope',function($scope){
	$.ajax({
		url: 'http://usrapp.tuozhen.com/application-usrapp/productItem/selectProductItem.tz',
        type: 'post',
        dataType: 'json',
       	async:false,
        headers: {
            "imei":"123",
	        "mobileoperators":"123",
	        "originateenum":"APP_USER_AND",
	        "version":"V2_0Android_AppUser",
	        "sysversion":"123",
	        "phonemodel":"123"
		},
        success: function(data){
        	$scope.datas=data.result.pageResultList.result;
        },
        error: function(data){
            alert(data);
        }
	})

	$.ajax({
			url: 'http://usrapp.tuozhen.com/application-usrapp/productInfo/selectHomePageProductInfo.tz',
	        type: 'post',
	        dataType: 'json',
	       	async:false,
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
	        		$scope.firstFloor=data.result.listOne;
	        		$scope.threeFloor=data.result.listFou;
	        		$scope.fiveFloor=data.result.listTwo;
	        		$scope.fourFloor=data.result.productInfoVoThr;
	        		$scope.twoFloor=data.result.listFiv;
	        	}
	        },
	        error: function(data){
	            alert(data.errMsg);
	        }
		})

	$scope.finditem=function(id){
		localStorage.indexItemId=id;

		window.location.href="search.html"
	}

	$scope.viewDeatil=function(id){
		console.log(id)
		localStorage.productId=id;
		// localStorage.indexItemId=id;

		window.location.href="good_item.html"
	}
}])