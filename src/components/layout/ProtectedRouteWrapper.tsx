"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";

interface ProtectedRouteWrapperProps {
  children: React.ReactNode;
}

export const ProtectedRouteWrapper: React.FC<ProtectedRouteWrapperProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect to login page and remember where they came from
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isLoading, isAuthenticated, router, pathname]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-12">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-neutral-light"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
        <p className="mt-4 text-neutral-mid font-medium text-sm animate-pulse">
          Securing connection...
        </p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRouteWrapper;
