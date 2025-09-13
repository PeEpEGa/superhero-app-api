import { Prisma, Superhero } from "@prisma/client";
import { prisma } from "../../shared/db/prisma";
import {
  CreateSuperheroDto,
  SuperheroData,
  UpdateSuperheroDto,
} from "./superhero.type";
import { uploadService } from "../../shared/services/upload.service";
import { buffer } from "stream/consumers";
import { connect } from "http2";

export const superheroService = {
  async getById(id: number): Promise<SuperheroData | null> {
    return await prisma.superhero.findUnique({
      where: { id },
      include: { superPowers: true, images: true },
    });
  },

  async getAll(): Promise<SuperheroData[]> {
    return await prisma.superhero.findMany({
      include: { superPowers: true, images: true },
    });
  },

  async create(data: CreateSuperheroDto): Promise<SuperheroData> {
    return prisma.superhero.create({
      data: {
        nickname: data.nickname,
        realName: data.realName,
        originDescription: data.originDescription,
        catchPhrase: data.catchPhrase,
        type: data.type,
        // superPowers: { connect: data.superPowers?.map((id) => ({ id })) },
        superPowers: data.superPowers
          ? {
              connect: data.superPowers.superPowerIdsToAdd?.map((id) => ({
                id,
              })),
              create: data.superPowers.newSuperPowers,
            }
          : undefined,
      },
      include: { superPowers: true, images: true },
    });
  },

  async update(id: number, data: UpdateSuperheroDto): Promise<SuperheroData> {
    return prisma.superhero.update({
      where: { id },
      data: {
        nickname: data.nickname,
        realName: data.realName,
        originDescription: data.originDescription,
        catchPhrase: data.catchPhrase,
        type: data.type,
        // superPowers: { connect: data.superPowers?.map((id) => ({ id })) },
        superPowers: data.superPowers
          ? {
              connect: data.superPowers.superPowerIdsToAdd?.map((id) => ({
                id,
              })),
              disconnect: data.superPowers.superPowerIdsToRemove?.map((id) => ({
                id,
              })),
              create: data.superPowers.newSuperPowers,
              set: data.superPowers.replaceSuperPowerIds?.map((id) => ({ id })),
            }
          : undefined,
      },
      include: { superPowers: true, images: true },
    });
  },

  async delete(id: number): Promise<Superhero> {
    return prisma.superhero.delete({ where: { id } });
  },

  async uploadImages(
    superheroId: number,
    files: { buffer: Buffer; originalName: string }[]
  ) {
    const urls = await uploadService.uploadFiles(
      files.map((file) => ({
        buffer: file.buffer,
        originalName: file.originalName,
      })),
      "superheroes"
    );

    const images = await Promise.all(
      urls.map((url) => {
        return prisma.superheroImage.create({
          // <-- add return
          data: { superheroId, url },
        });
      })
    );

    return images;
  },

  async deleteImage(id: number) {
    return prisma.superheroImage.delete({ where: { id } });
  },
};
