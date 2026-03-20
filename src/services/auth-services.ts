import axios from "axios";
import { zodSignupSchema } from "../validators/zodAuthSchema";
import { SignupParams } from "../contexts/auth-context";
import { User } from "../contexts/auth-context";

const api = axios.create({
  baseURL: process.env.DOMAIN,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signup = async ({
  username,
  email,
  password,
}: SignupParams): Promise<{ message: string; user: User }> => {
  try {
    const result = zodSignupSchema.safeParse({ username, email, password });
    if (!result.success) {
      console.log(result.error.issues);
      throw new Error(result.error.issues[0].message);
    }
    const response = await axios.post("/api/users/signup", result.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
