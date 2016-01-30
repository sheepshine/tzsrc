var orderConfirm=angular.module('orderConfirm',[])
orderConfirm.controller('orderConfirmCtr',['$scope',function($scope){
	$scope.totalPrice=0
	if(localStorage.addressTil){
		$scope.addressctr=true;
		$scope.addressInfo=JSON.parse(localStorage.addressTil)
	}else{
		$scope.addressctr=false;
	}
	
	$scope.addAddress=function(){
		location.href="address.html"
	}
	$scope.hasShop=true;
	$scope.shopcarData=JSON.parse(localStorage.shopcarDate)
	if($scope.shopcarData.length==0){
		$scope.hasShop=false;
	}
	$($scope.shopcarData).each(function(index){
		$scope.totalPrice+=($($scope.shopcarData)[index].mallprice)*($($scope.shopcarData)[index].number)
	})
	$scope.invoiceFn=function(){
		location.href="invoice.html"
	}
	$scope.invoiceName=localStorage.invoiceName;
	$scope.configOrder=function(){
		//var commitdata=JSON.parse(localStorage.payMoney)
		var commitdata= localStorage.payMoney
		$.ajax({
				url: 'http://usrapp.tuozhen.com:26000/application-usrapp/user_shopOrder/addShopOrder_shop.tz',
		        type: 'post',
		        dataType: 'json',
		       	async:false,
		       	data:commitdata
				,
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
	}
}])
