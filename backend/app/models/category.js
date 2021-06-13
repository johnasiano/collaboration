'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    text: {
        type: Sequelize.STRING(255)
    },
    parentID: {
        type: Sequelize.INTEGER(11)
    },
    level: {
        type: Sequelize.INTEGER(11)
    },
    children: {
        type: Sequelize.STRING(255)
    }
  }, {
    timestamps: false
  });
  Category.associate = function (models) {
    // associations can be defined here
  };
  return Category;
};