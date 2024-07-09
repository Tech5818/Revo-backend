import { Schema } from "mongoose";
import { ICollection } from "./types";
import { collection_connection } from "../config/connection";

const collection_schema: Schema<ICollection> = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "Member", required: true },
  grade: { type: Schema.Types.String, required: true },
  kind: { type: Schema.Types.String, required: true },
});

export const CollectionRepository = collection_connection.model<ICollection>(
  "Collection",
  collection_schema
);
