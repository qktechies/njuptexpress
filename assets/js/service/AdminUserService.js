angular.module('express')
.factory('AdminUser',['ExpressHttp','baseUrl', function(ExpressHttp,baseUrl) {
    var adminUserUrl = baseUrl+'/adminUser'
    var service = {

        /**
         * 获取验证码
         * @param  {integer}   width  宽度
         * @param  {integer}   height 高度
         * @param  {integer}   offset 便宜
         * @param  {Function} cb     [description]
         * @return {[type]}          [description]
         */
        getSecurityCode: function(width, height, offset, cb){
            var url = baseUrl + '/SecurityCode?width='+width+'&height='+height+'&offset='+offset
            ExpressHttp.get(url, cb)
        },

        /**
         * 注册
         * @param  {String}   adminUsername  用户名
         * @param  {String}   password       密码
         * @param  {String}   securityId     验证码id
         * @param  {String}   securityAnswer 验证码答案
         * @param  {Function} cb             [description]
         * @return {[type]}                  [description]
         */
        regist: function(adminUsername, password , securityId, securityAnswer,cb){
            var url = adminUserUrl+"/regist"
            ExpressHttp.post(url,{
                adminUsername: adminUsername,
                password: password,
                securityId: securityId,
                securityAnswer: securityAnswer
            },cb)
        },

        /**
         * 登录
         * @param  {String}   AdminUsername 用户名
         * @param  {String}   password 密码
         * @param  {Function} cb       回调
         * status  400参数错误
         *         500服务器内部错误
         *         403用户尚未激活
         *         404用户不存在
         *         401密码错误
         */
        login: function(adminUsername, password , securityId, securityAnswer,cb){
            var url = adminUserUrl+"/login"
            ExpressHttp.post(url,{
                adminUsername: adminUsername,
                password: password,
                securityId: securityId,
                securityAnswer: securityAnswer
            },cb)
        },

        /**
         * 登出
         * @param  {String}   adminUsername 用户名
         * @param  {Function} cb            [description]
         * @return {[type]}                 [description]
         */
        logout: function(adminUsername, cb){
            var url = adminUserUrl+"/logout"
            ExpressHttp.post(url,{
                username: adminUsername
            },cb)
        },

        /**
         * 获取用户信息
         * @param  {String}   adminUsername 用户名
         * @param  {Function} cb       回调
         * @return {[type]}            [description]
         */
        get: function(limit, skip, cb){
            var url = adminUserUrl+'?limit='+limit+'&skip='+skip+'&sort=createdAt DESC'
            ExpressHttp.get(url ,cb)
        },

        getWithUsername: function(username, cb){
            var url = adminUserUrl+'?where={"adminUsername":{"contains":"qkong"}}'
            ExpressHttp.get(url ,cb)
        },


        /**
         * 新增用户
         * @param  {String}   username 用户名
         * @param  {String}   password 密码
         * @param  {Function} cb       回调
         * @return {[type]}            [description]
         */
        post: function(username, password, cb){
            ExpressHttp.post(adminUserUrl,{
                username: username,
                password: password
            }, cb)
        },

        delete: function(id, cb){
            var url = adminUserUrl+'/'+id
            ExpressHttp.delete(url, cb)
        },

        update: function(id, options ,cb){
            var url = adminUserUrl+'/'+id
            ExpressHttp.put(url,options, cb)
        },

        active: function(id, cb){
            this.update(id, {
                active: true
            }, cb)
        }
    }
    return service;
}]);