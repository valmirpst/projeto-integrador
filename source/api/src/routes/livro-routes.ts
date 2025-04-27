import { Router } from "express";
import { LivroController } from "../controllers/livro-controller";

const livroRoutes = Router();

/**
 * @swagger
 * /livros:
 *   get:
 *     summary: Lista todos os livros
 *     responses:
 *       200:
 *         description: Lista de livros
 *   post:
 *     summary: Adiciona um livro
 *     responses:
 *       201:
 *         description: Livro adicionado
 *   put:
 *     summary: Atualiza um livro
 *     responses:
 *       200:
 *         description: Livro atualizado
 *   delete:
 *     summary: Exclui um livro
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
