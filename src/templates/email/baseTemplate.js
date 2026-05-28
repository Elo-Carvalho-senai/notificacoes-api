function baseTemplate(titulo, conteudo) {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <title>${titulo}</title>
    </head>

    <body style="
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      font-family: Arial, sans-serif;
    ">

      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
      >
        <tr>
          <td align="center">

            <table
              width="600"
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="
                background: #ffffff;
                margin: 40px auto;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              "
            >

              <!-- HEADER -->
              <tr>
                <td
                  style="
                    background: #2563eb;
                    color: white;
                    padding: 30px;
                    text-align: center;
                  "
                >
                  <h1 style="margin: 0;">
                    📧 Plataforma de Eventos
                  </h1>
                </td>
              </tr>

              <!-- CONTEÚDO -->
              <tr>
                <td style="padding: 40px;">
                  ${conteudo}
                </td>
              </tr>

              <!-- FOOTER -->
              <tr>
                <td
                  style="
                    background: #f1f1f1;
                    padding: 20px;
                    text-align: center;
                    font-size: 12px;
                    color: #666;
                  "
                >
                  Este é um e-mail automático da Plataforma de Eventos.
                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>

    </body>
    </html>
  `;
}

module.exports = baseTemplate;