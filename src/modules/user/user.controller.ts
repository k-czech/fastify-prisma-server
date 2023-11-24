import { FastifyReply, FastifyRequest } from "fastify";
import { createUser } from "./user.service";
import { CreateUserInput } from "./user.schema";

export const registerUserHandler = async (
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) => {
  const body = request.body;
  const type = request.body.type;

  try {
    const user = await createUser(body);
    return reply.code(201).send({
      ...user,
      type,
    });
  } catch (error) {
    console.log(error);
    reply.code(500).send(error);
  }
};
