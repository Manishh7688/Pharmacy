"use client";

import Link from "next/link";
import {
  ArrowRight,
  Star,
  ShieldCheck,
  Truck,
  FileText,
  ThermometerSnowflake,
  Sparkles,
  Phone,
  CheckCircle2,
  Flame,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  DentalkartHeroBanner,
  DentalkartTrustBar,
  DentalkartCategoryStrip,
  DentalkartBrandsSection,
  DentalkartProductCard,
  dentalkartPharmaProducts,
} from "@/components/widgets/DentalkartWidgets";

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
  const hotSellingProducts = dentalkartPharmaProducts.slice(0, 4);
  const mostSearchedProducts = dentalkartPharmaProducts.slice(4, 8);

  return (
    <div className="min-h-screen bg-[#F4F7FB]">
      <Navbar />

      {/* 1. DENTALKART HERO SLIDER + RIGHT PROMO CARDS */}
      <DentalkartHeroBanner />

      {/* 2. DENTALKART 4-PILLAR TRUST BAR */}
      <DentalkartTrustBar />

      {/* 3. TOP CATEGORIES (SHOP BY IMAGE) */}
      <DentalkartCategoryStrip />

      {/* 4. HOT SELLING WHOLESALE LOTS (DENTALKART PRODUCT GRID) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center">
              <Flame className="w-5 h-5 text-[#EA580C]" />
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
            <DentalkartProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. TOP BRANDS SHOWCASE */}
      <DentalkartBrandsSection />

      {/* 6. DENTALKART MID-PAGE SPLIT PROMO BANNERS (1/2 STYLE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Banner: Cold-Chain Vault */}
          <div className="rounded-2xl bg-gradient-to-r from-[#1B3B6F] to-[#0284C7] text-white p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xs">
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
              src="https://r2dkmedia.dentalkart.com/media/catalog/product/1/a/1artboard_16.jpg?w=512"
              alt="Cold Chain Medicines"
              className="w-28 h-28 rounded-2xl bg-white p-2 object-contain shrink-0 shadow-md"
            />
          </div>

          {/* Right Banner: Bulk Hospital & Surgical Consumables */}
          <div className="rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#1E3A8A] text-white p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xs">
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
              src="https://r2dkmedia.dentalkart.com/backend-media-uploads/HomepageImages/new.jpg?w=512"
              alt="Hospital & Surgical Supplies"
              className="w-28 h-28 rounded-2xl bg-white p-2 object-contain shrink-0 shadow-md"
            />
          </div>
        </div>
      </section>

      {/* 7. MOST SEARCHED PRODUCTS (DENTALKART SECTION) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Most Searched Formulations &amp; Surgicals
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              High-demand daily restock items for retail pharmacies, dental clinics &amp; nursing homes
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
            <DentalkartProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 8. DENTALKART BENEFITS & PARTNER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
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
              <div
                key={index}
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
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
