import { db } from "../core/database";
import { IModel } from "../interfaces/i-model";
import { QueryableModelBase } from "./abstract/queryable-model-base";
import { CursoEntity } from "./entities/curso-entity";
import { UsuarioEntity } from "./entities/usuario-entity";
import { PerfilEnum } from "./primitives/enumerations";

const perfilProperties: Record<
  string,
  {
    tempo_emprestimo_dias: number;
    valor_multa_dia: number;
  }
> = {
  aluno: {
    tempo_emprestimo_dias: 14,
    valor_multa_dia: 1,
  },
  bibliotecario: {
    tempo_emprestimo_dias: 30,
    valor_multa_dia: 1,
  },
  professor: {
    tempo_emprestimo_dias: 30,
    valor_multa_dia: 1,
  },
};

export class UsuarioModel extends QueryableModelBase<UsuarioEntity> implements IModel<UsuarioEntity> {
  protected tableName: string = "usuario";
  protected primaryKey: string = "id";

  override async queryAsync(queryParams?: Record<string, any> | undefined): Promise<UsuarioEntity[]> {
    const data = await super.queryAsync(queryParams);

    const id_cursos = await db.query(`
      SELECT id_usuario, array_agg(id_curso) as id_cursos
      FROM usuario_curso
      JOIN usuario ON usuario.id = usuario_curso.id_usuario
      GROUP BY id_usuario
      ORDER BY id_usuario ASC
    `);

    const usuarios = data.map(usuario => ({
      ...usuario,
      ...perfilProperties[PerfilEnum[usuario.perfil]],
      id_cursos: id_cursos.rows.find(row => row.id_usuario === usuario.id)?.id_cursos || [],
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
    const { id: usuarioId, ra, siape, nome, sobrenome, data_nasc, email, telefone, perfil, id_cursos, status } = data;

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
        ${status != undefined ? `, status = '${status}'` : ""}
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

  override async queryByIdAsync(id: string): Promise<UsuarioEntity> {
    const data = await super.queryByIdAsync(id);

    const id_cursos = await db.query(
      `
      SELECT id_usuario, array_agg(id_curso) as id_cursos
      FROM usuario_curso
      WHERE id_usuario = $1
      GROUP BY id_usuario
      ORDER BY id_usuario ASC
    `,
      [id]
    );

    const usuario = { ...data, ...perfilProperties[PerfilEnum[data.perfil]], id_cursos: id_cursos.rows[0]?.id_cursos || [] };

    return usuario;
  }
}
