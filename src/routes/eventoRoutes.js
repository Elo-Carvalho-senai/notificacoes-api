const express = require("express");
const router = express.Router();
const EventoController = require("../controllers/EventoController");
const upload = require("../config/upload");
const { Evento } = require("../models");
const cacheMiddleware = require('../middlewares/cacheMiddleware');

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
 */

// =====================
// ROTAS CRUD
// =====================
router.get('/', cacheMiddleware(30), EventoController.index);
router.get("/futuros", EventoController.futuros);
router.get('/:id', cacheMiddleware(60), EventoController.show);

router.post("/", EventoController.store);
router.put("/:id", EventoController.update);
router.delete("/:id", EventoController.destroy);


/**
 * @swagger
 * /eventos/{id}/banner:
 *   post:
 *     summary: Upload de imagem de banner para evento
 *     tags: [Eventos]
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
 */

// =====================
// UPLOAD DE BANNER
// =====================
router.post("/:id/banner", upload.single("banner"), async (req, res, next) => {
  try {
    const evento = await Evento.findByPk(req.params.id);

    if (!evento) {
      return res.status(404).json({ erro: "Evento não encontrado" });
    }

    if (!req.file) {
      return res.status(400).json({ erro: "Nenhum arquivo enviado" });
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