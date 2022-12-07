const {server} = require("../app");
const request = require("supertest");
const { sequelize, Food } = require("../models");
const { queryInterface } = sequelize;

jest.setTimeout(1000);

const user_access_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJBbGRvQGdtYWlsLmNvbSIsImlhdCI6MTY2Nzg5OTEyMX0.L0nKY_o84AJgLDR_WY4x2puo7tzrD6gOKQmTAmO_lKA";

describe("Checkout Routes Test", () => {
  describe("POST /checkout - create new resto food", () => {
    test("201 Success added checkout resto", async () => {
      const resAuth = await request(server).post("/signin").send({
        email: "Aldo@gmail.com",
        password: "1234",
      });

      const response = await request(server)
        .post("/checkout")
        .send({
          order: [
            {
              qty: 2,
              FoodId: 2,
              itemPrice: 35000,
            },
            {
              qty: 2,
              FoodId: 1,
              itemPrice: 25000,
            },
          ],
          is_delivery: "Delivery",
          total: 120000,
        })
        .set({ access_token: resAuth.body.access_token });

      const { body, status } = response;
      expect(status).toBe(201);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("message", expect.any(String));
    });

    test("400 Failed create checkout balance less than food price - should return error - Top up first", (done) => {
      request(server)
        .post("/checkout")
        .send({
          order: [
            {
              qty: 3,
              FoodId: 2,
              itemPrice: 35000,
            },
            {
              qty: 2,
              FoodId: 1,
              itemPrice: 25000,
            },
          ],
          is_delivery: "Delivery",
          total: 155000,
        })
        .set({ access_token: user_access_token })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toBeInstanceOf(Object);
          expect(body).toHaveProperty("message", expect.any(String));
          return done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("401 Failed create checkout with invalid token - should return error unauthorized", (done) => {
      request(server)
        .post("/checkout")
        .send({})
        .set("access_token", "ini invalid token")
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Invalid token");
          return done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("GET /checkout - return data order food", () => {
    test("200 Success get all checkout, return array", (done) => {
      request(server)
        .get("/checkout")
        .set({ access_token: user_access_token })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body[0]).toBeInstanceOf(Object);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("401 Failed get order food with invalid token - should return error unauthorized", (done) => {
      request(server)
        .post("/checkout")
        .set("access_token", "ini invalid token")
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Invalid token");
          return done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
