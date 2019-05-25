# UTTR (Up To The Right)

We believe the way to having a successful life is by always striving to be the best versions of ourselves. This is why we stand behind the motto, UTTR (Up To The Right), which is meant to describe continuous positive growth.

Our target audience is goal-oriented individuals seeking additional assistance adhering to heir goals. Our website will allow users create a binding contract with their future selves. 

**Each contract has the following components:**
1. **Title** of the goal
2. **Description** of the goal
3. Type: **one-time** or **on-going**
4. **Start date**
5. **Duration** (in weeks) if on-going
6. **Referee**

   You asign a referee who would have the ultimate power to determine if you are sucessful for each week.
7. **Stake**

   This is an embarrassing video/photo of yourself that you submit to us. Should you fail to acheive an 80% sucess rate. This information will be emailed to your referee for dispersement.
8. **Points** (rewarded by UTTR admin)

   If you have met your goal for the week, you will be rewarded 7 points. You can then use these points to enter our UTTR LOTTO. We announce a new winner each week.

The goal-setter would be able to enter comments regarding their progess while the goal is in the active state. Each week, the goal's referee is required to complete a one-click report for the goal to determine if the goal-setter has been sucessful or not. This referee system would add another level of accountability.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purpose. See deployment for notes on how to deploy the project on a live system.

Our latest live system can be found here: https://uttr.herokuapp.com/.

### Prerequisites

Please make sure you have a `GitHub account` the following softwares set up.

```
NPM
MySQL
```

### Installing

**Clone Repo + NPM Install**

Fork this repo and clone a local copy via SSH or HTTPS. Then run an NPM install.

```
$ git clone git@github.com:username/Project02-Team05.git
$ npm install
```

**Set Up Firebase**

Create an account on [Firebase](https://firebase.google.com/) or use your Google account. Log in.

Press get started and press "Add a Project".

Add a web app by pressing the </> icon. Copy the Firease SDK script. It looks something like this.

```
<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "EXAMPLE.firebaseapp.com",
    databaseURL: "https://EXAMPLE.firebaseio.com",
    projectId: "EXAMPLE",
    storageBucket: "EXAMPLE.appspot.com",
    messagingSenderId: "**********",
    appId: "1:************:web:*************"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>
```
Look for the firebase file. `./public/js/firebase.js` and replace the content with the script above except for line 12. Just in case you deleted it... Here it is.
```
 var defaultStorage = firebase.storage();
```

**Set Up SparkPost**

Set up your own [Sparkpost](https://www.sparkpost.com/) account. Please follow their instructions on obtaining an API key. If you forgot to copy it. Please create another one.

Locate the email.js file `../controllers/email.js` and replace the string inside `new SparkPost("YOUR_KEY_HERE")` with your API key.

If you would like to use SparkPost's development tier to its fullest, please set up your email domain as per [SparkPost instructions](https://www.sparkpost.com/docs/getting-started/getting-started-sparkpost/).

Once you have your email set up. Please replace all "From:" email address in the email.js file.

*Note: our app currently is running using SparkPost's sandbox email. The limit for sending may have been reached.*

**Set Up Development MySQL Database**

Please navigate to the config file `../config/config.js` and update your development environment for MySQL.
```
  "development": {
    "username": "YOUR_USERNAME",
    "password": "YOUR_PASSWORD",
    "database": "uttrdb",
    "host": "localhost",
    "dialect": "mysql",
    "port": "YOUR_MYSQL_PORT"
  }
```
Then run the schema.sql found under `../models/schema.sql`.

**Congratulations, you should be all set up to run this web app in development environment. See below for a quick demo.**

![UTTR-Demo]()

## Deployment

Should you wish to deploy a production of this web app. You can use something like Heroku. Please remember to update the production MYSQL environment defined as `"use_env_variable"`. Fild path: `../config/config.js`.
```
  "production": {
    "use_env_variable": "MYSQL_DB_URL",
    "dialect": "mysql"
  }
```

## Built With
* HTML5
* CSS
* Material Design for Bootstrap 4
* JavaScript
* JQuery
* Node.js
* Express
* Handlebars
* MySQL
* Sequelize
* Firebase storage
* Passport
* Express-session-storage
* Sparkpost

## Authors

Phouc Phan, Nirossan Vijayakumar, Sharon Chien, Sarah Sakhri

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
Edward Apostol, Adrian Pearman, Dimitry Besson 
