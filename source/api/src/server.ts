import cors from "cors";
import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { env } from "./env";
import { router } from "./routes";
import { swaggerOptions } from "./swagger/options";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerOptions)));

const PORT = env.PORT;

app.listen({ port: PORT }, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
