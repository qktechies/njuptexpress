module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req.session.authenticated && req.session.username == req.param("username")) {
    return next();
  }

  if (req.session.isAdmin) {
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  //return res.json({status:false,error:'请登录,没有权限'})
  return res.Unauthorized();
};
