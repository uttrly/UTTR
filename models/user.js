module.exports = function(sequelize, DataTypes) {
  //Allowing Null for everything but email as a `User` may be created when referee email is provided.
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
        len: [5,30]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      }  
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6,10]
      }  
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        len: [10],
      } 
    },
    photo: {
      type: DataTypes.STRING
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Goal);
  };  

  //What this says is that User has One RefereeId
  //Not the user has one referee for all goals
  User.associate = function(models) {
    User.hasOne(models.Referee);
  };  

  //Didn't set cascade on delete on these as `Report` and `Comment` should still exist even without `User`.
  //We don't want to delete these in case the `User` is a referee to a `Goal`
  User.associate = function(models) {
    User.hasMany(models.Report);
  };  

  User.associate = function(models) {
    User.hasMany(models.Comment);
  };    

  User.associate = function(models) {
    User.hasMany(models.Photo);
  };  

  return User;
};
