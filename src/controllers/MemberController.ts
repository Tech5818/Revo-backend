import {
  Body,
  Get,
  JsonController,
  Post,
  QueryParam,
  Req,
  Res,
  UseBefore,
} from "routing-controllers";
import { Service } from "typedi";
import { MemberService } from "../service/MemberService";
import { Request, Response } from "express";
import { JWTMiddleware } from "../middleware/JWTMiddleware";
import { ILoginMember, IRegisterMember } from "../types/member/MemberType";

@JsonController("/member")
@Service()
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Post("/register")
  async register(@Res() res: Response, @Body() body: IRegisterMember) {
    try {
      const user = await this.memberService.registerMember(body);

      return res.status(201).json({ data: user });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  @Post("/login")
  @UseBefore(JWTMiddleware)
  async login(@Res() res: Response, @Body() body: ILoginMember) {
    try {
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  @Get("/findById")
  async findById(@Res() res: Response, @QueryParam("id") id: string) {
    try {
      const user = await this.memberService.findById(id);

      return res.status(200).json({ data: user });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  @Get("/findByName")
  async findByName(@Res() res: Response, @QueryParam("name") name: string) {
    try {
      const users = await this.memberService.findByName(name);

      return res.status(200).json({ data: users });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  @Get("/findByKakaoId")
  async findByKakaoId(
    @Res() res: Response,
    @QueryParam("kakao_id") kakao_id: string
  ) {
    try {
      const user = await this.memberService.findByKakaoId(kakao_id);

      return res.status(200).json({ data: user });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
