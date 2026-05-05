const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const cors = require("cors");
const path = require("path");

// MIDDLEWARES
const logger = require("./middlewares/logger");
const responseTime = require("./middlewares/responseTime");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

// ROTAS
const eventoRoutes = require("./routes/eventoRoutes");
const participanteRoutes = require("./routes/participanteRoutes");
const inscricaoRoutes = require("./routes/inscricaoRoutes");
const exportRoutes = require("./routes/exportRoutes");

const app = express();

// Middlewares básicos
app.use(express.json());
app.use(cors());
app.use(logger);
app.use(responseTime);

// Uploads (ESSENCIAL)
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
app.use("/eventos", eventoRoutes);
app.use("/participantes", participanteRoutes);
app.use("/inscricoes", inscricaoRoutes);
app.use("/exportar", exportRoutes);

// Rota raiz
app.get("/", (req, res) => {
  res.json({
    mensagem: "API de Notificações",
    documentacao: "/api-docs",
  });
});

// Middlewares de erro
app.use(notFound);
app.use(errorHandler);

module.exports = app;