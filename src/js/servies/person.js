var person=angular.module('person',[])

person.controller('personCtr',['$scope',function($scope){
	$scope.tologin=true;
	$scope.haslogin=false;
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
		        		$scope.tologin=!$scope.tologin;
		        		$scope.haslogin=!$scope.haslogin;
		        		$scope.username=data.result.result.usrUserNickname
		        	}
		        },
		        error: function(data){
		            alert(data.errMsg);
		        }
			})
	}
	
}])

