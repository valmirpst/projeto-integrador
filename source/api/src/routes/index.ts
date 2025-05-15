import { Router } from "express";
import { livroRoutes } from "./livro-routes";
import { usuarioRoutes } from "./usuario-routes";

const router = Router();

router.use("/livros", livroRoutes);
router.use("/usuarios", usuarioRoutes);

export { router };
