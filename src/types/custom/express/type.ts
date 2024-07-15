import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { OAuthUser } from "../../OAuth";

export interface AuthRequest extends Request {
  user?: OAuthUser | JwtPayload;
}
