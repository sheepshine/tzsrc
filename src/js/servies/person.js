var person=angular.module('person',[])

person.controller('personCtr',['$scope',function($scope){
	$scope.tologin=true;
	$scope.haslogin=false;
	$scope.username=13983604781
	$scope.password=123456
	$scope.info=function(){
		$.ajax({
				url: 'http://usrapp.tuozhen.com/application-usrapp/user_shopOrder/selectShopOrder.tz',
		        type: 'post',
		        dataType: 'json',
		       	async:false,
		       	data:{
				   	// usrUserId:localStorage.usrUserId
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
		        		
		        	}
		        },
		        error: function(data){
		            alert(data.errMsg);
		        }
			})
	}
	$scope.likeshop=function(){
		$.ajax({
				url: 'http://usrapp.tuozhen.com/application-usrapp/userCollectProduct/queryUsrCollectProduct.tz',
		        type: 'post',
		        dataType: 'json',
		       	async:false,
		       	data:{
				   	usrUserId:localStorage.usrUserId
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
		        		$scope.likeshopslength=data.result.result.list
		        	}
		        },
		        error: function(data){
		            alert(data.errMsg);
		        }
			})
	}
	$scope.likegoods=function(){
		$.ajax({
				url: 'http://usrapp.tuozhen.com/application-usrapp/userCollectShop/queryUsrCollectShop.tz',
		        type: 'post',
		        dataType: 'json',
		       	async:false,
		       	data:{
				   	usrUserId:localStorage.usrUserId
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
		        		$scope.likegoodslength=data.result.result.list
		        	}
		        },
		        error: function(data){
		            alert(data.errMsg);
		        }
			})
	}
	$scope.searchOrder=function(){
		$scope.orderstate0=0;
		$scope.orderstate1=0;
		$scope.orderstate2=0;
		$scope.orderstate3=0;
		$scope.orderstate4=0;
		$.ajax({
				url: 'http://usrapp.tuozhen.com/application-usrapp/user_shopOrder/selectShopOrder.tz',
		        type: 'post',
		        dataType: 'json',
		       	async:false,
		       	data:{
				   	// usrUserId:localStorage.usrUserId
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
		        		$scope.shoporderList=data.result.result.list;
		        		console.log($scope.shoporderList[0].state)
		        		$($scope.shoporderList).each(function(index){
		        			if($scope.shoporderList[index].state==0){
								$scope.orderstate0++;
							}else if($scope.shoporderList[index].state==1){
								$scope.orderstate1++;
							}else if($scope.shoporderList[index].state==2){
								$scope.orderstate2++;
							}else if($scope.shoporderList[index].state==3){
								$scope.orderstate3++;
							}
							console.log($scope.orderstate0)
		        		})
		        		
		        	}
		        },
		        error: function(data){
		            alert(data.errMsg);
		        }
			})
	}
	$scope.loginin=function(){
		$.ajax({
				url: 'http://usrapp.tuozhen.com/application-usrapp/login/in.tz',
		        type: 'post',
		        dataType: 'json',
		       	async:false,
		       	data:{
				   	uname:$scope.username,
				   	password:$scope.password
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
		        		$scope.personInfo=data.result
		        		console.log($scope.personInfo.usrInfoName)
		        		localStorage.usrUserId=$scope.personInfo.usrUserId;
		        		$scope.tologin=!$scope.tologin;
		        		$scope.haslogin=!$scope.haslogin;
		        		$scope.info();
		        		$scope.likegoods();
		        		$scope.likeshop();
		        		$scope.searchOrder();
		        	}
		        },
		        error: function(data){
		            alert(data.errMsg);
		        }
			})
	}
	if(localStorage.usrUserId){
		$scope.loginin()
	}
	$scope.viewDeatil=function(a,b){
		// if(a==0){
		// 	return false;
		// }
		switch (b){
			case 1:
				localStorage.forPayType=0;
				window.location.href="for-pay.html"
				break;
			case 2:
				localStorage.forPayType=1;
				window.location.href="for-pay.html"
				break;
			case 3:
				localStorage.forPayType=2;
				window.location.href="for-pay.html"
				break;
			case 4:
				localStorage.forPayType=3;
				window.location.href="for-pay.html"
				break;
			case 5:
				localStorage.forPayType=4;
				window.location.href="for-pay.html"
				break;
		}
	}
	window.onload=function(){
		$("#viewmypaylist").tap(function(){
			localStorage.orderDate=JSON.stringify($scope.shoporderList)
			location.href="for-pay.html";
		})
	}
	
	
}])

