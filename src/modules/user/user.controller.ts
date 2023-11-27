import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import prisma from "../../utils/prisma";
import { CreateUserInput } from "./user.schema";
import { createUser } from "./user.service";

export const registerUserHandler = async (
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) => {
  const body = request.body;

  try {
    const user = await createUser(body);

    return reply.code(201).send(user);
  } catch (error) {
    console.log(error);
    reply.code(500).send(error);
  }
};

export const loginUserHandler = async (
  request: FastifyRequest<{
    Body: {
      email: string;
      password: string;
    };
  }>,
  reply: FastifyReply
) => {
  try {
    let error: FastifyError | undefined;
    const user = request.body as User;
    const userDB = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (userDB === null) {
      error = {
        code: "400",
        message: "Email or password is incorrect",
        name: "User not found",
      };
      reply.code(400).send(error);
    }

    const { email, firstname, lastname, password } = userDB as User;
    const isPasswordValid = bcrypt.compareSync(user.password, password);

    if (!isPasswordValid) {
      error = {
        code: "400",
        message: "Email or password is incorrect",
        name: "Password not valid",
      };
      reply.code(400).send(error);
    }

    const token = jwt.sign(
      {
        email,
        firstname,
        lastname,
      },
      process.env.JWT_SECRET as string
    );
    return reply.code(200).send({
      user: { email, firstname, lastname },
      token,
    });
  } catch (err) {
    reply.code(500).send(err);
  }
};
