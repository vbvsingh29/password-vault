import { Request, Response } from "express";
import { get } from "lodash";
import logger from "../../utils/logger";
import { updateVault } from "./vault.service";

export async function updateVaultHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  try {
    await updateVault({
      userId,
      data: req.body.encryptedVault,
    });
    res.sendStatus(200);

  } catch (e: any) {
    logger.error(e, "Error while updating vault");
    res.status(500);
  }
}
