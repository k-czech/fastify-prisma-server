import { FastifyInstance } from "fastify";
import { getProfile, updateProfile } from "./user.controller";
import { userRef } from "./user.schema";
import { authenticateToken } from "../../middlewares/authenticateToken";

export const userRoutes = (server: FastifyInstance) => {
  server.get(
    "/profile",
    {
      preHandler: authenticateToken,
      schema: {
        response: {
          200: userRef("userResponseSchema"),
        },
      },
    },
    getProfile
  );
  server.patch(
    "/profile/:id",
    {
      preHandler: authenticateToken,
      schema: {
        body: userRef("userUpdateSchema"),
      },
    },
    updateProfile
  );
};
