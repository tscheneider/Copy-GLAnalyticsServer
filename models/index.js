/**permite trabalhar com o sistema de arquivos do computador. */
const fs = require('fs');
/** O módulo path fornece utilitários para trabalhar com caminhos de arquivo e diretório.  */
const path = require('path');
/** Sequelize é um Node.js ORM baseado em promessa para BD. Ele oferece suporte a transações sólidas, relações, carregamento rápido e lento, replicação de leitura e muito mais. */
const Sequelize = require('sequelize');
/** Extrai o nome do arquivo de um caminho de arquivo */
const basename = path.basename(module.filename);
/**bd recebe vazio  */
const db = {};
/**configuração de acesso ao banco de dados */
const config = {
  database: process.env.DB_NAME || 'game_analytics',
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '1234'
};

/**configura username e senha dentro do bd postgress */
const sequelize = new Sequelize(config.database, config.username, config.password, {
  dialect: 'postgres',
  seederStorage: 'sequelize'
});

/**Realiza a leitura dos arquivos para a montagem do BD */
fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach(file => {
    var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
