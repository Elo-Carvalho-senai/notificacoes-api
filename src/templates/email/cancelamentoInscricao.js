// src/templates/email/cancelamentoInscricao.js

const baseTemplate = require('./baseTemplate');

function cancelamentoInscricao(participante, evento) {
  const conteudo = `
    <h2 style="color: #dc2626; margin-top: 0;">
      ❌ Inscrição Cancelada
    </h2>

    <p>
      Olá <strong>${participante.nome}</strong>,
    </p>

    <p>
      Informamos que sua inscrição no evento
      <strong>${evento.nome}</strong>
      foi cancelada.
    </p>

    <div style="
      background: #fef2f2;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      border: 1px solid #fecaca;
    ">

      <h3 style="margin-top: 0;">
        📅 Informações do Evento
      </h3>

      <p>
        <strong>Data:</strong>
        ${new Date(evento.data).toLocaleDateString('pt-BR')}
      </p>

      <p>
        <strong>Local:</strong>
        ${evento.local || 'A definir'}
      </p>

    </div>

    <p>
      Caso isso tenha sido um engano,
      entre em contato com nossa equipe.
    </p>

    <p>
      Esperamos ver você em futuros eventos 💙
    </p>
  `;

  return baseTemplate(
    'Inscrição Cancelada',
    conteudo
  );
}

module.exports = cancelamentoInscricao;