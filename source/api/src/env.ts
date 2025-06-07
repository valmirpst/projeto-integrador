import { config } from "dotenv";
import z from "zod";

config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  POSTGRES_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
