import { FastifyRequest } from "fastify";

export enum UserTypes {
  Admin = "ADMIN",
  Partner = "PARTNER",
  Client = "CLIENT",
}

export interface IUserFromReq {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  isActive: boolean;
}

export interface IRequestWithUser extends FastifyRequest {
  user?: IUserFromReq;
}
