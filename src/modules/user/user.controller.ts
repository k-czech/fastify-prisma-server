import { FastifyReply } from "fastify";
import { IRequestWithUser, IUserFromReq } from "../../interfaces/IUser";
import { UserUpdateInput } from "./user.schema";
import { getUser, updateUser } from "./user.service";

export const getProfile = async (
  request: IRequestWithUser,
  reply: FastifyReply
) => {
  const authUser = request.user as IUserFromReq;

  try {
    const user = await getUser(authUser.email, reply);

    return reply.code(200).send(user);
  } catch (error) {
    reply.code(500).send(error);
  }
};

export const updateProfile = async (
  request: IRequestWithUser,
  reply: FastifyReply
) => {
  try {
    const authUser = request.user as IUserFromReq;
    const userBody = request.body as UserUpdateInput;
    const userDB = await getUser(authUser.email, reply);

    const params = request.params as { id: number };
    const id = Number(params.id);

    if (authUser.id !== id) {
      return reply.code(401).send({
        message: "Unauthorized",
      });
    }

    if (userDB === null) {
      return reply.code(404).send({
        message: "User not found",
      });
    }

    await updateUser(id, userBody);
    return reply.code(201).send({
      message: "User updated successfully",
    });
  } catch (error) {
    reply.code(500).send(error);
  }
};
