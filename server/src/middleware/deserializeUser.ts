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
        
      const refreshTokenHeader =
        get(req, "cookies.refreshToken") || get(req, "headers.x-refresh");
  
      let refreshToken: string | undefined;
      if (Array.isArray(refreshTokenHeader)) {
        refreshToken = refreshTokenHeader[0];
      } else {
        refreshToken = refreshTokenHeader;
      }
  
      if (!accessToken) {
        return next();
      }
      const { decoded, expired } = verifyJwt(accessToken);
      if (decoded) {
        res.locals.user = decoded;
        return next();
      }
      
    //   if (expired && refreshToken) {
    //     const newAccessToken = await reIssueAccessToken({ refreshToken });
  
    //     if (typeof newAccessToken === "string") {
    //       res.setHeader("x-access-token", newAccessToken);
  
    //       res.cookie("accessToken", newAccessToken, {
    //         maxAge: 900000,
    //         httpOnly: true,
    //         domain: "localhost",
    //         path: "/",
    //         sameSite: "strict",
    //         secure: false,
    //       });
  
    //       const result = verifyJwt(newAccessToken);
    //       res.locals.user = result.decoded;
    //       return next();
    //     }
    //     return next();
    //   }

      return next();
    } catch (err: any) {
      return res.status(500).send({
        status: false,
        message: err.message,
      });
    }
  };
  
  export default deserializeUser;