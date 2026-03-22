"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { getMe } from "../services/auth-services";
import Loader from "../components/loader";

interface AuthProviderProps {
  children: ReactNode;
}
// for signup input
export interface SignupParams {
  username: string;
  email: string;
  password: string;
}
export interface LoginParams {
  username: string;
  password: string;
}
// for user stored in context
export interface User {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
  createdAt: string;
}
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await getMe();
        setUser(response.user);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};
