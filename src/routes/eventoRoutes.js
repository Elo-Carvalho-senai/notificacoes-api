const express = require("express");
const router = express.Router();
const EventoController = require("../controllers/EventoController");
const upload = require("../config/upload");
const { Evento } = require("../models");
const cacheMiddleware = require("../middlewares/cacheMiddleware");

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
 *               example: Evento não encontrado
 *             statusCode:
 *               type: integer
 *               example: 404
 */

/**
 * @swagger
 * /eventos:
 *   get:
 *     summary: Listar eventos
 *     tags: [Eventos]
 *     responses:
 *       200:
 *         description: Lista de eventos
 */
router.get("/", cacheMiddleware(30), EventoController.index);

/**
 * @swagger
 * /eventos/futuros:
 *   get:
 *     summary: Listar eventos futuros
 *     tags: [Eventos]
 *     responses:
 *       200:
 *         description: Lista de eventos futuros
 */
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

/**
 * @swagger
 * /eventos:
 *   post:
 *     summary: Criar evento
 *     tags: [Eventos]
 *     responses:
 *       201:
 *         description: Evento criado com sucesso
 */
router.post("/", EventoController.store);

/**
 * @swagger
 * /eventos/{id}:
 *   put:
 *     summary: Atualizar evento
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Evento atualizado
 *       404:
 *         description: Evento não encontrado
 */
router.put("/:id", EventoController.update);

/**
 * @swagger
 * /eventos/{id}:
 *   delete:
 *     summary: Excluir evento
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Evento removido
 *       404:
 *         description: Evento não encontrado
 */
router.delete("/:id", EventoController.destroy);

/**
 * @swagger
 * /eventos/{id}/banner:
 *   post:
 *     summary: Upload de banner do evento
 *     tags: [Eventos]
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
 *     responses:
 *       200:
 *         description: Banner enviado com sucesso
 *       404:
 *         description: Evento não encontrado
 */
router.post("/:id/banner", upload.single("banner"), async (req, res, next) => {
  try {
    const evento = await Evento.findByPk(req.params.id);

    if (!evento) {
      return res.status(404).json({
        erro: "Evento não encontrado"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        erro: "Nenhum arquivo enviado"
      });
    }

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
});

module.exports = router;