import { Superhero } from "@prisma/client";
import { prisma } from "../../shared/db/prisma";
import {
  CreateSuperheroDto,
  SuperheroData,
  UpdateSuperheroDto,
} from "./superhero.type";
import { uploadService } from "../../shared/services/upload.service";
import { streamToBuffer } from "../../shared/utils/streamToBuffer";
import { MultipartFile } from "@fastify/multipart";

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
    files: AsyncIterableIterator<MultipartFile>
  ) {
    const fileBuffers: { buffer: Buffer; originalName: string }[] = [];

    for await (const file of files) {
      const buffer = await streamToBuffer(file.file);
      fileBuffers.push({ buffer, originalName: file.filename });
    }

    const urls = await uploadService.uploadFiles(fileBuffers, "superheroes");

    const images = await Promise.all(
      urls.map((url) =>
        prisma.superheroImage.create({
          data: {
            superheroId,
            url,
          },
        })
      )
    );

    return images;
  },

  async deleteImage(id: number) {
    return prisma.superheroImage.delete({ where: { id } });
  },
};
