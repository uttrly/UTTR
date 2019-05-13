var authController = require('../controllers/authcontroller.js');
var db = require("../models");
module.exports = function (app, passport) {

    app.get('/signup', authController.signup);


    app.get('/signin', authController.signin);


    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/signin',
        failureRedirect: '/signup'
    }
    ));

    app.get("/createGoal", isLoggedIn, authController.createGoal)

    app.post("/api/challenge", isLoggedIn, authController.newChallenge)

    app.get('/dashboard', isLoggedIn, addRefToUserGoals, authController.dashboard);

    app.get('/dashboard/:status', isLoggedIn, addRefToUserGoals, authController.dashboard);

    app.get('/signout', authController.signout);

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/signin'
    }
    ));


    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/signin');
    }

    function addRefToUserGoals(req, res, next) {
        console.log("adding ref to user")
        var userEmail = req.user.email
        
        db.Goal.findAll({
            where: {
                refereeEmail: userEmail
            }
        }).then(function(data) {
            console.log(data)
            data.forEach(element => {
                var userGoalData = {
                    GoalId: element.dataValues.id,
                    UserId: req.user.id,
                    relationship: "Referee"
                } 

                console.log(userGoalData)
                    db.userGoals.findOrCreate({
                        where: userGoalData
                    })
            });
            next();
        })
    }

}