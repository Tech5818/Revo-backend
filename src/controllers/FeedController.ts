import { Body, JsonController, Post, Res } from "routing-controllers";
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
}
