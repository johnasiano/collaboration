'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const StockIn = sequelize.define('stockin', {
    userId: {
      type: Sequelize.INTEGER(11),
    },
    productId: {
      type: Sequelize.INTEGER(11),
    },
    qty_to_add: {
      type: Sequelize.INTEGER(11),
    },
    cost: {
      type: Sequelize.INTEGER(11),
    },
    purchase_date: {
      type: Sequelize.STRING(),
    }
  }, {
    timestamps: false
  });
  StockIn.associate = function(models) {
    // Inventory.belongsTo(models.users, {
    //   as: 'user',
    // });
  };
  return StockIn;
};