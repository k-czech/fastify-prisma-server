import { User } from "@prisma/client";
import { FastifyError, FastifyReply } from "fastify";
import prisma from "../../utils/prisma";
import { UserUpdateInput } from "./user.schema";

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

export const updateUser = async (id: number, user: UserUpdateInput) => {
  const {
    firstname,
    lastname,
    phone,
    vatNumber,
    companyName,
    city,
    street,
    postalCode,
    country,
  } = user;
  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      firstname,
      lastname,
      phone,
      vatNumber,
      companyName,
      city,
      street,
      postalCode,
      country,
    },
  });

  return updatedUser;
};
