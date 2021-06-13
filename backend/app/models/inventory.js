'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define('inventory', {
    userId: {
      type: Sequelize.INTEGER(11),
    },
    productId: {
      type: Sequelize.INTEGER(11),
    },
    qty: {
      type: Sequelize.INTEGER(11),
    },
    cost: {
      type: Sequelize.INTEGER(11),
    }  
  }, {
    timestamps: false
  });
  Inventory.associate = function(models) {
    // Inventory.belongsTo(models.users, {
    //   as: 'user',
    // });
  };
  return Inventory;
};