'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const StockOut = sequelize.define('stockout', {
    userId: {
      type: Sequelize.INTEGER(11),
    },
    productId: {
      type: Sequelize.INTEGER(11),
    },
    qty_to_remove: {
      type: Sequelize.INTEGER(11),
    },
    out_date: {
      type: Sequelize.STRING(),
    }
  }, {
    timestamps: false
  });
  StockOut.associate = function(models) {
    // Inventory.belongsTo(models.users, {
    //   as: 'user',
    // });
  };
  return StockOut;
};