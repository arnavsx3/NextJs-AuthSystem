import { useContext, useState } from "react";
import { AuthContext, User, SignupParams } from "../contexts/auth-context";
import { signup } from "../services/auth-services";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  const { user, setUser, loading, setLoading } = context;

  const handleSignup = async ({ username, email, password }: SignupParams) => {
    setLoading(true);
    try {
      const response = await signup({ username, email, password });
      setUser(response.user);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { user, setUser, loading, setLoading, handleSignup };
};
