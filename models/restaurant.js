"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    static associate(models) {
      Restaurant.hasMany(models.CategoryResto);
      Restaurant.hasMany(models.Food);
      Restaurant.belongsTo(models.User);
    }
  }
  Restaurant.init(
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
      description: {
        type: DataTypes.STRING,
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
      logoUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "LogoUrl is required",
          },
          notEmpty: {
            msg: "LogoUrl is required",
          },
        },
      },
      income: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Income is required",
          },
          notEmpty: {
            msg: "Income is required",
          },
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Type is required",
          },
          notEmpty: {
            msg: "Type is required",
          },
        },
      },
      is_open: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Is_Open is required",
          },
          notEmpty: {
            msg: "Is_Open is required",
          },
        },
      },
      open_time: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Open_Time is required",
          },
          notEmpty: {
            msg: "Open_Time is required",
          },
        },
      },
      close_time: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Close_Time is required",
          },
          notEmpty: {
            msg: "Close_Time is required",
          },
        },
      },
      is_pickup: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Is_Pickup is required",
          },
          notEmpty: {
            msg: "Is_Pickup is required",
          },
        },
      },
      is_delivery: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Is_Delivery is required",
          },
          notEmpty: {
            msg: "Is_Delivery is required",
          },
        },
      },
      review_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Review_Count is required",
          },
          notEmpty: {
            msg: "Review_Count is required",
          },
        },
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Address is required",
          },
          notEmpty: {
            msg: "Address is required",
          },
        },
      },
      location: {
        type: DataTypes.GEOMETRY("POINT"),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Location is required",
          },
          notNull: {
            msg: "Location is required",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Restaurant",
    }
  );
  return Restaurant;
};
