module.exports = function(sequelize, DataTypes) {
  //Allowing Null for everything but email as a `User` may be created when referee email is provided.
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isAlphanumeric: true,
        notNull: true,
        notEmpty: true,
        len: [5,30]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notNull: true,
        notEmpty: true,
      }  
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notNull: true,
        notEmpty: true,
        len: [6,10]
      }  
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: true,
        len: [10],
        notNull: true,
        notEmpty: true
      } 
    },
    photo: {
      type: DataTypes.STRING
    }
  });

  //Should this association be written differently?
  //As goals could have either OwnerId or RefereeId
  User.associate = function(models) {
    User.hasMany(models.Goal);
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
