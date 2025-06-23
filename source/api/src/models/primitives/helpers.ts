import { CategoriaEnum } from "./enumerations";

export const transformCategory = (category: CategoriaEnum): string => {
  switch (category) {
    case CategoriaEnum.subcategoria:
      return "subcategoria";
    case CategoriaEnum.categoria:
      return "categoria";
  }
};

export const perfilProperties: Record<
  "aluno" | "bibliotecario" | "professor",
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
