const fs = require('fs');

const appEmitter = require('./eventEmitter');

// Observer → evento criado

appEmitter.on('evento:criado', (evento) => {

    const linha =
        `[${new Date().toISOString()}] Evento #${evento.id} criado: ${evento.nome}\n`;

    fs.appendFileSync(
        'logs/app.log',
        linha
    );

    console.log(
        `[OBSERVER] Evento #${evento.id} registrado no log`
    );

});