"use strict";
const { hashPass } = require("../helpers/bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const dataUser = require("../data/users.json");
    dataUser.users.forEach((el) => {
      el.password = hashPass(el.password);
      (el.location = Sequelize.fn(
        "ST_GeomFromText",
        `POINT(${el.latitude} ${el.longitude})`
      )),
        (el.createdAt = el.updatedAt = new Date());
      delete el.latitude;
      delete el.longitude;
    });
    await queryInterface.bulkInsert("Users", dataUser.users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null);
  },
};
