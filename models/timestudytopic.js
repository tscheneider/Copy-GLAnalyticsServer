module.exports = function (sequelize, DataTypes) {
  const TimeStudyTopic = sequelize.define('TimeStudyTopic', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    topicId:{
      type: DataTypes.INTEGER,
    },
    times: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM('start', 'end'),
      allowNull: false,
      defaultValue: 'end',
    },
    typePage: {
      type: DataTypes.ENUM('3D', 'text'),
      allowNull: false,
      defaultValue: '3D',
    }
  },
  {
    paranoid: true,
    timestamps: true,
    tableName: 'ga_time_study_topics',
  });
 
  TimeStudyTopic.associate = function(models) {
    //TimeStudyTopic.hasMany(models.Topic)  
    TimeStudyTopic.belongsTo(models.Topic, {
      foreignKey: 'topicId', 
      as: 'topic',
    })
  }; 

  return TimeStudyTopic;
};