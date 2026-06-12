"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, Package, Users, LogOut, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/products", label: "Products / Inventory", icon: Package },
    { href: "/dashboard/users", label: "Clients / Users", icon: Users },
  ];

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 mb-10">
        <div className="w-9 h-9 rounded-xl bg-[#14B8A6] flex items-center justify-center">
          <span className="font-bold text-xl">MB</span>
        </div>
        <div>
          <div className="font-semibold">Maa Bhagwati</div>
          <div className="text-[10px] text-white/50">PHARMA • ADMIN</div>
        </div>
      </div>

      <nav className="space-y-1 text-sm">
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href} 
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/10 active:bg-white/20"
          >
            <item.icon className="w-4 h-4" /> {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-8">
        <Link href="/auth/login" className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300">
          <LogOut className="w-4 h-4" /> Logout
        </Link>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-[#0F172A] text-white p-6 flex-col">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar + Overlay */}
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
            <motion.div 
              className="lg:hidden fixed top-0 left-0 h-full w-72 bg-[#0F172A] text-white p-6 z-50 flex flex-col"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="flex justify-end mb-4">
                <button onClick={() => setSidebarOpen(false)} className="p-2">
                  <X size={20} />
                </button>
              </div>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Top Bar */}
        <div className="lg:hidden flex items-center justify-between bg-white border-b px-4 h-14">
          <button 
            onClick={() => setSidebarOpen(true)} 
            className="p-2 text-slate-700"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <div className="font-semibold text-sm">Maa Bhagwati Admin</div>
          <div className="w-8" /> {/* spacer */}
        </div>

        <div className="flex-1 p-4 md:p-8 bg-[#f8fafc] overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
