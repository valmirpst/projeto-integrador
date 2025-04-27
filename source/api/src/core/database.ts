import { Pool, QueryConfig } from "pg";
import { env } from "../env";

const pool = new Pool({
  connectionString: env.POSTGRES_URL,
});

pool.on("connect", () => {
  console.log("Base de Dados conectado com sucesso!");
});

export const db = {
  query: (text: string | QueryConfig, params?: QueryConfig["values"]) => pool.query(text, params),
};
