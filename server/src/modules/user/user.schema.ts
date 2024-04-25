import { TypeOf, object, string } from "zod";

export const registerUserSchema = {
  body: object({
    email: string({ required_error: "Email is Required" }).email(
      "Must be a valid email"
    ),
    hashedPassword: string({ required_error: "Hashed Password is required" }),
  }),
};

export type RegisterBody = TypeOf<typeof registerUserSchema.body>;
