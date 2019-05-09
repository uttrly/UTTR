// var db = require("../models");

module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("home");
  });
  app.get("/login", function (req, res) {
    res.render("login");
  });
  app.get("/signup", function (req, res) {
    res.render("signup");
  });
  app.get("/dashboard", function (req, res) {
    res.render("dashboard");
  });
  app.get("/createGoal", function (req, res) {
    res.render("createGoal");
  });
  app.get("/challenge", function (req, res) {
    res.render("challenge");
  });
  app.get("*", function (req, res) {
    res.render("404page");
  });
}