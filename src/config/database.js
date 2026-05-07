const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "notificacoes_db",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || null,
  {
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
  }
);

// (opcional, mas ótimo pra debug)
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Conectado ao banco com sucesso");
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar no banco:", err.message);
  });

module.exports = sequelize;