angular.module('express')
.directive('resize', function ($timeout, $window) {
    return function (scope, element, attrs) {
        var setHeight = function(){
        	element.css('height',($window.innerHeight-210)+'px')
        }

        setHeight()

        $timeout(function(){
        	setHeight()
        })

        angular.element($window).on('resize',setHeight)


    }
})