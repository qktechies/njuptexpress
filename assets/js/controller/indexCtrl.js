angular.module('express')
.controller('indexCtrl', ['$scope','$cookies','$rootScope', function ($scope,$cookies,$rootScope) {
    $scope.adminUser = {};
    $scope.$watch(function(){ return $cookies.adminUsername}, function(newVal){
        $scope.adminUser.adminUsername = newVal
    })
}])