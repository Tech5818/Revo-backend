import mongoose, { Connection } from "mongoose";
import { config } from "dotenv";

config();

const url = process.env.MONGO_URL!;

const MemberDatabase = url + "Member";
const UpcyclingDatabase = url + "Upcycling";
const FeedDatabase = url + "Feed";
const CollectionDatabase = url + "Collection";

export const member_connection: Connection =
  mongoose.createConnection(MemberDatabase);

export const upcycling_connection: Connection =
  mongoose.createConnection(UpcyclingDatabase);

export const feed_connection: Connection =
  mongoose.createConnection(FeedDatabase);

export const collection_connection: Connection =
  mongoose.createConnection(CollectionDatabase);
