const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const cors = require("cors");
const path = require("path");

// PASSO 3: REGISTRAR OBSERVERS 
require("./events/notificacaoObserver");


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
const exportacaoRoutes = require("./routes/exportacaoRoutes");
const notificacaoRoutes = require("./routes/notificacaoRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger);
app.use(responseTime);

const uploadsPath = path.resolve(__dirname, "..", "uploads");
app.use("/uploads", express.static(uploadsPath));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/eventos", eventoRoutes);
app.use("/participantes", participanteRoutes);
app.use("/inscricoes", inscricaoRoutes);
app.use("/exportar", exportRoutes);
app.use("/exportar", exportacaoRoutes);
app.use("/notificacoes", notificacaoRoutes); 

app.get("/", (req, res) => {
  return res.status(200).json({
    mensagem: "API de Eventos",
    documentacao: "/api-docs",
    exemploUpload: "http://localhost:3000/uploads/arquivo.jpg",
  });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;