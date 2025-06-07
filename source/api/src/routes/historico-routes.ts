import { Router } from "express";
import { HistoricoController } from "../controllers/historico-controller";

const historicoRoutes = Router();

/**
 * @swagger
 * /historico:
 *   get:
 *     summary: Lista todos os históricos
 *     tags: [Histórico]
 *     responses:
 *       200:
 *         description: Lista de históricos
 *     parameters:
 *      - in: query
 *        name: isbn_livro
 *        required: false
 *        schema:
 *          type: string
 *      - in: query
 *        name: id_usuario
 *        required: false
 *        schema:
 *          type: string
 *      - in: query
 *        name: id_bibliotecario
 *        required: false
 *        schema:
 *          type: string
 *      - in: query
 *        name: status
 *        required: false
 *        schema:
 *          type: string
 *   post:
 *     summary: Adiciona um histórico
 *     tags: [Histórico]
 *     responses:
 *       201:
 *         description: Histórico adicionado
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
 *     responses:
 *       200:
 *         description: Histórico atualizado
 *   put:
 *     summary: Atualiza um histórico
 *     tags: [Histórico]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Histórico atualizado
 *   delete:
 *     summary: Exclui um histórico
 *     tags: [Histórico]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Histórico excluído
 */

historicoRoutes.get("/", HistoricoController.getAsync);
historicoRoutes.post("/", HistoricoController.postAsync);
historicoRoutes.put("/:id", HistoricoController.putAsync);
historicoRoutes.delete("/:id", HistoricoController.deleteAsync);
historicoRoutes.get("/:id", HistoricoController.getByIdAsync);

export { historicoRoutes };
