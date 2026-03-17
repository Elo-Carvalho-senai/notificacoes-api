// src/models/ParticipanteModel.js
// Dados iniciais (seed)
let participantes = [
    { id: 1, nome: "Ana Silva", email: "ana@email.com" },
    { id: 2, nome: "Carlos Souza", email: "carlos@email.com" },
    { id: 3, nome: "Maria Santos", email: "maria@email.com" },
];
let proximoId = 4;
// 👇 Implemente as funções abaixo seguindo o padrão do EventoModel
function listarTodos() {
    // Retorne todos os participantes
    // _________________________________
}
function buscarPorId(id) {
    // Use .find() para buscar pelo ID
    // _________________________________
}
function criar(dados) {
    const novoParticipante = {
        id: proximoId,
        // Complete com os atributos necessários
        // _________________________________
        // _________________________________
    };
    proximoId++;
    participantes.push(novoParticipante);
    return novoParticipante;
}
function atualizar(id, dados) {
    const index = participantes.findIndex((p) => p.id === id);
    // Se não encontrar, retorne null
    // Se encontrar, atualize e retorne o participante atualizado
    // Use o spread operator como fizemos no EventoModel
    // _________________________________
    // _________________________________
    // _________________________________

}
function deletar(id) {
    // Encontre o index, se não existir retorne false
    // Se existir, remova com splice e retorne true
    // _________________________________
    // _________________________________
    // _________________________________
}
module.exports = {
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};