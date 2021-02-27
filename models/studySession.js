/** Define o modelo de tabelo de Sessão de estudos através do sequelize */
module.exports = function (sequelize, DataTypes) {
  const StudySession = sequelize.define('StudySession', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    startAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    profileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    classRoomId: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    tableName: 'ga_study_sessions',
  });

  StudySession.associate = function(models) {
    StudySession.belongsToMany(models.Topic, {
      through: 'StudySessionTopic', 
      foreignKey: 'studySessionId', 
      as: 'studySession'
    })
  };

  return StudySession;
};
