var db = require("../models");

module.exports = function (app) {
  // posting newUser data to the database
  app.post("/api/user", function (req, res) {
    db.User.create(req.body).then(function (dbUser) {
      console.log(dbUser);
      res.json(dbUser);
    });
  });

  // Get route for retrieving a single user
  app.get("/api/user/:email", function (req, res) {
    db.User.findOne({
      where: {
        email: req.params.email
      }
    }).then(function (dbUser) {
      console.log(dbUser);
      res.json(dbUser);
    });
  });
}
