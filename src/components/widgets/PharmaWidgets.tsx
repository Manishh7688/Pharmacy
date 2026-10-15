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
  CheckCircle2,
  Lock,
  CreditCard,
  Headphones,
  ZoomIn,
} from "lucide-react";
import { toast } from "sonner";

/* -------------------------------------------------------------------------- */
/* PHARMACY WHOLESALE PRODUCT CATALOGUE DATA (ALL 12 SKUS)                    */
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
  composition?: string;
  hsnCode?: string;
  gstRate?: string;
  storage?: string;
  schemeText?: string;
}

export const wholesalePharmaProducts: WholesaleProduct[] = [
  {
    id: 1,
    sku: "MB-MOR-625",
    name: "Dr. Morepen Mormox-CV 625 Tablets (Amoxicillin & Clavulanate)",
    brand: "Dr. Morepen",
    category: "Antibiotics",
    badge: "Best Seller",
    stockAlert: "Fast Moving Lot",
    optionsCount: "Add • 3 Options",
    rating: 4.9,
    reviews: 42,
    description:
      "Broad-spectrum Amoxicillin 500mg + Clavulanic Acid 125mg film-coated tablets for acute bacterial & clinical infections.",
    ptrPrice: 895,
    mrpPrice: 1380,
    discountPercent: "35.14% Off",
    goldCoins: 18,
    packSize: "Box of 10x6 Alu-Alu",
    expiry: "Exp: Aug 2028",
    imageUrl: "/images/products/mormox-cv-625.svg",
    composition: "Amoxicillin Trihydrate IP eq. to Amoxicillin 500mg + Potassium Clavulanate Diluted IP eq. to Clavulanic Acid 125mg",
    hsnCode: "30041010",
    gstRate: "12% GST Included",
    storage: "Store below 25°C in a dry place, protected from moisture",
    schemeText: "10+1 Free Strip on 5+ Boxes",
  },
  {
    id: 2,
    sku: "MB-MOR-500",
    name: "Dr. Morepen Mormox-500 Amoxicillin Capsules IP (Case Lot)",
    brand: "Dr. Morepen",
    category: "Antibiotics",
    badge: "Hot Seller",
    stockAlert: "Only 8 Boxes Left",
    optionsCount: "Add • 2 Offers",
    rating: 5.0,
    reviews: 28,
    description:
      "Penicillin antibiotic capsules for treating respiratory, ENT, dermal, and acute bacterial infections effectively.",
    ptrPrice: 1065,
    mrpPrice: 1572,
    discountPercent: "32.25% Off",
    goldCoins: 20,
    packSize: "Box of 20x10 Capsules",
    expiry: "Exp: Nov 2028",
    imageUrl: "/images/products/mormox-500.svg",
    composition: "Amoxicillin Trihydrate IP eq. to Amoxicillin 500mg Hard Gelatin Capsules",
    hsnCode: "30041000",
    gstRate: "12% GST Included",
    storage: "Store in a cool, dry & dark place below 25°C",
    schemeText: "Extra 5% Case-Lot Margin on 10+ Boxes",
  },
  {
    id: 3,
    sku: "MB-MOR-250",
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
    imageUrl: "/images/products/mormox-cv-625.svg",
    composition: "Amoxicillin 250mg + Clavulanic Acid 125mg Film-Coated Tablets IP",
    hsnCode: "30041010",
    gstRate: "12% GST Included",
    storage: "Store below 25°C away from direct sunlight",
    schemeText: "10+1 Free Strip Scheme Active",
  },
  {
    id: 4,
    sku: "MB-MAT-101",
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
    imageUrl: "/images/products/surgical-kit.svg",
    composition: "Sterile Surgical Dressings, Povidone-Iodine Prep, Chlorhexidine & Clinical Consumables",
    hsnCode: "30059090",
    gstRate: "12% GST Included",
    storage: "Ambient clinical storage",
    schemeText: "Institutional Rate Contract on 5+ Kits",
  },
  {
    id: 5,
    sku: "MB-ETH-301",
    name: "Ethicon Vicryl Plus #3-0 Absorbable Antibacterial Suture (Pack of 12)",
    brand: "Ethicon / J&J",
    category: "Surgicals & Consumables",
    badge: "Best Seller",
    stockAlert: "Only 4 Left",
    optionsCount: "Add • 2 Offers",
    rating: 4.9,
    reviews: 51,
    description:
      "Braided polyglactin 910 triclosan-coated absorbable surgical suture with swaged needle for hospital & general surgery.",
    ptrPrice: 4495,
    mrpPrice: 8664,
    discountPercent: "48.12% Off",
    goldCoins: 45,
    packSize: "Box of 12 Sterile Foils",
    expiry: "Exp: May 2028",
    imageUrl: "/images/products/ethicon-vicryl.svg",
    composition: "Polyglactin 910 Coated with Irgacare MP (Triclosan) Sterile Absorbable Suture USP #3-0",
    hsnCode: "30061010",
    gstRate: "12% GST Included",
    storage: "Store below 30°C in sterile foil packaging",
    schemeText: "Direct Hospital Tender Price (48% Off)",
  },
  {
    id: 6,
    sku: "MB-FER-204",
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
    imageUrl: "/images/products/mormox-cv-625.svg",
    composition: "Ferrous Ascorbate eq. to Elemental Iron 30mg + Folic Acid IP 550mcg / 5mL Suspension",
    hsnCode: "30049099",
    gstRate: "12% GST Included",
    storage: "Keep bottle tightly closed in a cool place",
    schemeText: "High-Margin 75% Off Retail Chemist Deal",
  },
  {
    id: 7,
    sku: "MB-PEN-402",
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
    imageUrl: "/images/products/mormox-500.svg",
    composition: "Pantoprazole Sodium IP 40mg (Enteric Coated) + Domperidone IP 30mg (Sustained Release)",
    hsnCode: "30049039",
    gstRate: "12% GST Included",
    storage: "Store below 25°C, protect from light & moisture",
    schemeText: "10+1 Free Strip + Extra 5% Case Discount",
  },
  {
    id: 8,
    sku: "MB-INS-901",
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
    imageUrl: "/images/products/insulin-glargine.svg",
    coldChain: true,
    composition: "Insulin Glargine IP (r-DNA Origin) 100 IU/mL Solution for Injection",
    hsnCode: "30043110",
    gstRate: "5% Life-Saving Drug GST",
    storage: "Refrigerate between +2°C to +8°C. Do not freeze.",
    schemeText: "Dispatched in Free Validated 72h Gel Cold-Box",
  },
  {
    id: 9,
    sku: "MB-CAL-500",
    name: "Dr. Morepen Calcidoc-500 Calcium & Vitamin D3 Tablets (Case Lot)",
    brand: "Dr. Morepen",
    category: "OTC & Nutraceuticals",
    badge: "Best Seller",
    optionsCount: "Add • 3 Offers",
    rating: 4.8,
    reviews: 19,
    description:
      "Elemental Calcium 500mg + Cholecalciferol IP tablets for orthopedic and maternal bone mineral density support.",
    ptrPrice: 420,
    mrpPrice: 950,
    discountPercent: "55.79% Off",
    goldCoins: 10,
    packSize: "Box of 15x15 Blister",
    expiry: "Exp: Sep 2028",
    imageUrl: "/images/products/mormox-cv-625.svg",
    composition: "Calcium Carbonate 1250mg eq. to Elemental Calcium 500mg + Vitamin D3 IP 250 IU",
    hsnCode: "30049099",
    gstRate: "12% GST Included",
    storage: "Store in a cool, dry place below 30°C",
    schemeText: "10+2 Free Blister Strips on Case Order",
  },
  {
    id: 10,
    sku: "MB-CUR-010",
    name: "Curatick Oral & Mucosal Wound Dressing Patch (Pack of 10)",
    brand: "Curatick / Medtech",
    category: "Surgicals & Consumables",
    badge: "Best Seller",
    stockAlert: "Only 6 Packs Left",
    optionsCount: "Add • 2 Offers",
    rating: 4.5,
    reviews: 12,
    description:
      "Transparent, Vitamin-E enriched resorbable adhesive wound dressing patch for mucosal and post-surgical care.",
    ptrPrice: 449,
    mrpPrice: 1200,
    discountPercent: "62.58% Off",
    goldCoins: 8,
    packSize: "Box of 10 Patches",
    expiry: "Exp: May 2028",
    imageUrl: "/images/products/ethicon-vicryl.svg",
    composition: "Hydrophilic Bio-Adhesive Polymer Matrix with Vitamin E & Chamomile Extract",
    hsnCode: "30051090",
    gstRate: "12% GST Included",
    storage: "Store below 25°C in sealed foil pouch",
    schemeText: "Buy 5 Boxes Get 1 Box Free",
  },
  {
    id: 11,
    sku: "MB-CAR-401",
    name: "Telmisartan 40mg + Amlodipine 5mg Antihypertensive Strip Box",
    brand: "Sun Pharma / Torrent",
    category: "Cardiovascular",
    badge: "Popular Choice",
    optionsCount: "Add • 4 Options",
    rating: 4.9,
    reviews: 37,
    description:
      "First-line dual antihypertensive therapy for 24-hour blood pressure control in chronic cardiac care patients.",
    ptrPrice: 780,
    mrpPrice: 1240,
    discountPercent: "37.10% Off",
    goldCoins: 16,
    packSize: "Box of 10x15 Alu-Alu",
    expiry: "Exp: Nov 2028",
    imageUrl: "/images/products/mormox-500.svg",
    composition: "Telmisartan IP 40mg + Amlodipine Besylate IP eq. to Amlodipine 5mg Tablets",
    hsnCode: "30049079",
    gstRate: "12% GST Included",
    storage: "Store protected from moisture at temperature not exceeding 30°C",
    schemeText: "Chronic Care 10+1 Free Strip Scheme",
  },
  {
    id: 12,
    sku: "MB-STE-500",
    name: "Life Steridex Disinfection & Cold Sterilization Soaking Tray (5L)",
    brand: "Life Steriware",
    category: "Surgicals & Consumables",
    badge: "Hot Seller",
    stockAlert: "Only 5 Units Left",
    optionsCount: "Add • 1 Offer",
    rating: 4.7,
    reviews: 22,
    description:
      "Autoclavable soaking tray with perforated inner liner and lid for cold sterilization of hospital & surgical instruments.",
    ptrPrice: 3895,
    mrpPrice: 11000,
    discountPercent: "64.59% Off",
    goldCoins: 60,
    packSize: "1 Complete 5L Unit",
    expiry: "5-Year Warranty",
    imageUrl: "/images/products/surgical-kit.svg",
    composition: "Medical-Grade Autoclavable Polypropylene 5-Litre Instrument Disinfection Tray",
    hsnCode: "90189099",
    gstRate: "12% GST Included",
    storage: "Autoclavable up to 134°C",
    schemeText: "Free 1L Glutaraldehyde Solution on 2+ Units",
  },
];

/* -------------------------------------------------------------------------- */
/* 0. TOP QUICK-CATEGORY ICON STRIP                                           */
/* -------------------------------------------------------------------------- */
const quickTopIcons = [
  { label: "Antibiotics", img: "/images/products/mormox-cv-625.svg" },
  { label: "Capsules", img: "/images/products/mormox-500.svg" },
  { label: "Pediatrics", img: "/images/products/mormox-cv-625.svg" },
  { label: "Sutures", img: "/images/products/ethicon-vicryl.svg" },
  { label: "Consumables", img: "/images/products/surgical-kit.svg" },
  { label: "Gastro & PPI", img: "/images/products/mormox-500.svg" },
  { label: "Cold-Chain", img: "/images/products/insulin-glargine.svg" },
  { label: "Cardiac Care", img: "/images/products/mormox-cv-625.svg" },
  { label: "Sterilization", img: "/images/products/surgical-kit.svg" },
  { label: "Wound Care", img: "/images/products/ethicon-vicryl.svg" },
  { label: "Vitamins", img: "/images/products/mormox-cv-625.svg" },
  { label: "Hospital Kit", img: "/images/products/surgical-kit.svg" },
];

/* -------------------------------------------------------------------------- */
/* 1. HERO PROMO CAROUSEL + SIDE BANNERS (WITH ANIMATIONS)                    */
/* -------------------------------------------------------------------------- */
const heroSlides = [
  {
    id: 1,
    productId: 1,
    tag: "NORTHEAST INDIA'S #1 B2B PHARMA STORE",
    title: "Up to 65% Trade Margin on Antibiotics & Acute Care",
    subtitle:
      "Direct depot supply of Dr. Morepen, Cipla, Sun Pharma & Alkem with HSN GST Invoice & 10+1 Free Strip Schemes.",
    cta: "Shop Antibiotic Lots",
    href: "/products/1",
    bgGradient: "from-[#1B3B6F] via-[#1D4ED8] to-[#0284C7]",
    badgeText: "100% ORIGINAL • DIRECT DEPOT",
    imageUrl: "/images/products/mormox-cv-625.svg",
    productSpot: "Dr. Morepen Mormox-CV 625",
    priceSpot: "PTR ₹895 / Box (35% Off)",
  },
  {
    id: 2,
    productId: 8,
    tag: "INSTAPHARMA COLD-CHAIN EXPRESS • GUWAHATI HUB",
    title: "Validated +2°C to +8°C Vaccines, Insulins & Biologics",
    subtitle:
      "IoT temperature-logged cold-chain dispatch to Assam, Meghalaya, Nagaland, Arunachal & Manipur within 24 hours.",
    cta: "Explore Cold-Chain Vault",
    href: "/products/8",
    bgGradient: "from-[#0F172A] via-[#1E3A8A] to-[#0369A1]",
    badgeText: "ISO 9001:2015 COLD VAULT",
    imageUrl: "/images/products/insulin-glargine.svg",
    productSpot: "Basalog & Biologics Range",
    priceSpot: "Same-Day Dispatch Before 4 PM",
  },
  {
    id: 3,
    productId: 5,
    tag: "HOSPITAL & SURGICAL CONSUMABLES",
    title: "Ethicon Sutures, Sterilization & ICU Disposables",
    subtitle:
      "Wholesale boxes of absorbable sutures, IV cannulas, disinfection trays, and wound dressings at institutional rates.",
    cta: "View Surgical Catalogue",
    href: "/products/5",
    bgGradient: "from-[#1E3A8A] via-[#1D4ED8] to-[#0F766E]",
    badgeText: "HOSPITAL TENDER RATES",
    imageUrl: "/images/products/ethicon-vicryl.svg",
    productSpot: "Ethicon & Surgical Consumables",
    priceSpot: "Up to 48% Institutional Off",
  },
];

export function PharmaHeroBanner() {
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
      {/* Top Horizontal Quick-Category Pill Strip */}
      <div className="mb-4 bg-white border border-slate-200 rounded-2xl px-3 py-2.5 shadow-2xs overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-between gap-4 min-w-max">
          {quickTopIcons.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03, duration: 0.25 }}
            >
              <Link
                href={`/products?q=${encodeURIComponent(item.label)}`}
                className="flex items-center gap-2 px-2.5 py-1 rounded-xl hover:bg-[#EFF6FF] group transition"
              >
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-7 h-7 rounded-full object-contain bg-slate-50 border border-slate-200 p-0.5 group-hover:border-[#1D4ED8] group-hover:scale-110 transition-transform"
                />
                <span className="text-xs font-semibold text-slate-700 group-hover:text-[#1D4ED8]">
                  {item.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Main Carousel Banner (8-col slider) */}
        <div className="lg:col-span-8 relative rounded-2xl overflow-hidden shadow-md min-h-[300px] sm:min-h-[360px] flex">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, scale: 0.98, x: 16 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.98, x: -16 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`w-full bg-gradient-to-r ${slide.bgGradient} text-white p-5 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative`}
            >
              {/* Animated Background Glow Orbs */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-sky-300 blur-3xl"
              />

              {/* Left Copy */}
              <div className="max-w-xl space-y-3 z-10 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-[#FDE047] animate-pulse" />
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
                  <button
                    type="button"
                    onClick={() =>
                      window.dispatchEvent(
                        new CustomEvent("open-support-chat", {
                          detail: { topic: "bulk-quote" },
                        })
                      )
                    }
                    className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-xs font-bold inline-flex items-center gap-1.5 backdrop-blur-xs transition cursor-pointer"
                  >
                    <Headphones className="w-3.5 h-3.5 text-[#FDE047]" />
                    <span>Talk to Agent</span>
                  </button>
                </div>
              </div>

              {/* Right Featured Product Spot Card (Clickable to Product Detail Page) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                className="w-full max-w-[250px] md:w-64 shrink-0 z-10"
              >
                <Link
                  href={`/products/${slide.productId}`}
                  className="block bg-white text-slate-900 rounded-2xl p-3.5 shadow-xl border border-blue-100 hover:border-[#1D4ED8] transition group"
                >
                  <div className="relative h-32 sm:h-36 w-full rounded-xl bg-slate-50 overflow-hidden flex items-center justify-center border border-slate-100">
                    <img
                      src={slide.imageUrl}
                      alt={slide.productSpot}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-2 left-2 dk-badge-bestseller">
                      Featured Deal
                    </span>
                  </div>
                  <div className="mt-2.5">
                    <div className="text-xs font-bold text-slate-800 group-hover:text-[#1D4ED8] line-clamp-1">
                      {slide.productSpot}
                    </div>
                    <div className="text-xs font-semibold text-[#16A34A] mt-0.5">
                      {slide.priceSpot}
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Slide Counter Pill + Dots */}
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
            className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow items-center justify-center z-20 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setCurrent((prev) => (prev + 1) % heroSlides.length)}
            className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow items-center justify-center z-20 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Right Stacked Promo Banners */}
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {/* Top Side Card: New Pharmacy / Clinic Setup */}
          <motion.div
            whileHover={{ y: -3 }}
            className="rounded-2xl bg-gradient-to-br from-[#FFF7ED] to-[#FFEDD5] border border-[#FED7AA] p-4 sm:p-5 flex items-center justify-between gap-3 shadow-xs"
          >
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
              src="/images/products/mormox-500.svg"
              alt="New Pharmacy Starter Pack"
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-contain bg-white p-1.5 border border-orange-200 shrink-0"
            />
          </motion.div>

          {/* Bottom Side Card: InstaPharma Same-Day Dispatch */}
          <motion.div
            whileHover={{ y: -3 }}
            className="rounded-2xl bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] border border-[#BFDBFE] p-4 sm:p-5 flex items-center justify-between gap-3 shadow-xs"
          >
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
              src="/images/products/insulin-glargine.svg"
              alt="InstaPharma Express"
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-contain bg-white p-1 border border-blue-200 shrink-0"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. 4-PILLAR TRUST BAR                                                      */
/* -------------------------------------------------------------------------- */
export function PharmaTrustBar() {
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
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3"
              >
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. "TOP CATEGORIES - SHOP BY IMAGE" STRIP                                  */
/* -------------------------------------------------------------------------- */
export const pharmaCategories = [
  {
    name: "Antibiotics",
    count: "850+ SKUs",
    icon: Pill,
    imageUrl: "/images/products/mormox-cv-625.svg",
  },
  {
    name: "Analgesics & Pain",
    count: "480+ SKUs",
    icon: Activity,
    imageUrl: "/images/products/mormox-500.svg",
  },
  {
    name: "Anti-Diabetic",
    count: "310+ SKUs",
    icon: Syringe,
    imageUrl: "/images/products/insulin-glargine.svg",
  },
  {
    name: "Cardiac Care",
    count: "620+ SKUs",
    icon: HeartPulse,
    imageUrl: "/images/products/mormox-cv-625.svg",
  },
  {
    name: "Sutures & Needles",
    count: "240+ SKUs",
    icon: Cross,
    imageUrl: "/images/products/ethicon-vicryl.svg",
  },
  {
    name: "Gastro & PPIs",
    count: "290+ SKUs",
    icon: Microscope,
    imageUrl: "/images/products/mormox-500.svg",
  },
  {
    name: "Cold-Chain Vault",
    count: "190+ SKUs",
    icon: ThermometerSnowflake,
    imageUrl: "/images/products/insulin-glargine.svg",
  },
  {
    name: "IV & Disposables",
    count: "540+ SKUs",
    icon: Stethoscope,
    imageUrl: "/images/products/surgical-kit.svg",
  },
];

export function PharmaCategoryStrip() {
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
        {pharmaCategories.map((cat, idx) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.04 }}
            whileHover={{ y: -5 }}
          >
            <Link
              href={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group bg-white border border-slate-200 hover:border-[#1D4ED8] rounded-2xl p-3 flex flex-col items-center text-center transition shadow-2xs hover:shadow-md h-full"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F4F7FB] border border-slate-200 group-hover:border-[#93C5FD] overflow-hidden flex items-center justify-center p-2 mb-2 transition">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-[#1D4ED8] line-clamp-1">
                {cat.name}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">{cat.count}</div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. "TOP BRANDS" SHOWCASE WITH ACTUAL BRAND LOGO IMAGES                     */
/* -------------------------------------------------------------------------- */
export interface PharmaBrandItem {
  name: string;
  tag: string;
  highlight: string;
  skuCount: string;
  logoUrl: string;
  sampleImg: string;
}

export const topPharmaBrands: PharmaBrandItem[] = [
  {
    name: "Dr. Morepen",
    tag: "Antibiotics & OTC",
    highlight: "Up to 75% Off",
    skuCount: "420+ SKUs",
    logoUrl: "/images/brands/dr-morepen.svg",
    sampleImg: "/images/products/mormox-cv-625.svg",
  },
  {
    name: "Sun Pharma",
    tag: "Chronic & Cardiac",
    highlight: "Direct Depot",
    skuCount: "680+ SKUs",
    logoUrl: "/images/brands/sun-pharma.svg",
    sampleImg: "/images/products/mormox-500.svg",
  },
  {
    name: "Cipla",
    tag: "Respiratory & Acute",
    highlight: "Full Range",
    skuCount: "540+ SKUs",
    logoUrl: "/images/brands/cipla.svg",
    sampleImg: "/images/products/mormox-cv-625.svg",
  },
  {
    name: "Abbott",
    tag: "Insulins & Gastro",
    highlight: "Cold-Chain",
    skuCount: "390+ SKUs",
    logoUrl: "/images/brands/abbott.svg",
    sampleImg: "/images/products/insulin-glargine.svg",
  },
  {
    name: "Ethicon / J&J",
    tag: "Surgical Sutures",
    highlight: "48% Off",
    skuCount: "180+ SKUs",
    logoUrl: "/images/brands/ethicon.svg",
    sampleImg: "/images/products/ethicon-vicryl.svg",
  },
  {
    name: "Dr. Reddy's",
    tag: "GI & Analgesics",
    highlight: "10+1 Scheme",
    skuCount: "310+ SKUs",
    logoUrl: "/images/brands/dr-reddys.svg",
    sampleImg: "/images/products/mormox-500.svg",
  },
  {
    name: "Mankind",
    tag: "Acute & Vitamins",
    highlight: "Best PTR",
    skuCount: "460+ SKUs",
    logoUrl: "/images/brands/mankind.svg",
    sampleImg: "/images/products/mormox-cv-625.svg",
  },
  {
    name: "Healthium",
    tag: "Wound & Sutures",
    highlight: "Hospital Kit",
    skuCount: "210+ SKUs",
    logoUrl: "/images/brands/healthium.svg",
    sampleImg: "/images/products/surgical-kit.svg",
  },
  {
    name: "Zydus",
    tag: "Statins & Diabetic",
    highlight: "Fresh Batch",
    skuCount: "340+ SKUs",
    logoUrl: "/images/brands/zydus.svg",
    sampleImg: "/images/products/mormox-500.svg",
  },
  {
    name: "Biocon",
    tag: "Biologics & Insulin",
    highlight: "+2°C to +8°C",
    skuCount: "145+ SKUs",
    logoUrl: "/images/brands/biocon.svg",
    sampleImg: "/images/products/insulin-glargine.svg",
  },
  {
    name: "Alkem",
    tag: "Anti-Infectives",
    highlight: "Case Deals",
    skuCount: "490+ SKUs",
    logoUrl: "/images/brands/alkem.svg",
    sampleImg: "/images/products/mormox-cv-625.svg",
  },
  {
    name: "Polymed",
    tag: "IV & Infusion",
    highlight: "Bulk Box",
    skuCount: "260+ SKUs",
    logoUrl: "/images/brands/polymed.svg",
    sampleImg: "/images/products/surgical-kit.svg",
  },
];

export function PharmaBrandsSection() {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 py-5">
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-2xs overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1D4ED8] text-[11px] font-bold uppercase tracking-wider mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>150+ Authorized C&amp;F Brand Depots</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight">
              Shop by Top Pharmaceutical &amp; Surgical Brands
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              100% genuine direct manufacturer lots with batch traceability &amp; HSN GST billing
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs sm:text-sm font-semibold text-[#1D4ED8] hover:underline inline-flex items-center gap-1 shrink-0"
          >
            <span>Explore All 150+ Brands</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Continuous Smooth Animated Brand Logo Marquee Strip */}
        <div className="relative mb-6 py-3 px-2 rounded-xl bg-[#F8FAFC] border border-slate-200/80 overflow-hidden">
          <div className="flex items-center gap-4 animate-marquee whitespace-nowrap">
            {[...topPharmaBrands, ...topPharmaBrands].map((b, i) => (
              <Link
                key={`${b.name}-marquee-${i}`}
                href={`/products?q=${encodeURIComponent(b.name)}`}
                className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-[#1D4ED8] shadow-2xs transition shrink-0"
              >
                <img
                  src={b.logoUrl}
                  alt={`${b.name} Logo`}
                  className="h-8 w-24 object-contain"
                />
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#1D4ED8]">
                  {b.skuCount}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* 6-Column Visual Brand Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {topPharmaBrands.map((b, idx) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04, duration: 0.3 }}
              whileHover={{ y: -5, scale: 1.015 }}
            >
              <Link
                href={`/products?q=${encodeURIComponent(b.name)}`}
                className="group rounded-2xl border border-slate-200 hover:border-[#1D4ED8] bg-[#F8FAFC] hover:bg-white p-3.5 flex flex-col justify-between transition shadow-2xs hover:shadow-lg h-full"
              >
                {/* Brand Logo Image Card */}
                <div className="relative w-full h-16 rounded-xl bg-white border border-slate-200/90 group-hover:border-blue-200 p-2 flex items-center justify-center overflow-hidden shadow-2xs">
                  <img
                    src={b.logoUrl}
                    alt={`${b.name} Brand Logo`}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Middle Product Thumbnail + Discount Pill */}
                <div className="flex items-center justify-between gap-1.5 mt-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                    {b.highlight}
                  </span>
                  <img
                    src={b.sampleImg}
                    alt={b.tag}
                    className="w-7 h-7 rounded-lg object-contain bg-white border border-slate-200 p-0.5"
                  />
                </div>

                {/* Brand Name & Specialty */}
                <div className="mt-2.5 pt-2 border-t border-slate-200/70">
                  <div className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#1D4ED8] flex items-center justify-between">
                    <span className="truncate">{b.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[#1D4ED8] shrink-0" />
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">{b.tag}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. PAYMENT PARTNERS SHOWCASE WITH ACTUAL IMAGES                            */
/* -------------------------------------------------------------------------- */
export interface PaymentPartnerItem {
  name: string;
  sub: string;
  logoUrl: string;
  badge?: string;
}

export const paymentPartnersData: PaymentPartnerItem[] = [
  {
    name: "Google Pay",
    sub: "Instant B2B UPI",
    logoUrl: "/images/payments/gpay.svg",
    badge: "0% Fee",
  },
  {
    name: "PhonePe",
    sub: "Merchant QR & UPI",
    logoUrl: "/images/payments/phonepe.svg",
    badge: "Instant",
  },
  {
    name: "Paytm Business",
    sub: "Wallet, UPI & POS",
    logoUrl: "/images/payments/paytm.svg",
  },
  {
    name: "RuPay",
    sub: "Debit & Corporate Cards",
    logoUrl: "/images/payments/rupay.svg",
    badge: "Zero MDR",
  },
  {
    name: "Visa",
    sub: "Commercial Credit Cards",
    logoUrl: "/images/payments/visa.svg",
  },
  {
    name: "Mastercard",
    sub: "Business & Corporate",
    logoUrl: "/images/payments/mastercard.svg",
  },
  {
    name: "BHIM UPI",
    sub: "Direct Bank Transfer",
    logoUrl: "/images/payments/upi.svg",
  },
  {
    name: "NEFT / RTGS",
    sub: "30-Day Partner Credit",
    logoUrl: "/images/payments/neft.svg",
    badge: "Credit Line",
  },
];

export function PharmaPaymentPartnersSection() {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 pb-8">
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5 text-[#1D4ED8]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-xl font-bold text-slate-900">
                  Our Payment &amp; Trade Settlement Partners
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 text-[11px] font-bold">
                  <Lock className="w-3 h-3" /> 256-Bit RBI Compliant Checkout
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Pay via zero-fee UPI, corporate cards, NEFT/RTGS, Cash on Delivery, or 30-day verified pharmacy credit line
              </p>
            </div>
          </div>

          {/* 4.8 Star Average Online Rating Pill */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200 shrink-0">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#16A34A] text-white font-bold text-sm">
              <span>4.8</span>
              <Star className="w-3.5 h-3.5 fill-white text-white" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                Average Online Rating
              </div>
              <div className="text-[11px] text-slate-500">
                250+ Verified NE Pharmacies
              </div>
            </div>
          </div>
        </div>

        {/* 8-Card Visual Payment Partner Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 pt-5">
          {paymentPartnersData.map((pm, idx) => (
            <motion.div
              key={pm.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04 }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="group relative rounded-xl border border-slate-200 hover:border-[#1D4ED8] bg-[#F8FAFC] hover:bg-white p-2.5 flex flex-col items-center text-center transition shadow-2xs hover:shadow-md"
            >
              {pm.badge && (
                <span className="absolute -top-2 right-2 px-1.5 py-0.2 rounded-full bg-[#1B3B6F] text-[#FDE047] text-[9px] font-bold">
                  {pm.badge}
                </span>
              )}
              <div className="w-full h-11 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center p-1 mb-1.5">
                <img
                  src={pm.logoUrl}
                  alt={pm.name}
                  className="max-h-8 w-auto object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="font-bold text-[11px] text-slate-800 group-hover:text-[#1D4ED8] truncate w-full">
                {pm.name}
              </div>
              <div className="text-[10px] text-slate-400 truncate w-full">
                {pm.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. PRODUCT CARD COMPONENT (LINKS DIRECTLY TO /products/[id] DETAIL PAGE)   */
/* -------------------------------------------------------------------------- */
export function PharmaProductCard({ product }: { product: WholesaleProduct }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);

  const handleAddQuote = () => {
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 700);
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
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.22 }}
      className="product-card flex flex-col justify-between p-3.5 sm:p-4 bg-white"
    >
      <div>
        {/* Top Badges Row (Best Seller + Stock Alert + Wishlist Heart) */}
        <div className="flex items-center justify-between gap-1 mb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="dk-badge-bestseller">{product.badge}</span>
            {product.stockAlert && (
              <span className="dk-badge-stock">{product.stockAlert}</span>
            )}
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.8 }}
            onClick={toggleWishlist}
            aria-label="Save to shortlist"
            className={`p-1.5 rounded-full border transition cursor-pointer ${
              wishlisted
                ? "bg-red-50 border-red-200 text-red-500"
                : "bg-slate-50 border-slate-200 text-slate-400 hover:text-red-500"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${wishlisted ? "fill-red-500" : ""}`} />
          </motion.button>
        </div>

        {/* Product Image Container (Links to Product Detail Page with Zoom Hint) */}
        <div className="relative h-42 sm:h-44 w-full rounded-xl bg-[#F8FAFC] border border-slate-100 flex items-center justify-center p-3 mb-3 group overflow-hidden">
          <Link
            href={`/products/${product.id}`}
            className="w-full h-full flex items-center justify-center"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </Link>

          {/* Top-Right Quick View / Zoom Badge on Hover */}
          <Link
            href={`/products/${product.id}`}
            className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 px-2 py-1 rounded-lg bg-slate-900/75 text-white text-[10px] font-semibold inline-flex items-center gap-1 backdrop-blur-xs"
          >
            <ZoomIn className="w-3 h-3" />
            <span>Inspect</span>
          </Link>

          {/* Bottom-Left Rating Pill */}
          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-white/95 border border-slate-200 shadow-2xs flex items-center gap-1 text-xs font-semibold text-slate-800">
            <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-slate-400 font-normal">({product.reviews})</span>
          </div>

          {/* Bottom-Right "Add X Options" Pill */}
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

        {/* Product Title (Links to Product Detail Page) */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-bold text-sm sm:text-[15px] text-slate-900 hover:text-[#1D4ED8] leading-snug line-clamp-2 mb-1 transition-colors">
            {product.name}
          </h3>
        </Link>

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
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={handleAddQuote}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer transition ${
              addedAnim
                ? "bg-[#16A34A] text-white"
                : "btn-primary"
            }`}
          >
            {addedAnim ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Quote</span>
              </>
            )}
          </motion.button>
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("open-support-chat", {
                  detail: {
                    initialMessage: `Hi, I want bulk case-lot PTR rate for ${product.name} (${product.sku}).`,
                  },
                })
              )
            }
            className="px-3 py-2 rounded-xl border border-slate-200 hover:border-[#1D4ED8] text-xs font-semibold text-slate-700 hover:text-[#1D4ED8] transition cursor-pointer"
          >
            Ask Agent
          </button>
        </div>

        <Link
          href={`/products/${product.id}`}
          className="block text-center text-[11px] font-semibold text-[#0284C7] hover:underline pt-1 border-t border-slate-50"
        >
          View Details &amp; Similar Products →
        </Link>
      </div>
    </motion.div>
  );
}
