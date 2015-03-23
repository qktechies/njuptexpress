// Generated by CoffeeScript 1.8.0
(function() {
  var bcrypt;

  bcrypt = require('bcrypt');

  module.exports = {
    attributes: {
      username: {
        type: 'string',
        required: true
      },
      mobile: {
        type: 'string',
        required: true,
        unique: true
      },
      password: {
        type: 'string',
        required: true
      },
      address: {
        type: 'string',
        required: true
      },
      avatar: {
        type: 'string',
        required: false
      },
      toJSON: function() {
        var obj;
        obj = this.toObject();
        delete obj.password;
        delete obj.updatedAt;
        return obj;
      }
    },
    beforeCreate: function(adminUser, cb) {
      return bcrypt.hash(adminUser.password, 10, function(err, hash) {
        if (err) {
          return cb(err);
        }
        adminUser.password = hash;
        return cb(null, adminUser);
      });
    },
    beforeUpdate: function(adminUser, cb) {
      if (adminUser.password != null) {
        return bcrypt.hash(adminUser.password, 10, function(err, hash) {
          if (err) {
            return cb(err);
          }
          adminUser.password = hash;
          return cb(null, adminUser);
        });
      } else {
        return cb(null, adminUser);
      }
    }
  };

}).call(this);