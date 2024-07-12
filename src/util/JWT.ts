import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { OAuthUser } from "../types/OAuth";

config();

export class JWTUtil {
  private static readonly secret_key = process.env.SECRET_KEY!;

  static veriryToken(token: string) {
    try {
      return jwt.verify(token, this.secret_key);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static signToken(user: OAuthUser) {
    try {
      return jwt.sign(
        {
          id: user.id,
          kakao_id: user.kakao_id,
          name: user.name,
          img: user.img,
        },
        this.secret_key
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
