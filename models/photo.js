module.exports = function(sequelize, DataTypes) {
  //Allowing Null for everything but email as a `Photo` may be created when referee email is provided.
  var Photo = sequelize.define("Photo", {
    reference: {
      //storing file name or image blob
      type: DataTypes.STRING, // switch to blob if storing directly in database
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    }
  });

  //Adds `CommentId` column to `Photos` table
  Photo.associate = function(models) {
    Photo.belongsTo(models.Comment);
  };

  return Photo;
};
