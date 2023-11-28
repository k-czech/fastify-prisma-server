import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";
import { userCore, userPassword } from "../user/user.schema";

const createUserSchema = z.object({
  ...userCore,
  password: userPassword.password,
});

const loginUserSchema = z.object({
  email: userCore.email,
  password: userPassword.password,
});

const loginUserResponseSchema = z.object({
  user: z.object({
    ...userCore,
  }),
  token: z.string(),
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;

export const { schemas: authSchemas, $ref: authRef } = buildJsonSchemas(
  {
    createUserSchema,
    loginUserSchema,
    loginUserResponseSchema,
  },
  {
    $id: "authSchema",
  }
);
