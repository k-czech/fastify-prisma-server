import { User } from "@prisma/client";
import prisma from "../../utils/prisma";
import { FastifyError, FastifyReply } from "fastify";

let error: FastifyError | undefined;

export const getUser = async (email: User["email"], reply: FastifyReply) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user === null) {
    error = {
      code: "404",
      message: "User with this email address not found in the system",
      name: "User not found",
    };
    reply.code(Number(error.code)).send(error);
  }

  return user;
};
