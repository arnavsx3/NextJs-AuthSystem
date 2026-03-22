import { useContext, useState } from "react";
import {
  AuthContext,
  User,
  SignupParams,
  LoginParams,
} from "../contexts/auth-context";
import {
  login,
  signup,
  logout,
  getMe,
  getUserByUsername,
} from "../services/auth-services";

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

  const handleLogin = async ({ username, password }: LoginParams) => {
    setLoading(true);
    try {
      const response = await login({ username, password });
      setUser(response.user);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await logout();
      setUser(null);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getUser = async (username: string) => {
    try {
      const response = await getUserByUsername(username);
      return response.user;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    user,
    setUser,
    loading,
    setLoading,
    handleSignup,
    handleLogin,
    handleLogout,
    getUser,
  };
};
