"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Baskets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      FoodId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Food",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      comition: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 10
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Baskets");
  },
};
