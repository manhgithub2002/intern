import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface UserAuthPayload extends Request {
  decodedUser: JwtPayload & {userId: number, tokenVersion: number}
};
