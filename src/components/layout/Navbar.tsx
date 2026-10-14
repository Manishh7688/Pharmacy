"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  X,
  Phone,
  Search,
  MapPin,
  ShoppingCart,
  User,
  ShieldCheck,
  ChevronRight,
  BadgePercent,
  Truck,
  FileUp,
  Gift,
  Home,
  Grid,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import BrandLogo from "@/components/common/BrandLogo";

const subNavLinks = [
  { href: "/products", label: "Category" },
  { href: "/about", label: "About Us" },
  { href: "/products?filter=brands", label: "Brand" },
  { href: "/products?filter=freebies", label: "Freebies", badge: "10+1" },
  { href: "/products?filter=bestsellers", label: "Best Sellers" },
  { href: "/products?filter=offers", label: "Offers", badge: "HOT" },
  { href: "/products?filter=new", label: "New Arrivals" },
  { href: "/services", label: "Cold-Chain" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "New Pharmacy Setup", badge: "NEW" },
];

const quickPincodes = [
  { pin: "781001", area: "Pan Bazaar, Guwahati (Same-Day 4h)" },
  { pin: "786001", area: "Dibrugarh, Upper Assam (Overnight)" },
  { pin: "788001", area: "Silchar, Barak Valley (18h Cold-Line)" },
  { pin: "793001", area: "Shillong, Meghalaya (6h Express)" },
  { pin: "797112", area: "Dimapur, Nagaland (12h Express)" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPin, setSelectedPin] = useState("781001 • Guwahati");
  const [pinModalOpen, setPinModalOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      searchQuery.trim()
        ? `/products?q=${encodeURIComponent(searchQuery.trim())}`
        : "/products"
    );
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-xs">
        {/* TIER 1: DENTALKART TOP ANNOUNCEMENT & TRUST BAR */}
        <div className="bg-[#1B3B6F] text-white text-[11px] sm:text-xs">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 h-8 sm:h-9 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar whitespace-nowrap">
              <span className="font-semibold text-[#FDE047] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Since 2015 · ISO 9001:2015 Wholesale Hub</span>
              </span>
              <span className="hidden sm:inline text-white/30">|</span>
              <span className="hidden sm:inline text-blue-100">
                Drug Control Assam Licensed
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-5 whitespace-nowrap">
              <span className="hidden lg:inline text-blue-100">
                100% Genuine Depot Stock
              </span>
              <span className="hidden md:inline text-blue-100">
                GST Invoice Available
              </span>
              <Link
                href="/contact"
                className="text-[#FDE047] font-semibold hover:underline"
              >
                Dealer Bulk Enquiry
              </Link>
              <Link
                href="/dashboard"
                className="px-2 py-0.5 rounded bg-white/15 hover:bg-white/25 font-medium"
              >
                Admin Portal
              </Link>
            </div>
          </div>
        </div>

        {/* TIER 2: MAIN DENTALKART HEADER (LOGO + DELIVERING TO PINCODE + WIDE SEARCH + ACTIONS) */}
        <div className="border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2.5 sm:gap-5">
            {/* Left: Brand Logo + Delivering To Pincode (Exact Dentalkart Placement) */}
            <div className="flex items-center gap-3 sm:gap-5 shrink-0">
              <Link href="/" aria-label="Maa Bhagwati Pharmaceuticals Home">
                <BrandLogo variant="light" showInstaBadge={true} size="md" />
              </Link>

              {/* Dentalkart "Delivering to Enter Pincode" Widget */}
              <button
                type="button"
                onClick={() => setPinModalOpen(!pinModalOpen)}
                className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF6FF] border border-slate-200 hover:border-[#93C5FD] text-left transition cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 leading-none font-medium">
                    Delivering to
                  </div>
                  <div className="text-xs font-bold text-[#1B3B6F] flex items-center gap-1 mt-0.5">
                    <span>{selectedPin}</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </div>
                </div>
              </button>
            </div>

            {/* Center: Dentalkart Wide Search Bar with Rx/List Quick Button */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 max-w-2xl relative items-center"
            >
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search over 5,000+ Wholesale Pharma Products, Dr. Morepen, Sutures..."
                className="w-full pl-10 pr-36 py-2.5 rounded-xl border-2 border-[#CBD5E1] focus:border-[#1D4ED8] bg-[#F8FAFC] focus:bg-white text-sm text-slate-900 outline-none transition"
              />
              <button
                type="button"
                onClick={() =>
                  toast.info("Quick Stock List / Rx Upload", {
                    description:
                      "Redirecting to bulk prescription & stock sheet upload...",
                  })
                }
                title="Upload Prescription / Bulk Stock List"
                className="absolute right-22 px-2 py-1 rounded-md text-slate-500 hover:text-[#1D4ED8] hover:bg-blue-50 text-[11px] font-semibold inline-flex items-center gap-1 transition"
              >
                <FileUp className="w-3.5 h-3.5 text-[#00A8E8]" />
                <span className="hidden lg:inline">Rx List</span>
              </button>
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-lg bg-[#1D4ED8] hover:bg-[#1B3B6F] text-white text-xs font-semibold transition"
              >
                Search
              </button>
            </form>

            {/* Right: Dentalkart Action Icons (Call, Login, Bulk Cart) */}
            <div className="hidden lg:flex items-center gap-2.5 shrink-0">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 text-xs font-semibold text-slate-700 transition"
              >
                <Phone className="w-4 h-4 text-[#1D4ED8]" />
                <div className="hidden 2xl:block">
                  <div className="text-[10px] text-slate-400 leading-none">
                    Order Desk
                  </div>
                  <div>+91 98765 43210</div>
                </div>
              </a>

              <Link
                href="/auth/login"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:border-[#1D4ED8] text-xs font-semibold text-slate-700 hover:text-[#1D4ED8] transition"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>

              <Link
                href="/contact"
                className="btn-orange px-4 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 relative"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Bulk Quote</span>
                <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-white text-[#EA580C] text-[10px] font-extrabold">
                  PTR
                </span>
              </Link>
            </div>

            {/* Mobile Pincode + Hamburger */}
            <div className="flex lg:hidden items-center gap-1.5">
              <button
                type="button"
                onClick={() => setPinModalOpen(!pinModalOpen)}
                className="p-2 rounded-xl bg-[#F8FAFC] border border-slate-200 text-[#1D4ED8] flex items-center gap-1 text-[11px] font-bold"
                aria-label="Select delivery pincode"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">781001</span>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden px-3 pb-2.5">
            <form onSubmit={handleSearch} className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 5,000+ medicines, Dr. Morepen, sutures..."
                className="w-full pl-9 pr-20 py-2 rounded-xl border border-slate-300 bg-[#F8FAFC] text-xs text-slate-900 outline-none focus:border-[#1D4ED8]"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 rounded-lg bg-[#1D4ED8] text-white text-xs font-semibold"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Pincode Selector Popover Bar */}
        <AnimatePresence>
          {pinModalOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-[#EFF6FF] border-b border-blue-200 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-bold text-[#1B3B6F] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#1D4ED8]" />
                  Choose Northeast Delivery Pincode:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {quickPincodes.map((item) => (
                    <button
                      key={item.pin}
                      type="button"
                      onClick={() => {
                        setSelectedPin(`${item.pin} • ${item.area.split(",")[0]}`);
                        setPinModalOpen(false);
                        toast.success(`Delivery location set to ${item.area}`);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white border border-blue-200 hover:border-[#1D4ED8] text-slate-700 font-semibold text-[11px] transition"
                    >
                      {item.pin} — {item.area}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TIER 3: DENTALKART SUB-NAVIGATION BAR (Category, Brand, Freebies, Best Sellers, Offers, New Arrivals, Setup) */}
        <div className="bg-[#F8FAFC] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar h-10 sm:h-11 text-xs font-semibold">
            <div className="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
              {subNavLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 transition ${
                      isActive
                        ? "bg-[#1B3B6F] text-white"
                        : "text-slate-700 hover:text-[#1D4ED8] hover:bg-blue-50"
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span
                        className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full ${
                          link.badge === "HOT"
                            ? "bg-[#FF6B35] text-white"
                            : link.badge === "10+1"
                            ? "bg-[#DCFCE7] text-[#15803D]"
                            : "bg-blue-100 text-[#1D4ED8]"
                        }`}
                      >
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="hidden xl:flex items-center gap-4 text-[11px] text-slate-500 whitespace-nowrap">
              <span className="inline-flex items-center gap-1 text-[#16A34A] font-semibold">
                <BadgePercent className="w-3.5 h-3.5" /> Extra 5% Case-Lot Margin
              </span>
              <span className="inline-flex items-center gap-1 text-[#1D4ED8] font-semibold">
                <Truck className="w-3.5 h-3.5" /> Free Guwahati Delivery ₹10k+
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Slide-Down Menu Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-b border-slate-200 overflow-hidden shadow-lg"
            >
              <div className="px-4 py-4 space-y-1 max-h-[75vh] overflow-y-auto">
                {subNavLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-[#1D4ED8]"
                  >
                    <span className="flex items-center gap-2">
                      {link.label}
                      {link.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-100 text-[#EA580C] font-bold">
                          {link.badge}
                        </span>
                      )}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                ))}
                <div className="pt-3 mt-2 border-t border-slate-200 grid grid-cols-2 gap-2.5">
                  <Link
                    href="/auth/login"
                    onClick={() => setIsOpen(false)}
                    className="btn-secondary py-2.5 rounded-xl text-center text-xs font-bold"
                  >
                    Partner Login
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="btn-orange py-2.5 rounded-xl text-center text-xs font-bold"
                  >
                    Bulk PTR Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* DENTALKART-STYLE MOBILE BOTTOM STICKY APP BAR (< 768px) */}
      <nav
        aria-label="Mobile quick navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-2 py-1.5 grid grid-cols-5 gap-1 shadow-[0_-4px_12px_rgba(15,23,42,0.06)]"
      >
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 rounded-lg text-[10px] font-semibold ${
            pathname === "/" ? "text-[#1D4ED8]" : "text-slate-500"
          }`}
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span>Home</span>
        </Link>
        <Link
          href="/products"
          className={`flex flex-col items-center justify-center py-1 rounded-lg text-[10px] font-semibold ${
            pathname.startsWith("/products") ? "text-[#1D4ED8]" : "text-slate-500"
          }`}
        >
          <Grid className="w-4 h-4 mb-0.5" />
          <span>Catalogue</span>
        </Link>
        <Link
          href="/products?filter=freebies"
          className="flex flex-col items-center justify-center py-1 rounded-lg text-[10px] font-semibold text-[#EA580C]"
        >
          <Gift className="w-4 h-4 mb-0.5" />
          <span>Schemes</span>
        </Link>
        <Link
          href="/contact"
          className={`flex flex-col items-center justify-center py-1 rounded-lg text-[10px] font-semibold ${
            pathname === "/contact" ? "text-[#1D4ED8]" : "text-slate-500"
          }`}
        >
          <ShoppingCart className="w-4 h-4 mb-0.5" />
          <span>Bulk Quote</span>
        </Link>
        <Link
          href="/dashboard"
          className={`flex flex-col items-center justify-center py-1 rounded-lg text-[10px] font-semibold ${
            pathname.startsWith("/dashboard") ? "text-[#1D4ED8]" : "text-slate-500"
          }`}
        >
          <User className="w-4 h-4 mb-0.5" />
          <span>Portal</span>
        </Link>
      </nav>
    </>
  );
}
