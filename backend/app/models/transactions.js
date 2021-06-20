'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define('transactions', {
    userId: {
      type: Sequelize.INTEGER(11),
    },
    type: {
      type: Sequelize.STRING(255),
    },
    price: {
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
    },
    date: {
      type: Sequelize.DATE()
    },
    email: {
      type: Sequelize.INTEGER(11),
    },
    paymentId: {
      type: Sequelize.STRING(255),
    }  
  }, {
    timestamps: false
  });
  Transactions.associate = function(models) {
    // SocialLogin.belongsTo(models.users, {
    //   as: 'user',
    // });
  };
  return Transactions;
};