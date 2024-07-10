import "reflect-metadata";
import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import { config } from "dotenv";
import { useExpressServer, useContainer } from "routing-controllers";

config();

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

import Container from "typedi";
import { MemberService } from "./src/service/MemberService";
import { MemberController } from "./src/controllers/MemberController";
import { MemberRepository } from "./src/repository/MemberRepository";
import { AuthController } from "./src/controllers/AuthController";

Container.set(MemberService, new MemberService(MemberRepository));

useContainer(Container);

useExpressServer(app, {
  controllers: [MemberController, AuthController],
});

export default app;
