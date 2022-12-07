const {server} = require("../app");
const request = require("supertest");
const { sequelize, Restaurants } = require("../models");
const { queryInterface } = sequelize;

jest.setTimeout(1000);

const dataRestaurant = require("../data/restaurants.json");
let restaurants = dataRestaurant.restaurants.map((el) => {
    el.createdAt = el.updatedAt = new Date();
    return el;
});

const user_access_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyZXNjdWVmb29kQGdtYWlsLmNvbSIsImlhdCI6MTY2NzY0OTE1Mn0.Sqkgx312hBggjPziUR-QqYZD4mf8Le70OfR_HEyjhG0";

describe("Restaurants Routes Test", () => {
    describe("GET /restaurants - return data all restaurants", () => {
        test("200 Success get all restaurants data, return array", (done) => {
        request(server)
            .get("/restaurants")
            // .set({access_token: user_access_token})
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(200);
                expect(body[0]).toBeInstanceOf(Object);
                expect(body[0].User).toBeInstanceOf(Object);
                expect(body[0].CategoryRestos).toBeInstanceOf(Array);
                expect(body[0].Food).toBeInstanceOf(Array);
                done();
            })
            .catch((err) => {
                done(err);
            });
        });
    });

    describe("GET /restaurants/search - return restaurants by radius 1500m", () => {
        test("200 Success get restaurants by radius 1500m, return array", (done) => {
        request(server)
            .get("/restaurants/search")
            // .set({access_token: user_access_token})
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(200);
                expect(body).toBeInstanceOf(Array);
                done();
            })
            .catch((err) => {
                done(err);
            });
        });
    });

    describe("GET /restaurants/:id - return data restaurants by Id", () => {
        test("200 Success get one restaurants data, return object", (done) => {
        request(server)
            .get("/restaurants/2")
            // .set({access_token: user_access_token})
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(200);
                expect(body).toBeInstanceOf(Object);
                expect(body).toHaveProperty("id", expect.any(Number));
                expect(body.User).toBeInstanceOf(Object);
                expect(body.CategoryRestos).toBeInstanceOf(Array);
                expect(body.Food).toBeInstanceOf(Array);
                done();
            })
            .catch((err) => {
                done(err);
            });
        });

        test("404 Failed get one restaurant data - data not found, return error", (done) => {
            request(server)
                .get("/restaurants/1000")
                // .set({access_token: user_access_token})
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
    });
