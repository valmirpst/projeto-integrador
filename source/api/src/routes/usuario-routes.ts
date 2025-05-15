import { Router } from "express";
import { UsuarioController } from "../controllers/usuario-controller";

const usuarioRoutes = Router();

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *   post:
 *     summary: Adiciona um id
 *     tags: [Usuarios]
 *     responses:
 *       201:
 *         description: Usuario adicionado
 * /usuarios/{id}:
 *   get:
 *     summary: Busca um id
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario atualizado
 *   put:
 *     summary: Atualiza um id
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario atualizado
 *   delete:
 *     summary: Exclui um id
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario excluido
 */

usuarioRoutes.get("/", UsuarioController.getAsync);
usuarioRoutes.post("/", UsuarioController.postAsync);
usuarioRoutes.put("/:id", UsuarioController.putAsync);
usuarioRoutes.delete("/:id", UsuarioController.deleteAsync);
usuarioRoutes.get("/:id", UsuarioController.getByIdAsync);

export { usuarioRoutes };
