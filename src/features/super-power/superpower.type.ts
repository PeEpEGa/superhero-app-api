import { RequestGenericInterface } from "fastify";
import { IdParam } from "../../shared/types";

export interface GetSuperPowerByIdRequest extends RequestGenericInterface {
  Params: IdParam;
}

export interface CreateSuperPowerRequest extends RequestGenericInterface {
  Body: CreateSuperPowerDto;
}

export interface DeleteSuperPowerRequest extends RequestGenericInterface {
  Params: IdParam;
}

interface CreateSuperPowerDto {
  name: string;
}
