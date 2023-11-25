'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    eventId: DataTypes.INTEGER,
    photoURL: DataTypes.STRING
  }, {});
  Photo.associate = function(models) {
    Photo.belongsTo(models.Event, { foreignKey: 'eventId' });
  };
  return Photo;
};