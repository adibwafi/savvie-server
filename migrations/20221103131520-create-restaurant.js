"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Restaurants", {
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
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      rate: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      logoUrl: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      income: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      is_open: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      open_time: {
        allowNull: false,
        type: Sequelize.TIME,
      },
      close_time: {
        allowNull: false,
        type: Sequelize.TIME,
      },
      is_pickup: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      is_delivery: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      review_count: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      address: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      location: {
        type: Sequelize.GEOMETRY("POINT"),
        allowNull: false,
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
    await queryInterface.dropTable("Restaurants");
  },
};
