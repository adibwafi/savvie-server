const {server} = require("../app");
const request = require("supertest");
const { sequelize, Food  } = require("../models");
const { queryInterface } = sequelize;

jest.setTimeout(1000);

const user_access_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyZXNjdWVmb29kQGdtYWlsLmNvbSIsImlhdCI6MTY2NzY0OTE1Mn0.Sqkgx312hBggjPziUR-QqYZD4mf8Le70OfR_HEyjhG0";

describe("Food Routes Test", () => {
    describe("GET /food - return data all foods", () => {
        test("200 Success get all foods data, return array", (done) => {
        request(server)
            .get("/food")
            .set({access_token: user_access_token})
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(200);
                expect(body[0]).toBeInstanceOf(Object);
                expect(body[0].Category).toBeInstanceOf(Object);
                expect(body[0].Restaurant).toBeInstanceOf(Object);
                done();
            })
            .catch((err) => {
                done(err);
            });
        });
    });

    describe("GET /food/:id - return data food by Id", () => {
        test("200 Success get one food data, return object", (done) => {
        request(server)
            .get("/food/26")
            .set({access_token: user_access_token})
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(200);
                expect(body).toBeInstanceOf(Object);
                expect(body).toHaveProperty("id", expect.any(Number));
                expect(body.Category).toBeInstanceOf(Object);
                expect(body.Restaurant).toBeInstanceOf(Object);
                done();
            })
            .catch((err) => {
                done(err);
            });
        });

        test("404 Failed get one food data, return error", (done) => {
            request(server)
                .get("/food/1000")
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


    });
