module.exports = function(sequelize, DataTypes) {
  //Allowing Null for everything but email as a `User` may be created when referee email is provided.
  var User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      }
    },    
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true,
        len: [5, 30]
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
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
      }
    }
  });

  User.associate = function(models) {
    User.belongsToMany(models.Goal, {
      through: {
        model: "userGoals",
        unique: false
      },
      foreignKey: "UserId",
    })  
  };


  return User;
};
