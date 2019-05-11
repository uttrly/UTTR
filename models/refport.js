module.exports = function(sequelize, DataTypes) {
  var Refport = sequelize.define("Refport", {
    evaluation: {
      type: DataTypes.BOOLEAN, //0: false, 1: true
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    authorType: {
      type: DataTypes.BOOLEAN, //0: user, 1: referee
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    }
  });

  //Adds `GoalId` column to `Refports` table
  Refport.associate = function(models) {
    Refport.belongsTo(models.Referee);
  };

  return Refport;
};
