"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/validations/login.schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import BrandLogo from "@/components/common/BrandLogo";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    if (data.email === "admin@maabhagwati.com" && data.password === "admin123") {
      document.cookie = "auth-token=demo-token; path=/";
      toast.success("Logged into Maa Bhagwati Partner Portal");
      router.push("/dashboard");
    } else {
      toast.error("Invalid credentials. Try admin@maabhagwati.com / admin123");
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D4ED8] hover:underline mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Maa Bhagwati Store</span>
        </Link>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-6">
            <BrandLogo variant="light" showInstaBadge={false} size="sm" />
            <span className="dk-badge-bestseller flex items-center gap-1 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" /> B2B Portal
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6">
            Sign in to manage wholesale orders, PTR invoices &amp; inventory
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700">Email</label>
              <input
                type="email"
                {...register("email")}
                className="input-modern mt-1"
                defaultValue="admin@maabhagwati.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">Password</label>
              <input
                type="password"
                {...register("password")}
                className="input-modern mt-1"
                defaultValue="admin123"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary py-3 rounded-xl font-bold text-sm"
            >
              {isSubmitting ? "Signing In..." : "Login to Partner Portal"}
            </button>
          </form>

          <p className="text-center text-xs sm:text-sm mt-5 text-slate-500">
            New pharmacy or hospital?{" "}
            <Link
              href="/auth/register"
              className="text-[#1D4ED8] font-bold hover:underline"
            >
              Register for Dealership
            </Link>
          </p>
          <p className="text-[11px] text-center mt-3 text-slate-400">
            Demo Login: admin@maabhagwati.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
}
