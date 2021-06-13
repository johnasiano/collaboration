'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('notification', {
    userId: {
      type: Sequelize.INTEGER(11),
    },
    user_notify: {
      type: Sequelize.INTEGER(11),
    },
    products_info: {
        type: DataTypes.TEXT('long'),
        get: function () {
            try {
                return JSON.parse(this.getDataValue('products_info'));
            } catch (error) {
                return null;
            }
        },
        set: function (option_value) {
            try {
                this.setDataValue('products_info', JSON.stringify(option_value));
            } catch (error) {
                this.setDataValue('products_info', null);
            }
        },
    },
    supplier_notify: {
      type: Sequelize.INTEGER(11),
    },
    supplier_info: {
        type: DataTypes.TEXT('long'),
        get: function () {
            try {
                return JSON.parse(this.getDataValue('supplier_info'));
            } catch (error) {
                return null;
            }
        },
        set: function (supplier_info) {
            try {
                this.setDataValue('supplier_info', JSON.stringify(supplier_info));
            } catch (error) {
                this.setDataValue('supplier_info', null);
            }
        },
    },
  }, {
    timestamps: false
  });
  Notification.associate = function(models) {
    // Inventory.belongsTo(models.users, {
    //   as: 'user',
    // });
  };
  return Notification;
};