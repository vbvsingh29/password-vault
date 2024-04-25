import crypto from "crypto";
import { UserModel } from "./user.model";

// generate Salt
export function generateSalt() {
  return crypto.randomBytes(64).toString("hex");
}
// create user
export async function createUser(input: {
  email: string;
  hashedPassword: string;
}) {
  return UserModel.create({
    email: input.email,
    password: input.hashedPassword,
  });
}
