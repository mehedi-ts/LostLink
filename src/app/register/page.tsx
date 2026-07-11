"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useToast } from "@/context/ToastContext";
import AuthForm from "@/components/features/auth/AuthForm";
import Card from "@/components/ui/Card";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleRegisterSubmit = async (data: Record<string, string | boolean>) => {
    setLoading(true);
    try {
      const success = await register(data.name as string, data.email as string);
      if (success) {
        showToast("Registration successful! Welcome to the community.", "success");
        router.push("/dashboard");
      }
    } catch {
      showToast("Registration failed. Please check validation rules.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-neutral-light/20 py-16 px-4">
      <div className="w-full max-w-md flex flex-col gap-6">
        {/* Brand header */}
        <div className="text-center">
          <div className="inline-flex w-12 h-12 rounded-card bg-primary items-center justify-center text-white text-xl font-bold shadow-md mb-3">
            L
          </div>
          <h2 className="text-2xl font-extrabold text-neutral-dark">Join LostLink Today</h2>
          <p className="text-xs text-neutral-mid mt-1 font-semibold">
            Become a part of the network helping neighbors locate lost assets.
          </p>
        </div>

        {/* Card envelope */}
        <Card hoverEffect={false} className="p-6 sm:p-8 bg-white border border-neutral-light shadow-md">
          <AuthForm mode="register" onSubmit={handleRegisterSubmit} isLoading={loading} />
        </Card>
      </div>
    </div>
  );
}
