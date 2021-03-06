// Generated by CoffeeScript 1.8.0
(function() {
  var base64, ccap;

  ccap = require('ccap');

  base64 = require('base64-js');

  module.exports = {
    getOneSecurity: function(req, res) {
      var ary, buf, height, offset, txt, width;
      width = req.param('width');
      height = req.param('height');
      offset = req.param('offset');
      if (width == null) {
        return res.status(400).send('缺少必要参数width');
      }
      if (height == null) {
        return res.status(400).send('缺少必要参数height');
      }
      if (offset == null) {
        return res.status(400).send('缺少必要参数offset');
      }
      ary = ccap(width, height, offset).get();
      txt = ary[0];
      buf = ary[1];
      return SecurityCode.create({
        content: txt
      }).exec(function(err, code) {
        if (err) {
          return next(err);
        }
        return res.json({
          id: code.id,
          buf: base64.fromByteArray(buf)
        });
      });
    }
  };

}).call(this);
