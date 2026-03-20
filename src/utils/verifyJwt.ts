import jwt from "jsonwebtoken";

export const verifyToken = (token: string) => {
  return jwt.verify(token!, process.env.TOKEN_SECRET!);
};
