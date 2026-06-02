const express = require("express");
const router = express.Router();
const InscricaoController = require("../controllers/InscricaoController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Inscricao:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         eventoId:
 *           type: integer
 *         participanteId:
 *           type: integer
 *         dataInscricao:
 *           type: string
 *         status:
 *           type: string
 *           enum: [confirmada, cancelada]
 *       example:
 *         id: 1
 *         eventoId: 1
 *         participanteId: 1
 *         dataInscricao: "2025-08-01T10:30:00.000Z"
 *         status: confirmada
 */

/**
 * @swagger
 * /inscricoes:
 *   post:
 *     summary: Criar uma inscrição
 *     tags: [Inscrições]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             eventoId: 1
 *             participanteId: 1
 *     responses:
 *       201:
 *         description: Inscrição criada com sucesso
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.post("/", InscricaoController.store);

/**
 * @swagger
 * /inscricoes:
 *   get:
 *     summary: Listar todas as inscrições
 *     tags: [Inscrições]
 *     responses:
 *       200:
 *         description: Lista de inscrições
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inscricao'
 */
router.get("/", InscricaoController.index);

/**
 * @swagger
 * /inscricoes/evento/{eventoId}:
 *   get:
 *     summary: Listar inscrições por evento
 *     tags: [Inscrições]
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de inscrições do evento
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inscricao'
 *       404:
 *         description: Evento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.get("/evento/:eventoId", InscricaoController.listarPorEvento);

/**
 * @swagger
 * /inscricoes/{id}/cancelar:
 *   patch:
 *     summary: Cancelar uma inscrição
 *     tags: [Inscrições]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inscrição cancelada com sucesso
 *       404:
 *         description: Inscrição não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.patch("/:id/cancelar", InscricaoController.cancelar);

/**
 * @swagger
 * /inscricoes/{id}/detalhes:
 *   get:
 *     summary: Ver detalhes completos da inscrição
 *     tags: [Inscrições]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes da inscrição
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inscricao'
 *       404:
 *         description: Inscrição não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.get("/:id/detalhes", InscricaoController.detalhes);

module.exports = router;