const appEmitter = require('./eventEmitter');

console.log('Observer de boas-vindas carregado!');

const EmailService = require('../services/EmailService');

// ─────────────────────────────────────────────
// Observer → participante criado
// ─────────────────────────────────────────────

appEmitter.on(
    'participante:criado',

    async (participante) => {

        try {

            console.log(
                `[OBSERVER] Novo participante: ${participante.nome}`
            );

            const html = `
                <h2>Bem-vindo à Plataforma de Eventos! 🎉</h2>

                <p>Olá <strong>${participante.nome}</strong>,</p>

                <p>
                    Seu cadastro foi realizado com sucesso.
                </p>

                <p>
                    Agora você já pode participar dos nossos eventos!
                </p>

                <hr>

                <small>
                    Plataforma de Eventos
                </small>
            `;

            const resultado =
                await EmailService.enviar(
                    participante.email,
                    'Bem-vindo à Plataforma de Eventos!',
                    html
                );

            console.log(
                `[OBSERVER] E-mail de boas-vindas enviado!`
            );

            console.log(
                `Preview: ${resultado.previewUrl}`
            );

        } catch (erro) {

            console.error(erro);
        }

    }
);