import { FastifyReply } from "fastify";
import { IRequestWithUser, IUserFromReq } from "../../interfaces/IUser";
import { getUser } from "./user.service";

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
