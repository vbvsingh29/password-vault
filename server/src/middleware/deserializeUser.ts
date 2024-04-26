import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt.utils";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken =
      get(req, "cookies.accessToken") ||
      get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

    console.log(accessToken, "Testing token");

    if (!accessToken) {
      return next();
    }
    const { decoded } = verifyJwt(accessToken);
    if (decoded) {
      res.locals.user = decoded;
      return next();
    }

    return next();
  } catch (err: any) {
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  }
};

export default deserializeUser;
