require("dotenv").config();

// Observers
require("./events/notificacaoObserver");
require("./events/boasVindasObserver");

const app = require("./app");
const { sequelize } = require("./models");
const EmailService = require("./services/EmailService");

const PORT = process.env.PORT || 3000;

async function iniciar() {

  try {

    // conexão com banco
    await sequelize.authenticate();

    console.log("════════════════════════════════════");
    console.log("✅ Conexão com MySQL estabelecida!");
    console.log("════════════════════════════════════");

    // inicializa o serviço de e-mail
    await EmailService.inicializar();

    // inicia servidor
    app.listen(PORT, () => {

      console.log("════════════════════════════════════");
      console.log("🚀 Servidor rodando em:");
      console.log(`   http://localhost:${PORT}`);
      console.log("");
      console.log("📚 Documentação Swagger:");
      console.log(`   http://localhost:${PORT}/api-docs`);
      console.log("════════════════════════════════════");

    });

  } catch (erro) {

    console.error("❌ Erro ao iniciar servidor:");
    console.error(erro.message);

    process.exit(1);

  }

}

iniciar();