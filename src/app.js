const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const cors = require("cors");
<<<<<<< HEAD
const path = require("path"); 
=======
const path = require("path");
>>>>>>> d331f771762c29712b68fd4a3835663a925baaa2

// MIDDLEWARES GLOBAIS
const logger = require("./middlewares/logger");
const responseTime = require("./middlewares/responseTime");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

<<<<<<< HEAD
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(logger);
app.use(responseTime);

// SERVIR ARQUIVOS DE UPLOAD (ESSENCIAL)
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Documentação Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
=======
// ROTAS
>>>>>>> d331f771762c29712b68fd4a3835663a925baaa2
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

// Servir arquivos estáticos (UPLOADS)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas principais
app.use("/eventos", eventoRoutes);
app.use("/participantes", participanteRoutes);
app.use("/inscricoes", inscricaoRoutes);
app.use("/exportar", exportRoutes);

// Rota raiz
app.get("/", (req, res) => {
  res.json({
    mensagem: "API de Notificações",
    documentacao: "/api-docs",
    rotas: {
      eventos: "/eventos",
      participantes: "/participantes",
      inscricoes: "/inscricoes",
    },
  });
});


app.use(notFound);
app.use(errorHandler);

module.exports = app;