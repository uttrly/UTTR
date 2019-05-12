var db = require("../models");

module.exports = function (app) {

//   // Post route for newGoal to database
//   app.post("/api/challenge", (req, res) => {
//     db.Goal.create(req.body).then((goal) => {
//       console.log(goal);
//       res.redirect("/challenge/"+ goal.id)
//     })
//   })

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
// }
