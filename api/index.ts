import Fastify from "fastify";
import errorHandlerPlugin from "../src/shared/plugins/errorHandler.plugin";
import superPowerRoutes from "../src/features/super-power/superpower.route";
import multipart from "@fastify/multipart";
import superheroRoutes from "../src/features/superhero/superhero.route";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Fastify + Vercel</title>
  </head>
  <body>
    <h1>Fastify + Vercel</h1>
    <p>Serverless API is running!</p>
  </body>
</html>
`;

async function buildApp() {
  const fastify = Fastify({
    // logger: {
    //   level: "info",
    //   transport: {
    //     target: "pino-pretty",
    //     options: {
    //       translateTime: "HH:MM:ss Z",
    //       ignore: "pid,hostname",
    //     },
    //   },
    // },
    logger: true,
  });

  await fastify.register(cors, {
    origin: (origin, cb) => {
      cb(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });

  fastify.register(errorHandlerPlugin);
  await fastify.register(multipart, {
    limits: { fileSize: 5 * 1024 * 1024 },
  });

  // Register Swagger
  await fastify.register(swagger, {
    openapi: {
      info: {
        title: "Superheroes API",
        description: "API for managing superheroes",
        version: "1.0.0",
      },
    },
  });

  // Register Swagger UI
  await fastify.register(swaggerUi, {
    routePrefix: "/documentation",
    uiConfig: {
      docExpansion: "list",
      deepLinking: true,
    },
  });

  fastify.get("/", async (req, res) => {
    return res.status(200).type("text/html").send(html);
  });

  fastify.register(superPowerRoutes, { prefix: "/api" });
  fastify.register(superheroRoutes, { prefix: "/api" });

  await fastify.ready();
  return fastify;
}

const appPromise = buildApp();

export default async function handler(req: any, res: any) {
  const app = await appPromise;
  app.server.emit("request", req, res);
}
