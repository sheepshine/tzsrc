var person=angular.module('person',[])

person.controller('personCtr',['$scope',function($scope){
	$scope.tologin=true;
	$scope.haslogin=false;
	$scope.username=13983604782
	$scope.password=123456
	$scope.loginin=function(){
		$.ajax({
				url: 'http://211.149.150.213:9091/application-usrapp/login/in.tz',
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
		        	}
		        },
		        error: function(data){
		            alert(data.errMsg);
		        }
			})
	}
	
}])

