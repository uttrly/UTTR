var db = require("../models");

var sendEmail = require("./email")

var exports = module.exports = {}
// models


exports.signup = function (req, res) {

    res.render('signup');

}

exports.signin = function (req, res) {

    res.render('signin');

}

exports.dashboard = function (req, res) {
    switch (req.params.status) {
        case "referee":
            runSearch(req.user.id, 0, "Referee")
            break;
        case "complete":
            runSearch(req.user.id, 1, "Owner")
            break;
        default:
            runSearch(req.user.id, 0, "Owner")
    }

    function runSearch(id, status, relationship) {
        db.user.findAll({
            attributes: [],
            where: {
                Id: id
            },
            include: [{
                model: db.Goal,
                where: {
                    status: status
                },
                through: {
                    where: {
                        UserId: req.user.id,
                        relationship: relationship
                    }

                }
            }],
            raw: true
        }).then(function (data) {

            var dataArray = [];
            var owner;
            if (relationship === "Owner") {
                owner = 1
            }
            for (var i = 0; i < data.length; i++) {

                var duration = data[i]["Goals.duration"]
                var startDate = new Date(data[i]["Goals.startDate"]);

                //var diffWeek = parseInt((date2 - date1) / (24 * 3600 * 1000 * 7)); //gives day difference 

                var diffWeek = calculateWeek(startDate);

                var object = {
                    id: data[i]["Goals.id"],
                    name: data[i]["Goals.goalName"],
                    description: data[i]["Goals.description"],
                    createDate: data[i]["Goals.createdAt"].toISOString().replace(/T/, " ").replace(/\..+/, '').replace(/\d\d:\d\d:\d\d/, ''),
                    duration: diffWeek + "/" + duration
                }
                dataArray.push(object)
            }

            var hbsObject = {
                goals: dataArray,
                userName: req.user.firstName + " " + req.user.lastName,
                owner: owner
            };

            db.user.findAll({
                attributes: {
                    include: [[db.sequelize.fn('sum', db.sequelize.col('points')), "points"]]
                },
                where: {
                    Id: id
                },
                include: [{
                    model: db.Goal,
                    through: {
                        where: { UserId: req.user.id, relationship: "Owner" }
                    }
                }], raw: true
            }).then(function (results) {
                console.log(results[0].points)
                hbsObject.points = results[0].points;
                console.log(hbsObject)
                res.render('dashboard', hbsObject)
            })

        });
    }
}

exports.signout = function (req, res) {

    req.session.destroy(function (err) {
        res.redirect('/');
    });

}


exports.challenge = function (req, res) {
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

        var diffWeek = calculateWeek(startDate) //gives weeks difference 
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
        })
    })
}

exports.report = function (req, res) {
    var userId = req.user.id
    var userEmail = req.user.email
    var success = req.body.success
    var goalId = req.body.goalId
    var authorType = 1

    db.Goal.findOne({
        where: {
            refereeEmail: userEmail,
            id: goalId
        }
    }).then(function (data) {
        console.log(data)

        var week = calculateWeek(data.startDate)
        var duration = data.duration
        var points = data.points
        var oneTime = data.oneTime

        if (oneTime == 1) {
            week = 1
        }

        var report = {
            sucess: success,
            authorType: authorType,
            userId: userId,
            week: week,
            GoalId: goalId
        }



        if (data !== "" || data !== null) {
            if (success == "1") {
                db.Goal.update({
                    points: points + 7,
                }, {
                        where: {
                            id: goalId
                        },
                        returning: true,
                        plain: true
                    })
                    .then(function (result) {
                        console.log("updated")
                        console.log(result);

                    });
            }



            db.Report.create(report).then(function () {

                if (week == duration || oneTime == 1) {
                    db.Report.findAll({
                        attributes:
                            ['sucess'],

                        where: {
                            GoalId: goalId
                        }, raw: true
                    }).then(function (data) {
                        console.log(data)
                        if (oneTime == 1) {
                            duration = 1
                        }
                        var totalSuccess = 0;
                        var overallPer = 0;
                        for (var i = 0; i < data.length; i++) {
                            currentSuccess = data[i].sucess
                            if (currentSuccess == 1) {
                                totalSuccess += currentSuccess
                            }
                        }

                        overallPer = parseInt(totalSuccess) / parseInt(duration) * 100

                        console.log("overall" + overallPer)

                        if (overallPer < 80) {
                            console.log("Sending out email")
                            sendEmail.emailQueryUponFail(goalId)
                        }

                        db.Goal.update({
                            status: 1,
                        }, {
                                where: {
                                    id: goalId
                                },
                                returning: true,
                                plain: true
                            })
                    });

                }
                res.send({
                    redirect: "/challenge/" + goalId
                })
            })
        }
    });
}

// ========================== comment =====================
exports.addComment = function (req, res) {
    var GoalId = req.body.GoalId;
    var username = req.user.username
    var body = req.body

    db.Goal.findOne({
        where: {
            id: GoalId
        }
    }).then(function (data) {
        console.log(data);
        if (data !== "" || data !== null) {
            body.username = username
            db.Comment.create(body).then(function (commentdb) {
                res.send({
                    redirect: "/challenge/" + GoalId
                })
                //res.json(commentdb);

            })
        }

    })
}
// end =========================================================

exports.createGoal = function (req, res) {
    res.render("createGoal", {
        userName: req.user.firstName + " " + req.user.lastName
    })
}

exports.newChallenge = function (req, res) {
    db.Goal.create(req.body)
        .then((goal) => {
            console.log(req);
            console.log(`goal added`)
            var relationshipData = {
                GoalId: goal.dataValues.id,
                UserId: req.user.id,
                relationship: "Owner"
            }
            db.userGoals.create(relationshipData)
        }).then(() => {
            res.send({
                redirect: "/dashboard"
            })
        })
}

exports.addRefToUserGoals = function (req, res, next) {
    console.log("adding ref to user")
    var userEmail = req.user.email

    db.Goal.findAll({
        where: {
            refereeEmail: userEmail
        }
    }).then(function (data) {
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

function calculateWeek(startDate) {
    var date1 = new Date(startDate);
    var date2 = new Date(new Date());
    var diffWeek = parseInt((date2 - date1) / (24 * 3600 * 1000 * 7)); //gives day difference 
    return diffWeek;
}