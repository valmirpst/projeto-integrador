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
      SELECT usuario.*, array_agg(usuario_curso.id_curso) as id_cursos
      FROM usuario
      LEFT JOIN usuario_curso ON usuario.id = usuario_curso.id_usuario
      GROUP BY usuario.id
      ORDER BY usuario.id ASC
    `;

    const res = await db.query(query);

    const usuarios = res.rows.map(usuario => ({
      ...usuario,
      ...perfilProperties[PerfilEnum[usuario.perfil]],
      id_cursos: usuario.id_cursos.filter((id: string) => id != null) || [],
    }));

    return usuarios;
  }

  static async postAsync(usuario: UsuarioEntity) {
    const { id, ra, siape, nome, sobrenome, data_nasc, email, telefone, perfil, id_cursos } = usuario;

    const values = [id, ra, siape, nome, sobrenome, data_nasc, email, telefone, PerfilEnum[perfil]];

    const query = `
      INSERT INTO usuario(id, ra, siape, nome, sobrenome, data_nasc, email, telefone, perfil)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
    `;

    const cursos = await db.query("SELECT id FROM curso");
    const cursoIds = cursos.rows.map((curso: { id: string }) => curso.id);

    if (id_cursos.length > 0) {
      id_cursos.forEach(id_curso => {
        if (id_curso && !cursoIds.includes(id_curso)) {
          throw new Error(`Curso com id ${id_curso} não encontrado.`);
        }
      });
    }

    const res = await db.query(query, values);

    const cursoQuery = `
      INSERT INTO usuario_curso(id_usuario, id_curso)
      VALUES($1, $2)
    `;

    id_cursos?.forEach(async id_curso => await db.query(cursoQuery, [id, id_curso]));

    return { ...res.rows[0], ...perfilProperties[perfil], id_cursos };
  }

  static async putAsync(id: string, usuario: UsuarioEntity) {
    const { id: usuarioId, ra, siape, nome, sobrenome, data_nasc, email, telefone, perfil, id_cursos } = usuario;

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

    if (res.rows.length === 0) {
      throw new Error("Usuário não encontrado.");
    }

    const cursoDeleteQuery = `
        DELETE FROM usuario_curso
        WHERE id_usuario = $1
      `;
    await db.query(cursoDeleteQuery, [id]);

    const cursos = await db.query("SELECT id FROM curso");
    const cursoIds = cursos.rows.map((curso: { id: string }) => curso.id);

    if (id_cursos.length > 0) {
      id_cursos.forEach(id_curso => {
        if (id_curso && !cursoIds.includes(id_curso)) {
          throw new Error(`Curso com id ${id_curso} não encontrado.`);
        }
      });

      const cursoQuery = `
        INSERT INTO usuario_curso(id_usuario, id_curso)
        VALUES($1, $2)
      `;

      id_cursos.forEach(async id_curso => {
        await db.query(cursoQuery, [id, id_curso]);
      });
    }

    return { ...res.rows[0], ...perfilProperties[PerfilEnum[res.rows[0].perfil]], id_cursos: id_cursos || [] };
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
    const query = `
      SELECT usuario.*, array_agg(usuario_curso.id_curso) as id_cursos
      FROM usuario
      LEFT JOIN usuario_curso ON usuario.id = usuario_curso.id_usuario
      WHERE usuario.id = $1
      GROUP BY usuario.id
    `;
    const res = await db.query(query, [id]);

    if (res.rows.length === 0) return undefined;

    const usuario = {
      ...res.rows[0],
      ...perfilProperties[PerfilEnum[res.rows[0].perfil]],
      id_cursos: res.rows[0].id_cursos.filter((id: string) => id != null) || [],
    };

    return usuario;
  }
}
