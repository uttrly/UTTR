var db = require("../models");
var exports = module.exports = {}
// models


exports.signup = function (req, res) {

    res.render('signup');

}

exports.signin = function (req, res) {

    res.render('signin');

}

exports.dashboard = function (req, res) {
    //console.log(req)

    var points;

    //console.log(points)
    switch (req.params.status) {
        case "referee": omm
            // code block
            runSearch(req.user.id, 0, "Referee")
            break;
        case "complete":
            // code block
            runSearch(req.user.id, 1, "Owner")
            break;
        default:
            // code block
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
                    where: { UserId: req.user.id, relationship: relationship }

                }
            }], raw: true
        }).then(function (data) {

            var dataArray = [];
            var owner;
            //console.log(relationship)
            if (relationship === "Owner") {
                owner = 1
            }
            //console.log(owner)
            for (var i = 0; i < data.length; i++) {

                var duration = data[i]["Goals.duration"]
                var date1 = new Date(data[i]["Goals.startDate"]);
                var date2 = new Date(new Date());
                var diffWeek = parseInt((date2 - date1) / (24 * 3600 * 1000 * 7)); //gives day difference 

                var object = {
                    id: data[i]["Goals.id"],
                    name: data[i]["Goals.goalName"],
                    description: data[i]["Goals.description"],
                    createDate: data[i]["Goals.createdAt"].toISOString().replace(/T/, " ").replace(/\..+/, '').replace(/\d\d:\d\d:\d\d/, ''),
                    duration: diffWeek + "/" + duration
                }
                dataArray.push(object)
            }

            //console.log(dataArray)
            var hbsObject = {
                goals:
                    dataArray,
                userName: req.user.firstName + " " + req.user.lastName,
                owner: owner
            };
            db.sequelize.query('select sum(points) as points from uttrdb.usergoals u join uttrdb.goals g on u.goalid = g.id where UserId=? and relationship = "Owner";', { replacements: [req.user.id] }).then(([results, metadata]) => {
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

exports.report = function (req, res) {
    //console.log(req)
    var userId = req.user.id
    var userEmail = req.user.email
    var success = req.body.success
    var goalId = req.body.goalId
    var week = 3
    var authorType = 1

    db.Goal.findOne({
        where: {
            refereeEmail: userEmail
        }
    }).then(function (data) {
        console.log(data)

        var report = {
            sucess: success,
            authorType: authorType,
            userId: userId,
            week: week,
            GoalId: goalId
        }

        // db.Report.findAll({
        //     attributes : 
        //         ['week'],

        //     where: {
        //         GoalId: goalId
        //     },raw: true
        // }).then(function (data){


        //     console.log(data)
        // })

        if (data !== "" || data !== null) {
            db.Report.create(report).then(function () {
                res.send({ redirect: "/challenge/" + goalId })
            })
        }
    });
}

// ========================== comment =====================
exports.addComment = function (req, res) {
    var GoalId = req.body.GoalId;

    db.Goal.findOne({
        where: {
            id: GoalId
        }
    }).then(function (data) {
        console.log(data);
        if (data !== "" || data !== null) {
            db.Comment.create(req.body).then(function (commentdb) {
                res.send({ redirect: "/challenge/" + GoalId })
                //res.json(commentdb);

            })
        }

    })
}
// end =========================================================

exports.createGoal = function (req, res) {
    res.render("createGoal", { userName: req.user.firstName + " " + req.user.lastName })
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
            res.send({ redirect: "/dashboard" })
        })
}

exports.addRefToUserGoals = function (req, res, next) {
    // console.log("adding ref to user")
    // var userEmail = req.user.email

    // db.Goal.findAll({
    //     where: {
    //         refereeEmail: userEmail
    //     }
    // }).then(function (data) {
    //     console.log(data)
    //     data.forEach(element => {
    //         var userGoalData = {
    //             GoalId: element.dataValues.id,
    //             UserId: req.user.id,
    //             relationship: "Referee"
    //         }

    //         console.log(userGoalData)
    //         db.userGoals.findOrCreate({
    //             where: userGoalData
    //         })
    //     });
        next();
    // })
}
