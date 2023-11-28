import { FastifyInstance } from "fastify";
import { getProfile } from "./user.controller";
import { userRef } from "./user.schema";

export const userRoutes = (server: FastifyInstance) => {
  server.get(
    "/profile",
    {
      schema: {
        response: {
          200: userRef("userResponseSchema"),
        },
      },
    },
    getProfile
  );
};
