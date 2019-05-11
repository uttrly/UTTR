module.exports = function(sequelize, DataTypes) {
  var Referee = sequelize.define("Referee", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    }
  });

  //Adds UserId column to `referees` table
  Referee.associate = function(models) {
    Referee.belongsTo(models.User);
  };

  //HasMany associations
  Referee.associate = function(models) {
    Referee.hasMany(models.Goal);
  };

  return Referee;
};
