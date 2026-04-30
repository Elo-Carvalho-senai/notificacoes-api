const InscricaoService = require("../services/InscricaoService");

// POST /inscricoes
async function store(req, res, next) {
    try {
        const novaInscricao = await InscricaoService.criar(req.body);
        res.status(201).json(novaInscricao);
    } catch (erro) {
        next(erro);
    }
}

// GET /inscricoes
async function index(req, res, next) {
    try {
        const inscricoes = await InscricaoService.listarTodas();
        res.json(inscricoes);
    } catch (erro) {
        next(erro);
    }
}

// GET /inscricoes/evento/:eventoId
async function listarPorEvento(req, res, next) {
    try {
        const { eventoId } = req.params;
        const inscricoes = await InscricaoService.listarPorEvento(eventoId);
        res.json(inscricoes);
    } catch (erro) {
        next(erro);
    }
}

// PATCH /inscricoes/:id/cancelar
async function cancelar(req, res, next) {
    try {
        const { id } = req.params;
        const inscricao = await InscricaoService.cancelar(id);
        res.json(inscricao);
    } catch (erro) {
        next(erro);
    }
}

// (Opcional) GET /inscricoes/:id → detalhes com include
async function detalhes(req, res, next) {
    try {
        const { id } = req.params;

        const inscricoes = await InscricaoService.listarTodas();
        const inscricao = inscricoes.find(i => i.id == id);

        if (!inscricao) {
            return res.status(404).json({ erro: "Inscrição não encontrada" });
        }

        res.json(inscricao);
    } catch (erro) {
        next(erro);
    }
}

module.exports = {
    store,
    index,
    listarPorEvento,
    cancelar,
    detalhes, // pode remover se não estiver usando rota
};