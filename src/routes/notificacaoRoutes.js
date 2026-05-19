const express = require('express');
const router = express.Router();

const {
  Notificacao,
  Inscricao,
  Evento,
  Participante
} = require('../models');

const EmailService = require('../services/EmailService');

// GET /notificacoes
router.get('/', async (req, res, next) => {
  try {

    const notificacoes = await Notificacao.findAll({
      include: [{
        model: Inscricao,
        as: 'inscricao',
        include: [
          {
            model: Evento,
            as: 'evento',
            attributes: ['nome']
          },
          {
            model: Participante,
            as: 'participante',
            attributes: ['nome', 'email']
          },
        ],
      }],
      order: [['createdAt', 'DESC']],
    });

    res.json(notificacoes);

  } catch (erro) {
    next(erro);
  }
});

// POST /notificacoes/teste-email
router.post('/teste-email', async (req, res) => {

  try {

    console.log('INICIOU ENVIO');

    const resultado = await EmailService.enviar(
      'teste@exemplo.com',
      'Teste da API',
      '<h1>Funcionou!</h1>'
    );

    console.log('EMAIL ENVIADO');

    return res.json({
      mensagem: 'E-mail enviado!',
      previewUrl: resultado.previewUrl,
    });

  } catch (erro) {

    console.log('ERRO NO EMAIL');
    console.log(erro);

    return res.status(500).json({
      erro: erro.message
    });

  }

});

module.exports = router;