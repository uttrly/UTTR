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

  Report.associate = function(models) {
    Report.hasOne(models.User);
  };  

  Report.associate = function(models) {
    Report.hasMany(models.Comment);
  }; 

  Report.associate = function(models) {
    Report.hasMany(models.Report);
  }; 

  return Report;
};