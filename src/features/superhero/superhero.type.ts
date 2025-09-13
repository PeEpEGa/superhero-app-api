import { HeroType, Prisma } from "@prisma/client";
import { RequestGenericInterface } from "fastify";
import { IdParam } from "../../shared/types";

export type SuperheroData = Prisma.SuperheroGetPayload<{
  include: { superPowers: true; images: true };
}>;

export interface GetSuperheroByIdRequest extends RequestGenericInterface {
  Params: IdParam;
}

export interface CreateSuperheroReqeust extends RequestGenericInterface {
  Body: CreateSuperheroDto;
}

export interface CreateSuperheroDto {
  nickname: string;
  realName?: string | null;
  originDescription: string;
  catchPhrase?: string | null;
  type: HeroType;
  //   superPowers?: number[];
  superPowers?: {
    superPowerIdsToAdd?: number[];
    newSuperPowers?: { name: string }[];
  };
}

export interface UpdateSuperheroDto {
  nickname?: string;
  realName?: string | null;
  originDescription?: string;
  catchPhrase?: string | null;
  type?: HeroType;
  //   superPowers?: number[];
  superPowers?: {
    superPowerIdsToAdd?: number[];
    superPowerIdsToRemove?: number[];
    newSuperPowers?: { name: string }[];
    replaceSuperPowerIds?: number[];
  };
}

export interface UpdateSuperheroReqeust {
  Params: IdParam;
  Body: UpdateSuperheroDto;
}

export interface DeleteSuperheroRequest {
  Params: IdParam;
}
