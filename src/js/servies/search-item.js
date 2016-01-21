var searchItem=angular.module('searchItem',[])

searchItem.controller('searchItemCtr',['$scope',function($scope){
	if(localStorage.searchData||localStorage.searchValue){
		$scope.searchitemdata=JSON.parse(localStorage.searchData);
		$scope.searchValue=localStorage.searchValue;
		localStorage.removeItem("searchData");
		localStorage.removeItem("searchValue");
	}
	$scope.maintitle="全部分类"
	$scope.maintile2="综合排序"
	$scope.list1=false;
	$scope.list2=false;
	$scope.isActive=false;
	$scope.viewclass=function(){
		$scope.list1=!$scope.list1;
		$scope.searchClassAjax()
		$scope.rankshow=false;
	}
	$scope.viewclass2=function(){
		$scope.list2=!$scope.list2;
		$scope.isActive=true;
	}
	$scope.selectClass=function(odata,oname){
		$scope.isActive2=true;
		$.ajax({
			url: 'http://211.149.150.213:9090/application-shopapp/productInfo/queryProductInfo.tz',
	        type: 'post',
	        dataType: 'json',
	       	async:false,
	       	data:{
			   	title:$scope.searchValue,
			   	shopItemClassIdSub:odata
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
	        		$scope.searchitemdata=data.result.result.list
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
		$scope.maintitle=oname
	}
	$scope.selectClass2=function(odata,oname){
		$scope.isActive2=true;
		if(odata==0){
			salesvolume=""
			score=""
		}else if(odata==1){
			salesvolume=1
			score=""
		}else if(odata==2){
			salesvolume=""
			score=1
		}
		$.ajax({
			url: 'http://211.149.150.213:9090/application-shopapp/productInfo/queryProductInfo.tz',
	        type: 'post',
	        dataType: 'json',
	       	async:false,
	       	data:{
			   	salesvolume:salesvolume,
			   	score:score
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
	        		$scope.searchitemdata=data.result.result.list
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
		$scope.maintile2=oname
	}
	$scope.rankClass=function(){
		$scope.rankshow=!$scope.rankshow;
		$scope.list1=false;

	}
	$scope.filterShow=function(){
		$scope.filterShowCtr=!$scope.filterShowCtr
	}
	$scope.showChiliList=function(){
		$scope.showChiliListShowCtr=!$scope.showChiliListShowCtr
	}
	$scope.showChiliListClass=function(){
		$scope.filterClassCtr=!$scope.filterClassCtr
	}
	// $("#searchInput").keyup(function(){
	// 	if(!$("#searchInput").val()){
	// 		return false;
	// 	}
	// 	var firistValue=$("#searchInput").val();
	// 	setTimeout(function(){
	// 		if($("#searchInput").val()==firistValue){
	// 			searchAjax($("#searchInput").val())
	// 		}
	// 	},2000)
	// })
	$scope.tuozhenSellDis=false;
	$scope.postfreeDis=false;
	$scope.tuozhenSell=function(){
		$scope.tuozhenSellDis=!$scope.tuozhenSellDis
	}
	$scope.postfree=function(){
		$scope.postfreeDis=!$scope.postfreeDis
	}
	$scope.noresout=false;
	$scope.searchAjax=function(searchData){
		localStorage
		$.ajax({
			url: 'http://211.149.150.213:9090/application-shopapp/productInfo/queryProductInfo.tz',
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
	        		$scope.searchitemdata=data.result.result.list
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
	if(localStorage.autoSearch){
		$.ajax({
			url: 'http://211.149.150.213:9090/application-shopapp/productInfo/queryProductInfo.tz',
	        type: 'post',
	        dataType: 'json',
	       	async:false,
	       	data:{
			   	title:localStorage.searchValue
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
	        		$scope.searchitemdata=data.result.result.list
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
		localStorage.autoSearch=false;
	}
	$scope.finditem=function(id){
		$.ajax({
				url: 'http://211.149.150.213:9090/application-shopapp/productItem/selectProductItem.tz',
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
		        	$scope.itemList2=data.result.pageResultList.result
		        	$scope.list2=true;
		        },
		        error: function(data){
		            alert(data);
		        }
			})
	}
	$scope.searchClassAjax=function(searchData){
		$.ajax({
			url: 'http://211.149.150.213:9090/application-shopapp/productItem/selectProductItem.tz',
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
	        		$scope.searchClassNav=data.result.pageResultList.result
	        		console.log($scope.searchClassNav)
	        	}
	        },
	        error: function(data){
	            alert(data.errMsg);
	        }
		})
	}
	$scope.viewDeatil=function(id){
		localStorage.productId=id;
		localStorage.searchData=JSON.stringify($scope.searchitemdata);
		localStorage.searchValue=$scope.searchValue;
		location.href="good_item.html";
	}
	$scope.addShopCar=function(proId,shopId){
		if(!localStorage.usrUserId){
			alert("请先登录");
			location.href="../../personal.html"
		}
		$.ajax({
			url: 'http://211.149.150.213:9091/application-usrapp/user_shopCart/addShopCart.tz',
	        type: 'post',
	        dataType: 'json',
	       	async:false,
	       	data:{
			   	usrUserId:localStorage.usrUserId,
			   	number:1,
			   	shopProductId:proId,
			   	shopInfoId:shopId
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
	        		alert("加入购物车成功")
	        		$scope.shopcarNum++;
	        	}
	        },
	        error: function(data){
	            alert(data.errMsg);
	        }
		})
	}
	$scope.shopCarInfo=function(){
		$.ajax({
			url: 'http://211.149.150.213:9091/application-usrapp/user_shopCart/queryShopCart.tz',
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
	        		$scope.shopcarNum=data.result.result.list.length;
	        		
	        		//$scope.shopdata=data.result.result.shopInfo
	        	}
	        },
	        error: function(data){
	            alert(data.errMsg);
	        }
		})
	}
	$scope.shopCarInfo();
	$("#shopCar").show();
	$("#shopCar").tap(function(){
		if(!localStorage.usrUserId){
			alert("请先登录");
			location.href="../../personal.html"
		}else{
			location.href="shopcar.html"
		}
	})
}])

