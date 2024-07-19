import {
  Body,
  Delete,
  Get,
  JsonController,
  Post,
  QueryParam,
  Req,
  Res,
  UseBefore,
} from "routing-controllers";
import { Service } from "typedi";
import { FeedService } from "../service/FeedService";
import { Response } from "express";
import { ICreateFeed } from "../types/feed/FeedType";
import { upload } from "../../app";
import { MulterRequest } from "../types/custom/express/Multer";

@JsonController("/feed")
@Service()
export class FeedController {
  constructor(private feedService: FeedService) {}

  @Post("/create")
  @UseBefore(upload.single("img"))
  async createFeed(
    @Res() res: Response,
    @Body() body: ICreateFeed,
    @Req() req: MulterRequest
  ) {
    try {
      if (body.user_id.length !== 24)
        return res.status(404).json({ error: "Invalid Data" });

      const feed = await this.feedService.createFeed({
        user_id: body.user_id,
        title: body.title,
        description: body.description,
        img: req!.file!.location!,
      });

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

  @Delete("/deleteById")
  async deleteById(@Res() res: Response, @QueryParam("id") id: string) {
    try {
      const delete_one = this.feedService.deleteById(id);
      return res.status(200).json({ data: delete_one });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
