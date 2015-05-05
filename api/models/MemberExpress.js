/**
* MemberExpress.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

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
      sms: {
        type: 'string',
        required: true
      },
      status: {
        type: 'integer',
        required: false,
        "enum": [0, 1, 2]
      }
    }
};

