// src/templates/email/confirmacaoInscricao.js

const baseTemplate = require('./baseTemplate');

function confirmacaoInscricao(participante, evento) {
  const conteudo = `
    <h2 style="color: #16a34a; margin-top: 0;">
      ✅ Inscrição Confirmada!
    </h2>

    <p>
      Olá <strong>${participante.nome}</strong>,
    </p>

    <p>
      Sua inscrição no evento
      <strong>${evento.nome}</strong>
      foi realizada com sucesso!
    </p>

    <div style="
      background: #f9fafb;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      border: 1px solid #e5e7eb;
    ">

      <h3 style="margin-top: 0;">
        📅 Detalhes do Evento
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
      Esperamos você lá! 🎉
    </p>
  `;

  return baseTemplate(
    'Inscrição Confirmada',
    conteudo
  );
}

module.exports = confirmacaoInscricao;