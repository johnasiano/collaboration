'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    name: {
      type: Sequelize.STRING(255)
    },
    email: {
      type: Sequelize.STRING(255)
    },
    password: {
      type: Sequelize.STRING(255)
    },
    role: {
      type: Sequelize.STRING(255)
    },
    social_type: {
      type: Sequelize.STRING(255)
    },
    last_login: Sequelize.STRING(255),    
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};