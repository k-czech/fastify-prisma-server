import { FastifyInstance } from "fastify";
import { loginUserHandler, registerUserHandler } from "./user.controller";
import { $ref } from "./user.schema";

const userRoutes = (server: FastifyInstance) => {
  server.post(
    "/signUp",
    {
      schema: {
        body: $ref("createUserSchema"),
        response: {
          201: $ref("createUserResponseSchema"),
        },
      },
    },
    registerUserHandler
  );
  server.post(
    "/signIn",
    {
      schema: {
        body: $ref("loginUserSchema"),
        response: {
          201: $ref("loginUserResponseSchema"),
        },
      },
    },
    loginUserHandler
  );
};

export default userRoutes;
