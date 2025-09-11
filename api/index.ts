import Fastify from "fastify";
import errorHandlerPlugin from "../src/shared/plugins/errorHandler.plugin";
import superPowerRoutes from "../src/features/super-power/superpower.route";

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
    fastify.register(superPowerRoutes, { prefix: "/api" });

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
