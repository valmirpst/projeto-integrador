import cors from "cors";
import express, { Request, Response } from "express";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url";
import { env } from "./env";
import { handleErrorMiddleware } from "./middlewares/handle-error.middleware";
import { router } from "./routes";
import { swaggerOptions } from "./swagger/options";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "..", "public", "images")));

app.use("/api", router);

app.use(handleErrorMiddleware);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerOptions)));

app.get("/docs.json", (_: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerJSDoc(swaggerOptions));
});

const PORT = env.PORT;

app.listen({ port: PORT }, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
