import { LivroEntity } from "../models/entities/livro-entity";
import { livroSchema } from "../models/schemas/livro-schema";
import { LivroService } from "../services/livro-service";
import { ControllerBase } from "./abstract/controller-base";

export class LivroController extends ControllerBase<LivroEntity> {
  protected service = new LivroService();
  protected schema = livroSchema;
  protected idParam: string = "isbn";
}
