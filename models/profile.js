/** Define o modelo de tabela do Profile através do sequelize */
module.exports = function (sequelize, DataTypes) {
  const Profile = sequelize.define('Profile', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    profileType: {
      type: DataTypes.ENUM('student', 'teacher'),
      allowNull: false,
      defaultValue: 'student',
    },
    genre: {
      type: DataTypes.ENUM('male', 'female'),
      allowNull: false,
      defaultValue: 'male',
    },
    age: {
      type: DataTypes.ENUM('0014', '1524', '2534', '3544', '4554', '5500'),
      allowNull: false,
      defaultValue: '0014',
    },
    institution: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    underGradProgram: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
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
    tableName: 'ga_profiles',
  });

  return Profile;
};
