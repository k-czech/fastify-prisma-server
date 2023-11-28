import { FastifyInstance } from "fastify";
import { loginUserHandler, registerUserHandler } from "./auth.controller";
import { authRef } from "./auth.schema";
import { userRef } from "../user/user.schema";

export const authRoutes = (server: FastifyInstance) => {
  server.post(
    "/signUp",
    {
      schema: {
        body: authRef("createUserSchema"),
        response: {
          201: userRef("userResponseSchema"),
        },
      },
    },
    registerUserHandler
  );
  server.post(
    "/signIn",
    {
      schema: {
        body: authRef("loginUserSchema"),
        response: {
          201: authRef("loginUserResponseSchema"),
        },
      },
    },
    loginUserHandler
  );
};
