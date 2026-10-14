"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  LogOut,
  Menu,
  X,
  ArrowUpRight,
  ThermometerSnowflake,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BrandLogo from "@/components/common/BrandLogo";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/products", label: "Products / Inventory", icon: Package },
    { href: "/dashboard/users", label: "Partner Pharmacies", icon: Users },
  ];

  const SidebarContent = () => (
    <>
      <div className="mb-8 pb-5 border-b border-white/15">
        <Link href="/">
          <BrandLogo variant="dark" showInstaBadge={false} size="sm" />
        </Link>
        <div className="mt-2 inline-block px-2 py-0.5 rounded bg-white/10 text-[10px] font-bold text-[#FDE047] tracking-wider">
          WHOLESALE ADMIN CONSOLE
        </div>
      </div>

      <nav className="space-y-1.5 text-sm">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
                isActive
                  ? "bg-[#FF6B35] text-white font-bold shadow-sm"
                  : "text-blue-100 hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 p-4 rounded-xl bg-white/10 border border-white/15 space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-bold text-[#FDE047]">
          <span className="flex items-center gap-1">
            <ThermometerSnowflake className="w-3.5 h-3.5" />
            COLD VAULT
          </span>
          <span>LIVE</span>
        </div>
        <div className="text-xl font-bold text-white">+4.2°C</div>
        <div className="text-[11px] text-blue-100">Pan Bazaar Hub • Optimal</div>
      </div>

      <div className="mt-auto pt-6 space-y-2 border-t border-white/15">
        <Link
          href="/"
          className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-blue-100 hover:text-white hover:bg-white/10 transition"
        >
          <span>View Public Store</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/auth/login"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/20 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </Link>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-[#F4F7FB] text-slate-900">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-68 bg-[#1B3B6F] text-white p-6 flex-col shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              className="lg:hidden fixed top-0 left-0 h-full w-72 bg-[#1B3B6F] text-white p-6 z-50 flex flex-col"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="flex justify-end mb-2">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg bg-white/10 text-white"
                >
                  <X size={18} />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden flex items-center justify-between bg-white border-b border-slate-200 px-4 h-14">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg border border-slate-200 text-slate-700"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <BrandLogo variant="light" showInstaBadge={false} size="sm" />
          <Link
            href="/"
            className="text-xs font-bold text-[#1D4ED8] px-2.5 py-1 rounded-md bg-blue-50"
          >
            Store
          </Link>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
