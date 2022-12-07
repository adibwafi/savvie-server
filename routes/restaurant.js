const express = require("express");
const router = express.Router();
const Resto = require("../controllers/resto");
const Restaurant = require("../controllers/restaurant");
const { authentication } = require("../middleware/authentication");

router.get("/", Restaurant.allRestaurant);
router.get("/search", Restaurant.getRestaurantByRadius);
router.get("/:id", Restaurant.getRestaurantById);

module.exports = router;
