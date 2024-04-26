import express from "express";
import { updateVaultHandler } from "./vault.controller";
import deserializeUser from "../../middleware/deserializeUser";
const router = express.Router();

router.put("/", deserializeUser, updateVaultHandler);

export default router;
