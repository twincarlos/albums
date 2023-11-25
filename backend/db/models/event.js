'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    eventName: DataTypes.STRING,
    eventDate: DataTypes.DATE
  }, {});
  Event.associate = function(models) {
    Event.hasMany(models.Photo, { foreignKey: 'eventId' });
  };
  return Event;
};