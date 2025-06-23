import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validateMiddleware } from "../middlewares/validate.middleware";
import { authSchema } from "../models/schemas/auth.schema";
import { wrapController } from "./wrappers/wrap-controller";

const authRoutes = Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Gerenciamento de autenticação
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - email
 *         - senha
 *       properties:
 *         email:
 *           type: email
 *           example: "user@test.com"
 *         senha:
 *           type: string
 *           description: Senha do usuário
 *           example: "123"
 *
 * /auth/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Credenciais inválidas
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

const authController = new AuthController();

authRoutes.post("/login", validateMiddleware(authSchema), wrapController(authController.login, authController));

export { authRoutes };
