import express from "express";
import cors from "cors";
import { CORS_ORIGIN } from "./constant";

function createServer() {
    const app = express();
    app.use(
      cors({
        origin: CORS_ORIGIN,
        credentials: true,
      })
    );
    app.use(express.json());

    return app;
  }
  
export default createServer;
