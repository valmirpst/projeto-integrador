import { Router } from "express";
import { CursoController } from "../controllers/curso-controller";

const cursoRoutes = Router();

/**
 * @swagger
 * /cursos:
 *   get:
 *     summary: Lista todos os cursos
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Lista de cursos
 *   post:
 *     summary: Adiciona um curso
 *     tags: [Cursos]
 *     responses:
 *       201:
 *         description: Curso adicionado
 * /cursos/{id}:
 *   get:
 *     summary: Busca um curso por ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Curso atualizado
 *   put:
 *     summary: Atualiza um curso
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Curso atualizado
 *   delete:
 *     summary: Exclui um curso
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Curso excluído
 */

cursoRoutes.get("/", CursoController.getAsync);
cursoRoutes.post("/", CursoController.postAsync);
cursoRoutes.put("/:id", CursoController.putAsync);
cursoRoutes.delete("/:id", CursoController.deleteAsync);
cursoRoutes.get("/:id", CursoController.getByIdAsync);

export { cursoRoutes };
