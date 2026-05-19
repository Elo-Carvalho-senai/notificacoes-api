// src/services/EmailService.js
const nodemailer = require('nodemailer');

let transporter = null;
let contaTeste = null;

/**
 * Inicializa o transporter com uma conta de teste do Ethereal.
 */
async function inicializar() {

  // cria conta de teste automaticamente
  contaTeste = await nodemailer.createTestAccount();

  console.log('══════════════════════════════════════');
  console.log('📧 E-mail de teste configurado!');
  console.log(`Usuário: ${contaTeste.user}`);
  console.log(`Senha: ${contaTeste.pass}`);
  console.log('══════════════════════════════════════');

  // transporter = "carteiro" do email
  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,

    auth: {
      user: contaTeste.user,
      pass: contaTeste.pass,
    },
  });
}

/**
 * Enviar e-mail
 */
async function enviar(para, assunto, html) {

  if (!transporter) {
    throw new Error('EmailService não inicializado');
  }

  const info = await transporter.sendMail({
    from: '"Plataforma de Eventos" <eventos@notificacoes.com>',
    to: para,
    subject: assunto,
    html: html,
  });

  // URL para visualizar o e-mail
  const previewUrl = nodemailer.getTestMessageUrl(info);

  console.log(`📧 E-mail enviado para ${para}`);
  console.log(`Preview: ${previewUrl}`);

  return {
    messageId: info.messageId,
    previewUrl,
  };
}

module.exports = {
  inicializar,
  enviar,
};