"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import Button from "@/components/ui/Button";
import { ShieldAlert, Play } from "lucide-react";

export const DemoLoginButton: React.FC = () => {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      // Use the seeded user John Doe
      await login("john.doe@example.com", "password123");
      
      // Determine redirection path
      const redirect = searchParams.get("redirect") || "/dashboard";
      router.push(redirect);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-indigo-50 border border-indigo-200 rounded-card">
      <div className="flex gap-2 items-start text-indigo-950">
        <ShieldAlert className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold">Try Demo Login</h4>
          <p className="text-[11px] text-indigo-900 leading-relaxed mt-0.5">
            Log in instantly with the seeded account (John Doe) to view personal item management, charts, and statistics without registering.
          </p>
        </div>
      </div>
      <Button
        onClick={handleDemoLogin}
        isLoading={loading}
        variant="outline"
        size="sm"
        leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
        className="w-full bg-white text-xs border-indigo-300 text-primary hover:bg-indigo-100"
      >
        Quick Demo Access
      </Button>
    </div>
  );
};

export default DemoLoginButton;
