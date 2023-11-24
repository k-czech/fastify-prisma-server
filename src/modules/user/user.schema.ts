import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";
import { UserTypes } from "../../interfaces/IUser";

const userCore = {
  firstname: z.string({
    required_error: "Firstname is required",
    invalid_type_error: "Firstname must be a string",
  }),
  lastname: z.string({
    required_error: "Lastname is required",
    invalid_type_error: "Lastname must be a string",
  }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  type: z.custom<UserTypes>(),
  isActive: z.boolean().default(true),
};

const createUserSchema = z.object({
  ...userCore,
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error:
        "Password must be a string and at least 6 characters long",
    })
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])/,
      "Password must contain at least one letter, one number and one special character"
    )
    .min(6, "Email must be at least 6 characters long"),
});

const createUserResponseSchema = z.object({
  id: z.number(),
  ...userCore,
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
});
