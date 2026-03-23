import axios from "axios";
import { zodLoginSchema, zodSignupSchema } from "../validators/zodAuthSchema";
import { SignupParams, LoginParams } from "../contexts/auth-context";
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
  const result = zodSignupSchema.safeParse({ username, email, password });
  if (!result.success) {
    console.log(result.error.issues);
    throw new Error(result.error.issues[0].message);
  }
  const response = await api.post("/api/users/signup", result.data);
  return response.data;
};

export const login = async ({ username, password }: LoginParams) => {
  const result = zodLoginSchema.safeParse({ username, password });
  if (!result.success) {
    throw new Error(result.error.issues[0].message);
  }
  const response = await api.post("/api/users/login", result.data);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/api/users/logout");
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/api/users/me");
  return response.data;
};

export const getUserByUsername = async (username: string) => {
  const response = await api.get(`/api/users/${username}`);
  return response.data;
};

export const verifyEmail = async (token: string) => {
  const response = await api.get(`/api/auth/verify?token=${token}`);
  return response.data;
};

export const sendVerificationEmail = async () => {
  const response = await api.post("/api/auth/sendVerification");
  return response.data;
};
