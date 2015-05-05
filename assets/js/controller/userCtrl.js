angular.module('express')
.controller('userCtrl', ['$scope', 'User', 'pageSize', '$state', '$modal', function($scope, User, pageSize, $state, $modal) {

	$scope.users = []

	$scope.getUsers = function() {
		var skip = $scope.users.length == 0 ? 0 : $scope.users.length
		User.get(pageSize, skip, function(status, users) {
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
					
					angular.forEach(users, function(obj, index){
						$scope.users.push(obj)
					})

					if (users.length == 0) {
						$scope.moreBtnDisabled = true
						alertify.error('已无更多数据')
					}
					break;
			}
		})
	}

	$scope.getUsers()

	$scope.$watch(function(){
        return $scope.users.length
    }, function(len){
    	$scope.lessBtnDisabled = len<=10
    })

    $scope.lessUsers = function(){
    	$scope.moreBtnDisabled = false
        if($scope.users.length>10) {
            for (var i = 0; i < 10; i++) {
                $scope.users.pop($scope.users[$scope.users.length - 1])
            }
        }
    }

	$scope.editUser = function(index) {

		var modalInstance = $modal.open({
			templateUrl: '/html/userModal.html',
			controller: 'userModalCtrl',
			//size: 'sm',
			resolve: {
				selectedUser: function() {
					return $scope.users[index]
				}
			}
		})

		modalInstance.result.then(function(obj) {

			if(obj.action == 'delete'){
				//删除
				if(obj.user){
					$scope.users.splice(index,1)
				}
			}else{
				//修改
				if(obj.user){
					$scope.users[index] = obj.user
				}
			}
		}, function() {

		})
	}

	$scope.getUsersWithKeyWord = function(keyWord){
		User.getWithKeyword(keyWord, function(status, users) {
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
					if (users.length == 0) {
						alertify.error('没有相关条件的用户')
					}else{
						$scope.users = users
						$scope.moreBtnDisabled = true
						alertify.success('查询成功')
					}
					break;
			}
		})
	}
}])