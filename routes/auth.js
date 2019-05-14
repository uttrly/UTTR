var authController = require('../controllers/authcontroller.js');

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