module.exports = function(sequelize, DataTypes) {
  //Allowing Null for everything but email as a `User` may be created when referee email is provided.
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
        len: [5, 30]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 10]
      }
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        len: [10]
      }
    },
    photo: {
      type: DataTypes.STRING
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Goal);
  };

  return User;
};
