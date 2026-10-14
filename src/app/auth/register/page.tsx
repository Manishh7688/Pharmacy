"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import BrandLogo from "@/components/common/BrandLogo";

export default function RegisterPage() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = () => {
    toast.success("Dealership registration submitted!", {
      description: "Our verification team will review your Drug License and activate your account.",
    });
    reset();
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
          <div className="flex items-center justify-between gap-2 mb-5">
            <BrandLogo variant="light" showInstaBadge={false} size="sm" />
            <span className="dk-badge-bestseller shrink-0">Dealer Setup</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Create Wholesale Account
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6">
            Register for wholesale PTR pricing, GST billing &amp; 30-day credit
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
            <input
              {...register("name")}
              placeholder="Proprietor / Pharmacist Full Name"
              className="input-modern"
              required
            />
            <input
              {...register("pharmacy")}
              placeholder="Pharmacy / Hospital Business Name"
              className="input-modern"
              required
            />
            <input
              {...register("license")}
              placeholder="Drug License No. (Form 20/21)"
              className="input-modern"
              required
            />
            <input
              type="email"
              {...register("email")}
              placeholder="Business Email"
              className="input-modern"
              required
            />
            <input
              type="tel"
              {...register("phone")}
              placeholder="Phone / WhatsApp Number"
              className="input-modern"
              required
            />
            <input
              type="password"
              {...register("password")}
              placeholder="Create Password"
              className="input-modern"
              required
            />

            <button
              type="submit"
              className="w-full btn-orange py-3 rounded-xl font-bold text-sm"
            >
              Request Wholesale Access
            </button>
          </form>

          <p className="text-center mt-5 text-xs sm:text-sm text-slate-500">
            Already registered?{" "}
            <Link
              href="/auth/login"
              className="text-[#1D4ED8] font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
