import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserInput, LoginUserInput } from "./auth.schema";
import { createUser, loginUser } from "./auth.service";

export const registerUserHandler = async (
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) => {
  const body = request.body;

  try {
    const user = await createUser(body, reply);

    return reply.code(201).send(user);
  } catch (error) {
    reply.code(500).send(error);
  }
};

export const loginUserHandler = async (
  request: FastifyRequest<{
    Body: LoginUserInput;
  }>,
  reply: FastifyReply
) => {
  const body = request.body;
  try {
    const user = await loginUser(body, reply);

    return reply.code(200).send(user);
  } catch (err) {
    reply.code(500).send(err);
  }
};
