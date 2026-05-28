require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// IMPORTAÇÃO DOS OBSERVERS

require('./events/notificacaoObserver');
require('./events/logObserver');
require('./events/eventoObserver');
require('./events/boasVindasObserver');

// IMPORTAÇÃO DAS ROTAS

const eventoRoutes = require('./routes/eventoRoutes');
const participanteRoutes = require('./routes/participanteRoutes');
const inscricaoRoutes = require('./routes/inscricaoRoutes');
const notificacaoRoutes = require('./routes/notificacaoRoutes');
const exportacaoRoutes = require('./routes/exportacaoRoutes');

// IMPORTAÇÃO DO MIDDLEWARE DE ERRO

const errorHandler = require('./middlewares/errorHandler');

// MIDDLEWARES

app.use(cors());
app.use(express.json());

// ROTAS

app.use('/eventos', eventoRoutes);
app.use('/participantes', participanteRoutes);
app.use('/inscricoes', inscricaoRoutes);
app.use('/notificacoes', notificacaoRoutes);
app.use('/exportar', exportacaoRoutes);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// ROTA TESTE
app.get('/', (req, res) => {

    res.json({
        mensagem: 'API funcionando 🚀',
    });

});

// MIDDLEWARE DE ERRO

app.use(errorHandler);

module.exports = app;

