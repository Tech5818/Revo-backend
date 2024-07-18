import { Date, Document } from "mongoose";

export interface IMember extends Document {
  kakao_id: string;
  name: string;
  img: string;
  upcycling?: IUpcycling["_id"][];
  join_date: Date;
  follows?: IMember["_id"][];
  feeds: IFeed["_id"][];
  collections: ICollection["_id"][];
}

export interface IUpcycling extends Document {
  user_id: IMember["_id"];
  title: string;
  description: string;
  material: string;
  img: string;
}

export interface IFeed extends Document {
  user_id: IMember["_id"];
  title: string;
  description: string;
  img: string;
  like: IMember["_id"][];
}

export interface ICollection extends Document {
  user_id: IMember["_id"];
  grade: string;
  kind: string;
}
