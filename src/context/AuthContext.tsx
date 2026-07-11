"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { User } from "@/types/user";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string) => Promise<boolean>;
  logout: () => void;
  toggleDemoLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: User = {
  id: "user_demo_1",
  name: "John Doe",
  email: "john.doe@example.com",
  avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("lostlink_user");
    let loadedUser: User | null = null;
    if (stored) {
      try {
        loadedUser = JSON.parse(stored);
      } catch {
        localStorage.removeItem("lostlink_user");
      }
    }
    const timer = setTimeout(() => {
      if (loadedUser) {
        setUser(loadedUser);
      }
      setIsLoading(false);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const login = useCallback(async (email: string, _password?: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate brief network latency
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Support any login in mockup, but specialize John Doe's credentials or accept anything
    const loggedInUser: User = {
      id: email === "john.doe@example.com" ? "user_demo_1" : `user_${Date.now()}`,
      name: email === "john.doe@example.com" ? "John Doe" : email.split("@")[0],
      email: email,
      avatarUrl: email === "john.doe@example.com" 
        ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80" 
        : `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80`,
    };

    setUser(loggedInUser);
    localStorage.setItem("lostlink_user", JSON.stringify(loggedInUser));
    setIsLoading(false);
    return true;
  }, []);

  const register = useCallback(async (name: string, email: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const newUser: User = {
      id: `user_${Date.now()}`,
      name,
      email,
      avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80`,
    };

    setUser(newUser);
    localStorage.setItem("lostlink_user", JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("lostlink_user");
  }, []);

  const toggleDemoLogin = useCallback(() => {
    if (user) {
      logout();
    } else {
      setUser(DEMO_USER);
      localStorage.setItem("lostlink_user", JSON.stringify(DEMO_USER));
    }
  }, [user, logout]);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        toggleDemoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export { DEMO_USER };
