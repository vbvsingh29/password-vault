import { Request, Response } from "express";
import { RegisterBody } from "./user.schema";
import { createUser, generateSalt } from "./user.service";
import { createVault } from "../vault/vault.service";
import { signJwt } from "../../utils/jwt.utils";
import logger from "../../utils/logger";

export async function registerUserHandler(
  req: Request<{}, {}, RegisterBody>,
  res: Response
) {
  try {
    const body = req.body;
    const user = await createUser(body);
    const salt = generateSalt();

    const vault = await createVault({ user: String(user._id), salt });

    const accessToken = await signJwt({
      _id: user._id,
      email: user.email,
    });

    res.status(201).send({ accessToken, vault: vault.data, salt });
  } catch (e: any) {
    logger.error(e, "Error while creating user");
    res.sendStatus(500);
  }
}
