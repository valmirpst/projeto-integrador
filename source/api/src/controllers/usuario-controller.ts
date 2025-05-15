import { Request, Response } from "express";
import { response } from "../core/response";
import { PerfilEnum } from "../models/primitives/enumerations";
import { usuarioSchema } from "../models/schemas/usuario-schema";
import { UsuarioModel } from "../models/usuario-model";

export class UsuarioController {
  static async getAsync(_: Request, res: Response) {
    try {
      const usuarios = await UsuarioModel.getAsync();
      response.ok({ res, status: 200, payload: usuarios });
    } catch (error) {
      response.error({ res, error });
    }
  }

  static async postAsync(req: Request, res: Response) {
    try {
      const usuario = req.body;
      const parsed = usuarioSchema.safeParse(usuario);

      if (parsed.success === false) {
        response.error({ res, status: 400, message: "Dados inválidos", error: { ...parsed.error } });
        return;
      }

      const novoUsuario = await UsuarioModel.postAsync({ ...parsed.data, perfil: PerfilEnum[parsed.data.perfil] as PerfilEnum });

      response.ok({ res, status: 201, payload: novoUsuario });
    } catch (error) {
      response.error({ res, error });
    }
  }

  static async putAsync(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const novoUsuario = req.body;
      const parsed = usuarioSchema.safeParse(novoUsuario);

      const exists = await UsuarioModel.getByIdAsync(id);
      if (!exists) {
        response.error({ res, message: "Registro não encontrado" });
        return;
      }

      if (parsed.success === false) {
        response.error({ res, status: 400, message: "Dados inválidos", error: { ...parsed.error } });
        return;
      }

      const updatedUsuario = await UsuarioModel.putAsync(id, {
        ...parsed.data,
        perfil: PerfilEnum[parsed.data.perfil] as PerfilEnum,
      });

      response.ok({ res, payload: updatedUsuario });
    } catch (error) {
      response.error({ res, error });
    }
  }

  static async deleteAsync(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const exists = await UsuarioModel.getByIdAsync(id);
      if (!exists) {
        response.error({ res, message: "Usuário não encontrado", status: 404 });
        return;
      }

      await UsuarioModel.deleteAsync(id);

      response.ok({ res, payload: undefined });
    } catch (error) {
      response.error({ res, error });
    }
  }

  static async getByIdAsync(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const usuario = await UsuarioModel.getByIdAsync(id);

      if (!usuario) {
        response.error({ res, message: "Usuário não encontrado", status: 404 });
        return;
      }

      response.ok({ res, payload: usuario });
    } catch (error) {
      response.error({ res, error });
    }
  }
}
