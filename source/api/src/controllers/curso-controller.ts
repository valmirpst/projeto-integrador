import { Request, Response } from "express";
import { response } from "../core/response";
import { CursoModel } from "../models/curso-model";
import { cursoSchema } from "../models/schemas/curso-schema";

export class CursoController {
  static async getAsync(_: Request, res: Response) {
    try {
      const cursos = await CursoModel.getAsync();
      response.ok({ res, status: 200, payload: cursos });
    } catch (error) {
      response.error({ res, error });
    }
  }

  static async postAsync(req: Request, res: Response) {
    try {
      const curso = req.body;
      const parsed = cursoSchema.safeParse(curso);

      if (parsed.success === false) {
        response.error({ res, status: 400, message: "Dados inválidos", error: { ...parsed.error } });
        return;
      }

      const novoCurso = await CursoModel.postAsync({ ...parsed.data });

      response.ok({ res, status: 201, payload: novoCurso });
    } catch (error) {
      response.error({ res, error });
    }
  }

  static async putAsync(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const novoCurso = req.body;
      const parsed = cursoSchema.safeParse(novoCurso);

      const exists = await CursoModel.getByIdAsync(id);
      if (!exists) {
        response.error({ res, message: "Registro não encontrado" });
        return;
      }

      if (parsed.success === false) {
        response.error({ res, status: 400, message: "Dados inválidos", error: { ...parsed.error } });
        return;
      }

      const updatedCurso = await CursoModel.putAsync(id, {
        ...parsed.data,
      });

      response.ok({ res, payload: updatedCurso });
    } catch (error) {
      response.error({ res, error });
    }
  }

  static async deleteAsync(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const exists = await CursoModel.getByIdAsync(id);
      if (!exists) {
        response.error({ res, message: "Curso não encontrado", status: 404 });
        return;
      }

      await CursoModel.deleteAsync(id);

      response.ok({ res, payload: undefined });
    } catch (error) {
      response.error({ res, error });
    }
  }

  static async getByIdAsync(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const curso = await CursoModel.getByIdAsync(id);

      if (!curso) {
        response.error({ res, message: "Curso não encontrado", status: 404 });
        return;
      }

      response.ok({ res, payload: curso });
    } catch (error) {
      response.error({ res, error });
    }
  }
}
