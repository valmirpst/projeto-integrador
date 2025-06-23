import { Pool, QueryConfig, QueryResultRow } from "pg";
import { env } from "../env";

const pool = new Pool({
  connectionString: env.POSTGRES_URL,
});

pool.on("connect", () => {
  console.log("Base de Dados conectada com sucesso!");
});

pool.on("error", err => {
  console.error("Erro na conexão com o banco de dados:", err.message);
});

// Testar a conexão ao iniciar a api
(async () => {
  try {
    await pool.query("SELECT 1");
  } catch (err: any) {
    console.error("Não foi possível conectar ao banco de dados:", err.message || err.code);
  }
})();

export const db = {
  query: <TEntity extends QueryResultRow>(text: string | QueryConfig, params?: QueryConfig["values"]) =>
    pool.query<TEntity>(text, params),
};
