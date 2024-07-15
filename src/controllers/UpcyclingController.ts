import { Service } from "typedi";
import { UpcyclingService } from "../service/UpcyclingService";
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
import { Request, Response } from "express";
import { ICreatePost } from "../types/upcycling/UpcyclingType";
import axios from "axios";
import { upload } from "../../app";

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

  @Post("/yolo")
  @UseBefore(upload.single("file"))
  async yolo(
    @Res() res: Response,
    @Body() body: { file: Buffer },
    @Req() req: Request
  ) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const blob = new Blob([req.file.buffer], {
        type: req.file.mimetype,
      });

      const formData = new FormData();
      formData.append("file", blob, req.file.originalname);

      const result = await axios.post(
        "http://localhost:8088/yolo/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(result.data);

      return res.status(200).json({ data: result.data });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
