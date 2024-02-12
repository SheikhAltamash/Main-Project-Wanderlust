const express = require("express");
const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
    res.render('./user/signup.ejs');
}

module.exports.signup = async (req, res, next) => {
  try {
    let { username, password, email } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(newUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wanderlust !");
      res.redirect("/listing");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.loginForm = (req, res) => {
  res.render("./user/login.ejs");
};


module.exports.login = async (req, res, next) => {
  req.flash("success", "Welcome to wanderlust your are logged in  !");
  let RedirectURL = res.locals.redirectUrl || "/listing";
  res.redirect(RedirectURL);
};

module.exports.logout = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.logOut((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "You are logged out now !");
      res.redirect("/listing");
    });
  } else {
    res.redirect("/listing");
  }
};