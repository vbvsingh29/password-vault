import express, { Response } from "express";
import cors from "cors";
import { CORS_ORIGIN } from "./constant";
import userRoute from "../modules/user/user.route";

function createServer() {
  const app = express();
  console.log(CORS_ORIGIN,"s")
  app.use(
    cors({
      origin: CORS_ORIGIN,
      credentials: true,
    })
  );
  app.use(express.json());
  app.get("/healthcheck", (_, res: Response) => {
    res.status(200).send("I am up");
  });
  app.use("/api/users", userRoute);

  return app;
}

export default createServer;
