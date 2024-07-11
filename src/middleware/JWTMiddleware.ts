import { NextFunction, Response } from "express";
import {
  ExpressMiddlewareInterface,
  UnauthorizedError,
} from "routing-controllers";
import { JWTUtil } from "../util/JWT";
import { AuthRequest } from "../types/custom/express/type";

export class JWTMiddleware implements ExpressMiddlewareInterface {
  use(req: AuthRequest, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new UnauthorizedError("토큰 형식이 Bearer이 아닙니다.");
    }

    const token = authorization!.replace("Bearer ", "");

    req.user = JWTUtil.veriryToken(token);

    next();
  }
}
