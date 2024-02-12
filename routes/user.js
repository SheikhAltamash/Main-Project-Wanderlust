const express = require('express');
const router = express.Router();
const wrapasync = require("../utils/wrapasync.js");
const passport = require("passport");
const { saveRedirectUrl } = require('../middleware.js');
const userController=require("../controllers/user.js");

router.get("/signup", userController.renderSignupForm);

router.post("/signup", wrapasync(userController.signup));

router.get("/login", userController.loginForm);

router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
    wrapasync(userController.login));

router.get("/logout",userController.logout);

module.exports = router;