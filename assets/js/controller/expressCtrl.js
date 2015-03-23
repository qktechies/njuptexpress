angular.module('express')
.controller('expressCtrl', ['$scope', '$rootScope', 'Express','$cookies', '$state', '$timeout','pageSize', function ($scope, $rootScope, Express, $cookies, $state, $timeout,pageSize) {

    $scope.expresses = [];
    $scope.moreBtnDisabled = false

    $scope.getExpresses = function() {
        var skip = $scope.expresses.length == 0?0:$scope.expresses.length
        Express.get(pageSize, skip, function (status, data) {
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
                    var expresses = angular.copy(data)
                    if(data.length == 0){
                        $scope.moreBtnDisabled = true
                        alertify.error('已无更多数据')
                    }
                    angular.forEach(expresses, function (obj, index) {
                        var objCopy = angular.copy(obj)
                        objCopy.checked = false
                        $scope.expresses.push(objCopy)
                    })
                    break;
            }
        })
    }

    //界面加载完加载数据
    $scope.getExpresses()

    $scope.lessExpress = function(){
        $scope.moreBtnDisabled = false
        if($scope.expresses.length>10) {
            for (var i = 0; i < 10; i++) {
                $scope.expresses.pop($scope.expresses[$scope.expresses.length - 1])
            }
        }
    }

    //全选
    $scope.checkAll = function(isCheckAll){
        angular.forEach($scope.expresses,function(obj,index){
            var objCopy = angular.copy(obj)
            objCopy.checked = isCheckAll
            $scope.expresses[index] = objCopy
        })
    }

    //修改状态
    $scope.modifyExpress = function(sumOfModifyExpress){

        var noExpressSelected = true

        for(var index in $scope.expresses){
            if($scope.expresses[index].checked){
                noExpressSelected = false
                break;
            }
        }

        if(noExpressSelected){
           alertify.error('尚未选择快递')
           return
        }

        angular.forEach($scope.expresses,function(obj,index){

            if(obj.checked){
                Express.update(obj.id,{
                    status: $scope.defaultExpressStatus
                },function(status, data){
                    switch (status)
                    {
                        case 0:
                            alertify.error('连接服务器超时')
                            break;
                        case 500:
                            alertify.error('服务器内部错误')
                            break;
                        case 401:
                            alertify.error('用户尚未登录')
                            $state.go('login')
                            break;
                        case 200:
                            data.checked = false

                            alertify.success('编辑成功','success')

                            $scope.expresses[index] = data
                            break;
                    }
                })
            }
        })
    }

    //选中快递个数
    $scope.sumOfModifyExpress = function(){
        var sum = 0
        angular.forEach($scope.expresses, function(obj){
            if(obj.hasOwnProperty("checked")){
                sum+=obj.checked
            }
        })

        return sum
    }

    //全选观察
    $scope.$watch($scope.sumOfModifyExpress, function(sum){
        if(angular.isArray($scope.expresses)) {
            if(sum == 0){
                $scope.isCheckAll = false
            }else {
                $scope.isCheckAll = (sum == $scope.expresses.length)
            }
        }
    })

    $scope.$watch(function(){
        return $scope.expresses.length
    }, function(len){
        $scope.lessBtnDisabled = len<=10
    })

    $scope.expressStatuses= [{
        css:'label-danger',
        status: '取件中',
        val:0
    },{
        css: 'label-warning',
        status: '配送中',
        val:1
    },{
        css: 'label-success',
        status: '完成',
        val:2
    }];

}])