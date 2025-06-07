const express = require("express");
const router = express.Router();

const { AppDataSource } = require("../DataSource");
const Evento = require("../entity/Evento");
const TipoEvento = require("../entity/TipoEvento");
const { validarCPF } = require("../utils/validadorCPF");

/**
 * @swagger
 * tags:
 *   name: Eventos
 *   description: Endpoints para gerenciar eventos
 */

/**
 * @swagger
 * /eventos:
 *   post:
 *     summary: Cadastra um novo evento, validando o CPF do organizador
 *     tags: [Eventos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               nomeOrganizador:
 *                 type: string
 *               cpfOrganizador:
 *                 type: string
 *               tipoEventoId:
 *                 type: integer
 *             required:
 *               - nome
 *               - nomeOrganizador
 *               - cpfOrganizador
 *               - tipoEventoId
 *     responses:
 *       201:
 *         description: Evento criado com sucesso
 *       422:
 *         description: CPF inválido
 *       404:
 *         description: Tipo de evento não encontrado
 *       500:
 *         description: Erro ao cadastrar evento
 */
router.post("/", async (req, res) => {
  try {
    const { nome, descricao, nomeOrganizador, cpfOrganizador, tipoEventoId } = req.body;

    if (!validarCPF(cpfOrganizador)) {
      return res.status(422).json({ error: "CPF inválido." });
    }

    const tipoEventoRepo = AppDataSource.getRepository(TipoEvento);
    const tipoEvento = await tipoEventoRepo.findOneBy({ id: tipoEventoId });

    if (!tipoEvento) {
      return res.status(404).json({ error: "TipoEvento não encontrado." });
    }

    const eventoRepo = AppDataSource.getRepository(Evento);
    const novoEvento = eventoRepo.create({
      nome,
      descricao,
      nomeOrganizador,
      cpfOrganizador,
      tipoEvento,
    });

    await eventoRepo.save(novoEvento);

    res.status(201).json(novoEvento);
  } catch (error) {
    console.error("Erro ao cadastrar evento:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
});


module.exports = router;
