const express = require("express");
const router = express.Router();
const EventoController = require("../controllers/EventoController");

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
 */

/**
 * @swagger
 * /eventos:
 *   get:
 *     summary: Listar todos os eventos
 *     tags: [Eventos]
 */
router.get("/", EventoController.index);

/**
 * @swagger
 * /eventos/futuros:
 *   get:
 *     summary: Listar eventos futuros
 *     tags: [Eventos]
 *     responses:
 *       200:
 *         description: Lista de eventos com data futura
 */
router.get("/futuros", EventoController.futuros); // ✅ AQUI

/**
 * @swagger
 * /eventos/{id}:
 *   get:
 *     summary: Buscar evento por ID
 *     tags: [Eventos]
 */
router.get("/:id", EventoController.show);

/**
 * @swagger
 * /eventos:
 *   post:
 *     summary: Criar um novo evento
 *     tags: [Eventos]
 */
router.post("/", EventoController.store);

/**
 * @swagger
 * /eventos/{id}:
 *   put:
 *     summary: Atualizar um evento
 *     tags: [Eventos]
 */
router.put("/:id", EventoController.update);

/**
 * @swagger
 * /eventos/{id}:
 *   delete:
 *     summary: Deletar um evento
 *     tags: [Eventos]
 */
router.delete("/:id", EventoController.destroy);

module.exports = router;