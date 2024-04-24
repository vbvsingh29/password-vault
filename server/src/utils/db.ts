import mongoose from "mongoose";
import logger from "./logger";
import { DB_URI } from "./constant";

export async function connectToDb() {
  try {
    await mongoose.connect(DB_URI as string);
    logger.info(`DB is COnnected`);
  } catch (e: any) {
    logger.error(e, `Error while Connecting to DB`);
    process.exit(1);
  }
}

export async function disconnectFromDb() {
  await mongoose.connection.close();
  logger.info(`DB is disconnected successfully`);
  return;
}
