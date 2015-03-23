/**
 * Created by qkong on 15/3/21.
 */
angular.module('express')
.factory('ExpressHttp',['$http', function($http){

    return {
        get: function(url,cb){
            $http.get(url)
                .success(function(data, status, headers, config) {
                    return cb(status,data)
                })
                .error(function(data, status, headers, config) {
                    return cb(status)
                })
        },

        post: function(url, options, cb){
            $http.post(url,options).
                success(function(data, status, headers, config) {
                    return cb(status,data)
                }).
                error(function(data, status, headers, config) {
                    return cb(status)
                })
        },

        put: function(url, options, cb){
            $http.put(url,options).
                success(function(data, status, headers, config) {
                    return cb(status,data)
                }).
                error(function(data, status, headers, config) {
                    return cb(status)
                })
        },

        delete: function(url,cb){
            $http.delete(url).
                success(function(data, status, headers, config) {
                    return cb(status,data)
                }).
                error(function(data, status, headers, config) {
                    return cb(status)
                })
        }
    }
}])