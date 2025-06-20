import { Router } from "express";
import { cursoRoutes } from "./curso.routes";
import { historicoRoutes } from "./historico.routes";
import { livroRoutes } from "./livro.routes";
import { usuarioRoutes } from "./usuario.routes";

const router = Router();

router.use("/livros", livroRoutes);
router.use("/usuarios", usuarioRoutes);
router.use("/cursos", cursoRoutes);
router.use("/historico", historicoRoutes);

export { router };
