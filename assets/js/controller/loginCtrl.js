angular.module('express')
.controller('loginCtrl', ['$scope', '$rootScope', 'AdminUser','$cookies', '$state', function ($scope, $rootScope, AdminUser, $cookies, $state) {

	$scope.login = function(adminUser){
        AdminUser.login(adminUser.username,adminUser.password, $scope.imageId, adminUser.securityCode, function(status,adminUser){
			switch (status)
			{
            case 0:
                $scope.errMsg = '连接服务器超时'
            break;
			case 404:
				$scope.errMsg = '用户不存在'
			break;
            case 403:
                $scope.errMsg = '用户尚未激活'
            break;
			case 500:
				$scope.errMsg = '服务器内部错误'
			break;
			case 401:
				$scope.errMsg = '密码错误'
			break;
			case 409:
				$scope.errMsg = '验证码错误或者过期'
			break;
			case 200:
				$scope.errMsg = null
                $cookies.adminUsername = adminUser.adminUsername
                $cookies.adminUserId = adminUser.id
                alertify.success('登录成功')
                $state.go('express')
			break;
			}
		})	
	};


	$scope.generateSecurityCode = function(){
		AdminUser.getSecurityCode(270,100,0, function(status, data){
			if (data) {
				$scope.imageId = data.id
				$scope.imageData = data.buf	
			}
		})
	}

	$scope.generateSecurityCode()
}])