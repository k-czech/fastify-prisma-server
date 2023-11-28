import { FastifyReply } from "fastify";
import { IRequestWithUser } from "../../interfaces/IUser";
import { getUser } from "./user.service";

export const getProfile = async (
  request: IRequestWithUser,
  reply: FastifyReply
) => {
  const authUser = request.user;

  console.log({ request });

  try {
    if (!authUser) {
      return reply.code(401).send({
        code: "401",
        message: "Unauthorized",
        name: "Unauthorized",
      });
    }

    const user = await getUser(authUser.email, reply);

    return reply.code(200).send(user);
  } catch (error) {
    reply.code(500).send(error);
  }
};
