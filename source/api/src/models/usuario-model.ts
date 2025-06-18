import { db } from "../core/database";
import { NotFoundError } from "../exceptions/errors";
import { IModel } from "../interfaces/i-model";
import { DeletableModelBase } from "./abstract/deletable-model-base";
import { CursoEntity } from "./entities/curso-entity";
import { UsuarioEntity } from "./entities/usuario-entity";
import { PerfilEnum, StatusEnum } from "./primitives/enumerations";

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

export class UsuarioModel extends DeletableModelBase implements IModel<UsuarioEntity> {
  protected tableName: string = "usuario";
  protected primaryKey: string = "id";

  async queryAsync(): Promise<UsuarioEntity[]> {
    const query = `
      SELECT ${this.tableName}.*, array_agg(usuario_curso.id_curso) as id_cursos
      FROM ${this.tableName}
      LEFT JOIN usuario_curso ON ${this.tableName}.id = usuario_curso.id_usuario
      WHERE status = '${StatusEnum.ativo}'
      GROUP BY ${this.tableName}.id
      ORDER BY ${this.tableName}.id ASC
    `;

    const res = await db.query<UsuarioEntity>(query);

    const usuarios = res.rows.map(usuario => ({
      ...usuario,
      ...perfilProperties[PerfilEnum[usuario.perfil]],
      id_cursos: usuario.id_cursos.filter(id => id != null) || [],
    }));

    return usuarios;
  }

  async createAsync(data: UsuarioEntity): Promise<UsuarioEntity> {
    const { id, ra, siape, nome, sobrenome, data_nasc, email, telefone, perfil, id_cursos } = data;

    const values = [id, ra, siape, nome, sobrenome, data_nasc, email, telefone, PerfilEnum[perfil]];

    const query = `
      INSERT INTO ${this.tableName}(id, ra, siape, nome, sobrenome, data_nasc, email, telefone, perfil)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
    `;

    const cursos = await db.query<CursoEntity>("SELECT id FROM curso");
    const cursoIds = cursos.rows.map((curso: { id: string }) => curso.id);

    if (id_cursos.length > 0) {
      id_cursos.forEach(id_curso => {
        if (id_curso && !cursoIds.includes(id_curso)) {
          throw new Error(`Curso com id ${id_curso} não encontrado.`);
        }
      });
    }

    const res = await db.query<UsuarioEntity>(query, values);

    const cursoQuery = `
      INSERT INTO usuario_curso(id_usuario, id_curso)
      VALUES($1, $2)
    `;

    id_cursos?.forEach(async id_curso => await db.query(cursoQuery, [id, id_curso]));

    return { ...res.rows[0], ...perfilProperties[perfil], id_cursos };
  }

  async updateAsync(id: string, data: UsuarioEntity): Promise<UsuarioEntity> {
    const { id: usuarioId, ra, siape, nome, sobrenome, data_nasc, email, telefone, perfil, id_cursos } = data;

    if (usuarioId !== id) {
      throw new Error("O id enviado no parâmetro é diferente do enviado no corpo da requisição.");
    }

    const values = [ra, siape, nome, sobrenome, data_nasc, email, telefone, PerfilEnum[perfil], id];

    const query = `
      UPDATE ${this.tableName}
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

    const res = await db.query<UsuarioEntity>(query, values);

    if (res.rows.length === 0) {
      throw new Error("Usuário não encontrado.");
    }

    const cursoDeleteQuery = `
      DELETE FROM usuario_curso
      WHERE id_usuario = $1
    `;
    await db.query(cursoDeleteQuery, [id]);

    const cursos = await db.query<CursoEntity>("SELECT id FROM curso");
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

  async queryByIdAsync(id: string): Promise<UsuarioEntity> {
    const query = `
      SELECT ${this.tableName}.*, array_agg(usuario_curso.id_curso) as id_cursos
      FROM ${this.tableName}
      LEFT JOIN usuario_curso ON ${this.tableName}.id = usuario_curso.id_usuario
      WHERE ${this.tableName}.id = $1
      GROUP BY ${this.tableName}.id
    `;
    const res = await db.query<UsuarioEntity>(query, [id]);

    if (res.rowCount === 0) throw new NotFoundError("Usuário não encontrado");

    const usuario = {
      ...res.rows[0],
      ...perfilProperties[PerfilEnum[res.rows[0].perfil]],
      id_cursos: res.rows[0].id_cursos.filter(id => id != null) || [],
    };

    return usuario;
  }
}
