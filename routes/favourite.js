const express = require("express");
const router = express.Router();
const Favourite = require("../controllers/favourite");
const { authentication } = require("../middleware/authentication");
const { authorization } = require("../middleware/authorization");

router.use(authentication)
router.get("/", Favourite.allFavourite);
router.post("/:id", Favourite.createFavourite);
router.delete("/:id", authorization, Favourite.deleteFavourite);

module.exports = router;
