const {server} = require("../app");
const request = require("supertest");
const { sequelize, Food } = require("../models");
const { queryInterface } = sequelize;

jest.setTimeout(1000);

const user_access_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyZXNjdWVmb29kQGdtYWlsLmNvbSIsImlhdCI6MTY2NzY0OTE1Mn0.Sqkgx312hBggjPziUR-QqYZD4mf8Le70OfR_HEyjhG0";

describe("Search Routes Test", () => {
    describe("GET /search - return data food matches by name", () => {
        test("200 Success get all foods data, return array", (done) => {
        request(server)
            .get("/search?=ayam")
            .set({ access_token: user_access_token })
            .then((response) => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body[0]).toBeInstanceOf(Object);
            expect(body[0].Food).toBeInstanceOf(Array);
            done();
            })
            .catch((err) => {
            done(err);
            });
        });
    });
});
