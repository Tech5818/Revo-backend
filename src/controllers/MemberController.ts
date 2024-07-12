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
import { ILoginMember } from "../types/member/MemberType";
import { JWTUtil } from "../util/JWT";

@JsonController("/member")
@Service()
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Post("/login")
  async login(@Res() res: Response, @Body() body: ILoginMember) {
    try {
      if (await this.memberService.findByKakaoId(body.kakao_id)) {
        // 기존 Member
        const user = await this.memberService.findByKakaoId(body.kakao_id);

        const token = JWTUtil.signToken({
          id: user!.id,
          kakao_id: user!.kakao_id,
          name: user!.name,
          img: user!.img,
        });

        return res.status(200).json({ data: token });
      } else {
        // 새로운 Member
        const user = await this.memberService.createMember(body);

        const token = JWTUtil.signToken({
          id: user.id,
          kakao_id: user.kakao_id,
          name: user.name,
          img: user.img,
        });

        return res.status(201).json({ data: token });
      }
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  @Get("/findById")
  async findById(@Res() res: Response, @QueryParam("id") id: string) {
    try {
      if (id.length !== 24)
        return res.status(404).json({ error: "Invalid Data" });

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
