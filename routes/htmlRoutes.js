// var db = require("../models");

module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("home");
  });
  app.get("/learnmore", function (req, res) {
    res.render("learnmore");
  });
  // app.get("/signup", function (req, res) {
  //   res.render("signup");
  // });
  // app.get("/createGoal", function (req, res) {
  //   res.render("createGoal");
  // });
  app.get("*", function (req, res) {
    res.render("404");
  });
}