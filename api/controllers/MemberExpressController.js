/**
 * MemberExpressController
 *
 * @description :: Server-side logic for managing Memberexpresses
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	save: function(req, res){
		var username = req.body.username
		var sms = req.body.sms
		if(!sms)
			return res.json({
					status: false,
					msg: '缺少参数sms'
				})
		async.waterfall([
		  function(cb){
		  	User.findOne({
		  		username: username
		  	}).exec(function(err, user){
		  		if(err)
		  			return cb('服务器内部错误')
		  		if(!user)
		  			return cb('用户不存在')
		  		cb(null, user)
		  	})
		  },
		  function(user, cb){
		  	MemberExpress.create({
		  		username: user.username,
		  		mobile: user.mobile,
		  		address: user.address,
		  		sms: sms,
		  		status: 0
		  	}).exec(function(err, memberExpress){
		  		if(err)
		  			return cb('服务器内部错误')
		  		cb(null)
		  	})
		  }
		], function (err) {
			if(err)
				return res.json({
					status: false,
					msg: err
				})
			res.json({status:true})
		});

	}
};

