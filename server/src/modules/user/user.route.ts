import express from "express";
import { processRequestBody } from "zod-express-middleware";
import { registerUserSchema } from "./user.schema";
import { loginHandler, registerUserHandler } from "./user.controller";

const router = express.Router();

router.post(
  "/",
  processRequestBody(registerUserSchema.body),
  registerUserHandler
);

router.post(
  "/login",
  processRequestBody(registerUserSchema.body),
  loginHandler
);

export default router;
