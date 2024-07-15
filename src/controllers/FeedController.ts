import {
  Body,
  Get,
  JsonController,
  Post,
  QueryParam,
  Res,
} from "routing-controllers";
import { Service } from "typedi";
import { FeedService } from "../service/FeedService";
import { Response } from "express";
import { ICreateFeed } from "../types/feed/FeedType";

@JsonController("/feed")
@Service()
export class FeedController {
  constructor(private feedService: FeedService) {}

  @Post("/create")
  async createFeed(@Res() res: Response, @Body() body: ICreateFeed) {
    try {
      if (body.user_id.length !== 24)
        return res.status(404).json({ error: "Invalid Data" });

      const feed = await this.feedService.createFeed(body);

      return res.status(201).json({ data: feed });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  @Get("/findAll")
  async findAll(@Res() res: Response) {
    try {
      const feeds = await this.feedService.findAll();

      return res.status(200).json({ data: feeds });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  @Get("/findById")
  async findById(@Res() res: Response, @QueryParam("id") id: string) {
    try {
      if (id.length !== 24)
        return res.status(404).json({ error: "Invalid Data" });

      const feed = await this.feedService.findById(id);

      return res.status(200).json({ data: feed });
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

      const feeds = await this.feedService.findByUserId(user_id);

      return res.status(200).json({ data: feeds });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
