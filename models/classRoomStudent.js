/**Define o modelo de tabelo ClassRoomStudent através do sequelize */
module.exports = function (sequelize, DataTypes) {
  const ClassRoomStudent = sequelize.define('ClassRoomStudent', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    profileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    classRoomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  }, {
    paranoid: true,
    timestamps: true,
    tableName: 'ga_class_room_students',
  });
  
  return ClassRoomStudent;
};
  