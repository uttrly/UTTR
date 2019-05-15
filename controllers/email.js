const SparkPost = require('sparkpost');
const client = new SparkPost("2b862987dfc382161bbc77bf1bf8d6773db93dba");
const db = require("../models");

let email  = {}


module.exports.emailQueryUponFail = function (id) {
  var goalId = id
    db.Goal.findOne({
        attributes: [ 'goalName', 'stake', 'refereeEmail'],
        where: {id: goalId},
    })
    .then((data) => {
        let goalName = data.dataValues.goalName
        let stakeURL = data.dataValues.stake
        let refEmail = data.dataValues.refereeEmail

        sendEmailOnFail(goalName, stakeURL, refEmail)
    })
}

sendEmailOnFail = (goalName, stakeURL, refEmail) => {
    client.transmissions.send({
        options: {
          sandbox: true
        },
        content: {
          from: 'testing@sparkpostbox.com', // needs to be updated
          subject: 'Your friend has UTTRly failed at ' + goalName + '.', //Should query to get the goal owner's name but meh
          html:'<html><body><p>This is what was put on stake. Do what you will with it.</p><br><img src="'+ stakeURL +'"></body></html>'
        },
        recipients: [
          {address: refEmail}
        ]
      })
      .then(data => {
        console.log('Woohoo! You just sent your first mailing!');
        console.log(data);
      })
      .catch(err => {
        console.log('Whoops! Something went wrong');
        console.log(err);
      });
}

//emailQueryUponFail(12)


//module.exports = email