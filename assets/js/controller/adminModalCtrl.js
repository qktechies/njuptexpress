angular.module('express')
.controller('adminModalCtrl', ['$scope', '$modalInstance', 'AdminUser', 'index', 'adminUsers', function ($scope, $modalInstance, AdminUser, index, adminUsers) {


	$scope.deleteAdminUser = adminUsers[index]

	$scope.ok = function () {
		AdminUser.delete(adminUsers[index].id, function(status, cb){
			switch (status) {
                case 0:
                    alertify.error('连接服务器超时')
                    break;
                case 500:
                    alertify.error('服务器内部错误')
                    break;
                case 401:
                    alertify.error('用户尚未登录')
                    $state.go('login')
                    break
                case 404:
               		adminUsers.splice(index,1)
                	alertify.error('用户不存在')
                	break;
                case 200:
                	adminUsers.splice(index,1)
                	alertify.success('删除成功')
                    break;
            }
            $modalInstance.dismiss()
		})
	};

	$scope.cancel = function () {
		$modalInstance.dismiss();
	};
}]);