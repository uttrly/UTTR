var db = require("../models");

module.exports = function (app) {

//   // Get route for singleGoal
//   app.get("/challenge/:id", (req, res) => {
//     console.log("/challenge/:id gets rendered")
//     db.Goal.findOne({
//       where: {
//         id: req.params.id
//       },
//       include: [{all: true}]
//     }).then((data)=>{
//       let goalObj = {goal: data}
//       console.log(goalObj)
//       res.render("challenge", goalObj)
//     })
//   })

// Post Request to save Report to Database
app.post("/api/report", (req, res) => {
    db.Report.create(req.body).then((report) => {
        console.log(report);
        res.redirect("/report/"+ report.userId)
    })
})
}
