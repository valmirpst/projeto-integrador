import { config } from "dotenv";
import z from "zod";

config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  POSTGRES_URL: z.string().url(),
  JWT_SECRET: z.string(),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string().max(100),
  EMAIL_HOST: z.string().email(),
  EMAIL_PASS: z.string().max(100),
});

export const env = envSchema.parse(process.env);
