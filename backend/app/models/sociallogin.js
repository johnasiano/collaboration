'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const SocialLogin = sequelize.define('sociallogin', {
    userId: {
      type: Sequelize.INTEGER(11),
    },
    email: {
      type: Sequelize.STRING(255),
    },
    type: {
      type: Sequelize.STRING(255),
    },
    content: {
      type: DataTypes.TEXT('long'),
      get: function () {
          try {
              return JSON.parse(this.getDataValue('content'));
          } catch (error) {
              return null;
          }
      },
      set: function (option_value) {
          try {
              this.setDataValue('content', JSON.stringify(option_value));
          } catch (error) {
              this.setDataValue('content', null);
          }
      },
    }  
  }, {
    timestamps: false
  });
  SocialLogin.associate = function(models) {
    // SocialLogin.belongsTo(models.users, {
    //   as: 'user',
    // });
  };
  return SocialLogin;
};