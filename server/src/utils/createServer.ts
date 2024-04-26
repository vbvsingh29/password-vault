import express, { Response } from "express";
import cors from "cors";
import { CORS_ORIGIN } from "./constant";
import userRoute from "../modules/user/user.route";
import vaultRoute from "../modules/vault/vault.route";

function createServer() {
  const app = express();

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
  app.use("/api/vault", vaultRoute);

  return app;
}

export default createServer;
