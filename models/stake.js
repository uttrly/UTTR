module.exports = function(sequelize, DataTypes) {
  var Stake = sequelize.define("Stake", {
    reference: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    }
  });

  //Adds `GoalId` column to `Stakes` table
  Stake.associate = function(models) {
    Stake.belongsTo(models.Goal);
  };

  return Stake;
};
