const express = require("express");
const router = express.Router();
const User = require("../controllers/user");
const { authentication } = require("../middleware/authentication");

router.post("/signin", User.userLogin);
// router.post("/singin-with-google", User.userGoogleLogin);
router.post("/signup", User.createUser);

router.get("/", authentication, User.myProfile);
router.put("/", authentication, User.editUser)

module.exports = router;
