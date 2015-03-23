angular.module('express')
.controller('registCtrl', ['$scope', 'AdminUser','$cookies', '$state', function ($scope, AdminUser, $cookies, $state) {

	$scope.userinFrom = {
		'adminUsername': '',
		'password':'',
		'passwordConfirm':''
	}

	$scope.generateSecurityCode = function(){
		AdminUser.getSecurityCode(270,100,0, function(status, data){
			if (data) {
				$scope.imageId = data.id
				$scope.imageData = data.buf	
			}
		})
	}

	$scope.generateSecurityCode()

	$scope.registAdminUser = function(userinFrom){
		AdminUser.regist(userinFrom.username,
			userinFrom.password,
			$scope.imageId,
			userinFrom.securityCode, function(status, data){
				if(data.status){
					alertify.success('注册成功,等待管理员审核')
					$state.go('login')
				}else{
					alertify.error(data.msg)
				}
			})
	}



	$scope.passwordConfirmBlur = function(){
		$scope.pwdCheckBlur = $scope.userinFrom.password != $scope.userinFrom.passwordConfirm
	}

	$scope.$watchGroup(['userinFrom.passwordConfirm','userinFrom.password'], function(newVal){
		$scope.pwdError =  $scope.userinFrom.password != $scope.userinFrom.passwordConfirm
	})
}])