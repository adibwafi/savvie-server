const express = require("express");
const router = express.Router();
const Food = require("../controllers/food");

router.get("/", Food.allFood);
router.get("/:id", Food.getFoodById);

module.exports = router;
