import { z } from "zod";

export const livroSchema = z.object({
  isbn: z.string(),
});
