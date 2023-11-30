import { User } from "@prisma/client";
import { FastifyError, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import { hashPassword, verifyPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { CreateUserInput, LoginUserInput } from "./auth.schema";

let error: FastifyError | undefined;

export const createUser = async (
  input: CreateUserInput,
  reply: FastifyReply
) => {
  const { password, ...rest } = input;
  const { hash } = await hashPassword(password);

  const userExists = await prisma.user.findUnique({
    where: {
      email: input.email,
    },
  });

  if (userExists !== null) {
    error = {
      code: "400",
      message: "User with this email address already exists in the system",
      name: "User exist",
    };
    reply.code(Number(error.code)).send(error);
  }

  const user = await prisma.user.create({
    data: {
      ...rest,
      password: hash,
    },
  });

  return user;
};

export const loginUser = async (input: LoginUserInput, reply: FastifyReply) => {
  const userDB = await prisma.user.findUnique({
    where: {
      email: input.email,
    },
  });

  if (userDB === null) {
    error = {
      code: "400",
      message: "Email or password is incorrect",
      name: "User not found",
    };
    reply.code(Number(error.code)).send(error);
  }

  const { email, firstname, lastname, password, id } = userDB as User;
  const isPasswordValid = verifyPassword({
    password: input.password,
    hash: password,
  });

  if (!isPasswordValid) {
    error = {
      code: "400",
      message: "Email or password is incorrect",
      name: "Password not valid",
    };
    reply.code(Number(error.code)).send(error);
  }

  const token = jwt.sign(
    {
      id,
      email,
      firstname,
      lastname,
    },
    process.env.JWT_SECRET as string
  );

  return {
    user: { email, firstname, lastname },
    token,
  };
};
