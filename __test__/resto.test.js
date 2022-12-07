const {server} = require("../app");
const request = require("supertest");
const { sequelize, Food } = require("../models");
const { queryInterface } = sequelize;

jest.setTimeout(1000);

const user_access_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyZXNjdWVmb29kQGdtYWlsLmNvbSIsImlhdCI6MTY2NzY0OTE1Mn0.Sqkgx312hBggjPziUR-QqYZD4mf8Le70OfR_HEyjhG0";

describe("Resto Routes Test", () => {
    describe("GET /resto/order - return data orders", () => {
        test("200 Success get all orders data, return array", (done) => {
        request(server)
            .get("/resto/order")
            .set({ access_token: user_access_token })
            .then((response) => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("UserId", expect.any(Number));
            expect(body).toHaveProperty("name", expect.any(String));
            done();
            })
            .catch((err) => {
            done(err);
            });
        });

        test("401 Failed get foods with invalid token - should return error unauthorized", (done) => {
        request(server)
            .get("/resto/order")
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

    describe("GET /resto/order/food - return order by restaurant id", () => {
        test("200 Success get food orders by restaurant id, return array", (done) => {
        request(server)
            .get("/resto/order/food")
            .set({ access_token: user_access_token })
            .then((response) => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body).toBeInstanceOf(Object);
            expect(body.order).toBeInstanceOf(Array);
            expect(body.resto).toBeInstanceOf(Object);
            done();
            })
            .catch((err) => {
            done(err);
            });
        });

        test("401 Failed get food orders by restaurant id with invalid token - should return error unauthorized", (done) => {
        request(server)
            .get("/resto/order/food")
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

    describe("GET /resto/food - return data all foods", () => {
        test("200 Success get all foods data, return array", (done) => {
        request(server)
            .get("/resto/food")
            .set({ access_token: user_access_token })
            .then((response) => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body[0]).toBeInstanceOf(Object);
            expect(body[0]).toHaveProperty("name", expect.any(String));
            expect(body[0]).toHaveProperty("price", expect.any(Number));
            expect(body[0]).toHaveProperty("rate", expect.any(Number));
            expect(body.length).toBeGreaterThan(0);
            done();
            })
            .catch((err) => {
            done(err);
            });
        });

        test("401 Failed get foods with invalid token - should return error unauthorized", (done) => {
        request(server)
            .get("/resto/food")
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

    describe("GET /resto/food/:id - return data one food", () => {
        test("200 Success get one food data, return object", (done) => {
        request(server)
            .get("/resto/food/9")
            .set({ access_token: user_access_token })
            .then((response) => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("name", expect.any(String));
            expect(body).toHaveProperty("price", expect.any(Number));
            expect(body).toHaveProperty("rate", expect.any(Number));
            expect(body).toHaveProperty("imageUrl", expect.any(String));
            done();
            })
            .catch((err) => {
            done(err);
            });
        });

        test("403 Failed get one food - return error forbidden", (done) => {
            request(server)
                .get("/resto/food/25")
                .set({ access_token: user_access_token })
                .then((response) => {
                const { body, status } = response;
                expect(status).toBe(403);
                expect(body).toHaveProperty("message", expect.any(String));
                done();
                })
                .catch((err) => {
                done(err);
                });
            });

        test("404 Failed get one food data, return error", (done) => {
        request(server)
            .get("/resto/food/1000")
            .set({ access_token: user_access_token })
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

        test("401 Failed get one food with invalid token - should return error unauthorized", (done) => {
        request(server)
            .get("/resto/food/9")
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

    describe("GET /resto/food/filter/:id - return data filtered foods", () => {
        test("200 Success get filetered food data, return object", (done) => {
        request(server)
            .get("/resto/food/filter/9")
            .set({ access_token: user_access_token })
            .then((response) => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body).toBeInstanceOf(Array);
            expect(body[0]).toHaveProperty("name", expect.any(String));
            expect(body[0]).toHaveProperty("price", expect.any(Number));
            expect(body[0]).toHaveProperty("rate", expect.any(Number));
            expect(body[0]).toHaveProperty("imageUrl", expect.any(String));
            done();
            })
            .catch((err) => {
            done(err);
            });
        });

        test("401 Failed get filtered food data with invalid token - should return error unauthorized", (done) => {
            request(server)
                .get("/resto/food/filter/9")
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
    
    describe("GET /resto/food/filterDate/:id - return data filtered foods by date", () => {
        test("200 Success get filetered date food data, return object", (done) => {
        request(server)
            .get("/resto/food/filterDate/9")
            .set({ access_token: user_access_token })
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

        test("401 Failed get filtered food data with invalid token - should return Internal Server Error", (done) => {
            request(server)
                .get("/resto/food/filter/9")
                .set("access_token", "ini invalid token")
                .then((response) => {
                const { body, status } = response;
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", expect.any(String));
                return done();
                })
                .catch((err) => {
                done(err);
                });
            });
        
    });

    describe("POST /resto/food - create new resto food", () => {
        test("201 Success added food resto - should create new food resto", (done) => {
        request(server)
            .post("/resto/food")
            .send({
            name: "udang goreng tepung",
            price: 25000,
            rate: 0,
            imageUrl: "https://unsplash.com/photos/HNmcgpzPHag",
            description: "udang goreng terenak setasikmalaya",
            status: "new",
            quantity: 20,
            sales: 1,
            discount: 10,
            CategoryId: 3,
            is_active: true,
            newPrice: 18000,
            })
            .set({ access_token: user_access_token })
            .then((response) => {
            const { body, status } = response;
            expect(status).toBe(201);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("name", expect.any(String));
            expect(body).toHaveProperty("price", expect.any(Number));
            expect(body).toHaveProperty("rate", expect.any(Number));
            expect(body).toHaveProperty("imageUrl", expect.any(String));
            return done();
            })
            .catch((err) => {
            done(err);
            });
        });

        test("400 Failed create food - should return error - Name is required", (done) => {
        request(server)
            .post("/resto/food")
            .send({
            price: 25000,
            rate: 0,
            imageUrl: "https://unsplash.com/photos/HNmcgpzPHag",
            description: "udang goreng terenak setasikmalaya",
            status: "new",
            quantity: 20,
            sales: 1,
            discount: 10,
            CategoryId: 3,
            is_active: true,
            newPrice: 18000,
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

        test("400 Failed create food - should return error - Price is required", (done) => {
        request(server)
            .post("/resto/food")
            .send({
            name: "udang goreng tepung",
            rate: 0,
            imageUrl: "https://unsplash.com/photos/HNmcgpzPHag",
            description: "udang goreng terenak setasikmalaya",
            status: "new",
            quantity: 20,
            sales: 1,
            discount: 10,
            CategoryId: 3,
            is_active: true,
            newPrice: 18000,
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

        test("400 Failed create food - should return error - ImageUrl is required", (done) => {
        request(server)
            .post("/resto/food")
            .send({
            name: "udang goreng tepung",
            price: 25000,
            rate: 0,
            description: "udang goreng terenak setasikmalaya",
            status: "new",
            quantity: 20,
            sales: 1,
            discount: 10,
            CategoryId: 3,
            is_active: true,
            newPrice: 18000,
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

        test("400 Failed create food - should return error - Description is required", (done) => {
        request(server)
            .post("/resto/food")
            .send({
            name: "udang goreng tepung",
            price: 25000,
            rate: 0,
            imageUrl: "https://unsplash.com/photos/HNmcgpzPHag",
            status: "new",
            quantity: 20,
            sales: 1,
            discount: 10,
            CategoryId: 3,
            is_active: true,
            newPrice: 18000,
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

        test("400 Failed create food - should return error - Description is required", (done) => {
        request(server)
            .post("/resto/food")
            .send({
            name: "udang goreng tepung",
            rate: 0,
            imageUrl: "https://unsplash.com/photos/HNmcgpzPHag",
            status: "new",
            quantity: 20,
            sales: 1,
            discount: 10,
            CategoryId: 3,
            is_active: true,
            newPrice: 18000,
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

        test("400 Failed create food - should return error - Quantity is required", (done) => {
        request(server)
            .post("/resto/food")
            .send({
            name: "udang goreng tepung",
            rate: 0,
            imageUrl: "https://unsplash.com/photos/HNmcgpzPHag",
            description: "udang goreng terenak setasikmalaya",
            status: "new",
            sales: 1,
            discount: 10,
            CategoryId: 3,
            is_active: true,
            newPrice: 18000,
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

        test("400 Failed create food - should return error - CategoryId is required", (done) => {
        request(server)
            .post("/resto/food")
            .send({
            name: "udang goreng tepung",
            rate: 0,
            imageUrl: "https://unsplash.com/photos/HNmcgpzPHag",
            description: "udang goreng terenak setasikmalaya",
            status: "new",
            sales: 1,
            discount: 10,
            is_active: true,
            newPrice: 18000,
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

        test("401 Failed create food with invalid token - should return error unauthorized", (done) => {
        request(server)
            .post("/resto/food")
            .send({
            name: "udang goreng tepung",
            price: "25000",
            rate: 0,
            imageUrl: "https://unsplash.com/photos/HNmcgpzPHag",
            description: "udang goreng terenak setasikmalaya",
            quantity: 20,
            sales: 1,
            discount: 0,
            CategoryId: 3,
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

    describe("DELETE /resto/food/:id - delete food resto by id", () => {
        test("200 Success deleted food", (done) => {
        request(server)
            .delete("/resto/food/1")
            .set({ access_token: user_access_token })
            .then((response) => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body).toHaveProperty("message", expect.any(String));
            return done();
            })
            .catch((err) => {
            done(err);
            });
        });

        test("403 Failed delete food - return error forbidden", (done) => {
        request(server)
            .delete("/resto/food/25")
            .set({ access_token: user_access_token })
            .then((response) => {
            const { body, status } = response;
            expect(status).toBe(403);
            expect(body).toHaveProperty("message", expect.any(String));
            done();
            })
            .catch((err) => {
            done(err);
            });
        });

        test("404 Failed delete food - food not found, return error", (done) => {
        request(server)
            .delete("/resto/food/1000")
            .set({ access_token: user_access_token })
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

        test("401 Failed create food with invalid token - should return error unauthorized", (done) => {
        request(server)
            .delete("/resto/food/100")
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

    describe("PUT /resto/food/:id - edit food resto by id", () => {
        test("200 Success edit food resto", (done) => {
        request(server)
            .put("/resto/food/10")
            .send({
            name: "Edit food test",
            price: "500000",
            rate: 5,
            imageUrl: "https://unsplash.com/photos/HNmcgpzPHag",
            description: "udang goreng terenak setasikmalaya",
            quantity: 20,
            sales: 1,
            discount: 30,
            CategoryId: 3,
            })
            .set("access_token", user_access_token)
            .then((response) => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body).toHaveProperty("message", expect.any(String));
            done();
            })
            .catch((err) => {
            done(err);
            });
        });

        test("404 Failed edit food - food not found, return error", (done) => {
        request(server)
            .put("/resto/food/1000")
            .send({
            name: "Edit food test",
            price: "500000",
            rate: 5,
            imageUrl: "https://unsplash.com/photos/HNmcgpzPHag",
            description: "udang goreng terenak setasikmalaya",
            quantity: 20,
            sales: 1,
            discount: 30,
            CategoryId: 3,
            })
            .set({ access_token: user_access_token })
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

        test("401 Failed edit food with invalid token - should return error unauthorized", (done) => {
        request(server)
            .put("/resto/food/100")
            .send({
            name: "Edit food test",
            price: "500000",
            rate: 5,
            imageUrl: "https://unsplash.com/photos/HNmcgpzPHag",
            description: "udang goreng terenak setasikmalaya",
            quantity: 20,
            sales: 1,
            discount: 30,
            CategoryId: 3,
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

        test("403 Failed edit one food - return error forbidden", (done) => {
            request(server)
                .put("/resto/food/25")
                .send({
                    name: "Edit food test",
                    price: "500000",
                    rate: 5,
                    imageUrl: "https://unsplash.com/photos/HNmcgpzPHag",
                    description: "udang goreng terenak setasikmalaya",
                    quantity: 20,
                    sales: 1,
                    discount: 30,
                    CategoryId: 3,
                    })
                .set({ access_token: user_access_token })
                .then((response) => {
                const { body, status } = response;
                expect(status).toBe(403);
                expect(body).toHaveProperty("message", expect.any(String));
                done();
                })
                .catch((err) => {
                done(err);
                });
            });
    });

    describe("PATCH /resto/food/food-status/:id - edit food status", () => {
        test("200 success edit food status", (done) => {
        request(server)
            .patch("/resto/food/food-status/6")
            .send({ status: "popular" })
            .set("access_token", user_access_token)
            .then((response) => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body).toHaveProperty("message", expect.any(String));
            done();
            })
            .catch((err) => {
            done(err);
            });
        });

        test("404 Failed edit food - food not found, return error", (done) => {
        request(server)
            .patch("/resto/food/food-status/1000")
            .send({ status: "popular" })
            .set({ access_token: user_access_token })
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

        test("401 Failed edit food - invalid token - should return error unauthorized", (done) => {
        request(server)
            .patch("/resto/food/food-status/6")
            .send({ status: "popular" })
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

        test("403 Failed edit food - return error forbidden", (done) => {
            request(server)
                .patch("/resto/food/food-status/25")
                .send({ status: "popular" })
                .set({ access_token: user_access_token })
                .then((response) => {
                const { body, status } = response;
                expect(status).toBe(403);
                expect(body).toHaveProperty("message", expect.any(String));
                done();
                })
                .catch((err) => {
                done(err);
                });
            });
    });

    describe("PATCH /resto/food/food-active/:id - edit food to inactive", () => {
        test("200 success edit food to inactive", (done) => {
        request(server)
            .patch("/resto/food/food-active/6")
            .send({ is_active: false })
            .set("access_token", user_access_token)
            .then((response) => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body).toHaveProperty("message", expect.any(String));
            done();
            })
            .catch((err) => {
            done(err);
            });
        });

        test("404 Failed edit food - food not found, return error", (done) => {
        request(server)
            .patch("/resto/food/food-active/1000")
            .send({ is_active: false })
            .set({ access_token: user_access_token })
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

        test("401 Failed edit food - invalid token - should return error unauthorized", (done) => {
        request(server)
            .patch("/resto/food/food-active/6")
            .send({ is_active: false })
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

        test("403 Failed edit food - return error forbidden", (done) => {
            request(server)
                .patch("/resto/food/food-active/25")
                .send({ is_active: false })
                .set({ access_token: user_access_token })
                .then((response) => {
                const { body, status } = response;
                expect(status).toBe(403);
                expect(body).toHaveProperty("message", expect.any(String));
                done();
                })
                .catch((err) => {
                done(err);
                });
            });
    });

    describe("POST /resto/restaurants - create new restaurant", () => {
        test("201 Success added restaurant - should create new food resto", (done) => {
        request(server)
            .post("/resto/restaurants")
            .send({
            name: "Omnikopi",
            logoUrl: "https://tinyurl.com/2z6wfxv6",
            description:
                "Airy coffee spot with a white interior & Wi-Fi turning out gourmet blends & elevated light bites.",
            type: "Coffee shop",
            open_time: "08:00",
            close_time: "22:00",
            address:
                "Jl. Bintaro Tengah No.25, Rengas, Ciputat Timur, South Tangerang City, Banten 15412",
            latitude: 0,
            longitude: 0,
            })
            .set({ access_token: user_access_token })
            .then((response) => {
            const { body, status } = response;
            expect(status).toBe(201);
            expect(body).toBeInstanceOf(Object);
            expect(body.restaurant).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(String));
            expect(body.restaurant).toHaveProperty("name", expect.any(String));
            return done();
            })
            .catch((err) => {
            done(err);
            });
        });

        test("400 Failed added restaurant - should return error - Name is required", (done) => {
        request(server)
            .post("/resto/restaurants")
            .send({
            logoUrl: "https://tinyurl.com/2z6wfxv6",
            description:
                "Airy coffee spot with a white interior & Wi-Fi turning out gourmet blends & elevated light bites.",
            type: "Coffee shop",
            open_time: "08:00",
            close_time: "22:00",
            address:
                "Jl. Bintaro Tengah No.25, Rengas, Ciputat Timur, South Tangerang City, Banten 15412",
            latitude: 0,
            longitude: 0,
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

        test("400 Failed added restaurant - should return error - LogoUrl is required", (done) => {
        request(server)
            .post("/resto/restaurants")
            .send({
            name: "Omnikopi",
            description:
                "Airy coffee spot with a white interior & Wi-Fi turning out gourmet blends & elevated light bites.",
            type: "Coffee shop",
            open_time: "08:00",
            close_time: "22:00",
            address:
                "Jl. Bintaro Tengah No.25, Rengas, Ciputat Timur, South Tangerang City, Banten 15412",
            latitude: 0,
            longitude: 0,
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

        test("400 Failed added restaurant - should return error - description is required", (done) => {
        request(server)
            .post("/resto/restaurants")
            .send({
            name: "Omnikopi",
            logoUrl: "https://tinyurl.com/2z6wfxv6",
            type: "Coffee shop",
            open_time: "08:00",
            close_time: "22:00",
            address:
                "Jl. Bintaro Tengah No.25, Rengas, Ciputat Timur, South Tangerang City, Banten 15412",
            latitude: 0,
            longitude: 0,
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

        test("400 Failed added restaurant - should return error - type is required", (done) => {
        request(server)
            .post("/resto/restaurants")
            .send({
            name: "Omnikopi",
            logoUrl: "https://tinyurl.com/2z6wfxv6",
            description:
                "Airy coffee spot with a white interior & Wi-Fi turning out gourmet blends & elevated light bites.",
            open_time: "08:00",
            close_time: "22:00",
            address:
                "Jl. Bintaro Tengah No.25, Rengas, Ciputat Timur, South Tangerang City, Banten 15412",
            latitude: 0,
            longitude: 0,
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

        test("400 Failed added restaurant - should return error - Open_Time is required", (done) => {
        request(server)
            .post("/resto/restaurants")
            .send({
            name: "Omnikopi",
            logoUrl: "https://tinyurl.com/2z6wfxv6",
            description:
                "Airy coffee spot with a white interior & Wi-Fi turning out gourmet blends & elevated light bites.",
            type: "Coffee shop",
            close_time: "22:00",
            address:
                "Jl. Bintaro Tengah No.25, Rengas, Ciputat Timur, South Tangerang City, Banten 15412",
            latitude: 0,
            longitude: 0,
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

        test("400 Failed added restaurant - should return error - Close_Time is required", (done) => {
        request(server)
            .post("/resto/restaurants")
            .send({
            name: "Omnikopi",
            logoUrl: "https://tinyurl.com/2z6wfxv6",
            description:
                "Airy coffee spot with a white interior & Wi-Fi turning out gourmet blends & elevated light bites.",
            type: "Coffee shop",
            open_time: "08:00",
            address:
                "Jl. Bintaro Tengah No.25, Rengas, Ciputat Timur, South Tangerang City, Banten 15412",
            latitude: 0,
            longitude: 0,
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

        test("400 Failed added restaurant - should return error - address is required", (done) => {
        request(server)
            .post("/resto/restaurants")
            .send({
            name: "Omnikopi",
            logoUrl: "https://tinyurl.com/2z6wfxv6",
            description:
                "Airy coffee spot with a white interior & Wi-Fi turning out gourmet blends & elevated light bites.",
            type: "Coffee shop",
            open_time: "08:00",
            close_time: "22:00",
            latitude: 0,
            longitude: 0,
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

        test("400 Failed added restaurant - should return error - Internal server error", (done) => {
        request(server)
            .post("/resto/restaurants")
            .send({
            name: "Omnikopi",
            logoUrl: "https://tinyurl.com/2z6wfxv6",
            description:
                "Airy coffee spot with a white interior & Wi-Fi turning out gourmet blends & elevated light bites.",
            type: "Coffee shop",
            open_time: "08:00",
            close_time: "22:00",
            address:
                "Jl. Bintaro Tengah No.25, Rengas, Ciputat Timur, South Tangerang City, Banten 15412",
            longitude: 0,
            })
            .set({ access_token: user_access_token })
            .then((response) => {
            const { body, status } = response;
            expect(status).toBe(500);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(String));
            return done();
            })
            .catch((err) => {
            done(err);
            });
        });

        test("401 Failed create restaurant with invalid token - should return error unauthorized", (done) => {
        request(server)
            .post("/resto/restaurants")
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

    describe("GET /resto/restaurants - return restaurants based on userId", () => {
        test("200 Success get restaurant data, return object", (done) => {
        request(server)
            .get("/resto/restaurants")
            .set({ access_token: user_access_token })
            .then((response) => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("name", expect.any(String));
            expect(body).toHaveProperty("description", expect.any(String));
            expect(body).toHaveProperty("logoUrl", expect.any(String));
            done();
            })
            .catch((err) => {
            done(err);
            });
        });

        test("401 Failed get restaurant data - invalid token - should return error unauthorized", (done) => {
        request(server)
            .get("/resto/restaurants")
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

    describe("PUT /resto/restaurants - edit restaurant data", () => {
        test("200 Success edit restaurant data", (done) => {
        request(server)
            .put("/resto/restaurants")
            .send({
            name: "Markobar",
            is_open: true,
            })
            .set("access_token", user_access_token)
            .then((response) => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body).toHaveProperty("message", expect.any(String));
            done();
            })
            .catch((err) => {
            done(err);
            });
        });

        test("401 Failed edit restaurant - invalid token - should return error unauthorized", (done) => {
        request(server)
            .put("/resto/restaurants")
            .send({
            name: "Markobar",
            is_open: true,
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

    describe("DELETE /resto/restaurants - delete restaurant by id", () => {
        test("200 Success deleted restaurant", (done) => {
        request(server)
            .delete("/resto/restaurants")
            .set({ access_token: user_access_token })
            .then((response) => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body).toHaveProperty("message", expect.any(String));
            return done();
            })
            .catch((err) => {
            done(err);
            });
        });

        test("401 Failed deleted restaurant - invalid token - should return error unauthorized", (done) => {
        request(server)
            .delete("/resto/restaurants")
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
