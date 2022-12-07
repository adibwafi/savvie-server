"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.User);
      Payment.hasMany(models.OrderItem);
    }
  }
  Payment.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      deliveryFee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "DeliveryFee is required",
          },
          notEmpty: {
            msg: "DeliveryFee is required",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Status is required",
          },
          notEmpty: {
            msg: "Status is required",
          },
        },
      },
      paymentCode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Payment Code is required",
          },
          notEmpty: {
            msg: "Payment Code is required",
          },
        },
      },
      is_delivery: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: {
            msg: "is_delivery is required",
          },
          notEmpty: {
            msg: "is_delivery is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
