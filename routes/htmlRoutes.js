// var db = require("../models");

module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("home");
  });
  app.get("/learnmore", function (req, res) {
    res.render("learnmore");
  });
  app.get("/aboutus", function (req, res) {
    res.render("aboutus");
  });
  app.get("*", function (req, res) {
    res.render("404");
  });
}