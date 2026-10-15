"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/validations/login.schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
  ShieldCheck,
  Smartphone,
  Mail,
  Eye,
  EyeOff,
  Coins,
  Truck,
  BadgePercent,
  CheckCircle2,
  Sparkles,
  Headphones,
  Lock,
  ArrowRight,
  Star,
  KeyRound,
} from "lucide-react";
import BrandLogo from "@/components/common/BrandLogo";
import {
  topPharmaBrands,
  paymentPartnersData,
} from "@/components/widgets/PharmaWidgets";

const memberBenefits = [
  {
    icon: Coins,
    title: "Earn Gold Coins on Every Order",
    desc: "Get 100% redeemable Gold Coins on antibiotics, sutures & case lots.",
    badge: "Plus Reward",
    color: "text-[#FDE047] bg-amber-500/20 border-amber-300/30",
  },
  {
    icon: BadgePercent,
    title: "Up to 75% Wholesale PTR Margin",
    desc: "Unlock direct C&F depot rates, 10+1 free strip schemes & GST input credit.",
    badge: "Best PTR",
    color: "text-[#4ADE80] bg-emerald-500/20 border-emerald-300/30",
  },
  {
    icon: Truck,
    title: "4-Hour Guwahati & Overnight NE Dispatch",
    desc: "Validated +2°C to +8°C cold-chain boxes tracked live to your doorstep.",
    badge: "Express",
    color: "text-[#38BDF8] bg-sky-500/20 border-sky-300/30",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<"otp" | "email">("otp");

  // Mobile OTP state
  const [phone, setPhone] = useState("9876543210");
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["4", "8", "2", "9"]);
  const [timer, setTimer] = useState(28);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // Email/Password state
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@maabhagwati.com",
      password: "admin123",
    },
  });

  useEffect(() => {
    if (!otpSent || timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length < 10) {
      toast.error("Please enter a valid 10-digit mobile or WhatsApp number");
      return;
    }
    setOtpSent(true);
    setTimer(28);
    toast.success(`4-Digit OTP sent to +91 ${cleaned} via WhatsApp & SMS!`, {
      description: "Demo OTP pre-filled: 4829",
    });
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otpDigits.join("");
    if (code.length < 4) {
      toast.error("Please enter the 4-digit OTP");
      return;
    }
    setIsVerifyingOtp(true);
    setTimeout(() => {
      document.cookie = "auth-token=demo-token; path=/";
      toast.success("Verified! Welcome to Maa Bhagwati Partner Portal", {
        description: "Gold Coin Rewards & Wholesale PTR Pricing Unlocked.",
      });
      router.push("/dashboard");
    }, 650);
  };

  const handleOtpChange = (index: number, val: string) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    const updated = [...otpDigits];
    updated[index] = digit;
    setOtpDigits(updated);
    if (digit && index < 3) {
      const nextEl = document.getElementById(`otp-input-${index + 1}`);
      nextEl?.focus();
    }
  };

  const onEmailSubmit = async (data: LoginFormData) => {
    if (data.email === "admin@maabhagwati.com" && data.password === "admin123") {
      document.cookie = "auth-token=demo-token; path=/";
      toast.success("Logged into Maa Bhagwati Partner Portal");
      router.push("/dashboard");
    } else {
      toast.error("Invalid credentials. Try admin@maabhagwati.com / admin123");
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col justify-between">
      {/* Top Bar */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#1D4ED8] transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Store</span>
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/">
              <BrandLogo variant="light" showInstaBadge={true} size="sm" />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("open-support-chat", {
                    detail: {
                      initialMessage:
                        "Hi, I need assistance signing into my wholesale pharmacy account.",
                    },
                  })
                )
              }
              className="px-3.5 py-2 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#BFDBFE] text-xs font-bold text-[#1D4ED8] inline-flex items-center gap-1.5 transition cursor-pointer"
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>Need Login Help? Talk to Agent</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Split Login Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200 shadow-[0_24px_60px_-15px_rgba(27,59,111,0.14)] overflow-hidden grid grid-cols-1 lg:grid-cols-12"
        >
          {/* LEFT PANEL: VISUAL REWARDS & BRAND SHOWCASE (5 COLS) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#1B3B6F] via-[#1D4ED8] to-[#0284C7] text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Animated Decorative Glow */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.28, 0.15] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-sky-300 blur-3xl"
            />

            <div className="relative z-10 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-[11px] font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#FDE047]" />
                <span>InstaPharma Plus Partner Membership</span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                  Northeast India&apos;s #1 Wholesale Pharma Portal
                </h2>
                <p className="text-xs sm:text-sm text-blue-100 mt-2 leading-relaxed">
                  Log in with your mobile OTP or business email to unlock live PTR rates, 10+1 free strip schemes, and instant HSN GST invoices.
                </p>
              </div>

              {/* Animated Benefit Cards */}
              <div className="space-y-3 pt-1">
                {memberBenefits.map((b, idx) => {
                  const Icon = b.icon;
                  return (
                    <motion.div
                      key={b.title}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.1 }}
                      whileHover={{ x: 4 }}
                      className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 flex items-start gap-3"
                    >
                      <div
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${b.color}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs sm:text-sm text-white">
                            {b.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-blue-100 leading-relaxed mt-0.5">
                          {b.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Authorized Brands Mini Strip */}
            <div className="relative z-10 mt-8 pt-5 border-t border-white/15 space-y-3">
              <div className="flex items-center justify-between text-[11px] text-blue-100">
                <span className="font-semibold uppercase tracking-wider">
                  150+ Direct Depot Brands
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-[#FDE047]">
                  4.8 <Star className="w-3 h-3 fill-[#FDE047] text-[#FDE047]" /> (250+ Chemists)
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {topPharmaBrands.slice(0, 4).map((brand) => (
                  <div
                    key={brand.name}
                    className="h-9 rounded-lg bg-white p-1 flex items-center justify-center shadow-2xs"
                  >
                    <img
                      src={brand.logoUrl}
                      alt={brand.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: OTP + EMAIL LOGIN FORM (7 COLS) */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              {/* Top Heading + B2B Badge */}
              <div className="flex items-center justify-between gap-2 mb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    Sign In / Sign Up
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Access wholesale PTR rates, track orders &amp; manage GST ledger
                  </p>
                </div>
                <span className="dk-badge-bestseller flex items-center gap-1 shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified B2B
                </span>
              </div>

              {/* Dual Login Mode Switcher Tabs */}
              <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#F4F7FB] border border-slate-200 mb-6">
                <button
                  type="button"
                  onClick={() => setLoginMethod("otp")}
                  className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                    loginMethod === "otp"
                      ? "bg-white text-[#1D4ED8] shadow-xs border border-slate-200/80"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Mobile / WhatsApp OTP</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod("email")}
                  className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                    loginMethod === "email"
                      ? "bg-white text-[#1D4ED8] shadow-xs border border-slate-200/80"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Email &amp; Password</span>
                </button>
              </div>

              <AnimatePresence mode="wait">
                {/* TAB 1: MOBILE / WHATSAPP OTP LOGIN */}
                {loginMethod === "otp" ? (
                  <motion.div
                    key="otp-tab"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.2 }}
                  >
                    {!otpSent ? (
                      <form onSubmit={handleSendOtp} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Enter Mobile / WhatsApp Number
                          </label>
                          <div className="flex items-center rounded-xl border-2 border-[#CBD5E1] focus-within:border-[#1D4ED8] bg-white overflow-hidden transition">
                            <div className="px-3.5 py-3 bg-[#F8FAFC] border-r border-slate-200 text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5 shrink-0">
                              <span>🇮🇳</span>
                              <span>+91</span>
                            </div>
                            <input
                              type="tel"
                              maxLength={10}
                              value={phone}
                              onChange={(e) =>
                                setPhone(e.target.value.replace(/\D/g, ""))
                              }
                              placeholder="Enter 10-digit mobile number"
                              className="w-full px-3.5 py-3 text-sm font-semibold text-slate-900 outline-none"
                              required
                            />
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                            We&apos;ll send a 4-digit instant OTP via WhatsApp &amp; SMS
                          </p>
                        </div>

                        <motion.button
                          type="submit"
                          whileTap={{ scale: 0.98 }}
                          className="w-full btn-orange py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Continue with OTP</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </form>
                    ) : (
                      <form onSubmit={handleVerifyOtp} className="space-y-4">
                        <div className="p-3.5 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-between">
                          <div className="text-xs text-[#1B3B6F]">
                            OTP sent to <strong>+91 {phone}</strong>
                          </div>
                          <button
                            type="button"
                            onClick={() => setOtpSent(false)}
                            className="text-xs font-bold text-[#1D4ED8] hover:underline cursor-pointer"
                          >
                            Change Number
                          </button>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-xs font-bold text-slate-700">
                              Enter 4-Digit Verification OTP
                            </label>
                            <span className="text-[11px] font-mono-tech text-slate-500">
                              {timer > 0 ? `Resend in 00:${timer < 10 ? `0${timer}` : timer}` : "Ready to resend"}
                            </span>
                          </div>

                          <div className="grid grid-cols-4 gap-3 max-w-xs">
                            {otpDigits.map((digit, i) => (
                              <input
                                key={i}
                                id={`otp-input-${i}`}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(i, e.target.value)}
                                className="h-13 text-center text-lg font-bold text-[#1B3B6F] rounded-xl border-2 border-[#93C5FD] focus:border-[#1D4ED8] bg-[#F8FAFC] focus:bg-white outline-none transition"
                              />
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <motion.button
                            type="submit"
                            disabled={isVerifyingOtp}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 btn-primary py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <span>
                              {isVerifyingOtp
                                ? "Verifying OTP..."
                                : "Verify & Login to Portal"}
                            </span>
                            <ArrowRight className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </form>
                    )}
                  </motion.div>
                ) : (
                  /* TAB 2: BUSINESS EMAIL & PASSWORD LOGIN */
                  <motion.div
                    key="email-tab"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                  >
                    <form
                      onSubmit={handleSubmit(onEmailSubmit)}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Registered Business Email
                        </label>
                        <input
                          type="email"
                          {...register("email")}
                          placeholder="admin@maabhagwati.com"
                          className="input-modern"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-bold text-slate-700">
                            Password
                          </label>
                          <button
                            type="button"
                            onClick={() =>
                              toast.info("Password Reset Link", {
                                description:
                                  "Use Mobile OTP tab for instant passwordless access or contact our Live Agent.",
                              })
                            }
                            className="text-[11px] font-semibold text-[#1D4ED8] hover:underline"
                          >
                            Forgot Password?
                          </button>
                        </div>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            {...register("password")}
                            placeholder="Enter password"
                            className="input-modern pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                            aria-label="Toggle password visibility"
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.password.message}
                          </p>
                        )}
                      </div>

                      {/* 1-Click Demo Credentials Fill */}
                      <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 flex items-center justify-between gap-2 text-xs">
                        <span className="text-amber-900 font-medium flex items-center gap-1.5">
                          <KeyRound className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>Demo: admin@maabhagwati.com / admin123</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setValue("email", "admin@maabhagwati.com");
                            setValue("password", "admin123");
                            toast.success("Demo credentials filled!");
                          }}
                          className="px-2 py-0.5 rounded bg-amber-200/80 hover:bg-amber-300 text-amber-950 font-bold text-[11px] shrink-0 cursor-pointer"
                        >
                          Auto-Fill
                        </button>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileTap={{ scale: 0.98 }}
                        className="w-full btn-primary py-3.5 rounded-xl font-bold text-sm cursor-pointer"
                      >
                        {isSubmitting
                          ? "Signing In..."
                          : "Login to Partner Portal"}
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Divider + Quick Social / WhatsApp Login */}
              <div className="my-5 flex items-center gap-3">
                <div className="h-px bg-slate-200 flex-1" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Or Instant Access Via
                </span>
                <div className="h-px bg-slate-200 flex-1" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    document.cookie = "auth-token=demo-token; path=/";
                    toast.success("Authenticated via WhatsApp Business Verified ID!");
                    router.push("/dashboard");
                  }}
                  className="py-2.5 px-4 rounded-xl border border-slate-200 hover:border-[#16A34A] bg-[#F8FAFC] hover:bg-green-50/50 text-xs font-bold text-slate-800 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                  <span>One-Tap WhatsApp Login</span>
                </button>

                <Link
                  href="/auth/register"
                  className="py-2.5 px-4 rounded-xl border border-slate-200 hover:border-[#1D4ED8] bg-[#F8FAFC] hover:bg-blue-50/50 text-xs font-bold text-[#1D4ED8] flex items-center justify-center gap-1.5 transition"
                >
                  <span>New Pharmacy? Register</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Bottom Payment & Security Trust Strip with Payment Partner Images */}
            <div className="mt-8 pt-5 border-t border-slate-200">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-[#16A34A]" />
                  Supported B2B Payment &amp; Credit Partners:
                </span>
                <span className="text-[10px] text-slate-400">
                  100% GST Compliant Checkout
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {paymentPartnersData.slice(0, 6).map((pm) => (
                  <div
                    key={pm.name}
                    className="h-7 px-1.5 rounded-md bg-[#F8FAFC] border border-slate-200 flex items-center justify-center"
                  >
                    <img
                      src={pm.logoUrl}
                      alt={pm.name}
                      className="h-4.5 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
