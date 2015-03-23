angular.module('express')
.factory('User',['baseUrl', 'ExpressHttp', function(baseUrl, ExpressHttp) { 
  var userUrl = baseUrl+'/user' 
  var service = { 
    
    /**
     * 获取用户
     * @param  {integer}   limit 每页大小
     * @param  {integer}   skip  忽略个数
     * @param  {Function} cb    回调
     * @return {[type]}         [description]
     */
    get: function(limit, skip, cb){
      var url = userUrl+'?limit='+limit+'&skip='+skip+'&sort=createdAt DESC'
      ExpressHttp.get(url,cb)
    },

    /**
     * 关键字搜索
     * @param  {String}   keyword 关键字
     * @param  {Function} cb      [description]
     * @return {[type]}           [description]
     */
    getWithKeyword: function(keyword, cb){
      var url = userUrl+'?where={%22or%22:[{%22username%22:{%22contains%22:%22'+keyword+'%22}},{%22address%22:{%22contains%22:%22'+keyword+'%22}},{%22mobile%22:{%22contains%22:%22'+keyword+'%22}}]}'
      console.log('url-->',url);
      ExpressHttp.get(url,cb)
    },


    /**
     * 新增用户
     * @param  {String}   username 用户名
     * @param  {String}   password 密码
     * @param  {Function} cb       回调
     * @return {[type]}            [description]
     */
    post: function(username, password, cb){
      $http.post(adminUserUrl,{
        username: username,
        password: password
      }).
      success(function(data, status, headers, config) {
        cb(status,data)
      }).
      error(function(data, status, headers, config) {
        cb(status)
      })
    },

    /**
     * 删除用户
     * @param  {String}   id 用户唯一id
     * @param  {Function} cb 回调
     * @return {[type]}      [description]
     */
    delete: function(id, cb){
      var url = userUrl+'/'+id
      ExpressHttp.delete(url,cb)
    },

    /**
     * 更新用户内容
     * @param  {Sting}   id      用户id
     * @param  {Object}   options 更新参数
     * @param  {Function} cb      回调
     * @return {[type]}           [description]
     */
    update: function(id, options ,cb){
      var url = userUrl+'/'+id
      console.log('url-->',url);
      ExpressHttp.put(url,options,cb)
    } 
  }
  return service;
}]);