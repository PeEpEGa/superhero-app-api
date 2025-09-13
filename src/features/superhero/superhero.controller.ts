import { RouteHandler } from "../../shared/types";
import { superheroService } from "./superhero.service";
import {
  CreateSuperheroReqeust,
  DeleteSuperheroRequest,
  GetSuperheroByIdRequest,
  UpdateSuperheroReqeust,
} from "./superhero.type";

export const getSuperheroByIdHandler: RouteHandler<
  GetSuperheroByIdRequest
> = async (request, reply) => {
  const { id } = request.params;

  const superPower = await superheroService.getById(Number(id));

  if (!superPower) {
    return reply.code(404).send({ error: "Superhero not found" });
  }

  return reply.code(200).send(superPower);
};

export const getAllSuperheroesHandler: RouteHandler = async (
  _request,
  reply
) => {
  const superheroes = await superheroService.getAll();

  return reply.code(200).send(superheroes);
};

export const createSuperheroHandler: RouteHandler<
  CreateSuperheroReqeust
> = async (request, reply) => {
  const data = request.body;
  const superhero = await superheroService.create(data);
  return reply.code(201).send(superhero);
};

export const updateSuperheroHandler: RouteHandler<
  UpdateSuperheroReqeust
> = async (request, reply) => {
  const { id } = request.params;
  const data = request.body;
  const updatedSuperhero = await superheroService.update(Number(id), data);
  return reply.code(200).send(updatedSuperhero);
};

export const deleteSuperheroHandler: RouteHandler<
  DeleteSuperheroRequest
> = async (request, reply) => {
  const { id } = request.params;
  await superheroService.delete(Number(id));
  return reply.code(204).send();
};

// export const uploadSuperheroImagesHandler: RouteHandler
