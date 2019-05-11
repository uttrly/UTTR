module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    message: {
      type: DataTypes.STRING,
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

  //Adds `GoalId` column to `Comments` table
  Comment.associate = function(models) {
    Comment.belongsTo(models.Goal);
  };

  return Comment;
};
