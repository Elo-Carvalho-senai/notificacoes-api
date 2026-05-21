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

// POST /notificacoes/teste-email — enviar e-mail de teste
router.post('/teste-email', async (req, res, next) => {
  try {
    console.log('Iniciando envio de e-mail de teste...');

    const resultado = await EmailService.enviar(
      'teste@exemplo.com',
      'Teste da API de Notificações',
      '<h1>Funcionou!</h1><p>Este e-mail foi enviado pela nossa API.Grupo 3 (Raissa, Maria Eloisa, Isadora, Maria Fernanda).</p>'
    );

    console.log('E-mail enviado com sucesso!');

    // Retorna exatamente o formato que o enunciado e o Postman esperam
    res.json({
      mensagem: 'E-mail de teste enviado!',
      visualizarEm: resultado.visualizarEm, // Ajustado de previewUrl para visualizarEm
    });

  } catch (erro) {
    console.error('Erro ao enviar e-mail:', erro);
    next(erro); // Passa o erro para o Express tratar centralizadamente
  }
});

module.exports = router;