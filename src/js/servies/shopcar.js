var shopcar=angular.module('shopcar',[])

shopcar.controller('shopcarCtr',['$scope',function($scope){
	$scope.totalPrice=0;

	$scope.shopInfo=[];
	$scope.shopOrderProduct=[];
	$.ajax({
			url: 'http://usrapp.tuozhen.com:26000/application-usrapp/user_shopCart/queryShopCart.tz',
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
	        		$scope.itemdata=data.result.result.list
	        		$($scope.itemdata).each(function(index){
	        			$scope.totalPrice+=($($scope.itemdata)[index].mallprice)*($($scope.itemdata)[index].number);
	        			var obj={"shopInfoId":($scope.itemdata)[index].shopInfoId}
	        			$scope.shopInfo.push(obj)
	        			var obj2={"shopProductId":($scope.itemdata)[index].shopProductId,"number":($scope.itemdata)[index].number,"shopInfoId":($scope.itemdata)[index].shopInfoId,"shopCartId":($scope.itemdata)[index].id}
	        			$scope.shopOrderProduct.push(obj2)
	        		})
	        		console.log($scope.shopOrderProduct)
	        		//$scope.shopdata=data.result.result.shopInfo
	        	}
	        },
	        error: function(data){
	            alert(data.errMsg);
	        }
		})
	$scope.editCtr=true;
	$scope.editCtr2=false;
	$scope.editTil="编辑"
	$scope.shopCarEdit=function(){
		if($scope.editCtr){
			$scope.editCtr=false;
			$scope.editCtr2=true;
			$(".selectBtn").show();
			$scope.editTil="完成"
		}else{
			$scope.editCtr=true;
			$scope.editCtr2=false;
			$(".selectBtn").hide();
			$scope.editTil="编辑"
		}
		
	}
	$scope.payMoney=function(){
		var payDa={"shopInfo":$scope.shopInfo,"shopOrderProduct":$scope.shopOrderProduct}
		//var payDa={"orderInfo":$scope.shopInfo,"shopOrderProduct":$scope.shopOrderProduct}
		console.log(payDa)
		localStorage.shopcarDate=JSON.stringify($scope.itemdata);
		localStorage.payMoney=JSON.stringify(payDa)
		location.href="order_confirm.html"
	}
	$scope.viewDEATIL=function(produceid){
		localStorage.productId=produceid;
		window.location.href="good_item.html"
	}
	var selectArr=[];
	var delectArr=[];
	var isAll=false;
	$scope.selectAll=function(){
		if(isAll){
			for(var i=0;i<$scope.itemdata.length;i++){
				$(".selectBtn").css({"background":"#fff","border":"1px solid #CDCDCD"})
				delectArr=[]
				selectArr=[]
				isAll=false
			}
		}else{
			$(".selectBtn").css({"background":"#f00","border":"0.2rem solid #CDCDCD","box-sizing":"border-box"})
			selectArr=[]
			delectArr=[]
			for(var i=0;i<$scope.itemdata.length;i++){
				selectArr.push(i)
			}
			for(var i=0;i<$scope.itemdata.length;i++){
				delectArr.push($scope.itemdata[i].id)
			}
			isAll=true
		}
		console.log(delectArr)
		
	}
	$scope.selectDel=function(obj,objId){
		console.log(obj)
		//$(".selectBtn").eq(obj.$index).css({"background":"#f00","border":"0.2rem solid #CDCDCD","box-sizing":"border-box"})
		if(selectArr.indexOf(obj.$index)==-1){
			selectArr.push(obj.$index)
		}else{
			selectArr.remove(obj.$index)
		}
		if(delectArr.indexOf(objId)==-1){
			delectArr.push(objId)
		}else{
			delectArr.remove(objId)
		}
		for(var i=0;i<$scope.itemdata.length;i++){
			$(".selectBtn").css({"background":"#fff","border":"1px solid #CDCDCD"})
		}
		for(var i=0;i<selectArr.length;i++){
			$(".selectBtn").eq(selectArr[i]).css({"background":"#f00","border":"0.2rem solid #CDCDCD","box-sizing":"border-box"})
		}
		
	}
	$scope.delectItem=function(){
		for(var i=0;i<delectArr.length;i++){
			$.ajax({
				url: 'http://usrapp.tuozhen.com:26000/application-usrapp/user_shopCart/deleteShopCart.tz',
		        type: 'post',
		        dataType: 'json',
		       	async:false,
		       	data:{
				   	id:delectArr[i],
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
		        		
		        	}
		        },
		        error: function(data){
		            alert(data.errMsg);
		        }
			})
		}
		alert("删除成功");
		$scope.editCtr=true;
		$scope.editCtr2=false;
		$(".selectBtn").hide();
		$scope.editTil="编辑"
		$.ajax({
			url: 'http://usrapp.tuozhen.com:26000/application-usrapp/user_shopCart/queryShopCart.tz',
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
	        		$scope.itemdata=data.result.result.list
	        		$($scope.itemdata).each(function(index){
	        			$scope.totalPrice+=($($scope.itemdata)[index].mallprice)*($($scope.itemdata)[index].number);
	        			var obj={"shopInfoId":($scope.itemdata)[index].shopInfoId}
	        			$scope.shopInfo.push(obj)
	        			var obj2={"shopProductId":($scope.itemdata)[index].shopProductId,"number":($scope.itemdata)[index].number,"shopInfoId":($scope.itemdata)[index].shopInfoId,"shopCartId":($scope.itemdata)[index].id}
	        			$scope.shopOrderProduct.push(obj2)
	        		})
	        		console.log($scope.shopOrderProduct)
	        		//$scope.shopdata=data.result.result.shopInfo
	        	}
	        },
	        error: function(data){
	            alert(data.errMsg);
	        }
		})
	}
	Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };
}])

