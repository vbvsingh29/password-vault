import express from "express";
import { processRequestBody } from "zod-express-middleware";
import { registerUserSchema } from "./user.schema";
import { registerUserHandler } from "./user.controller";

const router = express.Router();

router.post(
  "/",
  processRequestBody(registerUserSchema.body),
  registerUserHandler
);

export default router;
