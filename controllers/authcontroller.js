var db = require("../models");
var exports = module.exports = {}


exports.signup = function (req, res) {

    res.render('signup');

}

exports.signin = function (req, res) {

    res.render('signin');

}

exports.dashboard = function (req, res) {

    res.render('dashboard');

}

exports.logout = function (req, res) {

    req.session.destroy(function (err) {
        res.redirect('/');
    });

}

exports.createGoal = function (req, res) {
    res.render("createGoal")
}

exports.newChallenge = function (req, res) {
    db.Goal.create(req.body)
    .then((goal) => {
      console.log(req);
      console.log(`goal added`)
      var relationshipData = {
          GoalId: goal.dataValues.id,
          UserId: req.user.id,
          relationship: "owner"
      }
      db.userGoals.create(relationshipData)
      .then(() => {
          res.redirect("/dasbord")
      })
    })
}