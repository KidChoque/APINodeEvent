const express = require("express");
const router = express.Router();

const { AppDataSource } = require("../DataSource");
const TipoEvento = require("../entity/TipoEvento");

/**
 * @swagger
 * tags:
 *   name: Tipos de Evento
 *   description: Endpoints para gerenciar os tipos de evento
 */

/**
 * @swagger
 * /tipoeventos:
 *   get:
 *     summary: Lista todos os tipos de evento
 *     tags: [Tipos de Evento]
 *     responses:
 *       200:
 *         description: Lista de tipos de evento
 */
router.get("/", async (req, res) => {
  try {
    const tipoRepo = AppDataSource.getRepository(TipoEvento);
    const tipos = await tipoRepo.find();
    return res.status(200).json(tipos);
  } catch (error) {
    console.error("Erro ao buscar tipos de evento:", error);
    return res.status(500).json({ error: "Erro interno ao buscar tipos de evento." });
  }
});

/**
 * @swagger
 * /tipoeventos:
 *   post:
 *     summary: Cadastra um novo tipo de evento
 *     tags: [Tipos de Evento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *             required:
 *               - nome
 *     responses:
 *       201:
 *         description: Tipo de evento criado com sucesso
 *       500:
 *         description: Erro ao cadastrar tipo de evento
 */
router.post("/", async (req, res) => {
  try {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ error: "O campo 'nome' é obrigatório." });
    }

    const tipoRepo = AppDataSource.getRepository(TipoEvento);
    const novoTipo = tipoRepo.create({ nome });
    await tipoRepo.save(novoTipo);

    return res.status(201).json(novoTipo);
  } catch (error) {
    console.error("Erro ao cadastrar tipo de evento:", error);
    return res.status(500).json({ error: "Erro interno ao cadastrar tipo de evento." });
  }
});

module.exports = router;
