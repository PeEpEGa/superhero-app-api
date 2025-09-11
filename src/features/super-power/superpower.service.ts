import { Prisma, SuperPower } from "@prisma/client";
import { prisma } from "../../shared/db/prisma";

export const superPowerService = {
  async getById(id: number): Promise<SuperPower | null> {
    return await prisma.superPower.findUnique({ where: { id } });
  },

  async getAll(): Promise<SuperPower[]> {
    return await prisma.superPower.findMany();
  },

  async create(data: Prisma.SuperPowerCreateInput): Promise<SuperPower> {
    if (!data.name || data.name.trim() === "") {
      throw new Error("Validation: SuperPower name cannot be empty");
    }

    return await prisma.superPower.create({ data });
  },

  async update(
    id: number,
    data: Prisma.SuperPowerUpdateInput
  ): Promise<SuperPower> {
    return await prisma.superPower.update({
      where: { id },
      data,
    });
  },

  async delete(id: number): Promise<SuperPower> {
    return await prisma.superPower.delete({ where: { id } });
  },
};
