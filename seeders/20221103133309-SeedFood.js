"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const dataFood = require("../data/foods.json");
    dataFood.food.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
      el.newPrice = el.price - (el.discount/100 * el.price)
    });

    await queryInterface.bulkInsert("Food", dataFood.food, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Food", null);
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
