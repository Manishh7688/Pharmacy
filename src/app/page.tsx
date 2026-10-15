"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Star,
  Truck,
  FileText,
  ThermometerSnowflake,
  Sparkles,
  CheckCircle2,
  Flame,
  Headphones,
  MessageSquare,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  PharmaHeroBanner,
  PharmaTrustBar,
  PharmaCategoryStrip,
  PharmaBrandsSection,
  PharmaPaymentPartnersSection,
  PharmaProductCard,
  wholesalePharmaProducts,
} from "@/components/widgets/PharmaWidgets";

const testimonials = [
  {
    name: "Ramesh Agarwal",
    role: "Owner, City Medicos • Guwahati",
    quote:
      "Maa Bhagwati has been our #1 wholesaler for 6 years. Their PTR rates, 10+1 trade schemes, and same-day Pan Bazaar dispatch work just like a modern online medical store.",
    rating: 5,
    tag: "Verified Pharmacy Partner",
  },
  {
    name: "Dr. Anjali Sharma",
    role: "Medical Director, Care Hospital • Silchar",
    quote:
      "We order our surgical sutures, ICU antibiotics, and cold-chain insulins in bulk lots. Every box arrives with HSN GST invoices and intact thermal indicators.",
    rating: 5,
    tag: "Institutional Buyer",
  },
  {
    name: "Pranab Jyoti Das",
    role: "Proprietor, Health Point Pharmacy • Dibrugarh",
    quote:
      "Overnight line-haul delivery to Upper Assam is super reliable. Having Dr. Morepen, Cipla, Sun Pharma, and Ethicon under one roof saves us hours of procurement.",
    rating: 5,
    tag: "Upper Assam Partner",
  },
];

export default function Home() {
  const hotSellingProducts = wholesalePharmaProducts.slice(0, 4);
  const mostSearchedProducts = wholesalePharmaProducts.slice(4, 8);

  return (
    <div className="min-h-screen bg-[#F4F7FB]">
      <Navbar />

      {/* 1. HERO SLIDER + RIGHT PROMO CARDS */}
      <PharmaHeroBanner />

      {/* 2. 4-PILLAR TRUST BAR */}
      <PharmaTrustBar />

      {/* 3. TOP CATEGORIES (SHOP BY IMAGE) */}
      <PharmaCategoryStrip />

      {/* 4. HOT SELLING WHOLESALE LOTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center">
              <Flame className="w-5 h-5 text-[#EA580C] animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Hot Selling Wholesale Lots
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Fastest-moving prescription antibiotics, sutures &amp; OTC packs with trade margins up to 75%
              </p>
            </div>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-[#1D4ED8] hover:underline inline-flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {hotSellingProducts.map((product) => (
            <PharmaProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. TOP BRANDS SHOWCASE WITH BRAND IMAGES & MARQUEE */}
      <PharmaBrandsSection />

      {/* 6. MID-PAGE SPLIT PROMO BANNERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Banner: Cold-Chain Vault */}
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-2xl bg-gradient-to-r from-[#1B3B6F] to-[#0284C7] text-white p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xs"
          >
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/15 text-[11px] font-bold uppercase tracking-wider">
                <ThermometerSnowflake className="w-3.5 h-3.5 text-[#38BDF8]" />
                Cold-Chain +2°C to +8°C
              </span>
              <h3 className="text-xl sm:text-2xl font-bold leading-snug">
                Vaccines, Insulins &amp; Critical Care Injectables
              </h3>
              <p className="text-xs sm:text-sm text-blue-100">
                Dispatched in 72-hour validated gel-pack cold boxes with temperature logs.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#1B3B6F] text-xs font-bold mt-1 hover:bg-blue-50 transition"
              >
                <span>Explore Cold-Chain Logistics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <img
              src="/images/products/insulin-glargine.svg"
              alt="Cold Chain Medicines"
              className="w-28 h-28 rounded-2xl bg-white p-2 object-contain shrink-0 shadow-md"
            />
          </motion.div>

          {/* Right Banner: Bulk Hospital & Surgical Consumables */}
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#1E3A8A] text-white p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xs"
          >
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FF6B35] text-white text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Hospital &amp; Clinic Rate Contract
              </span>
              <h3 className="text-xl sm:text-2xl font-bold leading-snug">
                Surgical Sutures, Disinfection Trays &amp; IV Disposables
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Ethicon Vicryl, Healthium, Polymed &amp; Steridex boxes at direct depot rates.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF6B35] text-white text-xs font-bold mt-1 hover:bg-[#EA580C] transition"
              >
                <span>Shop Hospital Supplies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <img
              src="/images/products/surgical-kit.svg"
              alt="Hospital & Surgical Supplies"
              className="w-28 h-28 rounded-2xl bg-white p-2 object-contain shrink-0 shadow-md"
            />
          </motion.div>
        </div>
      </section>

      {/* 7. MOST SEARCHED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Most Searched Formulations &amp; Surgicals
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              High-demand daily restock items for retail pharmacies, medical clinics &amp; nursing homes
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-[#1D4ED8] hover:underline inline-flex items-center gap-1"
          >
            <span>Explore All 5,240+ SKUs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mostSearchedProducts.map((product) => (
            <PharmaProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 8. LIVE AGENT / HELP CENTER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="rounded-2xl bg-gradient-to-r from-[#EFF6FF] via-[#E0F2FE] to-[#EFF6FF] border border-[#BFDBFE] p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1D4ED8] text-white flex items-center justify-center shrink-0 shadow-md">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
                  24×7 INSTAPHARMA SUPPORT ASSISTANT
                </span>
                <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-[10px] font-bold">
                  Live Pharmacist Desk
                </span>
              </div>
              <h3 className="text-base sm:text-xl font-bold text-slate-900 mt-0.5">
                Need Custom Case-Lot PTR Rates, Order Tracking, or Return Support?
              </h3>
              <p className="text-xs text-slate-600">
                Chat with our AI Support Assistant or connect directly to a live Pan Bazaar pharmacist agent in one click.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-support-chat", {}))
            }
            className="btn-primary px-5 py-3 rounded-xl text-xs sm:text-sm font-bold inline-flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Talk to Agent Now</span>
          </button>
        </div>
      </section>

      {/* 9. WHOLESALE BENEFITS & PARTNER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
                MAA BHAGWATI WHOLESALE BENEFITS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Trusted by 250+ Pharmacies &amp; Hospitals in Northeast India
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <span className="px-3 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-200 inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Genuine Products
              </span>
              <span className="px-3 py-1.5 rounded-full bg-blue-50 text-[#1D4ED8] border border-blue-200 inline-flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" /> Fast Pan-NE Delivery
              </span>
              <span className="px-3 py-1.5 rounded-full bg-orange-50 text-[#C2410C] border border-orange-200 inline-flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" /> GST Invoice Available
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className="rounded-2xl bg-[#F8FAFC] border border-slate-200 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]"
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1B3B6F]">
                      {t.tag}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    “{t.quote}”
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-200">
                  <div className="font-bold text-sm text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. PAYMENT PARTNERS SHOWCASE WITH IMAGES */}
      <PharmaPaymentPartnersSection />

      <Footer />
    </div>
  );
}
