const express = require("express");

const router = express.Router();

const EventoController = require("../controllers/EventoController");
const upload = require("../config/upload");
const { Evento } = require("../models");
const cacheMiddleware = require("../middlewares/cacheMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Evento:
 *       type: object
 *       required:
 *         - nome
 *         - data
 *       properties:
 *         id:
 *           type: integer
 *         nome:
 *           type: string
 *         descricao:
 *           type: string
 *         data:
 *           type: string
 *         local:
 *           type: string
 *         capacidade:
 *           type: integer
 *         banner:
 *           type: string
 *     Erro:
 *       type: object
 *       properties:
 *         erro:
 *           type: object
 *           properties:
 *             tipo:
 *               type: string
 *               example: NotFoundError
 *             mensagem:
 *               type: string
 *               example: Evento não encontrado(a)
 *             statusCode:
 *               type: integer
 *               example: 404
 */

// =====================
// ROTAS CRUD
// =====================

/**
 * @swagger
 * /eventos:
 *   get:
 *     summary: Listar eventos com paginação e filtros
 *     tags: [Eventos]
 *     parameters:
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: porPagina
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: busca
 *         schema:
 *           type: string
 *       - in: query
 *         name: ordenarPor
 *         schema:
 *           type: string
 *           default: data
 *       - in: query
 *         name: ordem
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: ASC
 *     responses:
 *       200:
 *         description: Lista de eventos
 */
router.get("/", cacheMiddleware(30), EventoController.index);

router.get("/futuros", EventoController.futuros);

/**
 * @swagger
 * /eventos/{id}:
 *   get:
 *     summary: Buscar evento por ID
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Evento encontrado
 *       404:
 *         description: Evento não encontrado
 */
router.get("/:id", cacheMiddleware(60), EventoController.show);

<<<<<<< HEAD
// =====================
// ROTAS PROTEGIDAS POR JWT
// =====================

router.post("/", authMiddleware, EventoController.store);

router.put("/:id", authMiddleware, EventoController.update);

=======
/**
 * @swagger
 * /eventos:
 *   post:
 *     summary: Criar um novo evento
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Evento'
 *     responses:
 *       201:
 *         description: Evento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evento'
 *       401:
 *         description: Não autorizado
 *       400:
 *         description: Dados inválidos
 */
router.post("/", authMiddleware, EventoController.store);

/**
 * @swagger
 * /eventos/{id}:
 *   put:
 *     summary: Atualizar um evento existente
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Evento'
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Evento não encontrado
 */
router.put("/:id", authMiddleware, EventoController.update);

/**
 * @swagger
 * /eventos/{id}:
 *   delete:
 *     summary: Remover um evento
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Evento removido com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Evento não encontrado
 */
>>>>>>> 25e5fb208920ef9b3511db9594a537ea1d57ef6a
router.delete("/:id", authMiddleware, EventoController.destroy);

// =====================
// UPLOAD DE BANNER
// =====================

/**
 * @swagger
 * /eventos/{id}/banner:
 *   post:
 *     summary: Fazer upload do banner do evento
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               banner:
 *                 type: string
 *                 format: binary
 *                 description: Imagem do banner
 *     responses:
 *       200:
 *         description: Banner atualizado com sucesso
 *       400:
 *         description: Nenhum arquivo enviado
<<<<<<< HEAD
=======
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       401:
 *         description: Não autorizado
>>>>>>> 25e5fb208920ef9b3511db9594a537ea1d57ef6a
 *       404:
 *         description: Evento não encontrado
 */
<<<<<<< HEAD
router.post(
  "/:id/banner",
  authMiddleware,
  upload.single("banner"),
  async (req, res, next) => {
    try {
      const evento = await Evento.findByPk(req.params.id);

      if (!evento) {
        return res.status(404).json({
          erro: "Evento não encontrado",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          erro: "Nenhum arquivo enviado",
        });
      }
=======
router.post("/:id/banner", authMiddleware, upload.single("banner"), async (req, res, next) => {
  try {
    const evento = await Evento.findByPk(req.params.id);
>>>>>>> 25e5fb208920ef9b3511db9594a537ea1d57ef6a

      const caminhoBanner = `/uploads/${req.file.filename}`;

      await evento.update({
        banner: caminhoBanner,
      });

      return res.status(200).json({
        mensagem: "Banner atualizado com sucesso",
        banner: caminhoBanner,
      });
    } catch (erro) {
      return next(erro);
    }
  }
);

module.exports = router;