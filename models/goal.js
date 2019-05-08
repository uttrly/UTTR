module.exports = function(sequelize, DataTypes) {
  var Goal = sequelize.define("Goal", {
    goalName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
        notNull: true,
        notEmpty: true,
        len: [1,30]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
        notNull: true,
        notEmpty: true,
        len: [1,300]
      }
    },
    oneTime: {
      type: DataTypes.BOOLEAN, //0: false, 1: true
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isDate: true
      }
    },
    refereeEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notNull: true,
        notEmpty: true,
      } 
    },
    stake: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }  
    },
    points: {
      type: DataTypes.INTEGER,
      default: 0,
      validate: {
        isInt: true,
        notNull: true,
        notEmpty: true
      } 
    },
    status: {
      type: DataTypes.BOOLEAN, //0: false, 1: true
      default: 0,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    refId: { // for setting up referee association
      type: DataTypes.INTEGER
    }
  });

  //for setting up owner
  Goal.associate = function(models) {
    Goal.hasOne(models.User);
  };  

  Goal.associate = function(models) {
    Goal.hasMany(models.Comment);
  }; 

  Goal.associate = function(models) {
    Goal.hasMany(models.Report);
  }; 

  return Goal;
};
