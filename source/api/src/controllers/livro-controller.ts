import { Request, Response } from "express";
import { response } from "../core/response";
import { LivroModel } from "../models/livro-model";
import { livroSchema } from "../models/schemas/livro-schema";

export class LivroController {
  static async getAsync(req: Request, res: Response) {
    try {
      const livros = await LivroModel.getAsync();
      response.ok({ res, status: 201, payload: livros });
    } catch (error) {
      response.error({ res, error });
    }
  }

  static async postAsync(req: Request, res: Response) {
    try {
      const livro = req.body;
      const parsed = livroSchema.parse(livro);

      const novoLivro = await LivroModel.postAsync(parsed);

      response.ok({ res, payload: novoLivro });
    } catch (error) {
      response.error({ res, error });
    }
  }

  static async putAsync(req: Request, res: Response) {
    try {
      const isbn = req.params.isbn;
      const newLivro = req.body;
      const parsed = livroSchema.parse(newLivro);

      const updatedLivro = await LivroModel.putAsync(isbn, parsed);

      response.ok({ res, payload: updatedLivro });
    } catch (error) {
      response.error({ res, error });
    }
  }
  static async deleteAsync(req: Request, res: Response) {
    try {
      const isbn = req.params.isbn;

      const exists = await LivroModel.getByIsbnAsync(isbn);
      if (!exists) {
        response.error({ res, message: "Livro não encontrado", status: 404 });
        return;
      }

      const deletedLivro = await LivroModel.deleteAsync(isbn);

      response.ok({ res, payload: deletedLivro });
    } catch (error) {
      response.error({ res, error });
    }
  }

  static async getByIsbnAsync(req: Request, res: Response) {
    try {
      const isbn = req.params.isbn;

      const livro = await LivroModel.getByIsbnAsync(isbn);

      if (!livro) {
        response.error({ res, message: "Livro não encontrado", status: 404 });
        return;
      }

      response.ok({ res, payload: livro });
    } catch (error) {
      response.error({ res, error });
    }
  }
}
