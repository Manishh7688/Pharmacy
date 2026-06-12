"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RegisterPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {
    toast.success("Registration request submitted. Our team will contact you.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-sm border">
        <h1 className="text-3xl font-semibold tracking-tight text-center mb-2">Create Account</h1>
        <p className="text-center text-slate-500 mb-8">Register for wholesale access</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register("name")} placeholder="Full Name" className="input-modern" required />
          <input {...register("pharmacy")} placeholder="Pharmacy / Business Name" className="input-modern" required />
          <input type="email" {...register("email")} placeholder="Email" className="input-modern" required />
          <input type="tel" {...register("phone")} placeholder="Phone Number" className="input-modern" required />
          <input type="password" {...register("password")} placeholder="Password" className="input-modern" required />

          <button type="submit" className="w-full btn-primary py-3 rounded-2xl font-semibold">Request Access</button>
        </form>

        <p className="text-center mt-6 text-sm">
          Already have an account? <Link href="/auth/login" className="text-[#0F766E] font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
