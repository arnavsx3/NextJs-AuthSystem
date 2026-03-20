import { z } from "zod";

export const zodSignupSchema = z.object({
  username: z.string().min(3, "Username must be atleast 3 chars"),
  email: z.email("Invalid email"),
  password: z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[!@#$%^&*]/, "Must contain one special character"),
});

export const zodLoginSchema = z.object({
  username: z.string().min(3, "Username must be atleast 3 chars"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[!@#$%^&*]/, "Must contain one special character"),
});