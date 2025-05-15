import { db } from "../core/database";
import { UsuarioEntity } from "./entities/usuario-entity";
import { PerfilEnum } from "./primitives/enumerations";

const perfilProperties: Record<
  string,
  {
    tempo_emprestimo_dias: number;
    valor_multa_dia: number;
  }
> = {
  "0": {
    tempo_emprestimo_dias: 30,
    valor_multa_dia: 5,
  },
  "1": {
    tempo_emprestimo_dias: 7,
    valor_multa_dia: 2,
  },
  "2": {
    tempo_emprestimo_dias: 14,
    valor_multa_dia: 7,
  },
};

export class UsuarioModel {
  static async getAsync() {
    const query = `
      SELECT * FROM usuario
    `;

    const res = await db.query(query);

    const usuarios = res.rows.map(usuario => ({ ...usuario, ...perfilProperties[PerfilEnum[usuario.perfil]] }));

    return usuarios;
  }

  static async postAsync(usuario: UsuarioEntity) {
    const { id, ra, siape, nome, sobrenome, data_nasc, email, telefone, perfil } = usuario;

    const values = [id, ra, siape, nome, sobrenome, data_nasc, email, telefone, PerfilEnum[perfil]];

    const query = `
      INSERT INTO usuario(id, ra, siape, nome, sobrenome, data_nasc, email, telefone, perfil)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
    `;

    const res = await db.query(query, values);

    return { ...res.rows[0], ...perfilProperties[perfil] };
  }

  static async putAsync(id: string, usuario: UsuarioEntity) {
    const { id: usuarioId, ra, siape, nome, sobrenome, data_nasc, email, telefone, perfil } = usuario;

    if (usuarioId !== id) {
      throw new Error("O id enviado no parâmetro é diferente do enviado no corpo da requisição.");
    }

    const values = [ra, siape, nome, sobrenome, data_nasc, email, telefone, PerfilEnum[perfil], id];

    const query = `
      UPDATE usuario
      SET
        ra = $1,
        siape = $2,
        nome = $3,
        sobrenome = $4,
        data_nasc = $5,
        email = $6,
        telefone = $7,
        perfil = $8
      WHERE id = $9
      RETURNING *
  `;

    const res = await db.query(query, values);

    return { ...res.rows[0], ...perfilProperties[PerfilEnum[res.rows[0].perfil]] };
  }

  static async deleteAsync(id: string) {
    const values = [id];

    const query = `
      DELETE FROM usuario
      WHERE id = $1
    `;

    const res = await db.query(query, values);
    return res.rows[0];
  }

  static async getByIdAsync(id: UsuarioEntity["id"]): Promise<UsuarioEntity | undefined> {
    const query = "SELECT * FROM usuario WHERE id = $1";
    const res = await db.query(query, [id]);

    if (res.rows.length === 0) return undefined;

    const usuario = { ...res.rows[0], ...perfilProperties[PerfilEnum[res.rows[0].perfil]] };

    return usuario;
  }
}
