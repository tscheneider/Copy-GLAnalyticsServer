/** Define o modelo de tabelo ClassRoom através do sequelize*/
module.exports = function (sequelize, DataTypes) {
  const ClassRoom = sequelize.define('ClassRoom', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    responsableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accessCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    tableName: 'ga_class_rooms',
  });

  ClassRoom.encodeAccessCode = function(accessCode) {
    const buff = Buffer.from(accessCode, 'utf-8')
    return buff.toString('base64');
  }
  
  return ClassRoom;
};
  