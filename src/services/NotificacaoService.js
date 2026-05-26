const { Notificacao, Inscricao, Evento, Participante } = require('../models');
const EmailService = require('./EmailService');
const { NotFoundError } = require('../errors/AppError');
const sequelize = require('sequelize');

async function listarTodas(filtros = {}) {
  const where = {};

  if (filtros.tipo) {
    where.tipo = filtros.tipo;
  }

  if (filtros.enviada !== undefined) {
    where.enviada = filtros.enviada === 'true';
  }

  return await Notificacao.findAll({
    where,
    include: [
      {
        model: Inscricao,
        as: 'inscricao',
        include: [
          {
            model: Evento,
            as: 'evento',
            attributes: ['id', 'nome']
          },
          {
            model: Participante,
            as: 'participante',
            attributes: ['id', 'nome', 'email']
          }
        ]
      }
    ],
    order: [['created_at', 'DESC']]
  });
}

async function buscarPorId(id) {
  const notificacao = await Notificacao.findByPk(id, {
    include: [
      {
        model: Inscricao,
        as: 'inscricao',
        include: [
          {
            model: Evento,
            as: 'evento'
          },
          {
            model: Participante,
            as: 'participante'
          }
        ]
      }
    ]
  });

  if (!notificacao) {
    throw new NotFoundError('Notificação');
  }

  return notificacao;
}

async function reenviar(id) {
  const notificacao = await buscarPorId(id);

  const resultado = await EmailService.enviar(
    notificacao.destinatarioEmail,
    notificacao.assunto,
    notificacao.conteudo
  );

  await notificacao.update({
    enviada: true,
    data_envio: new Date()
  });

  return {
    notificacao,
    visualizarEm: resultado.visualizarEm
  };
}

async function obterEstatisticas() {
  const total = await Notificacao.count();

  const enviadas = await Notificacao.count({
    where: { enviada: true }
  });

  const pendentes = await Notificacao.count({
    where: { enviada: false }
  });

  const porTipo = await Notificacao.findAll({
    attributes: [
      'tipo',
      [
        sequelize.fn('COUNT', sequelize.col('id')),
        'quantidade'
      ]
    ],
    group: ['tipo'],
    raw: true
  });

  return {
    total,
    enviadas,
    pendentes,
    taxaEnvio:
      total > 0
        ? `${Math.round((enviadas / total) * 100)}%`
        : '0%',
    porTipo
  };
}

module.exports = {
  listarTodas,
  buscarPorId,
  reenviar,
  obterEstatisticas
};