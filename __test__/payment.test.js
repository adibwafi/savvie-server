const {server} = require("../app");
const request = require("supertest");
const { sequelize, Food } = require("../models");
const { queryInterface } = sequelize;

jest.setTimeout(30000);

const user_access_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyZXNjdWVmb29kQGdtYWlsLmNvbSIsImlhdCI6MTY2NzY0OTE1Mn0.Sqkgx312hBggjPziUR-QqYZD4mf8Le70OfR_HEyjhG0";

describe("Payment Routes Test", () => {
  describe("POST /xendit/topup - topup balance through xendit", () => {
    test("200 Success topup balance - should increment balance to wallet", (done) => {
      request(server)
        .post("/xendit/topup")
        .send({
          balance: 50000,
        })
        .set({ access_token: user_access_token })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toBeInstanceOf(Object);
          expect(body).toHaveProperty("code", expect.any(Number));
          expect(body).toHaveProperty("status", expect.any(String));
          expect(body).toHaveProperty("message", expect.any(String));
          expect(body).toHaveProperty("data", expect.any(String));
          return done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("401 Failed topup balance with invalid token - should return error unauthorized", (done) => {
      request(server)
        .post("/xendit/topup")
        .send({
          balance: 50000,
        })
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

  describe("POST /xendit/success - success message after topup", () => {
    test("200 Success message after topup balance", (done) => {
      request(server)
        .post("/xendit/success")
        .send({
          external_id: 2,
          amount: 50000,
          status: "PAID"
        })
        .set({ access_token: user_access_token })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(201);
          expect(body).toBeInstanceOf(Object);
          expect(body).toHaveProperty("message", expect.any(String));
          return done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("401 Failed topup balance with invalid token - should return error unauthorized", (done) => {
      request(server)
        .post("/midtrans/topup")
        .send({
          balance: 50000,
        })
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

  describe("POST /midtrans/topup - topup balance through midtrans", () => {
    test("201 Success topup balance - should return transaction token and increment balance to wallet", (done) => {
      request(server)
        .post("/midtrans/topup")
        .send({
          balance: 50000,
        })
        .set({ access_token: user_access_token })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(201);
          expect(body).toBeInstanceOf(Object);
          expect(body).toHaveProperty("transactionToken", expect.any(String));
          return done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("401 Failed topup balance with invalid token - should return error unauthorized", (done) => {
      request(server)
        .post("/midtrans/topup")
        .send({
          balance: 50000,
        })
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
