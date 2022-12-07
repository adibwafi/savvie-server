"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CategoryResto extends Model {
    static associate(models) {
      CategoryResto.belongsTo(models.Category);
    }
  }
  CategoryResto.init(
    {
      RestaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CategoryResto",
    }
  );
  return CategoryResto;
};
