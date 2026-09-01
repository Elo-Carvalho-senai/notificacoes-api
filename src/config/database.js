const { Sequelize } = require("sequelize");
require("dotenv").config();

const config = {
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_NAME || "notificacoes_db",
  host: process.env.DB_HOST || "127.0.0.1",
  port: process.env.DB_PORT || 3306,
  dialect: "mysql",
  logging: false,
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Conectado ao banco com sucesso");
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar no banco:", err.message);
  });

// Exporta a instância para a aplicação (models)
module.exports = sequelize;

// Exporta as configurações para o Sequelize CLI (migrations)
module.exports.development = config;
module.exports.production = config;