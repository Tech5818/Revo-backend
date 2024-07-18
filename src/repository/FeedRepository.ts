import { Schema } from "mongoose";
import { IFeed } from "./types";
import { feed_connection } from "../config/connection";

const feed_schema: Schema<IFeed> = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "Member", requred: true },
  title: { type: Schema.Types.String, required: true },
  description: { type: Schema.Types.String, required: true },
  img: { type: Schema.Types.String, required: true },
  like: [{ type: Schema.Types.ObjectId, ref: "Member" }],
});

export const FeedRepository = feed_connection.model<IFeed>("Feed", feed_schema);
