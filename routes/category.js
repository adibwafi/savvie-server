const express = require("express");
const router = express.Router();
const Category = require("../controllers/category");

router.get("/", Category.allCategory);
router.get("/:id", Category.getCategoryById);

module.exports = router;
