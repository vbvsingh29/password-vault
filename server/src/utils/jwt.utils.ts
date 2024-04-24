import jwt from "jsonwebtoken";
import { PRIVATE_KEY, PUBLIC_KEY } from "./constant";

const privateKey = PRIVATE_KEY as string;
const publicKey = PUBLIC_KEY as string;

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);

    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (err: any) {
    return {
      valid: false,
      expired: err.message === "jwt expired",
      decoded: null,
    };
  }
}
