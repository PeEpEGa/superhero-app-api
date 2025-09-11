import { FastifyInstance } from "fastify";
import {
  createSuperPowerHandler,
  deleteSuperPowerHandler,
  getAllSuperPowersHandler,
  getSuperPowerByIdHandler,
} from "./superpower.controller";
import {
  createSuperPowerBodySchema,
  superPowerArraySchema,
  superPowerSchema,
} from "./superpower.schema";
import { errorSchema, idParamSchema } from "../../shared/schemas/shared.schema";

export default async function superPowerRoutes(fastify: FastifyInstance) {
  fastify.get("/super-powers", {
    schema: {
      description: "Get all super powers",
      tags: ["super-powers"],
      response: {
        200: superPowerArraySchema,
        500: errorSchema,
      },
    },
    handler: getAllSuperPowersHandler,
  });

  fastify.get("/super-powers/:id", {
    schema: {
      description: "Get a super power by ID",
      tags: ["super-powers"],
      params: idParamSchema,
      response: {
        200: superPowerSchema,
        404: errorSchema,
        500: errorSchema,
      },
    },
    handler: getSuperPowerByIdHandler,
  });

  fastify.post("/super-powers", {
    schema: {
      description: "Create a new super power",
      tags: ["super-powers"],
      body: createSuperPowerBodySchema,
      response: {
        201: superPowerSchema,
        400: errorSchema,
        500: errorSchema,
      },
    },
    handler: createSuperPowerHandler,
  });

  fastify.delete("/super-powers/:id", {
    schema: {
      description: "Delete a super power",
      tags: ["super-powers"],
      params: idParamSchema,
      response: {
        204: { type: "null" },
        404: errorSchema,
        500: errorSchema,
      },
    },
    handler: deleteSuperPowerHandler,
  });
}
