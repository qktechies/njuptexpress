// Generated by CoffeeScript 1.8.0
(function() {
  module.exports = {
    attributes: {
      username: {
        type: 'string',
        required: true
      },
      mobile: {
        type: 'string',
        required: true
      },
      address: {
        type: 'string',
        required: true
      },
      company: {
        type: 'string',
        required: true,
        "enum": sails.config.myconfig.companyList
      },
      time: {
        type: 'integer',
        required: true
      },
      status: {
        type: 'integer',
        required: false,
        "enum": [0, 1, 2]
      }
    }
  };

}).call(this);
