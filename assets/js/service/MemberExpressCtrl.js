angular.module('express')
    .factory('MemberExpress',['ExpressHttp','baseUrl', function(ExpressHttp,baseUrl) {
        var memberExpressUrl = baseUrl+'/memberExpress'
        var service = {

            /**
             * 获取快递信息
             * @param params
             * @param cb
             */
            get: function(limit, skip, cb){
                var url = memberExpressUrl+'?limit='+limit+'&skip='+skip+'&sort=createdAt DESC'
                ExpressHttp.get(url ,cb)
            },

            delete: function(id, cb){
                var url = memberExpressUrl+'/'+id
                ExpressHttp.delete(url, cb)
            },

            update: function(id, options ,cb){
                var url = memberExpressUrl+'/'+id
                ExpressHttp.put(url, options, cb)
            }
        }
        return service;
    }]);