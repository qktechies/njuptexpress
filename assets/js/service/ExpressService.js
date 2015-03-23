angular.module('express')
    .factory('Express',['ExpressHttp','baseUrl', function(ExpressHttp,baseUrl) {
        var expressUrl = baseUrl+'/express'
        var service = {

            /**
             * 获取快递信息
             * @param params
             * @param cb
             */
            get: function(limit, skip, cb){
                var url = expressUrl+'?limit='+limit+'&skip='+skip+'&sort=createdAt DESC'
                ExpressHttp.get(url ,cb)
            },

            post: function(username, password, cb){
                ExpressHttp.post(expressUrl,{
                    username: username,
                    password: password
                }, cb)
            },

            delete: function(id, cb){
                var url = expressUrl+'/'+id
                ExpressHttp.delete(url, cb)
            },

            update: function(id, options ,cb){
                var url = expressUrl+'/'+id
                ExpressHttp.put(url, options, cb)
            }
        }
        return service;
    }]);