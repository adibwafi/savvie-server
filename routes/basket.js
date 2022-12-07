const express = require("express");
const router = express.Router();
const Basket = require("../controllers/basket");
const { authentication } = require("../middleware/authentication");
const { authorization } = require("../middleware/authorization");

router.use(authentication)
router.get("/", Basket.allBasket);
router.post("/:id", Basket.createBasket);
router.delete("/:id", authorization, Basket.deleteBasket);
router.patch("/:id", authorization, Basket.quantity)

module.exports = router;