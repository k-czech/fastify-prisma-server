import { UserTypes } from "../../interfaces/IUser";
import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { CreateUserInput } from "./user.schema";

export const createUser = async (input: CreateUserInput) => {
  const { type, password, ...rest } = input;
  const { hash } = await hashPassword(password);

  let userTypeId: number | null = null;

  if (type === "CLIENT") {
    userTypeId = 1;
  } else {
    userTypeId = 4;
  }

  const user = await prisma.user.create({
    data: {
      ...rest,
      password: hash,
      type: { connect: { id: userTypeId } },
    },
  });

  return user;
};
