const express = require("express");
const router = express.Router();
const Checkout = require("../controllers/checkout");
const { authentication } = require("../middleware/authentication");

router.use(authentication)
router.post("/", Checkout.createCheckout);
router.get("/", Checkout.allOrder);

module.exports = router;