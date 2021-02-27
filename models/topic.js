/** Define o modelo de tabelo de Topic através do sequelize */
module.exports = function (sequelize, DataTypes) {
  const Topic = sequelize.define('Topic', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    babylonFile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    babylonConfig: {
      type: DataTypes.JSON,
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
/*     timeStudyTopicId:{
      type: DataTypes.INTEGER,
    } */
  },
  {
    paranoid: true,
    timestamps: true,
    tableName: 'ga_topics',
  });
  
  Topic.associate = function(models) {

    Topic.belongsToMany(models.StudySession, {
      through: 'StudySessionTopic', 
      foreignKey: 'topicId', 
      as: 'topic'
    })

    Topic.hasMany(models.TimeStudyTopic) 

/*     Topic.belongsTo(models.TimeStudyTopic, {
      foreignKey: 'timeStudyTopicId', 
      as: 'timeStudyTopic'
    }) */
  };

  //adicionado 

  return Topic;
};
