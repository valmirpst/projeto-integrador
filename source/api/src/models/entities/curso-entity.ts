export class CursoEntity {
  public id!: string;
  nome!: string;

  constructor(curso: CursoEntity) {
    Object.assign(this, curso);
  }
}
