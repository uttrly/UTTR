// var db = require("../models");

module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("home");
  });
  app.get("/createGoal", function (req, res) {
    res.render("createGoal");
  });
  app.get("/challenge", function (req, res) {
    res.render("challenge");
  });
  app.get("*", function (req, res) {
    res.render("404");
  });
}