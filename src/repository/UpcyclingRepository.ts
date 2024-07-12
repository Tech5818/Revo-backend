import { Schema } from "mongoose";
import { IUpcycling } from "./types";
import { upcycling_connection } from "../config/connection";

const upcycling_schema: Schema<IUpcycling> = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "Member", required: true },
  material: { type: Schema.Types.String, required: true },
  img: { type: Schema.Types.String, required: true },
  recommend: { type: Schema.Types.String, required: true },
});

export const UpcyclingRepository = upcycling_connection.model<IUpcycling>(
  "Upcycling",
  upcycling_schema
);
