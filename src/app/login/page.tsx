"use client";

import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useToast } from "@/context/ToastContext";
import AuthForm from "@/components/features/auth/AuthForm";
import DemoLoginButton from "@/components/features/auth/DemoLoginButton";
import Card from "@/components/ui/Card";
// ShieldCheck removed

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function LoginPage({ searchParams }: PageProps) {
  const router = useRouter();
  const searchParamsVal = use(searchParams);
  const { login, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const redirectPath = typeof searchParamsVal.redirect === "string" ? searchParamsVal.redirect : "/dashboard";

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirectPath);
    }
  }, [isAuthenticated, router, redirectPath]);

  const handleLoginSubmit = async (data: Record<string, string | boolean>) => {
    setLoading(true);
    try {
      const success = await login(data.email as string, data.password as string);
      if (success) {
        showToast("Welcome back! You have signed in successfully.", "success");
        router.push(redirectPath);
      }
    } catch {
      showToast("Authentication failed. Please verify credentials.", "error");
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
          <h2 className="text-2xl font-extrabold text-neutral-dark">Welcome to LostLink</h2>
          <p className="text-xs text-neutral-mid mt-1 font-semibold">
            Reclaim your items, report found objects.
          </p>
        </div>

        {/* Card envelope */}
        <Card hoverEffect={false} className="p-6 sm:p-8 bg-white border border-neutral-light shadow-md flex flex-col gap-6">
          <AuthForm mode="login" onSubmit={handleLoginSubmit} isLoading={loading} />
          
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-neutral-light"></div>
            <span className="flex-shrink mx-3 text-[10px] font-extrabold text-neutral-mid uppercase tracking-widest">or</span>
            <div className="flex-grow border-t border-neutral-light"></div>
          </div>

          <DemoLoginButton />
        </Card>
      </div>
    </div>
  );
}
