import Fastify from "fastify";
import errorHandlerPlugin from "../src/shared/plugins/errorHandler.plugin";
import superPowerRoutes from "../src/features/super-power/superpower.route";
import multipart from "@fastify/multipart";
import superheroRoutes from "../src/features/superhero/superhero.route";

async function start() {
  try {
    const fastify = Fastify({
      logger: {
        level: "info",
        transport: {
          target: "pino-pretty",
          options: {
            translateTime: "HH:MM:ss Z",
            ignore: "pid,hostname",
          },
        },
      },
      //   logger: true,
    });

    fastify.register(errorHandlerPlugin);
    await fastify.register(multipart, {
      limits: { fileSize: 5 * 1024 * 1024 },
      // attachFieldsToBody: true,
    });
    fastify.register(superPowerRoutes, { prefix: "/api" });
    fastify.register(superheroRoutes, { prefix: "/api" });

    fastify.get("/", async function handler(request, reply) {
      return { hello: "world" };
    });

    await fastify.listen({ port: 3000 });
  } catch (error) {
    console.log("Error starting server:", error);
    process.exit(1);
  }
}

start();
