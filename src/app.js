// src/app.js
const express = require("express");
const app = express();
const participanteRoutes = require("./routes/participanteRoutes");

app.use(express.json());
app.use("/participantes", participanteRoutes);

// Middleware para ler JSON no body
app.use(express.json());
// Importar rotas
const eventoRoutes = require("./routes/eventoRoutes");
// Usar rotas com prefixo
app.use("/eventos", eventoRoutes);
// Rota raiz (informativa)
app.get("/", (req, res) => {
    res.json({
        mensagem: "API de Notificações",
        rotas: {
            eventos: "/eventos",
            participantes: "/participantes",
        },
    });
});
module.exports = app;