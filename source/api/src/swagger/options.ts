import { Options } from "swagger-jsdoc";
import { env } from "../env";

export const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Livraria API Docs",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}/api`,
      },
    ],
  },
  apis: ["src/routes/*.ts"],
};
