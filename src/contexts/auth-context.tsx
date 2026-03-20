"use client";

import { createContext, useState, ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}
// for signup input
export interface SignupParams {
  username: string;
  email: string;
  password: string;
}
// for user stored in context
export interface User {
  _id: string;
  username: string;
  email: string;
}
interface AuthContextType {
  user: User | null; 
  setUser: (user: User | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const AuthContext = createContext<AuthContextType|undefined>(undefined);

export const AuthProvider = ({ children }:AuthProviderProps) => {
  const [user, setUser] = useState<User|null>(null);
  const [loading, setLoading] = useState(false);
  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
