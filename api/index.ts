import Fastify from "fastify";
import errorHandlerPlugin from "../src/shared/plugins/errorHandler.plugin";
import superPowerRoutes from "../src/features/super-power/superpower.route";
import multipart from "@fastify/multipart";
import superheroRoutes from "../src/features/superhero/superhero.route";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

async function start() {
  try {
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
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    });

    fastify.register(errorHandlerPlugin);
    await fastify.register(multipart, {
      limits: { fileSize: 5 * 1024 * 1024 },
    });

    // Register Swagger
    await fastify.register(swagger, {
      openapi: {
        info: {
          title: "Music Tracks API",
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

    fastify.register(superPowerRoutes, { prefix: "/api" });
    fastify.register(superheroRoutes, { prefix: "/api" });

    await fastify.listen({ port: 3000 });
  } catch (error) {
    console.log("Error starting server:", error);
    process.exit(1);
  }
}

start();
