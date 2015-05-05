angular.module('express')
.controller('adminCtrl', ['$scope','AdminUser', 'pageSize', '$state', '$modal', function ($scope, AdminUser, pageSize, $state, $modal) {
	
	$scope.adminUsers = []

	$scope.getAdminUsers = function() {
        var skip = $scope.adminUsers.length == 0?0:$scope.adminUsers.length
        AdminUser.get(pageSize, skip, function (status, adminUsers) {
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
                case 200:
                    angular.forEach(adminUsers, function(obj, index){
                    	$scope.adminUsers.push(obj)
                    })
                    if(adminUsers.length == 0){
                        $scope.moreBtnDisabled = true
                        alertify.error('已无更多数据')
                    }
                    break;
            }
        })
    }

    $scope.getAdminUsers()

    $scope.lessAdminUsers = function(){
        $scope.moreBtnDisabled = false
        if($scope.adminUsers.length>10) {
            for (var i = 0; i < 10; i++) {
                $scope.adminUsers.pop($scope.adminUsers[$scope.adminUsers.length - 1])
            }
        }
    }

    $scope.activeAdmin = function(index){
    	AdminUser.active($scope.adminUsers[index].id,function(status,adminUser){
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
                    $scope.adminUsers[index] = adminUser
                    alertify.success('激活成功')
                    break;
            }
    	})
    }

    $scope.getWithUsername = function(keyword){
        AdminUser.getWithUsername(keyword, function(status, adminUsers){
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
                case 200:
                    if (adminUsers.length == 0) {
                        alertify.error('没有相关条件的管理员')
                    }else{
                        $scope.adminUsers = adminUsers
                        $scope.moreBtnDisabled = true
                        alertify.success('查询成功')
                    }
                    break;
            }
        })
    }

    $scope.deleteAdmin = function(index){
    	var modalInstance = $modal.open({
			templateUrl: '/html/adminDeleteModal.html',
			controller: 'adminModalCtrl',
			//size: 'sm',
			resolve: {
				index: function(){
					return index
				},
				adminUsers: function(){
					return $scope.adminUsers
				}		
			}
		})

		modalInstance.result.then(function(obj) {

		}, function() {

		})
    }

    $scope.$watch(function(){
        return $scope.adminUsers.length
    }, function(len){
        $scope.lessBtnDisabled = len<=10
    })

}])