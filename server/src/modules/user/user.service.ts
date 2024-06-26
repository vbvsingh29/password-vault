import crypto from "crypto";
import { UserModel } from "./user.model";
import argon2 from "argon2";

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

async function genHash(password: string) {
  return argon2.hash(password);
}

export async function findUserByEmailAndPassword({
  email,
  hashedPassword,
}: {
  email: string;
  hashedPassword: string;
}) {
  const user = await UserModel.findOne({ email });
  const hash = await genHash(hashedPassword);

  if (!user || !argon2.verify(user.password, hash)) {
    return null;
  }
  return user;
}
