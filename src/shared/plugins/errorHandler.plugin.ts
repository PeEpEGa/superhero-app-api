import fp from "fastify-plugin";
import {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { Prisma } from "@prisma/client";

export default fp(async function errorHandler(fastify: FastifyInstance) {
  fastify.setErrorHandler(
    (error: FastifyError, _request: FastifyRequest, reply: FastifyReply) => {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2002": // Unique constraint failed
            return reply.status(400).send({
              error: "Unique constraint failed",
            });

          case "P2025": // Record not found
            return reply.status(404).send({ error: `Resource not found` });
        }
      }
      if (error instanceof Error && error.message.startsWith("Validation:")) {
        return reply.status(400).send({ error: error.message });
      }

      fastify.log.error(error);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  );
});
