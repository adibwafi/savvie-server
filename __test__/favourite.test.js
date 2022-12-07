require("dotenv").config();
const {server} = require("../app");
const request = require("supertest");
const { sequelize, Favourite, User, Food } = require("../models");
const { queryInterface } = sequelize;
const { createSign, verifyToken } = require("../helpers/jwt");
const { hashPass } = require("../helpers/bcrypt");

jest.setTimeout(30000);

const user_access_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyZXNjdWVmb29kQGdtYWlsLmNvbSIsImlhdCI6MTY2NzY0OTE1Mn0.Sqkgx312hBggjPziUR-QqYZD4mf8Le70OfR_HEyjhG0";

describe("Favourite Routes Test", () => {
  describe("POST /favorites - create new favourite", () => {
    test("201 Success added favourite - should create new favourite", async () => {
      const resAuth = await request(server).post("/signin").send({
        email: "Aldo@gmail.com",
        password: "1234",
      });

      const response = await request(server)
        .post("/favorites/1")
        .set({ access_token: resAuth.body.access_token });

      const { body, status } = response;
      expect(status).toBe(201);
      expect(body).toHaveProperty("message", expect.any(String));
    });

    test("401 Failed added favourite with invalid token - should return error unauthorized", (done) => {
      request(server)
        .post("/favorites/2")
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

  describe("GET /favorites - return data all favourites", () => {
    test("200 Success get all favourites, return array", async () => {
      const resAuth = await request(server).post("/signin").send({
        email: "Aldo@gmail.com",
        password: "1234",
      });

      const response = await request(server)
        .get("/favorites")
        .set({ access_token: resAuth.body.access_token })
        
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body[0]).toHaveProperty("id", expect.any(Number));
          expect(body[0]).toHaveProperty("UserId", expect.any(Number));
          expect(body[0]).toHaveProperty("FoodId", expect.any(Number));
          expect(body[0].User).toBeInstanceOf(Object);
          expect(body[0].Food).toBeInstanceOf(Object);
    });

    test("401 Failed get favourite with invalid token - should return error unauthorized", (done) => {
      request(server)
        .get("/favorites")
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

  describe("DELETE /favorites/:id - delete favourite by id", () => {
    test("200 Success deleted favourite", async () => {
        const resAuth = await request(server).post("/signin").send({
            email: "Aldo@gmail.com",
            password: "1234",
          });
          const response = await request(server)
        .delete("/favorites/1")
        .set({ access_token: resAuth.body.access_token })
        
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty("message", expect.any(String));

    });

    test("404 Failed delete favourite data - favourite not found, return error", (done) => {
      request(server)
        .delete("/favorites/100")
        .set({ access_token: user_access_token })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(404);
          expect(body).toHaveProperty("message", "Id or data not found");
          return done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("401 Failed delete favourite data - access token invalid, return error", (done) => {
      request(server)
        .delete("/favorites/1")
        .set({ access_token: "akses token salah" })
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
