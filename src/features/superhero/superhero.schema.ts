export const superHeroSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    nickname: { type: "string" },
    realName: { type: "string", nullable: true },
    originDescription: { type: "string" },
    catchPhrase: { type: "string", nullable: true },
    type: { type: "string", enum: ["HERO", "VILLAIN"] },
    createdAt: { type: "string" },
    superPowers: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "number" },
          name: { type: "string" },
        },
        required: ["id", "name"],
      },
    },
    images: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "number" },
          url: { type: "string" },
          uploadedAt: { type: "string" },
          superheroId: { type: "number" },
        },
        nullable: true,
        required: ["id", "url", "uploadedAt", "superheroId"],
      },
    },
  },
  required: [
    "id",
    "nickname",
    "originDescription",
    "type",
    "createdAt",
    "superPowers",
    "images",
  ],
};

export const superHeroArraySchema = {
  type: "array",
  items: superHeroSchema,
};

export const createSuperHeroBodySchema = {
  type: "object",
  properties: {
    nickname: { type: "string" },
    realName: { type: "string", nullable: true },
    originDescription: { type: "string" },
    catchPhrase: { type: "string", nullable: true },
    type: { type: "string", enum: ["HERO", "VILLAIN"] },
    superPowers: {
      type: "object",
      properties: {
        superPowerIdsToAdd: { type: "array", items: { type: "number" } },
        newSuperPowers: {
          type: "array",
          items: {
            type: "object",
            properties: { name: { type: "string" } },
            required: ["name"],
          },
        },
      },
      additionalProperties: false,
    },
  },
  required: ["nickname", "originDescription", "type"],
  additionalProperties: false,
};

export const updateSuperHeroBodySchema = {
  type: "object",
  properties: {
    nickname: { type: "string" },
    realName: { type: "string", nullable: true },
    originDescription: { type: "string" },
    catchPhrase: { type: "string", nullable: true },
    type: { type: "string", enum: ["HERO", "VILLAIN"] },
    superPowers: {
      type: "object",
      properties: {
        superPowerIdsToAdd: { type: "array", items: { type: "number" } },
        superPowerIdsToRemove: { type: "array", items: { type: "number" } },
        newSuperPowers: {
          type: "array",
          items: {
            type: "object",
            properties: { name: { type: "string" } },
            required: ["name"],
          },
        },
        replaceSuperPowerIds: { type: "array", items: { type: "number" } },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
};
