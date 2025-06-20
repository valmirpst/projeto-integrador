import { Router } from "express";
import { HistoricoController } from "../controllers/historico.controller";
import { validateMiddleware } from "../middlewares/validate.middleware";
import { historicoSchema } from "../models/schemas/historico.schema";
import { wrapController } from "./wrappers/wrap-controller";

const historicoRoutes = Router();

/**
 * @swagger
 * tags:
 *   - name: Histórico
 *     description: Gerenciamento de históricos de empréstimos e devoluções
 * components:
 *   schemas:
 *     Historico:
 *       type: object
 *       required:
 *         - id
 *         - isbn_livro
 *         - id_usuario
 *         - id_bibliotecario
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           example: "a1b2c3d4-e5f6-7890-abcd-1234567890ab"
 *         isbn_livro:
 *           type: string
 *           description: ISBN do livro relacionado
 *           example: "9781234567890"
 *         id_usuario:
 *           type: string
 *           description: ID do usuário
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         id_bibliotecario:
 *           type: string
 *           description: ID do bibliotecário responsável
 *           example: "987e6543-e21b-12d3-a456-426614174000"
 *         criado_em:
 *           type: string
 *           format: date-time
 *           description: Data de criação do histórico
 *           example: "2024-06-07T12:00:00.000Z"
 *         atualizado_em:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização do histórico
 *           example: "2024-06-07T12:00:00.000Z"
 *         status:
 *           type: string
 *           enum: [ativo, inativo]
 *           description: Status do histórico
 *           example: "ativo"
 *
 * /historico:
 *   get:
 *     summary: Lista todos os históricos
 *     tags: [Histórico]
 *     parameters:
 *      - in: query
 *        name: isbn_livro
 *        required: false
 *        schema:
 *          type: string
 *        description: Filtrar por ISBN do livro
 *      - in: query
 *        name: id_usuario
 *        required: false
 *        schema:
 *          type: string
 *        description: Filtrar por ID do usuário
 *      - in: query
 *        name: id_bibliotecario
 *        required: false
 *        schema:
 *          type: string
 *        description: Filtrar por ID do bibliotecário
 *      - in: query
 *        name: status
 *        required: false
 *        schema:
 *          type: string
 *          enum: [ativo, inativo]
 *        description: Filtrar por status
 *     responses:
 *       200:
 *         description: Lista de históricos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Historico'
 *   post:
 *     summary: Adiciona um histórico
 *     tags: [Histórico]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Historico'
 *           example:
 *             isbn_livro: "9781234567890"
 *             id_usuario: "123e4567-e89b-12d3-a456-426614174000"
 *             id_bibliotecario: "987e6543-e21b-12d3-a456-426614174000"
 *             status: "ativo"
 *     responses:
 *       201:
 *         description: Histórico adicionado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Historico'
 *       400:
 *         description: Dados inválidos ou usuário/livro/bibliotecário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 *
 * /historico/{id}:
 *   get:
 *     summary: Busca um histórico por ID
 *     tags: [Histórico]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do histórico
 *     responses:
 *       200:
 *         description: Histórico encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Historico'
 *       404:
 *         description: Histórico não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *   put:
 *     summary: Atualiza um histórico
 *     tags: [Histórico]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do histórico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Historico'
 *     responses:
 *       200:
 *         description: Histórico atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Historico'
 *       400:
 *         description: Dados inválidos ou entidades relacionadas não encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 *       404:
 *         description: Histórico não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *   delete:
 *     summary: Exclui um histórico
 *     tags: [Histórico]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do histórico
 *     responses:
 *       200:
 *         description: Histórico excluído
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Histórico não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

const historicoController = new HistoricoController();

historicoRoutes.get("/", wrapController(historicoController.getAsync, historicoController));
historicoRoutes.post(
  "/",
  validateMiddleware(historicoSchema),
  wrapController(historicoController.createAsync, historicoController)
);
historicoRoutes.put(
  "/:id",
  validateMiddleware(historicoSchema),
  wrapController(historicoController.updateAsync, historicoController)
);
historicoRoutes.delete("/:id", wrapController(historicoController.deleteAsync, historicoController));
historicoRoutes.get("/:id", wrapController(historicoController.getByIdAsync, historicoController));

export { historicoRoutes };
