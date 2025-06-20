import { Request, Response } from "express";
import { Schema } from "zod";
import { IEntityService } from "../../interfaces/i-service";

export abstract class ControllerBase<TEntity, TSchema = Schema<TEntity>> {
  protected abstract service: IEntityService<TEntity>;
  protected abstract schema: TSchema;
  protected abstract idParam: string;

  async getAsync(req: Request, res: Response) {
    const queryParams = req.query;
    const data = await this.service.getAsync(queryParams);
    res.status(200).json({ success: true, data });
  }

  async createAsync(req: Request, res: Response) {
    const data = await this.service.createAsync(req.body);
    res.status(201).json({ success: true, data });
  }

  async updateAsync(req: Request, res: Response) {
    const id = req.params[this.idParam];
    const data = await this.service.updateAsync(id, req.body);
    res.status(200).json({ success: true, data });
  }

  async deleteAsync(req: Request, res: Response) {
    const id = req.params[this.idParam];
    await this.service.deleteAsync(id);
    res.status(200).json({ success: true });
  }

  async getByIdAsync(req: Request, res: Response) {
    const id = req.params[this.idParam];
    const data = await this.service.getByIdAsync(id);
    res.status(200).json({ success: true, data });
  }
}
