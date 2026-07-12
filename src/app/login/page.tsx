"use client";

import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useToast } from "@/context/ToastContext";
import AuthForm from "@/components/features/auth/AuthForm";
import Card from "@/components/ui/Card";
import { authClient } from "@/app/lib/auth-client";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function LoginPage({ searchParams }: PageProps) {
  const router = useRouter();
  const searchParamsVal = use(searchParams);
  const { isAuthenticated } = useAuth();
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
    await authClient.signIn.email(
      {
        email: data.email as string,
        password: data.password as string,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setLoading(false);
          showToast("Welcome back! You have signed in successfully.", "success");
          router.push(redirectPath);
        },
        onError: (ctx) => {
          setLoading(false);
          showToast(ctx.error.message || "Authentication failed. Please verify credentials.", "error");
        },
      }
    );
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
        <Card hoverEffect={false} className="p-6 sm:p-8 bg-white border border-neutral-light shadow-md">
          <AuthForm mode="login" onSubmit={handleLoginSubmit} isLoading={loading} />
        </Card>
      </div>
    </div>
  );
}

