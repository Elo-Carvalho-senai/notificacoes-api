// src/templates/email/lembreteEvento.js

const baseTemplate = require('./baseTemplate');

function lembreteEvento(dados) {

    const {
        participanteNome,
        eventoNome,
        eventoData,
        eventoLocal
    } = dados;

    // Calcular quantos dias faltam
    const hoje = new Date();

    const dataEvento = new Date(eventoData);

    const diffMs = dataEvento - hoje;

    const diasFaltando =
        Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    const dataFormatada =
        dataEvento.toLocaleDateString(
            'pt-BR',
            {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }
        );

    const conteudo = `

        <h2>Lembrete: Evento se aproxima! ⏰</h2>

        <p>
            Olá <strong>${participanteNome}</strong>,
        </p>

        <p>
            Faltam apenas <strong>${diasFaltando} dias</strong>
            para o evento
            <strong>"${eventoNome}"</strong>!
        </p>

        <div class="info-box">

            <p>
                <strong>Evento:</strong>
                ${eventoNome}
            </p>

            <p>
                <strong>Data:</strong>
                ${dataFormatada}
            </p>

            <p>
                <strong>Local:</strong>
                ${eventoLocal || 'A definir'}
            </p>

        </div>

        <p>
            Estamos ansiosos pela sua participação! 🎉
        </p>

        <p>
            Nos vemos em breve.
        </p>

    `;

    return baseTemplate(conteudo);

}

module.exports = lembreteEvento;
