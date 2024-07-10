import axios from "axios";
import { Response } from "express";
import { Body, JsonController, Post, Res } from "routing-controllers";
import { Service } from "typedi";

@JsonController("/auth")
@Service()
export class AuthController {
  @Post("/auth")
  async authToken(@Body() body: { token: string }, @Res() res: Response) {
    try {
      const result = await axios({
        method: "GET",
        url: 'https://kapi.kakao.com/v2/user/me?property_keys["kakao_account.name"]',
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      });
      console.log(result.data);

      return res.status(200).json({ data: result.data });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
}
