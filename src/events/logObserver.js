const fs = require('fs');

const appEmitter = require('./eventEmitter');

// ─────────────────────────────────────────────
// Observer → inscrição criada
// ─────────────────────────────────────────────

appEmitter.on('inscricao:criada', (inscricao) => {

    const linha =
        `[${new Date().toISOString()}] Inscrição #${inscricao.id} criada\n`;

    fs.appendFileSync(
        'logs/app.log',
        linha
    );

});

// ─────────────────────────────────────────────
// Observer → inscrição cancelada
// ─────────────────────────────────────────────

appEmitter.on('inscricao:cancelada', (inscricao) => {

    const linha =
        `[${new Date().toISOString()}] Inscrição #${inscricao.id} cancelada\n`;

    fs.appendFileSync(
        'logs/app.log',
        linha
    );

});