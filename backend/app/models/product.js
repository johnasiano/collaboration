'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('products', {
    name: {
      type: Sequelize.STRING(255),
    },
    description: {
      type: Sequelize.STRING()
    },
    supplier: {
      type: Sequelize.STRING(255),
    },
    supplier_code: {
      type: Sequelize.STRING(255),
    },
    categoryId: {
      type: Sequelize.INTEGER(11),
    },    
  }, {
    timestamps: false
  });
  Product.associate = function(models) {

    // Product.belongsTo(models.category, {
    //   as: 'user',
    // });

  };
  return Product;
};