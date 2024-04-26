import { Request, Response } from "express";
import { RegisterBody } from "./user.schema";
import {
  createUser,
  findUserByEmailAndPassword,
  generateSalt,
} from "./user.service";
import { createVault, findVaultByUser } from "../vault/vault.service";
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

export async function loginHandler(
  req: Request<{}, {}, RegisterBody>,
  res: Response
) {
  const user = await findUserByEmailAndPassword(req.body);
  if (!user) {
    return res.status(401).send({
      message: "Invalid Email or password",
    });
  }

  const vault = await findVaultByUser(String(user._id));
  const accessToken = await signJwt({
    _id: user._id,
    email: user.email,
  });
  res.status(201).send({ accessToken, vault: vault?.data, salt: vault?.salt });
}
