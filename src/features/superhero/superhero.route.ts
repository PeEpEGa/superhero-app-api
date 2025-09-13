import { FastifyInstance } from "fastify";
import { errorSchema, idParamSchema } from "../../shared/schemas/shared.schema";
import {
  createSuperheroHandler,
  deleteSuperheroHandler,
  getAllSuperheroesHandler,
  getSuperheroByIdHandler,
  updateSuperheroHandler,
} from "./superhero.controller";
import {
  createSuperHeroBodySchema,
  superHeroArraySchema,
  superHeroSchema,
  updateSuperHeroBodySchema,
} from "./superhero.schema";

export default async function superheroRoutes(fastify: FastifyInstance) {
  fastify.get("/superheroes", {
    schema: {
      description: "Get all superheroes",
      tags: ["superheroes"],
      response: {
        200: superHeroArraySchema,
        500: errorSchema,
      },
    },
    handler: getAllSuperheroesHandler,
  });

  fastify.get("/superheroes/:id", {
    schema: {
      description: "Get a superhero by ID",
      tags: ["superheroes"],
      params: idParamSchema,
      response: {
        200: superHeroSchema,
        404: errorSchema,
        500: errorSchema,
      },
    },
    handler: getSuperheroByIdHandler,
  });

  fastify.post("/superheroes", {
    schema: {
      description: "Create a new superhero",
      tags: ["superheroes"],
      body: createSuperHeroBodySchema,
      response: {
        201: superHeroSchema,
        400: errorSchema,
        500: errorSchema,
      },
    },
    handler: createSuperheroHandler,
  });

  fastify.put("/superheroes/:id", {
    schema: {
      description: "Update a superhero by ID",
      tags: ["superheroes"],
      params: idParamSchema,
      body: updateSuperHeroBodySchema,
      response: {
        200: superHeroSchema,
        400: errorSchema,
        404: errorSchema,
        500: errorSchema,
      },
    },
    handler: updateSuperheroHandler,
  });

  fastify.delete("/superheroes/:id", {
    schema: {
      description: "Delete a superhero by ID",
      tags: ["superheroes"],
      params: idParamSchema,
      response: {
        204: { type: "null" },
        404: errorSchema,
        500: errorSchema,
      },
    },
    handler: deleteSuperheroHandler,
  });
}
