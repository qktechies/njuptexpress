angular.module('express').controller('userModalCtrl', ['$scope', '$modalInstance', 'User', '$state', 'selectedUser', function ($scope, $modalInstance, User, $state, selectedUser) {

	$scope.userActions = [{
		value: 'delete',
		msg: '删除用户'
	},{
		value: 'modify',
		msg: '修改用户'
	}]

	$scope.selectedUser = angular.copy(selectedUser)

	$scope.ok = function () {
		if ($scope.defaultUserAction == $scope.userActions[0].value) {
			//删除
			User.delete($scope.selectedUser.id, function(status,user){
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
	                	alertify.error('用户不存在')
	                    break
	                case 200:
	                    alertify.success('删除成功')
	                    break
            	}
				$modalInstance.close({
					action: 'delete',
					user: user
				});
			})
		}else{
			//修改
			console.log('modify',$scope.selectedUser)

			User.update($scope.selectedUser.id, {
				username:$scope.selectedUser.username,
				mobile:$scope.selectedUser.mobile,
				address:$scope.selectedUser.address
			}, function(status, user){
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
	                	alertify.error('用户不存在')
	                    break
	                case 200:
	                    alertify.success('修改成功')
	                    break
            	}
				$modalInstance.close({
					action: 'modify',
					user: user
				});
			})
		}
	};

	$scope.cancel = function () {
		$modalInstance.dismiss();
	};
}]);