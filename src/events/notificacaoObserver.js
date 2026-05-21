// src/events/notificacaoObserver.js
const appEmitter = require('./eventEmitter');
const { Notificacao, Participante, Evento, Inscricao } = require('../models');
const EmailService = require('../services/EmailService');

// 1. IMPORTANDO OS TEMPLATES EXIGIDOS PELA ATIVIDADE
const confirmacaoInscricao = require('../templates/email/confirmacaoInscricao');
const cancelamentoInscricao = require('../templates/email/cancelamentoInscricao');

// 2. REFACTOR: Funções auxiliares (Helpers) para limpar o código
async function buscarDadosInscricao(inscricaoId) {
  return await Inscricao.findByPk(inscricaoId, {
    include: [
      { model: Evento, as: 'evento' },
      { model: Participante, as: 'participante' },
    ],
  });
}

async function salvarNotificacao(dados) {
  return await Notificacao.create(dados);
}

// ── OBSERVER: Inscrição criada ──
appEmitter.on('inscricao:criada', async (inscricao) => {
  try {
    console.log(`[OBSERVER] Nova inscrição detectada: #${inscricao.id}`);

    // Usa o helper criado acima
    const dados = await buscarDadosInscricao(inscricao.id);
    if (!dados) return;

    const { evento, participante } = dados;
    const assunto = `Inscrição confirmada: ${evento.nome}`;

    // Usa o template importado passando as variáveis necessárias
    const html = confirmacaoInscricao({
      participanteNome: participante.nome,
      eventoNome: evento.nome,
      eventoData: evento.data,
      eventoLocal: evento.local,
    });

    const resultado = await EmailService.enviar(participante.email, assunto, html);

    // Salva usando o helper
    await salvarNotificacao({
      inscricao_id: inscricao.id,
      tipo: 'confirmacao',
      destinatario_email: participante.email,
      assunto,
      conteudo: html,
      data_envio: new Date(),
      enviada: true,
    });

    console.log(`[NOTIFICAÇÃO] Confirmação enviada para ${participante.email}`);
    if (resultado?.visualizarEm) console.log(`   Visualizar em: ${resultado.visualizarEm}`);
  } catch (erro) {
    console.error('[NOTIFICAÇÃO] Erro:', erro.message);
  }
});

// ── OBSERVER: Inscrição cancelada (ADICIONADO) ──
appEmitter.on('inscricao:cancelada', async (inscricao) => {
  try {
    console.log(`[OBSERVER] Inscrição cancelada detectada: #${inscricao.id}`);

    const dados = await buscarDadosInscricao(inscricao.id);
    if (!dados) return;

    const { evento, participante } = dados;
    const assunto = `Inscrição cancelada: ${evento.nome}`;

    // Usa o template de cancelamento
    const html = cancelamentoInscricao({
      participanteNome: participante.nome,
      eventoNome: evento.nome,
    });

    const resultado = await EmailService.enviar(participante.email, assunto, html);

    await salvarNotificacao({
      inscricao_id: inscricao.id,
      tipo: 'cancelamento', // Corrigido aqui para salvar como cancelamento!
      destinatario_email: participante.email,
      assunto,
      conteudo: html,
      data_envio: new Date(),
      enviada: true,
    });

    console.log(`[NOTIFICAÇÃO] Cancelamento enviado para ${participante.email}`);
    if (resultado?.visualizarEm) console.log(`   Visualizar em: ${resultado.visualizarEm}`);
  } catch (erro) {
    console.error('[NOTIFICAÇÃO] Erro:', erro.message);
  }
});