import { Router } from "express";
import { LivroController } from "../controllers/livro.controller";
import upload from "../core/upload";
import { validateMiddleware } from "../middlewares/validate.middleware";
import { livroSchema } from "../models/schemas/livro.schema";
import { wrapController } from "./wrappers/wrap-controller";

const livroRoutes = Router();

/**
 * @swagger
 * tags:
 *   - name: Livros
 *     description: Gerenciamento de livros
 * components:
 *   schemas:
 *     Categoria:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: "Romance"
 *         tipo:
 *           type: string
 *           enum: [subcategoria, categoria]
 *           example: "categoria"
 *     Livro:
 *       type: object
 *       required:
 *         - isbn
 *         - titulo
 *         - edicao
 *         - editora
 *         - qtd_disponivel
 *         - genero
 *         - descricao
 *         - autores
 *         - categorias
 *       properties:
 *         isbn:
 *           type: string
 *           example: "9781234567890"
 *         titulo:
 *           type: string
 *           example: "Dom Casmurro"
 *         edicao:
 *           type: string
 *           example: "2ª"
 *         editora:
 *           type: string
 *           example: "Editora Exemplo"
 *         qtd_disponivel:
 *           type: integer
 *           example: 5
 *         genero:
 *           type: string
 *           example: "Ficção"
 *         caminho_img:
 *           type: string
 *           example: "/imagens/domcasmurro.jpg"
 *         descricao:
 *           type: string
 *           example: "Um clássico da literatura brasileira."
 *         total_avaliacoes:
 *           type: integer
 *           example: 10
 *         total_estrelas:
 *           type: integer
 *           example: 45
 *         autores:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Machado de Assis"]
 *         categorias:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Categoria'
 *
 * /livros:
 *   get:
 *     summary: Lista todos os livros
 *     tags: [Livros]
 *     responses:
 *       200:
 *         description: Lista de livros
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
 *                     $ref: '#/components/schemas/Livro'
 *   post:
 *     summary: Adiciona um livro
 *     tags: [Livros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Livro'
 *           example:
 *             isbn: "9781234567890"
 *             titulo: "Dom Casmurro"
 *             edicao: "2ª"
 *             editora: "Editora Exemplo"
 *             qtd_disponivel: 5
 *             genero: "Ficção"
 *             caminho_img: "/imagens/domcasmurro.jpg"
 *             descricao: "Um clássico da literatura brasileira."
 *             total_avaliacoes: 0
 *             total_estrelas: 0
 *             autores: ["Machado de Assis"]
 *             categorias: [{ nome: "Romance", tipo: "categoria" }]
 *     responses:
 *       201:
 *         description: Livro adicionado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Livro'
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
 * /livros/{isbn}:
 *   get:
 *     summary: Busca um livro pelo ISBN
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *         description: ISBN do livro
 *     responses:
 *       200:
 *         description: Livro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Livro'
 *       404:
 *         description: Livro não encontrado
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
 *     summary: Atualiza um livro pelo ISBN
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *         description: ISBN do livro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Livro'
 *     responses:
 *       200:
 *         description: Livro atualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Livro'
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
 *         description: Livro não encontrado
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
 *     summary: Exclui um livro pelo ISBN
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *         description: ISBN do livro
 *     responses:
 *       200:
 *         description: Livro excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: "null"
 *                   example: null
 *       404:
 *         description: Livro não encontrado
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
 * /livros/{isbn}/upload:
 *   post:
 *     summary: Faz upload da imagem de capa do livro
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *         description: ISBN do livro
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               book_cover:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo da imagem de capa do livro
 *     responses:
 *       200:
 *         description: Upload realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     filename:
 *                       type: string
 *       400:
 *         description: Nenhum arquivo enviado
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
 *         description: Livro não encontrado
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

const livroController = new LivroController();

livroRoutes.get("/", wrapController(livroController.getAsync, livroController));
livroRoutes.post("/", validateMiddleware(livroSchema), wrapController(livroController.createAsync, livroController));
livroRoutes.put("/:isbn", validateMiddleware(livroSchema), wrapController(livroController.updateAsync, livroController));
livroRoutes.delete("/:isbn", wrapController(livroController.deleteAsync, livroController));
livroRoutes.get("/:isbn", wrapController(livroController.getByIdAsync, livroController));
livroRoutes.post(
  "/:isbn/upload",
  wrapController(livroController.checkExistsAsync, livroController),
  upload.single("book_cover"),
  wrapController(livroController.uploadAsync, livroController)
);

export { livroRoutes };
