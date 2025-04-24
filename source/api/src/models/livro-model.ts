import { db } from "../core/database";

export const LivroModel = {
  getAsync: async () => {
    try {
      const query = "SELECT * FROM livro";
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
};
