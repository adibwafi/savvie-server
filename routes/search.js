const express = require("express");
const router = express.Router();
const Controller = require("../controllers/search");

router.get("/", Controller.search);

module.exports = router;