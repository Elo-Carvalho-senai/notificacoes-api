// src/app.js
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const cors = require("cors");

// 👇 IMPORTA TODOS OS MIDDLEWARES PRIMEIRO
const logger = require("./middlewares/logger");
const responseTime = require("./middlewares/responseTime");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(logger); // agora certo
app.use(responseTime);

// Documentação Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
const eventoRoutes = require("./routes/eventoRoutes");
const participanteRoutes = require("./routes/participanteRoutes");
const inscricaoRoutes = require("./routes/inscricaoRoutes");

app.use("/eventos", eventoRoutes);
app.use("/participantes", participanteRoutes);
app.use("/inscricoes", inscricaoRoutes);

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

// 👇 SEMPRE POR ÚLTIMO
app.use(notFound);
app.use(errorHandler);

module.exports = app;