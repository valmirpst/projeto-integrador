import jwt from "jsonwebtoken";
import { env } from "../env";
import { UnauthorizedError } from "../exceptions/errors";
import { PerfilEnum } from "../models/primitives/enumerations";
import { AuthSchema } from "../models/schemas/auth.schema";
import { UsuarioService } from "./usuario.service";

const adminUser = {
  id: "1",
  nome: "Usuário ROOT",
  sobrenome: "",
  email: env.ADMIN_EMAIL,
  senha: env.ADMIN_PASSWORD,
  data_nasc: "2000-01-01",
  perfil: PerfilEnum.bibliotecario,
  telefone: "999999999",
  id_cursos: [],
};

export class AuthService {
  async login({ email, senha }: AuthSchema) {
    const usuarioService = new UsuarioService();

    if (email === env.ADMIN_EMAIL && senha === env.ADMIN_PASSWORD) {
      const exists = await usuarioService.getAsync({ email: env.ADMIN_EMAIL });
      if (!exists || exists.length === 0) {
        await usuarioService.createAsync(adminUser);
      }
      const token = jwt.sign({ id: adminUser.id, nome: adminUser.nome, email: adminUser.email }, env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return { token };
    }

    const data = await usuarioService.getAsync({ email });

    if (data.length === 0) {
      throw new Error("Credenciais inválidas");
    }

    const user = data[0];

    if (email !== user.email || senha !== user.senha) {
      throw new UnauthorizedError("Email ou senha inválidos");
    }

    const token = jwt.sign({ id: user.id, nome: user.nome, email: user.email }, env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return { token };
  }
}
