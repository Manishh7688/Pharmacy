"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award,
  PackageCheck,
  BadgePercent,
  Sparkles,
  ShoppingCart,
  ArrowRight,
  ThermometerSnowflake,
  Pill,
  Syringe,
  HeartPulse,
  Stethoscope,
  Activity,
  Cross,
  Microscope,
  Coins,
  Truck,
  Heart,
} from "lucide-react";
import { toast } from "sonner";

/* -------------------------------------------------------------------------- */
/* VERIFIED DENTALKART CDN IMAGES + PHARMACY PRODUCT DATA                     */
/* -------------------------------------------------------------------------- */
export interface WholesaleProduct {
  id: number;
  sku: string;
  name: string;
  brand: string;
  category: string;
  badge: "Best Seller" | "Hot Seller" | "Popular Choice" | "Budget Friendly";
  stockAlert?: string;
  optionsCount: string;
  rating: number;
  reviews: number;
  description: string;
  ptrPrice: number;
  mrpPrice: number;
  discountPercent: string;
  goldCoins: number;
  packSize: string;
  expiry: string;
  imageUrl: string;
  coldChain?: boolean;
}

export const dentalkartPharmaProducts: WholesaleProduct[] = [
  {
    id: 1,
    sku: "DK-MOR-625",
    name: "Dr. Morepen Mormox-CV 625 Tablets (Amoxicillin & Clavulanate)",
    brand: "Dr. Morepen",
    category: "Antibiotics",
    badge: "Best Seller",
    stockAlert: "Fast Moving Lot",
    optionsCount: "Add • 3 Options",
    rating: 4.9,
    reviews: 42,
    description:
      "Broad-spectrum Amoxicillin 500mg + Clavulanic Acid 125mg film-coated tablets for acute bacterial & odontogenic infections.",
    ptrPrice: 895,
    mrpPrice: 1380,
    discountPercent: "35.14% Off",
    goldCoins: 18,
    packSize: "Box of 10x6 Alu-Alu",
    expiry: "Exp: Aug 2028",
    imageUrl:
      "https://r2dkmedia.dentalkart.com/media/catalog/product/ctlp/d/r/drmorefwdkjr.jpg?w=512",
  },
  {
    id: 2,
    sku: "DK-MOR-500",
    name: "Dr. Morepen Mormox-500 Amoxicillin Capsules IP (Case Lot)",
    brand: "Dr. Morepen",
    category: "Antibiotics",
    badge: "Hot Seller",
    stockAlert: "Only 8 Boxes Left",
    optionsCount: "Add • 2 Offers",
    rating: 5.0,
    reviews: 28,
    description:
      "Penicillin antibiotic capsules for treating respiratory, ENT, dermal, and dental bacterial infections effectively.",
    ptrPrice: 1065,
    mrpPrice: 1572,
    discountPercent: "32.25% Off",
    goldCoins: 20,
    packSize: "Box of 20x10 Capsules",
    expiry: "Exp: Nov 2028",
    imageUrl:
      "https://r2dkmedia.dentalkart.com/media/catalog/product/1/a/1artboard_16.jpg?w=512",
  },
  {
    id: 3,
    sku: "DK-MOR-250",
    name: "Dr. Morepen Mormox-CV 375 / 250mg Antibiotic Strip Pack",
    brand: "Dr. Morepen",
    category: "Antibiotics",
    badge: "Popular Choice",
    optionsCount: "Add • 4 Options",
    rating: 4.6,
    reviews: 19,
    description:
      "Amoxicillin Trihydrate & Clavulanate formulation for pediatric and adult outpatient prescription counters.",
    ptrPrice: 745,
    mrpPrice: 1090,
    discountPercent: "31.65% Off",
    goldCoins: 14,
    packSize: "Box of 10x10 Strips",
    expiry: "Exp: Jun 2028",
    imageUrl:
      "https://r2dkmedia.dentalkart.com/media/catalog/product/1/2/123a14_3_4.jpg?w=512",
  },
  {
    id: 4,
    sku: "DK-MAT-101",
    name: "Clinical Chairside & Hospital Consumables Master Kit",
    brand: "Healthium / Samit",
    category: "Surgicals & Consumables",
    badge: "Best Seller",
    stockAlert: "Hospital Rate Contract",
    optionsCount: "Add • 6 Options",
    rating: 4.7,
    reviews: 35,
    description:
      "Essential clinical and hospital restock consumables — antiseptic solutions, surgical dressings, and diagnostic chemicals.",
    ptrPrice: 1450,
    mrpPrice: 2400,
    discountPercent: "39.58% Off",
    goldCoins: 30,
    packSize: "Institutional Combo Pack",
    expiry: "Exp: Dec 2028",
    imageUrl:
      "https://r2dkmedia.dentalkart.com/backend-media-uploads/HomepageImages/new.jpg?w=512",
  },
  {
    id: 5,
    sku: "DK-ETH-301",
    name: "Ethicon Vicryl Plus #3-0 Absorbable Antibacterial Suture (Pack of 12)",
    brand: "Ethicon / J&J",
    category: "Surgicals & Consumables",
    badge: "Best Seller",
    stockAlert: "Only 4 Left",
    optionsCount: "Add • 2 Offers",
    rating: 4.9,
    reviews: 51,
    description:
      "Braided polyglactin 910 triclosan-coated absorbable surgical suture with swaged needle for hospital & oral surgery.",
    ptrPrice: 4495,
    mrpPrice: 8664,
    discountPercent: "48.12% Off",
    goldCoins: 45,
    packSize: "Box of 12 Sterile Foils",
    expiry: "Exp: May 2028",
    imageUrl:
      "https://r2dkmedia.dentalkart.com/backend-media-uploads/HomepageImages/Gingival-Cuff-Former-Navratri-Mobile-fadeb9.jpg?w=512",
  },
  {
    id: 6,
    sku: "DK-FER-204",
    name: "Dr. Morepen Ferodoc-XT Ferrous Ascorbate & Folic Acid Suspension",
    brand: "Dr. Morepen",
    category: "OTC & Nutraceuticals",
    badge: "Budget Friendly",
    optionsCount: "Add • 2 Offers",
    rating: 5.0,
    reviews: 16,
    description:
      "High-absorption hematinic suspension supporting red blood cell synthesis and maternal/anemia recovery.",
    ptrPrice: 540,
    mrpPrice: 2210,
    discountPercent: "75.56% Off",
    goldCoins: 12,
    packSize: "Case of 12 x 200ml Bottles",
    expiry: "Exp: Sep 2027",
    imageUrl:
      "https://r2dkmedia.dentalkart.com/media/catalog/product/ctlp/d/r/drmorefwdkjr.jpg?w=512",
  },
  {
    id: 7,
    sku: "DK-PEN-402",
    name: "Dr. Morepen Pentate-DSR Pantoprazole 40mg + Domperidone 30mg",
    brand: "Dr. Morepen",
    category: "Gastrointestinal",
    badge: "Hot Seller",
    optionsCount: "Add • 3 Offers",
    rating: 4.8,
    reviews: 31,
    description:
      "Gastro-resistant proton pump inhibitor & prolonged-release prokinetic capsules for GERD and hyperacidity.",
    ptrPrice: 580,
    mrpPrice: 1150,
    discountPercent: "49.57% Off",
    goldCoins: 15,
    packSize: "Box of 10x10 Alu-Alu",
    expiry: "Exp: Oct 2028",
    imageUrl:
      "https://r2dkmedia.dentalkart.com/media/catalog/product/1/a/1artboard_16.jpg?w=512",
  },
  {
    id: 8,
    sku: "DK-INS-901",
    name: "Biocon Basalog / Insulin Glargine 100 IU/mL Cold-Chain Cartridges",
    brand: "Biocon / Abbott",
    category: "Anti-Diabetic",
    badge: "Best Seller",
    stockAlert: "Cold-Chain +2°C to +8°C",
    optionsCount: "Add • 2 Offers",
    rating: 4.9,
    reviews: 24,
    description:
      "24-hour basal insulin analog dispatched in validated 72-hour gel-pack insulated cold boxes across Northeast India.",
    ptrPrice: 1490,
    mrpPrice: 2150,
    discountPercent: "30.70% Off",
    goldCoins: 28,
    packSize: "Pack of 3x3mL Penfills",
    expiry: "Exp: Jul 2028",
    imageUrl:
      "https://r2dkmedia.dentalkart.com/media/catalog/product/1/2/123a14_3_4.jpg?w=512",
    coldChain: true,
  },
];

/* -------------------------------------------------------------------------- */
/* 0. DENTALKART TOP QUICK-CATEGORY ICON STRIP (Prosthetics/Airotors style)   */
/* -------------------------------------------------------------------------- */
const quickTopIcons = [
  {
    label: "Antibiotics",
    img: "https://r2dkmedia.dentalkart.com/media/catalog/product/ctlp/d/r/drmorefwdkjr.jpg?w=512",
  },
  {
    label: "Capsules",
    img: "https://r2dkmedia.dentalkart.com/media/catalog/product/1/a/1artboard_16.jpg?w=512",
  },
  {
    label: "Pediatrics",
    img: "https://r2dkmedia.dentalkart.com/media/catalog/product/1/2/123a14_3_4.jpg?w=512",
  },
  {
    label: "Sutures",
    img: "https://r2dkmedia.dentalkart.com/backend-media-uploads/HomepageImages/Gingival-Cuff-Former-Navratri-Mobile-fadeb9.jpg?w=512",
  },
  {
    label: "Consumables",
    img: "https://r2dkmedia.dentalkart.com/backend-media-uploads/HomepageImages/new.jpg?w=512",
  },
  {
    label: "Gastro & PPI",
    img: "https://r2dkmedia.dentalkart.com/media/catalog/product/ctlp/d/r/drmorefwdkjr.jpg?w=512",
  },
  {
    label: "Cold-Chain",
    img: "https://r2dkmedia.dentalkart.com/media/catalog/product/1/a/1artboard_16.jpg?w=512",
  },
  {
    label: "Cardiac Care",
    img: "https://r2dkmedia.dentalkart.com/media/catalog/product/1/2/123a14_3_4.jpg?w=512",
  },
  {
    label: "Sterilization",
    img: "https://r2dkmedia.dentalkart.com/backend-media-uploads/HomepageImages/new.jpg?w=512",
  },
  {
    label: "Wound Care",
    img: "https://r2dkmedia.dentalkart.com/backend-media-uploads/HomepageImages/Gingival-Cuff-Former-Navratri-Mobile-fadeb9.jpg?w=512",
  },
  {
    label: "Vitamins",
    img: "https://r2dkmedia.dentalkart.com/media/catalog/product/ctlp/d/r/drmorefwdkjr.jpg?w=512",
  },
  {
    label: "Hospital Kit",
    img: "https://r2dkmedia.dentalkart.com/backend-media-uploads/HomepageImages/new.jpg?w=512",
  },
];

/* -------------------------------------------------------------------------- */
/* 1. DENTALKART HERO PROMO CAROUSEL + SIDE BANNERS (2/5 SLIDER STYLE)        */
/* -------------------------------------------------------------------------- */
const heroSlides = [
  {
    id: 1,
    tag: "NORTHEAST INDIA'S #1 B2B PHARMA STORE",
    title: "Up to 65% Trade Margin on Antibiotics & Acute Care",
    subtitle:
      "Direct depot supply of Dr. Morepen, Cipla, Sun Pharma & Alkem with HSN GST Invoice & 10+1 Free Strip Schemes.",
    cta: "Shop Antibiotic Lots",
    href: "/products",
    bgGradient: "from-[#1B3B6F] via-[#1D4ED8] to-[#0284C7]",
    badgeText: "100% ORIGINAL • DIRECT DEPOT",
    imageUrl:
      "https://r2dkmedia.dentalkart.com/media/catalog/product/ctlp/d/r/drmorefwdkjr.jpg?w=512",
    productSpot: "Dr. Morepen Mormox-CV 625",
    priceSpot: "PTR ₹895 / Box (35% Off)",
  },
  {
    id: 2,
    tag: "INSTAPHARMA COLD-CHAIN EXPRESS • GUWAHATI HUB",
    title: "Validated +2°C to +8°C Vaccines, Insulins & Biologics",
    subtitle:
      "IoT temperature-logged cold-chain dispatch to Assam, Meghalaya, Nagaland, Arunachal & Manipur within 24 hours.",
    cta: "Explore Cold-Chain Vault",
    href: "/services",
    bgGradient: "from-[#0F172A] via-[#1E3A8A] to-[#0369A1]",
    badgeText: "ISO 9001:2015 COLD VAULT",
    imageUrl:
      "https://r2dkmedia.dentalkart.com/media/catalog/product/1/a/1artboard_16.jpg?w=512",
    productSpot: "Mormox-500 & Biologics Range",
    priceSpot: "Same-Day Dispatch Before 4 PM",
  },
  {
    id: 3,
    tag: "HOSPITAL & SURGICAL CONSUMABLES",
    title: "Ethicon Sutures, Sterilization & ICU Disposables",
    subtitle:
      "Wholesale boxes of absorbable sutures, IV cannulas, disinfection trays, and wound dressings at institutional rates.",
    cta: "View Surgical Catalogue",
    href: "/products",
    bgGradient: "from-[#1E3A8A] via-[#1D4ED8] to-[#0F766E]",
    badgeText: "HOSPITAL TENDER RATES",
    imageUrl:
      "https://r2dkmedia.dentalkart.com/backend-media-uploads/HomepageImages/new.jpg?w=512",
    productSpot: "Chairside & Surgical Consumables",
    priceSpot: "Up to 48% Institutional Off",
  },
];

export function DentalkartHeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[current];

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 pt-3 pb-5">
      {/* Dentalkart Top Horizontal Quick-Category Pill Strip */}
      <div className="mb-4 bg-white border border-slate-200 rounded-2xl px-3 py-2.5 shadow-2xs overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-between gap-4 min-w-max">
          {quickTopIcons.map((item) => (
            <Link
              key={item.label}
              href="/products"
              className="flex items-center gap-2 px-2.5 py-1 rounded-xl hover:bg-[#EFF6FF] group transition"
            >
              <img
                src={item.img}
                alt={item.label}
                className="w-7 h-7 rounded-full object-contain bg-slate-50 border border-slate-200 p-0.5 group-hover:border-[#1D4ED8]"
              />
              <span className="text-xs font-semibold text-slate-700 group-hover:text-[#1D4ED8]">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Main Carousel Banner (Dentalkart 8-col slider) */}
        <div className="lg:col-span-8 relative rounded-2xl overflow-hidden shadow-md min-h-[300px] sm:min-h-[360px] flex">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0.2, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0.2, x: -20 }}
              transition={{ duration: 0.35 }}
              className={`w-full bg-gradient-to-r ${slide.bgGradient} text-white p-5 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative`}
            >
              {/* Left Copy */}
              <div className="max-w-xl space-y-3 z-10 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-[#FDE047]" />
                  <span>{slide.tag}</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-bold tracking-tight leading-[1.15]">
                  {slide.title}
                </h1>

                <p className="text-xs sm:text-base text-blue-100 leading-relaxed">
                  {slide.subtitle}
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <Link
                    href={slide.href}
                    className="btn-orange px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2"
                  >
                    <span>{slide.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <span className="text-[11px] font-medium px-3 py-2 rounded-xl bg-black/25 border border-white/15">
                    {slide.badgeText}
                  </span>
                </div>
              </div>

              {/* Right Featured Product Spot Card (with real Dentalkart Image) */}
              <div className="w-full max-w-[250px] md:w-64 shrink-0 bg-white text-slate-900 rounded-2xl p-3.5 shadow-xl border border-blue-100 z-10">
                <div className="relative h-32 sm:h-36 w-full rounded-xl bg-slate-50 overflow-hidden flex items-center justify-center border border-slate-100">
                  <img
                    src={slide.imageUrl}
                    alt={slide.productSpot}
                    className="w-full h-full object-contain p-2"
                  />
                  <span className="absolute top-2 left-2 dk-badge-bestseller">
                    Featured Deal
                  </span>
                </div>
                <div className="mt-2.5">
                  <div className="text-xs font-bold text-slate-800 line-clamp-1">
                    {slide.productSpot}
                  </div>
                  <div className="text-xs font-semibold text-[#16A34A] mt-0.5">
                    {slide.priceSpot}
                  </div>
                </div>
              </div>

              {/* Dentalkart Slide Counter Pill + Dots */}
              <div className="absolute bottom-3 right-4 flex items-center gap-2 z-20">
                <div className="flex gap-1">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrent(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        current === idx ? "w-5 bg-[#FDE047]" : "w-1.5 bg-white/50"
                      }`}
                    />
                  ))}
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-black/40 text-white text-[11px] font-mono-tech">
                  {current + 1}/{heroSlides.length}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next Controls */}
          <button
            type="button"
            onClick={() =>
              setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
            }
            className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow items-center justify-center z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setCurrent((prev) => (prev + 1) % heroSlides.length)}
            className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow items-center justify-center z-20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Right Stacked Promo Banners (Dentalkart Side Cards) */}
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {/* Top Side Card: New Pharmacy / Clinic Setup */}
          <div className="rounded-2xl bg-gradient-to-br from-[#FFF7ED] to-[#FFEDD5] border border-[#FED7AA] p-4 sm:p-5 flex items-center justify-between gap-3 shadow-xs">
            <div className="space-y-1">
              <span className="inline-block px-2 py-0.5 rounded-md bg-[#FF6B35] text-white text-[10px] font-bold uppercase tracking-wider">
                New Pharmacy Setup
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                Opening a Retail Chemist or Nursing Home?
              </h3>
              <p className="text-xs text-slate-600">
                Complete first-stock starter inventory + 30-day credit line.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#C2410C] hover:underline pt-1"
              >
                <span>Request Dealer Price List</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <img
              src="https://r2dkmedia.dentalkart.com/media/catalog/product/1/2/123a14_3_4.jpg?w=512"
              alt="New Pharmacy Starter Pack"
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-contain bg-white p-1.5 border border-orange-200 shrink-0"
            />
          </div>

          {/* Bottom Side Card: InstaPharma Same-Day Dispatch */}
          <div className="rounded-2xl bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] border border-[#BFDBFE] p-4 sm:p-5 flex items-center justify-between gap-3 shadow-xs">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#1D4ED8] text-white text-[10px] font-bold uppercase tracking-wider">
                <Truck className="w-3 h-3" /> InstaPharma Express
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                Guwahati 4-Hour Delivery &amp; NE Overnight Line
              </h3>
              <p className="text-xs text-slate-600">
                Pan Bazaar central vault • 100% GST &amp; batch-verified stock.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#1D4ED8] hover:underline pt-1"
              >
                <span>Browse Ready Stock</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <img
              src="https://r2dkmedia.dentalkart.com/backend-media-uploads/HomepageImages/Gingival-Cuff-Former-Navratri-Mobile-fadeb9.jpg?w=512"
              alt="InstaPharma Express"
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover bg-white p-1 border border-blue-200 shrink-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. DENTALKART 4-PILLAR TRUST BAR                                           */
/* -------------------------------------------------------------------------- */
export function DentalkartTrustBar() {
  const pillars = [
    {
      icon: PackageCheck,
      title: "5,240+ Products",
      sub: "Ready Stock in Guwahati Vault",
      color: "text-[#1D4ED8] bg-[#EFF6FF]",
    },
    {
      icon: Award,
      title: "150+ Trusted Brands",
      sub: "Direct C&F Depot Sourcing",
      color: "text-[#0284C7] bg-[#E0F2FE]",
    },
    {
      icon: ShieldCheck,
      title: "100% Original",
      sub: "Batch & Expiry Traceable",
      color: "text-[#16A34A] bg-[#DCFCE7]",
    },
    {
      icon: BadgePercent,
      title: "Assured Best Prices",
      sub: "Wholesale PTR/PTS + Schemes",
      color: "text-[#EA580C] bg-[#FFF7ED]",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 py-2">
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xs">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 ${p.color}`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-xs sm:text-base text-slate-900 truncate">
                    {p.title}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 truncate">
                    {p.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. DENTALKART "TOP CATEGORIES - SHOP BY IMAGE" STRIP                       */
/* -------------------------------------------------------------------------- */
export const pharmaCategories = [
  {
    name: "Antibiotics",
    count: "850+ SKUs",
    icon: Pill,
    imageUrl:
      "https://r2dkmedia.dentalkart.com/media/catalog/product/ctlp/d/r/drmorefwdkjr.jpg?w=512",
  },
  {
    name: "Analgesics & Pain",
    count: "480+ SKUs",
    icon: Activity,
    imageUrl:
      "https://r2dkmedia.dentalkart.com/media/catalog/product/1/a/1artboard_16.jpg?w=512",
  },
  {
    name: "Anti-Diabetic",
    count: "310+ SKUs",
    icon: Syringe,
    imageUrl:
      "https://r2dkmedia.dentalkart.com/media/catalog/product/1/2/123a14_3_4.jpg?w=512",
  },
  {
    name: "Cardiac Care",
    count: "620+ SKUs",
    icon: HeartPulse,
    imageUrl:
      "https://r2dkmedia.dentalkart.com/backend-media-uploads/HomepageImages/new.jpg?w=512",
  },
  {
    name: "Sutures & Needles",
    count: "240+ SKUs",
    icon: Cross,
    imageUrl:
      "https://r2dkmedia.dentalkart.com/backend-media-uploads/HomepageImages/Gingival-Cuff-Former-Navratri-Mobile-fadeb9.jpg?w=512",
  },
  {
    name: "Gastro & PPIs",
    count: "290+ SKUs",
    icon: Microscope,
    imageUrl:
      "https://r2dkmedia.dentalkart.com/media/catalog/product/ctlp/d/r/drmorefwdkjr.jpg?w=512",
  },
  {
    name: "Cold-Chain Vault",
    count: "190+ SKUs",
    icon: ThermometerSnowflake,
    imageUrl:
      "https://r2dkmedia.dentalkart.com/media/catalog/product/1/a/1artboard_16.jpg?w=512",
  },
  {
    name: "IV & Disposables",
    count: "540+ SKUs",
    icon: Stethoscope,
    imageUrl:
      "https://r2dkmedia.dentalkart.com/backend-media-uploads/HomepageImages/new.jpg?w=512",
  },
];

export function DentalkartCategoryStrip() {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 py-7">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight">
            Top Categories
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Shop by image across therapeutic &amp; surgical departments
          </p>
        </div>
        <Link
          href="/products"
          className="text-xs sm:text-sm font-semibold text-[#1D4ED8] hover:underline inline-flex items-center gap-1"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {pharmaCategories.map((cat) => (
          <Link
            key={cat.name}
            href={`/products?category=${encodeURIComponent(cat.name)}`}
            className="group bg-white border border-slate-200 hover:border-[#1D4ED8] rounded-2xl p-3 flex flex-col items-center text-center transition shadow-2xs hover:shadow-md"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F4F7FB] border border-slate-200 group-hover:border-[#93C5FD] overflow-hidden flex items-center justify-center p-2 mb-2 transition">
              <img
                src={cat.imageUrl}
                alt={cat.name}
                className="w-full h-full object-contain group-hover:scale-108 transition-transform"
              />
            </div>
            <div className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-[#1D4ED8] line-clamp-1">
              {cat.name}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">{cat.count}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. DENTALKART "TOP BRANDS" SHOWCASE                                        */
/* -------------------------------------------------------------------------- */
export const topPharmaBrands = [
  { name: "Dr. Morepen", tag: "Antibiotics & OTC", highlight: "Up to 75% Off" },
  { name: "Sun Pharma", tag: "Chronic & Cardiac", highlight: "Direct Depot" },
  { name: "Cipla", tag: "Respiratory & Acute", highlight: "Full Range" },
  { name: "Abbott", tag: "Insulins & Gastro", highlight: "Cold-Chain" },
  { name: "Ethicon / J&J", tag: "Surgical Sutures", highlight: "48% Off" },
  { name: "Dr. Reddy's", tag: "GI & Analgesics", highlight: "10+1 Scheme" },
  { name: "Mankind", tag: "Acute & Vitamins", highlight: "Best PTR" },
  { name: "Healthium", tag: "Wound & Sutures", highlight: "Hospital Kit" },
  { name: "Zydus", tag: "Statins & Diabetic", highlight: "Fresh Batch" },
  { name: "Biocon", tag: "Biologics & Insulin", highlight: "+2°C to +8°C" },
  { name: "Alkem", tag: "Anti-Infectives", highlight: "Case Deals" },
  { name: "Polymed", tag: "IV & Infusion", highlight: "Bulk Box" },
];

export function DentalkartBrandsSection() {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 py-5">
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight">
              Top Brands
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Authorized wholesale stockist for 150+ pharmaceutical &amp; medtech manufacturers
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs sm:text-sm font-semibold text-[#1D4ED8] hover:underline inline-flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {topPharmaBrands.map((b) => (
            <Link
              key={b.name}
              href="/products"
              className="group rounded-xl border border-slate-200 hover:border-[#1D4ED8] bg-[#F8FAFC] hover:bg-[#EFF6FF]/60 p-3.5 flex flex-col justify-between transition"
            >
              <div className="flex items-center justify-between gap-1">
                <span className="w-7 h-7 rounded-lg bg-[#1B3B6F] text-white font-bold text-xs flex items-center justify-center">
                  {b.name.slice(0, 2).toUpperCase()}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                  {b.highlight}
                </span>
              </div>
              <div className="mt-3">
                <div className="font-bold text-sm text-slate-900 group-hover:text-[#1D4ED8] truncate">
                  {b.name}
                </div>
                <div className="text-[11px] text-slate-500 truncate">{b.tag}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. DENTALKART PRODUCT CARD COMPONENT (WITH WISHLIST + GOLD COIN + OPTIONS) */
/* -------------------------------------------------------------------------- */
export function DentalkartProductCard({ product }: { product: WholesaleProduct }) {
  const [wishlisted, setWishlisted] = useState(false);

  const handleAddQuote = () => {
    toast.success(`Added ${product.name} to Bulk Quote!`, {
      description: `PTR ₹${product.ptrPrice} (${product.packSize}) • Earn ${product.goldCoins} Gold Coins`,
    });
  };

  const toggleWishlist = () => {
    setWishlisted(!wishlisted);
    toast.info(
      !wishlisted
        ? `Saved ${product.name} to Shortlist`
        : `Removed from Shortlist`
    );
  };

  return (
    <div className="product-card flex flex-col justify-between p-3.5 sm:p-4 bg-white">
      <div>
        {/* Top Badges Row (Best Seller + Stock Alert + Wishlist Heart) */}
        <div className="flex items-center justify-between gap-1 mb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="dk-badge-bestseller">{product.badge}</span>
            {product.stockAlert && (
              <span className="dk-badge-stock">{product.stockAlert}</span>
            )}
          </div>
          <button
            type="button"
            onClick={toggleWishlist}
            aria-label="Save to shortlist"
            className={`p-1.5 rounded-full border transition ${
              wishlisted
                ? "bg-red-50 border-red-200 text-red-500"
                : "bg-slate-50 border-slate-200 text-slate-400 hover:text-red-500"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${wishlisted ? "fill-red-500" : ""}`} />
          </button>
        </div>

        {/* Product Image Container */}
        <div className="relative h-42 sm:h-44 w-full rounded-xl bg-[#F8FAFC] border border-slate-100 flex items-center justify-center p-3 mb-3 group">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />

          {/* Bottom-Left Rating Pill */}
          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-white/95 border border-slate-200 shadow-2xs flex items-center gap-1 text-xs font-semibold text-slate-800">
            <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-slate-400 font-normal">({product.reviews})</span>
          </div>

          {/* Bottom-Right "Add X Options" Pill (Dentalkart exact button) */}
          <button
            type="button"
            onClick={handleAddQuote}
            className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-white hover:bg-[#1D4ED8] text-[#1D4ED8] hover:text-white border border-[#93C5FD] text-[11px] font-bold shadow-xs transition cursor-pointer"
          >
            {product.optionsCount}
          </button>
        </div>

        {/* Brand & Expiry */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
          <span className="font-bold text-[#1D4ED8] uppercase tracking-wider truncate">
            {product.brand}
          </span>
          <span className="font-mono-tech text-[10px] shrink-0">{product.expiry}</span>
        </div>

        {/* Product Title */}
        <h3 className="font-bold text-sm sm:text-[15px] text-slate-900 leading-snug line-clamp-2 mb-1">
          {product.name}
        </h3>

        {/* Short Clinical Description */}
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
          {product.description}
        </p>
      </div>

      {/* Pricing, Discount, Gold Coin & Action Footer */}
      <div className="pt-2.5 border-t border-slate-100 space-y-2">
        <div className="flex items-baseline flex-wrap gap-1.5">
          <span className="text-lg sm:text-xl font-bold text-slate-900 tabular-nums">
            ₹ {product.ptrPrice}
          </span>
          <span className="text-xs text-slate-400 line-through tabular-nums">
            ₹ {product.mrpPrice}
          </span>
          <span className="dk-badge-discount">{product.discountPercent}</span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="dk-badge-coin inline-flex items-center gap-1">
            <Coins className="w-3 h-3 text-[#D97706]" />
            <span>gold coin {product.goldCoins}</span>
          </span>
          <span className="text-[11px] text-slate-500 font-medium truncate">
            {product.packSize}
          </span>
        </div>

        <div className="pt-1 flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddQuote}
            className="flex-1 btn-primary py-2 rounded-xl text-xs font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add to Quote</span>
          </button>
          <Link
            href={`/contact?product=${encodeURIComponent(product.name)}`}
            className="px-3 py-2 rounded-xl border border-slate-200 hover:border-[#1D4ED8] text-xs font-semibold text-slate-700 hover:text-[#1D4ED8] transition"
          >
            Bulk
          </Link>
        </div>

        <Link
          href="/products"
          className="block text-center text-[11px] font-semibold text-[#0284C7] hover:underline pt-1 border-t border-slate-50"
        >
          View Similar Products
        </Link>
      </div>
    </div>
  );
}
