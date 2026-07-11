"use client";

import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { validators } from "@/utils/validators";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: (data: Record<string, string | boolean>) => Promise<void>;
  isLoading: boolean;
}

export const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const password = useWatch({ control, name: "password" });

  const getPasswordStrength = (pass: string) => {
    if (!pass) return null;
    if (pass.length < 6) return { label: "Weak", color: "text-error bg-error-light border-error/20" };
    if (pass.length < 10) return { label: "Medium", color: "text-amber-700 bg-amber-50 border-amber-200" };
    return { label: "Strong", color: "text-accent bg-accent-light border-accent/20" };
  };

  const strength = getPasswordStrength(password);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      {/* Name Field (Register mode only) */}
      {mode === "register" && (
        <Input
          label="Full Name"
          placeholder="e.g. John Doe"
          leftIcon={<User className="w-4 h-4 text-neutral-mid" />}
          error={errors.name?.message}
          {...register("name", validators.name)}
        />
      )}

      {/* Email Field */}
      <Input
        label="Email Address"
        type="email"
        placeholder="e.g. john@example.com"
        leftIcon={<Mail className="w-4 h-4 text-neutral-mid" />}
        error={errors.email?.message}
        {...register("email", validators.email)}
      />

      {/* Password Field */}
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4 text-neutral-mid" />}
          error={errors.password?.message}
          {...register("password", validators.password)}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[38px] text-neutral-mid hover:text-neutral-dark focus:outline-none"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {/* Password Strength Hint (Register mode only) */}
      {mode === "register" && strength && (
        <div className={`text-xs px-2.5 py-1 rounded-badge border flex items-center justify-between font-bold w-fit ${strength.color}`}>
          <span>Password Strength: {strength.label}</span>
        </div>
      )}

      {/* Confirm Password (Register mode only) */}
      {mode === "register" && (
        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4 text-neutral-mid" />}
          error={errors.confirmPassword?.message}
          {...register("confirmPassword", validators.confirmPassword(password))}
        />
      )}

      {/* Terms Checkbox (Register mode only) */}
      {mode === "register" && (
        <div className="flex flex-col gap-1.5 mt-2">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-neutral-mid font-semibold select-none">
            <input
              type="checkbox"
              className="mt-0.5 rounded border-neutral-mid/20 text-primary focus:ring-primary h-4 w-4"
              {...register("terms", {
                required: "You must accept the terms & privacy policy to proceed",
              })}
            />
            <span>
              I agree to the{" "}
              <Link href="/privacy-policy" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.terms && (
            <span className="text-[11px] font-bold text-error">{errors.terms.message}</span>
          )}
        </div>
      )}

      {/* Submit Button */}
      <Button type="submit" isLoading={isLoading} className="w-full mt-6">
        {mode === "login" ? "Sign In" : "Create Account"}
      </Button>

      {/* Navigation Link */}
      <div className="text-center text-xs text-neutral-mid font-semibold mt-4">
        {mode === "login" ? (
          <>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline font-bold">
              Sign up here
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-bold">
              Sign in here
            </Link>
          </>
        )}
      </div>
    </form>
  );
};

export default AuthForm;
