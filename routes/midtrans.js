const express = require("express");
const router = express.Router();
const Midtrans = require("../controllers/midtrans");
const { authentication } = require("../middleware/authentication");

router.use(authentication)
router.post("/topup", Midtrans.snapPayment);

module.exports = router;
