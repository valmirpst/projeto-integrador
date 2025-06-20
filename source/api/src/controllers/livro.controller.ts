import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../exceptions/errors";
import { LivroEntity } from "../models/entities/livro.entity";
import { livroSchema } from "../models/schemas/livro.schema";
import { LivroService } from "../services/livro.service";
import { ControllerBase } from "./abstract/base.controller";

export class LivroController extends ControllerBase<LivroEntity> {
  protected service = new LivroService();
  protected schema = livroSchema;
  protected idParam: string = "isbn";

  async checkExistsAsync(req: Request, _: Response, next: NextFunction) {
    const isbn = req.params[this.idParam];
    await this.service.getByIdAsync(isbn);
    next();
  }

  async uploadAsync(req: Request, res: Response) {
    if (!req.file) {
      throw new Error("Nenhum arquivo enviado.");
    }

    const isbn = req.params[this.idParam];

    const livro = await this.service.getByIdAsync(isbn);

    if (!livro) throw new NotFoundError(`Livro com isbn ${isbn} não encontrado.`);

    await this.service.updateAsync(isbn, { ...livro, caminho_img: req.file.filename });

    res.status(200).json({
      success: true,
      filename: req.file.filename,
    });
  }
}
