import { RouteHandler } from "../../shared/types";
import { superPowerService } from "./superpower.service";
import {
  CreateSuperPowerRequest,
  DeleteSuperPowerRequest,
  GetSuperPowerByIdRequest,
} from "./superpower.type";

export const getSuperPowerByIdHandler: RouteHandler<
  GetSuperPowerByIdRequest
> = async (request, reply) => {
  const { id } = request.params;

  const superhero = await superPowerService.getById(Number(id));

  if (!superhero) {
    return reply.code(404).send({ error: "Superhero not found" });
  }

  return reply.code(200).send(superhero);
};

export const getAllSuperPowersHandler: RouteHandler = async (
  _request,
  reply
) => {
  const superPowers = await superPowerService.getAll();
  return reply.code(200).send(superPowers);
};

export const createSuperPowerHandler: RouteHandler<
  CreateSuperPowerRequest
> = async (request, reply) => {
  const { name } = request.body;
  const superPower = await superPowerService.create({ name });
  return reply.code(201).send(superPower);
};

export const deleteSuperPowerHandler: RouteHandler<
  DeleteSuperPowerRequest
> = async (request, reply) => {
  const { id } = request.params;

  await superPowerService.delete(Number(id));
  return reply.code(204).send();
};
