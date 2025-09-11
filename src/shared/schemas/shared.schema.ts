export const idParamSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
};

export const errorSchema = {
  type: "object",
  properties: {
    error: { type: "string" },
  },
};
