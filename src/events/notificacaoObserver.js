// src/events/notificacaoObserver.js

const appEmitter = require('./eventEmitter');

const {
  Notificacao,
  Participante,
  Evento,
  Inscricao
} = require('../models');

const EmailService = require('../services/EmailService');

// Templates
const confirmacaoInscricao = require('../templates/email/confirmacaoInscricao');
const cancelamentoInscricao = require('../templates/email/cancelamentoInscricao');

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

async function buscarDadosInscricao(inscricaoId) {
  return await Inscricao.findByPk(inscricaoId, {
    include: [
      {
        model: Evento,
        as: 'evento',
      },
      {
        model: Participante,
        as: 'participante',
      },
    ],
  });
}

async function salvarNotificacao(dados) {
  return await Notificacao.create(dados);
}

// ─────────────────────────────────────────────
// OBSERVER → INSCRIÇÃO CRIADA
// ─────────────────────────────────────────────

appEmitter.on('inscricao:criada', async (inscricao) => {

  try {

    console.log(
      `[OBSERVER] Nova inscrição detectada: #${inscricao.id}`
    );

    const dados = await buscarDadosInscricao(
      inscricao.id
    );

    if (!dados) {
      console.log('⚠️ Inscrição não encontrada');
      return;
    }

    const evento = dados.evento;
    const participante = dados.participante;

    // Verificações de segurança
    if (!evento) {
      console.log('⚠️ Evento não encontrado');
      return;
    }

    if (!participante) {
      console.log('⚠️ Participante não encontrado');
      return;
    }

    const assunto =
      `Inscrição confirmada: ${evento.nome}`;

    // Template HTML
    const html = confirmacaoInscricao(
      participante,
      evento
    );

    // Enviar e-mail
    const resultado = await EmailService.enviar(
      participante.email,
      assunto,
      html
    );

    // Salvar notificação
    await salvarNotificacao({
      inscricao_id: inscricao.id,
      tipo: 'confirmacao',
      destinatarioEmail: participante.email,
      assunto,
      conteudo: html,
      dataEnvio: new Date(),
      enviada: true,
    });

    console.log(
      `[NOTIFICAÇÃO] Confirmação enviada para ${participante.email}`
    );

    if (resultado?.visualizarEm) {

      console.log(
        `🔗 Visualizar em: ${resultado.visualizarEm}`
      );

    }

  } catch (erro) {

    console.error(
      '[NOTIFICAÇÃO] Erro:',
      erro.message
    );

  }

});

// ─────────────────────────────────────────────
// OBSERVER → INSCRIÇÃO CANCELADA
// ─────────────────────────────────────────────

appEmitter.on('inscricao:cancelada', async (inscricao) => {

  try {

    console.log(
      `[OBSERVER] Inscrição cancelada detectada: #${inscricao.id}`
    );

    const dados = await buscarDadosInscricao(
      inscricao.id
    );

    if (!dados) {
      console.log('⚠️ Inscrição não encontrada');
      return;
    }

    const evento = dados.evento;
    const participante = dados.participante;

    // Verificações de segurança
    if (!evento) {
      console.log('⚠️ Evento não encontrado');
      return;
    }

    if (!participante) {
      console.log('⚠️ Participante não encontrado');
      return;
    }

    const assunto =
      `Inscrição cancelada: ${evento.nome}`;

    // Template HTML
    const html = cancelamentoInscricao(
      participante,
      evento
    );

    // Enviar e-mail
    const resultado = await EmailService.enviar(
      participante.email,
      assunto,
      html
    );

    // Salvar notificação
    await salvarNotificacao({
      inscricao_id: inscricao.id,
      tipo: 'cancelamento',
      destinatarioEmail: participante.email,
      assunto,
      conteudo: html,
      dataEnvio: new Date(),
      enviada: true,
    });

    console.log(
      `[NOTIFICAÇÃO] Cancelamento enviado para ${participante.email}`
    );

    if (resultado?.visualizarEm) {

      console.log(
        `🔗 Visualizar em: ${resultado.visualizarEm}`
      );

    }

  } catch (erro) {

    console.error(
      '[NOTIFICAÇÃO] Erro:',
      erro.message
    );

  }

});