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
      defaultValue: 0,
      validate: {
        isInt: true,
        notNull: true,
        notEmpty: true
      } 
    },
    status: {
      type: DataTypes.BOOLEAN, //0: false, 1: true
      defaultValue: 0
      }
    }
  });

  //Adds OwnerId column to `goals` table
  // OwnerId should equal to the `users` table id of the owner
  Goal.associate = function(models) {
    Goal.belongsTo(models.User, {as: "Owner"});
  };  

  //Adds RefereeId column to `goals` table
  // RefereeId should equal to the `users` table of the referee
  Goal.associate = function(models) {
    Goal.belongsTo(models.User, {as: "Referee"});
  };    

  
  //HasMany associations
  Goal.associate = function(models) {
    Goal.hasMany(models.Comment);
  }; 
 
  Goal.associate = function(models) {
    Goal.hasMany(models.Report);
  }; 

  Goal.associate = function(models) {
    Goal.hasMany(models.Photo);
  };  

  return Goal;
};

