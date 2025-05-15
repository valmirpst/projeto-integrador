import { Router } from "express";
import { LivroController } from "../controllers/livro-controller";

const livroRoutes = Router();

/**
 * @swagger
 * /livros:
 *   get:
 *     summary: Lista todos os livros
 *     tags: [Livros]
 *     responses:
 *       200:
 *         description: Lista de livros
 *   post:
 *     summary: Adiciona um livro
 *     tags: [Livros]
 *     responses:
 *       201:
 *         description: Livro adicionado
 * /livros/{isbn}:
 *   get:
 *     summary: Busca um livro
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Livro atualizado
 *   put:
 *     summary: Atualiza um livro
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Livro atualizado
 *   delete:
 *     summary: Exclui um livro
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Livro excluido
 */

livroRoutes.get("/", LivroController.getAsync);
livroRoutes.post("/", LivroController.postAsync);
livroRoutes.put("/:isbn", LivroController.putAsync);
livroRoutes.delete("/:isbn", LivroController.deleteAsync);
livroRoutes.get("/:isbn", LivroController.getByIsbnAsync);

export { livroRoutes };
