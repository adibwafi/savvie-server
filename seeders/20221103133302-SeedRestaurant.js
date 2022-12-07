"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const dataRestaurant = require("../data/restaurants.json");
    dataRestaurant.restaurants.forEach((el) => {
      (el.location = Sequelize.fn(
        "ST_GeomFromText",
        `POINT(${el.latitude} ${el.longitude})`
      )),
        (el.createdAt = el.updatedAt = new Date());
      delete el.latitude;
      delete el.longitude;
    });

    await queryInterface.bulkInsert(
      "Restaurants",
      dataRestaurant.restaurants,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Restaurants", null);
  },
};
