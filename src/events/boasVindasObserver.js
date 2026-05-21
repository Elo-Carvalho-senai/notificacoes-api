const appEmitter = require('./eventEmitter');

const EmailService = require('../services/EmailService');

appEmitter.on('participante:criado', async (participante) => {

  try {

    console.log(
      `[OBSERVER] Novo participante criado: ${participante.nome}`
    );

    const html = `
      <h1>Bem-vindo(a)! 🎉</h1>

      <p>Olá <strong>${participante.nome}</strong>,</p>

      <p>Seu cadastro foi realizado com sucesso.</p>
    `;

    await EmailService.enviar(
      participante.email,
      'Bem-vindo à Plataforma de Eventos',
      html
    );

    console.log(
      `[NOTIFICAÇÃO] E-mail enviado para ${participante.email}`
    );

  } catch (erro) {

    console.error(erro.message);

  }

});