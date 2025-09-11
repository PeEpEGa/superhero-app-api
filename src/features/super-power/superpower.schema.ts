export const superPowerSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
  },
  required: ["id", "name"],
};

export const superPowerArraySchema = {
  type: "array",
  items: superPowerSchema,
};

export const createSuperPowerBodySchema = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: ["name"],
};
