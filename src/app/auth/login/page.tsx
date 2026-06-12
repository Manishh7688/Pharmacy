"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/validations/login.schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    // Demo login - in real app call API
    if (data.email === "admin@maabhagwati.com" && data.password === "admin123") {
      // Set a demo cookie
      document.cookie = "auth-token=demo-token; path=/";
      toast.success("Login successful");
      router.push("/dashboard");
    } else {
      toast.error("Invalid credentials. Try admin@maabhagwati.com / admin123");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-sm border">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-slate-500 mt-1">Sign in to Maa Bhagwati Pharma Dashboard</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input type="email" {...register("email")} className="input-modern mt-1" defaultValue="admin@maabhagwati.com" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input type="password" {...register("password")} className="input-modern mt-1" defaultValue="admin123" />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full btn-primary py-3 rounded-2xl font-semibold">
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-slate-500">
          Don't have an account? <Link href="/auth/register" className="text-[#0F766E] font-medium">Register</Link>
        </p>
        <p className="text-xs text-center mt-4 text-slate-400">Demo: admin@maabhagwati.com / admin123</p>
      </div>
    </div>
  );
}
