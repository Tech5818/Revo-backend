import { Service } from "typedi";
import { UpcyclingService } from "../service/UpcyclingService";
import {
  Body,
  Get,
  JsonController,
  Post,
  QueryParam,
  Res,
} from "routing-controllers";
import { Response } from "express";
import { ICreatePost } from "../types/upcycling/UpcyclingType";

@JsonController("/upcycling")
@Service()
export class UpcyclingConntroller {
  constructor(private upcyclingService: UpcyclingService) {}

  @Post("/create")
  async createPost(@Res() res: Response, @Body() body: ICreatePost) {
    try {
      const post = await this.upcyclingService.createPost(body);

      if (!post) return res.status(404).json({ error: "Invalid Data" });

      return res.status(201).json({ data: post });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  @Get("/findById")
  async findById(@Res() res: Response, @QueryParam("id") id: string) {
    try {
      if (id.length !== 24)
        return res.status(404).json({ error: "Invalid Data" });

      const post = await this.upcyclingService.findById(id);

      return res.status(200).json({ data: post });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  @Get("/findByUserId")
  async findByUserId(
    @Res() res: Response,
    @QueryParam("user_id") user_id: string
  ) {
    try {
      if (user_id.length !== 24)
        return res.status(404).json({ error: "Invalid Data" });

      const posts = await this.upcyclingService.findByUserId(user_id);

      return res.status(200).json({ data: posts });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  @Get("/findAll")
  async findAll(@Res() res: Response) {
    try {
      const posts = await this.upcyclingService.findAll();

      return res.status(200).json({ data: posts });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
