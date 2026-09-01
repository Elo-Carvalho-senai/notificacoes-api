const sequelize = require("../config/database");

const Evento = require("./EventoModel");
const Participante = require("./ParticipanteModel");
const Inscricao = require("./InscricaoModel");
const Notificacao = require("./NotificacaoModel");
const Usuario = require("./UsuarioModel"); // Importação do model Usuario

// --- Relacionamentos entre modelos ---

// Evento → Inscrições
Evento.hasMany(Inscricao, {
    foreignKey: "evento_id",
    as: "inscricoes",
});

Inscricao.belongsTo(Evento, {
    foreignKey: "evento_id",
    as: "evento",
});

// Participante → Inscrições
Participante.hasMany(Inscricao, {
    foreignKey: "participante_id",
    as: "inscricoes",
});

Inscricao.belongsTo(Participante, {
    foreignKey: "participante_id",
    as: "participante",
});

// Inscrição → Notificações
Inscricao.hasMany(Notificacao, {
    foreignKey: "inscricao_id",
    as: "notificacoes",
});

Notificacao.belongsTo(Inscricao, {
    foreignKey: "inscricao_id",
    as: "inscricao",
});

// --- Exportação Unificada dos Modelos ---
module.exports = {
    sequelize,
    Evento,
    Participante,
    Inscricao,
    Notificacao,
    Usuario, // Agora o Usuario está corretamente incluído na exportação!
};