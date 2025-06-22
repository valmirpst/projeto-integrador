import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";
import { validateMiddleware } from "../middlewares/validate.middleware";
import { usuarioSchema } from "../models/schemas/usuario.schema";
import { wrapController } from "./wrappers/wrap-controller";

const usuarioRoutes = Router();

/**
 * @swagger
 * tags:
 *   - name: Usuarios
 *     description: Gerenciamento de usuários do sistema
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - id
 *         - nome
 *         - sobrenome
 *         - data_nasc
 *         - telefone
 *         - perfil
 *         - id_cursos
 *       properties:
 *         id:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         ra:
 *           type: string
 *           nullable: true
 *           example: "2023123456"
 *         siape:
 *           type: string
 *           nullable: true
 *           example: "1234567"
 *         nome:
 *           type: string
 *           example: "João"
 *         sobrenome:
 *           type: string
 *           example: "Silva"
 *         data_nasc:
 *           type: string
 *           format: date
 *           example: "2000-01-01"
 *         email:
 *           type: string
 *           example: "joao.silva@email.com"
 *         telefone:
 *           type: string
 *           example: "(43) 99999-9999"
 *         perfil:
 *           type: string
 *           enum: [bibliotecario, aluno, professor, "0", "1", "2"]
 *           example: "aluno"
 *         id_cursos:
 *           type: array
 *           items:
 *             type: string
 *           example: ["curso1", "curso2"]
 *
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Usuario'
 *   post:
 *     summary: Adiciona um usuário
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *           example:
 *             id: "123e4567-e89b-12d3-a456-426614174000"
 *             ra: "2023123456"
 *             siape: null
 *             nome: "João"
 *             sobrenome: "Silva"
 *             data_nasc: "2000-01-01"
 *             email: "joao.silva@email.com"
 *             telefone: "(43) 99999-9999"
 *             perfil: "aluno"
 *             id_cursos: ["curso1", "curso2"]
 *     responses:
 *       201:
 *         description: Usuário adicionado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *
 * /usuarios/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *   put:
 *     summary: Atualiza um usuário pelo ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *   delete:
 *     summary: Exclui um usuário pelo ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário excluído
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 */

const usuarioController = new UsuarioController();

usuarioRoutes.get("/", wrapController(usuarioController.getAsync, usuarioController));
usuarioRoutes.post("/", validateMiddleware(usuarioSchema), wrapController(usuarioController.createAsync, usuarioController));
usuarioRoutes.put("/:id", validateMiddleware(usuarioSchema), wrapController(usuarioController.updateAsync, usuarioController));
usuarioRoutes.delete("/:id", wrapController(usuarioController.deleteAsync, usuarioController));
usuarioRoutes.get("/:id", wrapController(usuarioController.getByIdAsync, usuarioController));

export { usuarioRoutes };
