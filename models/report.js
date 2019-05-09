module.exports = function(sequelize, DataTypes) {
  var Report = sequelize.define("Report", {
    evaluation: {
      type: DataTypes.BOOLEAN, //0: false, 1: true
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    authorType: {
      type: DataTypes.BOOLEAN, //0: user, 1: referee
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
  });

  //Adds `UserId` column to `reports` table
  Report.associate = function(models) {
    Report.belongsTo(models.User);
  };  

  //Adds `GoalId` column to `reports` table
  Report.associate = function(models) {
    Report.belongsTo(models.Goal);
  }; 
  
  return Report;
};