const {server} = require("../app");
const request = require("supertest");
const { sequelize, Category  } = require("../models");
const { queryInterface } = sequelize;

jest.setTimeout(1000);

let dataCategory = require("../data/categories.json");
let categories = dataCategory.categories.map((el) => {
    el.createdAt = el.updatedAt = new Date();
    return el;
});


const user_access_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyZXNjdWVmb29kQGdtYWlsLmNvbSIsImlhdCI6MTY2NzY0OTE1Mn0.Sqkgx312hBggjPziUR-QqYZD4mf8Le70OfR_HEyjhG0";

describe("Category Routes Test", () => {
    describe("GET /categories - return data all categories", () => {
        test("200 Success get all categories data, return array", (done) => {
        request(server)
            .get("/categories")
            .set({access_token: user_access_token})
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(200);
                expect(body[0]).toBeInstanceOf(Object);
                expect(body[0]).toHaveProperty("id", expect.any(Number));
                expect(body[0]).toHaveProperty("name", expect.any(String));
                expect(body[0]).toHaveProperty("imageUrl", expect.any(String));
                expect(body[0].CategoryRestos).toBeInstanceOf(Array);
                done();
            })
            .catch((err) => {
                done(err);
            });
        });
    });

    describe("GET /categories/:id - return data categories by Id", () => {
        test("200 Success get one categories data, return object", (done) => {
        request(server)
            .get("/categories/2")
            .set({access_token: user_access_token})
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(200);
                expect(body).toBeInstanceOf(Object);
                expect(body).toHaveProperty("id", expect.any(Number));
                expect(body).toHaveProperty("name", expect.any(String));
                expect(body).toHaveProperty("imageUrl", expect.any(String));
                expect(body.CategoryRestos).toBeInstanceOf(Array);
                done();
            })
            .catch((err) => {
                done(err);
            });
        });

        test("404 Failed get one categories data, return error", (done) => {
            request(server)
                .get("/categories/100")
                .set({access_token: user_access_token})
                .then((response) => {
                    const { body, status } = response;
                    expect(status).toBe(404);
                    expect(body).toHaveProperty("message", "Id or data not found");
                    done();
                })
                .catch((err) => {
                    done(err);
                });
            });
        });
    })
