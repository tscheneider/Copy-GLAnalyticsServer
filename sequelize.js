module.exports = {
  'development': {
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "1234",
    database: process.env.DB_NAME || "game_analytics",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    seederStorage: "sequelize",
  },
  'sandbox': {
    'username': process.env.DB_USERNAME || 'root',
    'password': process.env.DB_PASSWORD || 'root',
    'database': process.env.DB_NAME || 'game_analytics',
    'host': process.env.DB_HOST || 'localhost',
    'dialect': 'postgres',
    'seederStorage': 'sequelize'
  },
  'production': {
    'username': process.env.DB_USERNAME || 'root',
    'password': process.env.DB_PASSWORD || 'root',
    'database': process.env.DB_NAME || 'game_analytics',
    'host': process.env.DB_HOST || 'localhost',
    'dialect': 'postgres',
    'seederStorage': 'sequelize'
  }
};
