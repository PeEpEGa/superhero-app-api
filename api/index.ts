import Fastify from "fastify";

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
