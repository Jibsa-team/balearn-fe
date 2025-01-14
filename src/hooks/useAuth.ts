"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthType {
  accessToken: string | null;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
  getToken: () => string | null;
}

export const useAuth = (): AuthType => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("accessToken", token);
    setAccessToken(token);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
    router.push("/login");
  };

  const getToken = () => {
    if (!accessToken) return null;
    return accessToken;
  };

  return {
    accessToken,
    isLoggedIn: !!accessToken,
    login,
    logout,
    getToken,
  };
};
