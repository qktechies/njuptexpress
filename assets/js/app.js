var expressApp = angular.module('express',['ui.router','ui.bootstrap','ngCookies'])

expressApp.constant('baseUrl',"http://127.0.0.1:1337")
expressApp.constant('pageSize',10)

expressApp.config(['$stateProvider',
                   '$urlRouterProvider',
                   '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {
    //跨域调用设置
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $urlRouterProvider.otherwise("/login");

    $stateProvider
    .state("login", {
        url: "/login",
        templateUrl: "/html/login.html",
        controller: "loginCtrl"
    })
    .state("regist",{
        url: "/regist",
        templateUrl: "/html/regist.html",
        controller: "registCtrl"
    })
    .state("admin", {
        url: "/admin",
        templateUrl: "/html/admin.html",
        controller: "adminCtrl"
    })
    .state("user", {
        url:"/user",
        templateUrl: "/html/user.html",
        controller: "userCtrl"
    })
    .state("express", {
        url:"/express",
        templateUrl: "/html/express.html",
        controller: "expressCtrl"
    })
    .state("memberExpress", {
        url:"/memberExpress",
        templateUrl: "/html/memberExpress.html",
        controller: "memberExpressCtrl"
    })
}])


