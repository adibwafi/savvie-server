"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Food", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      rate: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      imageUrl: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      status: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      sales: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      discount: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      newPrice: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      is_active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      CategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      RestaurantId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Restaurants",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
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
    await queryInterface.dropTable("Food");
  },
};
