"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("OrderItems", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      PaymentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Payments",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      itemPrice: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      comition: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("OrderItems");
  },
};
