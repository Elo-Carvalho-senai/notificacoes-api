let inscricoes = [];
let idAtual = 1;

// CRIAR - Simplificado (Verificações de existência agora estão no Service)
function criar(eventoId, participanteId) {
    // 1. Verificar duplicata (Regra de dados: não pode repetir a mesma dupla)
    const jaInscrito = inscricoes.find(
        (i) => i.eventoId === eventoId && i.participanteId === participanteId
    );

    if (jaInscrito) {
        // Lançando erro para o Service capturar
        throw new Error("Participante já inscrito neste evento");
    }

    // 2. Criar o objeto conforme o padrão solicitado
    const nova = {
        id: idAtual++,
        eventoId,
        participanteId,
        dataInscricao: new Date().toISOString(), // Adicionado para seguir o padrão
        status: "confirmada" // Mudado de "ativa" para "confirmada" como no exemplo
    };

    inscricoes.push(nova);
    return nova;
}

// LISTAR TODAS
function listar() {
    return inscricoes;
}

// LISTAR POR EVENTO
function listarPorEvento(eventoId) {
    return inscricoes.filter(i => i.eventoId === eventoId);
}

// CANCELAR
function cancelar(id) {
    const inscricao = inscricoes.find(i => i.id === id);

    if (!inscricao) return null;

    inscricao.status = "cancelada";
    return inscricao;
}

module.exports = {
    criar,
    listar,
    listarPorEvento,
    cancelar
};