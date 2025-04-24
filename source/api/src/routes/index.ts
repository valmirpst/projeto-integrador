import { Router } from "express";
import { livroRoutes } from "./livro-routes";

const router = Router();

router.use("/livros", livroRoutes);

export { router };
