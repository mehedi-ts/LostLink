"use client";

import React, { createContext, useContext, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
import { authClient } from "@/app/lib/auth-client";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { data: sessionData, isPending: isLoading } = authClient.useSession();

  const user = useMemo<User | null>(() => {
    if (!sessionData?.user) return null;
    return {
      id: sessionData.user.id,
      name: sessionData.user.name,
      email: sessionData.user.email,
      avatarUrl: sessionData.user.image || undefined,
      createdAt: sessionData.user.createdAt ? new Date(sessionData.user.createdAt).toISOString() : undefined,
    };
  }, [sessionData]);

  const isAuthenticated = !!sessionData;

  const logout = useCallback(async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        logout,
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

