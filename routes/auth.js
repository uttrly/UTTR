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

    app.post("/api/comment", isLoggedIn, authController.addComment);

    app.post("/api/report", isLoggedIn, authController.report)

    // Get route for singleGoal
    app.get("/challenge/:id", isLoggedIn, authController.challenge)


    app.get('/dashboard', isLoggedIn, authController.addRefToUserGoals, authController.dashboard);

    app.get('/dashboard/:status', isLoggedIn, authController.addRefToUserGoals, authController.dashboard);

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


}