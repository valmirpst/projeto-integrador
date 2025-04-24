import { Router } from "express";
import { livroController } from "../controllers/livro-controller";

const livroRoutes = Router();

/**
 * @swagger
 * /livros:
 *   get:
 *     summary: Lista todos os livros
 *     responses:
 *       200:
 *         description: Lista de livros
 */
livroRoutes.get("/", livroController.getAsync);

export { livroRoutes };
