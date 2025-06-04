import { CategoriaEnum } from "./enumerations";

export const transformCategory = (category: CategoriaEnum): string => {
  switch (category) {
    case CategoriaEnum.subcategoria:
      return "subcategoria";
    case CategoriaEnum.categoria:
      return "categoria";
  }
};
