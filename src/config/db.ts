import { Connection } from "mongoose";
import {
  collection_connection,
  feed_connection,
  member_connection,
  upcycling_connection,
} from "./connection";

export const mongo_member = (): Connection => {
  try {
    const connection = member_connection;
    console.log("MongoDB Member Database Connect Success!!!");
    return connection;
  } catch (error) {
    console.error("MongoDB Member Database Connect Fail...");
    throw error;
  }
};

export const mongo_upcycling = (): Connection => {
  try {
    const connection = upcycling_connection;
    console.log("MongoDB Upcycling Database Connect Success!!!");
    return connection;
  } catch (error) {
    console.error("MongoDB Upcycling Database Connect Fail...");
    throw error;
  }
};

export const mongo_feed = (): Connection => {
  try {
    const connection = feed_connection;
    console.log("MongoDB Feed Database Connect Success!!!");
    return connection;
  } catch (error) {
    console.error("MongoDB Feed Database Connect Fail...");
    throw error;
  }
};

export const mongo_collection = (): Connection => {
  try {
    const connection = collection_connection;
    console.log("MongoDB Collection Database Connect Success!!!");
    return connection;
  } catch (error) {
    console.error("MongoDB Collection Database Connect Fail...");
    throw error;
  }
};
