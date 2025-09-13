import { RouteHandler } from "../../shared/types";
import { superheroService } from "./superhero.service";
import {
  CreateSuperheroReqeust,
  DeleteSuperheroImageRequest,
  DeleteSuperheroRequest,
  GetPaginatedSuperheroesRequest,
  GetSuperheroByIdRequest,
  UpdateSuperheroReqeust,
  UploadSuperheroImagesRequest,
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

export const getPaginatedSuperheroesHandler: RouteHandler<
  GetPaginatedSuperheroesRequest
> = async (request, reply) => {
  const { page, limit, sortBy, order } = request.query;

  const result = await superheroService.getPaginatedSuperheroes({
    page: page ? Number(page) : undefined,
    limit: limit ? Number(limit) : undefined,
    sortBy,
    order,
  });

  return reply.code(200).send(result);
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

export const uploadSuperheroImagesHandler: RouteHandler<
  UploadSuperheroImagesRequest
> = async (request, reply) => {
  const { id } = request.params;

  const files = await request.files();
  if (!files) {
    return reply.code(400).send({ error: "No files provided" });
  }

  const images = await superheroService.uploadImages(Number(id), files);

  return reply.code(201).send({ images });
};

export const deleteSuperheroImageHandler: RouteHandler<
  DeleteSuperheroImageRequest
> = async (request, reply) => {
  const { imageId } = request.params;

  await superheroService.deleteImage(Number(imageId));

  return reply.code(204).send();
};
