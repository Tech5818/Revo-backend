import { Body, Get, JsonController, Post, Res } from "routing-controllers";
import { Service } from "typedi";
import { MemberService } from "../service/MemberService";
import { Response } from "express";

@JsonController("/member")
@Service()
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get("/")
  async index(@Res() res: Response) {
    return res.json({ test: "success" });
  }
}
