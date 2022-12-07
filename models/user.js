"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
const { hashPass } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Restaurant);
      User.hasMany(models.Favourite);
      User.hasMany(models.Basket);
      User.hasMany(models.Payment);
      User.hasOne(models.Balance);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Email is required",
          },
          notEmpty: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Invalid email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password is required",
          },
          notEmpty: {
            msg: "Password is required",
          },
          len: {
            args: [5],
            msg: "Password length min 5",
          },
        },
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "FullName is required",
          },
          notEmpty: {
            msg: "FullName is required",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "PhoneNumber is required",
          },
          notEmpty: {
            msg: "PhoneNumber is required",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
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
      imageUrl: {
        type: DataTypes.STRING,
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
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((el) => {
    el.password = hashPass(el.password);
    el.imageUrl = "https://api.lorem.space/image/movie?w=150&h=220";
  });
  return User;
};
