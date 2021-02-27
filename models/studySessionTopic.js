/** Define o modelo de tabelo StudySessionTopic através do sequelize */

module.exports = function (sequelize, DataTypes) {
  const StudySessionTopic = sequelize.define('StudySessionTopic', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
/*     studySessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, */
    startAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endAt: {
      type: DataTypes.DATE,
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
    scopes: {
      bystudysession: value => ({
        where: {
          studySessionId: value
        }
      })
    },
    paranoid: true,
    timestamps: true,
    tableName: 'ga_study_session_topics',
  });

  StudySessionTopic.associate = function(models) {
    StudySessionTopic.belongsTo(models.Topic, {foreignKey: 'topicId', as: 'topic'})//transforma para o model topicId
    StudySessionTopic.belongsTo(models.StudySession, {foreignKey: 'studySessionId', as: 'studySession'})
  };


  return StudySessionTopic;
};
