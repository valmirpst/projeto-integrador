import { randomUUID } from "crypto";
import { Request, Response } from "express";
import { response } from "../core/response";
import { HistoricoFilter } from "../models/filters/historico-filter";
import { HistoricoModel } from "../models/historico-model";
import { StatusEnum } from "../models/primitives/enumerations";
import { historicoSchema } from "../models/schemas/historico-schema";

export class HistoricoController {
  static async getAsync(req: Request, res: Response) {
    try {
      const queryParams = req.query as HistoricoFilter;

      const historico = await HistoricoModel.getAsync(queryParams);
      response.ok({ res, status: 200, payload: historico });
    } catch (error) {
      response.error({ res, error });
    }
  }

  static async postAsync(req: Request, res: Response) {
    try {
      const historico = req.body;
      const parsed = historicoSchema.safeParse(historico);

      if (parsed.success === false) {
        response.error({ res, status: 400, message: "Dados inválidos", error: { ...parsed.error } });
        return;
      }

      const novoHistorico = await HistoricoModel.postAsync({
        ...parsed.data,
        id: parsed.data.id || randomUUID().slice(0, 40),
        status: StatusEnum[parsed.data.status],
      });

      response.ok({ res, status: 201, payload: novoHistorico });
    } catch (error) {
      response.error({ res, error });
    }
  }

  static async putAsync(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const novoHistorico = req.body;
      const parsed = historicoSchema.safeParse(novoHistorico);

      const exists = await HistoricoModel.getByIdAsync(id);
      if (!exists) {
        response.error({ res, message: "Registro não encontrado" });
        return;
      }

      if (parsed.success === false) {
        response.error({ res, status: 400, message: "Dados inválidos", error: { ...parsed.error } });
        return;
      }

      const updatedHistorico = await HistoricoModel.putAsync(id, {
        ...parsed.data,
        id: parsed.data.id || randomUUID().slice(0, 36),
        status: StatusEnum[parsed.data.status],
      });

      response.ok({ res, payload: updatedHistorico });
    } catch (error) {
      response.error({ res, error });
    }
  }

  static async deleteAsync(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const exists = await HistoricoModel.getByIdAsync(id);
      if (!exists) {
        response.error({ res, message: "Registro não encontrado", status: 404 });
        return;
      }

      await HistoricoModel.deleteAsync(id);

      response.ok({ res, payload: undefined });
    } catch (error) {
      response.error({ res, error });
    }
  }

  static async getByIdAsync(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const curso = await HistoricoModel.getByIdAsync(id);

      if (!curso) {
        response.error({ res, message: "Registro não encontrado", status: 404 });
        return;
      }

      response.ok({ res, payload: curso });
    } catch (error) {
      response.error({ res, error });
    }
  }
}
