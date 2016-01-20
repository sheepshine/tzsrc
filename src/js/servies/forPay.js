var forPay=angular.module('forPay',[])
forPay.controller('forPayCtr',['$scope',function($scope){
	$scope.orderDates=JSON.parse(localStorage.orderDate);
	$scope.viewCtr=0;
	$scope.viewAll=function(arrS){
		$scope.viewCtr=arrS;
		$scope.allDis=false;
	}
	$scope.viewAllDis=function(){
		$scope.viewCtr=999;
		$scope.orderDates2=JSON.parse(localStorage.orderDate);
		$scope.allDis=true;
	}
	if(localStorage.forPayType){
		$scope.viewAll(localStorage.forPayType)
	}
	$scope.viewOrder=function(orderId){
		localStorage.orderId=orderId;
		window.location.href="order_view.html"
	}
	$scope.toPay=function(index){
		console.log(index)
		localStorage.shopcarDate=JSON.stringify(JSON.parse(localStorage.orderDate)[index]);
		location.href="order_confirm.html"
	}
	$scope.cancel=function(theId){
		$.ajax({
				url: 'http://211.149.150.213:9091/application-usrapp/user_shopOrder/deleteShopOrder.tz',
		        type: 'post',
		        dataType: 'json',
		       	async:false,
		       	data:{
				   	shopOrderId:theId
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
		        		$.ajax({
							url: 'http://211.149.150.213:9091/application-usrapp/user_shopOrder/selectShopOrder.tz',
					        type: 'post',
					        dataType: 'json',
					       	async:false,
					       	data:{
							   	usrUserId:localStorage.usrUserId,
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
					        		localStorage.orderDate=JSON.stringify(data.result.result.list);
					        	}
					        },
					        error: function(data){
					            alert(data.errMsg);
					        }
						})
		        	}
		        },
		        error: function(data){
		            alert(data.errMsg);
		        }
			})
	}
}])