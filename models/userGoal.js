module.exports = function(sequelize, DataTypes) {
  var userGoals = sequelize.define("userGoals", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true      
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    GoalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    relationship: {
      type: DataTypes.STRING, // can be owner or referee
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    }
  });

  return userGoals;
};
