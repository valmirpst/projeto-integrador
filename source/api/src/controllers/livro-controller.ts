import { Request, Response } from "express";
import { response } from "../core/response";
import { LivroModel } from "../models/livro-model";
import { livroSchema } from "../models/schemas/livro-schema";

export class LivroController {
  static async getAsync(req: Request, res: Response) {
    try {
      const livros = await LivroModel.getAsync();
      response.ok({ res, status: 200, payload: livros });
    } catch (error) {
      response.error({ res, error });
    }
  }

  static async postAsync(req: Request, res: Response) {
    try {
      const livro = req.body;
      const parsed = livroSchema.safeParse(livro);

      if (parsed.success === false) {
        response.error({ res, status: 400, message: "Dados inválidos", error: { ...parsed.error } });
        return;
      }

      const novoLivro = await LivroModel.postAsync(parsed.data);

      response.ok({ res, status: 201, payload: novoLivro });
    } catch (error) {
      response.error({ res, error });
    }
  }

  static async putAsync(req: Request, res: Response) {
    try {
      const isbn = req.params.isbn;
      const newLivro = req.body;
      const parsed = livroSchema.safeParse(newLivro);

      const exists = await LivroModel.getByIsbnAsync(isbn);
      if (!exists) {
        response.error({ res, message: "Registro não encontrado" });
        return;
      }

      if (parsed.success === false) {
        response.error({ res, status: 400, message: "Dados inválidos", error: { ...parsed.error } });
        return;
      }

      const updatedLivro = await LivroModel.putAsync(isbn, parsed.data);

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

      await LivroModel.deleteAsync(isbn);

      response.ok({ res, payload: undefined });
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
