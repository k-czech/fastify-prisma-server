import { FastifyReply } from "fastify";
import { IRequestWithUser } from "../interfaces/IUser";
import jwt from "jsonwebtoken";

export const authenticateToken = (
  req: IRequestWithUser,
  reply: FastifyReply,
  done: (err?: Error | undefined) => void
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === undefined) {
    return reply.code(401).send({
      code: "401",
      message: "Unauthorized",
      name: "Unauthorized",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      done(new Error("Unauthorized"));
    }

    req.user = decoded as IRequestWithUser["user"];
  });

  done();
};
