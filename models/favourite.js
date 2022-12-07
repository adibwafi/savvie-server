"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    static associate(models) {
      Favourite.belongsTo(models.User);
      Favourite.belongsTo(models.Food);
    }
  }
  Favourite.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      FoodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Favourite",
    }
  );
  return Favourite;
};
