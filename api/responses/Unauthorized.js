module.exports = function Unauthorized(data, options) {
	var req = this.req;
  	var res = this.res;
 	var sails = req._sails;
	return res.status(401).end();
}