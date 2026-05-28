const baseTemplate = require('./baseTemplate');

function confirmacaoInscricao(dados) {

  const {
    participanteNome,
    eventoNome,
    eventoData,
    eventoLocal
  } = dados;

  const conteudo = `
    <h2 style="color: #16a34a; margin-top: 0;">
      ✅ Inscrição Confirmada!
    </h2>

    <p>
      Olá <strong>${participanteNome}</strong>,
    </p>

    <p>
      Sua inscrição no evento
      <strong>${eventoNome}</strong>
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
        ${new Date(eventoData).toLocaleDateString('pt-BR')}
      </p>

      <p>
        <strong>Local:</strong>
        ${eventoLocal || 'A definir'}
      </p>

    </div>

    <p>
      Esperamos você lá! 🎉
    </p>
  `;

  return baseTemplate(conteudo);
}

module.exports = confirmacaoInscricao;