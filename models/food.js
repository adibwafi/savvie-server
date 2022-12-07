"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    static associate(models) {
      Food.belongsTo(models.Category);
      Food.belongsTo(models.Restaurant);
      Food.hasMany(models.Favourite);
      Food.hasMany(models.Basket);
      Food.hasMany(models.OrderItem);
    }
  }
  Food.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required",
          },
          notEmpty: {
            msg: "Name is required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price is required",
          },
          notEmpty: {
            msg: "Price is required",
          },
        },
      },
      rate: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Rate is required",
          },
          notEmpty: {
            msg: "Rate is required",
          },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "ImageUrl is required",
          },
          notEmpty: {
            msg: "ImageUrl is required",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description is required",
          },
          notEmpty: {
            msg: "Description is required",
          },
        },
      },
      status: {
        type: DataTypes.TEXT,
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
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Quantity is required",
          },
          notEmpty: {
            msg: "Quantity is required",
          },
        },
      },
      sales: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Sales is required",
          },
          notEmpty: {
            msg: "Sales is required",
          },
        },
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Discount is required",
          },
          notEmpty: {
            msg: "Discount is required",
          },
        },
      },
      newPrice: {
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      RestaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Food",
    }
  );
  Food.beforeCreate((el) => {
    el.newPrice = el.price - (el.discount / 100) * el.price;
  });
  return Food;
};
