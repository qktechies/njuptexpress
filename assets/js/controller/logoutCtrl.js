angular.module('express')
.controller('logoutCtrl', ['$scope', '$rootScope', 'AdminUser', '$state','$cookies', function ($scope, $rootScope, AdminUser, $state, $cookies) {
	$scope.logout = function(){
        AdminUser.logout($cookies.username,function(status){
            $state.go('login')
            delete $cookies["adminUsername"]
            delete $cookies["adminUserId"]
            delete $cookies["sails.sid"]
            alertify.success('登出成功')
		})
	}
}])