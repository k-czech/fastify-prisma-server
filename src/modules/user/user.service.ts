import { UserTypes } from "../../interfaces/IUser";
import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { CreateUserInput } from "./user.schema";

export const createUser = async (input: CreateUserInput) => {
  const { password, ...rest } = input;
  const { hash } = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      ...rest,
      password: hash,
    },
  });

  return user;
};
