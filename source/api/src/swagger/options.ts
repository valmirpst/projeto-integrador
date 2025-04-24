import { Options } from "swagger-jsdoc";
import { env } from "../env";

export const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Livraria API",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}/api`,
      },
    ],
  },
  apis: ["src/routes/*.ts"],
};
