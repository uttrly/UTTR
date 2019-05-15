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
    app.get("/challenge/:id", isLoggedIn, (req, res) => {
        var goalId = req.params.id
        console.log("/challenge/:id gets rendered")
        db.Goal.findAll({
            where: {
                id: goalId
            },
            include: [{ model: db.Report }],

            raw: true
        }).then((data) => {
            console.log(data);
            var refereeEmail = data[0].refereeEmail
            var oneTime = data[0].oneTime
            var report = []

            var userId = req.user.id

            var duration = parseInt(data[0]["duration"])
            var startDate = new Date(data[0]["startDate"]);
            var todayDate = new Date(new Date());


            var diffWeek = parseInt((todayDate - startDate) / (24 * 3600 * 1000 * 7)); //gives day difference 
            //var diffWeek = 4
            var progressperc = diffWeek / duration * 100

            console.log(diffWeek)
            console.log(duration)

            for (var i = 0; i < data.length; i++) {

                if (data[i]["Reports.id"] !== null) {
                    var reportObj = {
                        week: data[i]["Reports.week"],
                        successfull: data[i]["Reports.sucess"]
                    }
                    report.push(reportObj)
                }

            }


            var hbsObject = {
                goal:
                {
                    id: data[0].id,
                    goalName: data[0].goalName,
                    description: data[0].description
                },
                report,
                // comment,
                userName: req.user.firstName + " " + req.user.lastName,
                progressperc: progressperc
            };

            console.log(hbsObject)
            db.Report.findAll({
                attributes:
                    ['week'],

                where: {
                    GoalId: goalId
                }, raw: true,
                order: ['week']
            }).then(function (data) {
                console.log(data)

                var done = 1;
                for (var i = 1; i <= diffWeek; i++) {
                    pos = data.map(function (e) { return e.week; }).indexOf(i);

                    if (pos == "-1" && i < diffWeek) {

                        var report = {
                            sucess: 0,
                            authorType: 1,
                            userId: userId,
                            week: i,
                            GoalId: goalId
                        }
                        db.Report.create(report).then(function () {
                            res.redirect("/challenge/" + goalId)
                        })
                    } else if ((pos == "-1" && i == diffWeek && refereeEmail == req.user.email) || oneTime == 1) {
                        done = 0
                    }



                }

                if (oneTime == "1" && startDate <= todayDate && refereeEmail == req.user.email && (data == null || data == "")) {
                    console.log("testing00000000000000000")
                    done = 0
                }

                hbsObject.done = done;





                // comment ===================================================================

                db.Comment.findAll({
                    where: {
                        GoalId: goalId
                    }
                }).then(function (data) {
                    var comment = []
                    console.log("====================================")
                    console.log(data)
                    for (var i = 0; i < data.length; i++) {
                        var commentOBJ = {
                            text: data[i].text,
                            username: data[i].username,
                            createdAt: data[i].createdAt,
                            // GoalId: goalId
                        }
                        comment.push(commentOBJ);
                    }
                    hbsObject.comment = comment;
                    console.log("====================================")
                    // console.log(comment)
                    console.log(hbsObject)
                    res.render("challenge", hbsObject);

                })
                // end ================



                // console.log(hbsObject)
                //res.render("challenge", hbsObject)

            })



        })
    })


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