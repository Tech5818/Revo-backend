import { Schema } from "mongoose";
import { IMember } from "./types";
import { member_connection } from "../config/connection";

const memberSchema: Schema<IMember> = new Schema({
  kakao_id: { type: Schema.Types.String, required: true },
  name: { type: Schema.Types.String, required: true },
  img: { type: Schema.Types.String, required: true },
  upcycling: [{ type: Schema.Types.ObjectId, ref: "Upcycling" }],
  join_date: { type: Schema.Types.Date, default: Date.now() },
  follows: [{ type: Schema.Types.ObjectId, ref: "Member" }],
  feeds: [{ type: Schema.Types.ObjectId, ref: "Feed" }],
  collections: [{ type: Schema.Types.ObjectId, ref: "Collection" }],
});

export const MemberRepository = member_connection.model<IMember>(
  "Member",
  memberSchema
);
