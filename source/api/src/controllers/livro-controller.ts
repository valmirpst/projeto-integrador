import { Request, Response } from "express";
import { response } from "../core/response";
import { LivroModel } from "../models/livro-model";

const getAsync = async (req: Request, res: Response) => {
  try {
    const livros = await LivroModel.getAsync();
    response.ok({ res, payload: livros });
  } catch (error) {
    response.error({ res, error });
  }
};

export const livroController = {
  getAsync,
};
