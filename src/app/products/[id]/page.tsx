"use client";

import React, { useState, useMemo, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ShieldCheck,
  Truck,
  Coins,
  ShoppingCart,
  Heart,
  Share2,
  Headphones,
  CheckCircle2,
  ThermometerSnowflake,
  FileText,
  ArrowLeft,
  ArrowRight,
  ZoomIn,
  Maximize2,
  X,
  Package,
  BadgePercent,
  MapPin,
  Clock,
  Sparkles,
  Plus,
  Minus,
  Layers,
  Award,
  Flame,
} from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  wholesalePharmaProducts,
  topPharmaBrands,
  paymentPartnersData,
  PharmaProductCard,
} from "@/components/widgets/PharmaWidgets";

type GalleryAngle = {
  id: string;
  label: string;
  tag: string;
  imageUrl: string;
  filterClass: string;
  caption: string;
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const product = useMemo(() => {
    const numId = Number(rawId);
    return (
      wholesalePharmaProducts.find(
        (p) =>
          p.id === numId ||
          p.sku.toLowerCase() === String(rawId || "").toLowerCase()
      ) || wholesalePharmaProducts[0]
    );
  }, [rawId]);

  const brandInfo = useMemo(() => {
    return (
      topPharmaBrands.find((b) =>
        product.brand.toLowerCase().includes(b.name.toLowerCase().split(" ")[0])
      ) || topPharmaBrands[0]
    );
  }, [product]);

  // Multi-angle product gallery views
  const galleryAngles: GalleryAngle[] = useMemo(
    () => [
      {
        id: "front",
        label: "Front Pack",
        tag: "Primary Box",
        imageUrl: product.imageUrl,
        filterClass: "",
        caption: `${product.name} — Original Depot Master Box (${product.packSize})`,
      },
      {
        id: "blister",
        label: "Strip / Foil View",
        tag: "Inner Pack",
        imageUrl: product.imageUrl,
        filterClass: "hue-rotate-15 contrast-105",
        caption: `Moisture-sealed ${product.packSize} inner strip configuration with batch embossing`,
      },
      {
        id: "label",
        label: "Batch & HSN Label",
        tag: `${product.expiry}`,
        imageUrl: product.imageUrl,
        filterClass: "saturate-125",
        caption: `HSN ${product.hsnCode || "30041010"} • ${product.gstRate || "12% GST"} • ${product.expiry}`,
      },
      {
        id: "carton",
        label: "Case Lot Box",
        tag: "Bulk Shipper",
        imageUrl: product.imageUrl,
        filterClass: "brightness-98 contrast-110",
        caption: `Corrugated wholesale case carton for hospital & pharmacy bulk restock`,
      },
    ],
    [product]
  );

  const [activeAngleIdx, setActiveAngleIdx] = useState(0);
  const currentAngle = galleryAngles[activeAngleIdx] || galleryAngles[0];

  // Interactive Cursor & Touch Magnifier Zoom State
  const imageStageRef = useRef<HTMLDivElement>(null);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Wholesale Tiered Slab & Quantity State
  const [selectedTier, setSelectedTier] = useState<"standard" | "scheme" | "case">(
    "standard"
  );
  const [quantity, setQuantity] = useState(2);
  const [wishlisted, setWishlisted] = useState(false);
  const [pincode, setPincode] = useState("781001");
  const [deliveryChecked, setDeliveryChecked] = useState(true);
  const [activeTab, setActiveTab] = useState<"specs" | "schemes" | "reviews">(
    "specs"
  );

  const pricingTiers = useMemo(() => {
    const base = product.ptrPrice;
    return [
      {
        id: "standard" as const,
        label: "Standard Lot (1–4 Boxes)",
        minQty: 1,
        unitPtr: base,
        tag: "Base PTR",
        perk: "Standard GST Invoice",
      },
      {
        id: "scheme" as const,
        label: "Scheme Slab (5–11 Boxes)",
        minQty: 5,
        unitPtr: Math.round(base * 0.96),
        tag: "Extra 4% Off",
        perk: product.schemeText || "10+1 Free Strip Included",
      },
      {
        id: "case" as const,
        label: "Master Case (12+ Boxes)",
        minQty: 12,
        unitPtr: Math.round(base * 0.92),
        tag: "Extra 8% Off",
        perk: "30-Day Credit + Priority Dispatch",
      },
    ];
  }, [product]);

  const activeTierObj =
    pricingTiers.find((t) => t.id === selectedTier) || pricingTiers[0];
  const effectiveUnitPtr = activeTierObj.unitPtr;
  const totalPtr = effectiveUnitPtr * quantity;
  const totalMrp = product.mrpPrice * quantity;
  const totalSavings = totalMrp - totalPtr;
  const totalCoins = product.goldCoins * quantity;

  // Similar Products (same category first, fallback to related)
  const similarProducts = useMemo(() => {
    const sameCat = wholesalePharmaProducts.filter(
      (p) => p.id !== product.id && p.category === product.category
    );
    const others = wholesalePharmaProducts.filter(
      (p) => p.id !== product.id && p.category !== product.category
    );
    return [...sameCat, ...others].slice(0, 4);
  }, [product]);

  // Recommended Products (complementary & top-rated across other categories)
  const recommendedProducts = useMemo(() => {
    return wholesalePharmaProducts
      .filter((p) => p.id !== product.id)
      .sort((a, b) => b.goldCoins - a.goldCoins || b.rating - a.rating)
      .slice(0, 4);
  }, [product]);

  // Frequently Bought Together Bundle (current + 2 complementary)
  const bundleItems = useMemo(() => {
    return [product, ...similarProducts.slice(0, 2)];
  }, [product, similarProducts]);

  const bundleTotalPtr = bundleItems.reduce((acc, item) => acc + item.ptrPrice, 0);
  const bundleTotalMrp = bundleItems.reduce((acc, item) => acc + item.mrpPrice, 0);

  // Cursor Move Handler for Zoom
  const updateZoomCoordinates = (clientX: number, clientY: number) => {
    if (!imageStageRef.current) return;
    const rect = imageStageRef.current.getBoundingClientRect();
    const x = Math.max(
      0,
      Math.min(100, ((clientX - rect.left) / rect.width) * 100)
    );
    const y = Math.max(
      0,
      Math.min(100, ((clientY - rect.top) / rect.height) * 100)
    );
    setZoomPos({ x, y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateZoomCoordinates(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      setIsZooming(true);
      updateZoomCoordinates(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      updateZoomCoordinates(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleSelectTier = (tierId: "standard" | "scheme" | "case") => {
    setSelectedTier(tierId);
    const found = pricingTiers.find((t) => t.id === tierId);
    if (found && quantity < found.minQty) {
      setQuantity(found.minQty);
    }
  };

  const handleQuantityChange = (newQty: number) => {
    const clamped = Math.max(1, newQty);
    setQuantity(clamped);
    if (clamped >= 12) {
      setSelectedTier("case");
    } else if (clamped >= 5) {
      setSelectedTier("scheme");
    } else {
      setSelectedTier("standard");
    }
  };

  const handleAddToQuote = () => {
    toast.success(`Added ${quantity} × ${product.name} to Bulk Quote!`, {
      description: `Total PTR: ₹${totalPtr.toLocaleString("en-IN")} (Saved ₹${totalSavings.toLocaleString("en-IN")}) • +${totalCoins} Gold Coins`,
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB]">
      <Navbar />

      {/* Top Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-[#1D4ED8] font-medium">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[#1D4ED8] font-medium">
              Wholesale Catalogue
            </Link>
            <span>/</span>
            <Link
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className="hover:text-[#1D4ED8] font-medium"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="font-bold text-slate-800 truncate max-w-[220px] sm:max-w-md">
              {product.name}
            </span>
          </div>

          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-1 font-semibold text-[#1D4ED8] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* MAIN PRODUCT DETAIL SECTION: LEFT INTERACTIVE ZOOM GALLERY + RIGHT BUY BOX */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-10">
        <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-7 shadow-2xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 5 COLS: PRODUCT IMAGE STAGE WITH CURSOR & TOUCH MAGNIFIER ZOOM */}
          <div className="lg:col-span-5 lg:sticky lg:top-36 space-y-3.5">
            {/* Top Badges above Image */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="dk-badge-bestseller">{product.badge}</span>
                {product.stockAlert && (
                  <span className="dk-badge-stock">{product.stockAlert}</span>
                )}
                {product.coldChain && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 text-[11px] font-bold">
                    <ThermometerSnowflake className="w-3 h-3" /> +2°C to +8°C
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setWishlisted(!wishlisted);
                    toast.info(
                      !wishlisted
                        ? `Saved ${product.name} to Shortlist`
                        : "Removed from Shortlist"
                    );
                  }}
                  aria-label="Toggle wishlist"
                  className={`p-2 rounded-full border transition cursor-pointer ${
                    wishlisted
                      ? "bg-red-50 border-red-200 text-red-500"
                      : "bg-slate-50 border-slate-200 text-slate-500 hover:text-red-500"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${wishlisted ? "fill-red-500" : ""}`}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof navigator !== "undefined" && navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                    }
                    toast.success("Product link copied to clipboard!");
                  }}
                  aria-label="Share product"
                  className="p-2 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:text-[#1D4ED8] transition cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* MAIN INTERACTIVE HOVER & TOUCH ZOOM STAGE */}
            <div className="relative">
              <div
                ref={imageStageRef}
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={() => setIsZooming(false)}
                onClick={() => setIsZooming((prev) => !prev)}
                className="relative h-76 sm:h-96 w-full rounded-2xl bg-[#F8FAFC] border-2 border-slate-200 hover:border-[#93C5FD] overflow-hidden flex items-center justify-center p-6 select-none cursor-crosshair touch-none transition-colors"
              >
                <img
                  src={currentAngle.imageUrl}
                  alt={currentAngle.caption}
                  style={{
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transform: isZooming ? "scale(2.35)" : "scale(1)",
                  }}
                  className={`w-full h-full object-contain transition-transform duration-150 ease-out pointer-events-none ${currentAngle.filterClass}`}
                />

                {/* Magnifier Reticle Box when Cursor/Touch is Active */}
                {isZooming && (
                  <div
                    style={{
                      left: `${zoomPos.x}%`,
                      top: `${zoomPos.y}%`,
                    }}
                    className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-2xl border-2 border-[#1D4ED8]/70 bg-[#1D4ED8]/10 shadow-[0_0_0_9999px_rgba(15,23,42,0.04)] flex items-center justify-center"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
                  </div>
                )}

                {/* Bottom-Left Zoom Instruction Pill */}
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/75 text-white text-[11px] font-semibold inline-flex items-center gap-1.5 backdrop-blur-xs pointer-events-none">
                  <ZoomIn className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>
                    {isZooming
                      ? `Zooming 2.4× (${Math.round(zoomPos.x)}%, ${Math.round(zoomPos.y)}%)`
                      : "Hover or Touch to Zoom 2.4×"}
                  </span>
                </div>

                {/* Bottom-Right Fullscreen Lightbox Trigger */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxOpen(true);
                  }}
                  title="Open Fullscreen Inspection View"
                  className="absolute bottom-3 right-3 p-2 rounded-lg bg-white/95 hover:bg-[#1D4ED8] text-slate-700 hover:text-white border border-slate-200 shadow-xs transition cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* DESKTOP SIDE-BY-SIDE HIGH-RES MAGNIFIER PORTAL (Appears on Hover) */}
              <AnimatePresence>
                {isZooming && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96, x: -8 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.96, x: -8 }}
                    transition={{ duration: 0.15 }}
                    className="hidden xl:flex pointer-events-none absolute top-0 left-[calc(100%+16px)] w-[420px] h-96 rounded-2xl bg-white border-2 border-[#1D4ED8] shadow-[0_25px_60px_-15px_rgba(27,59,111,0.35)] overflow-hidden z-30 flex-col justify-between p-4"
                  >
                    <div className="relative flex-1 w-full h-full overflow-hidden rounded-xl bg-[#F8FAFC] flex items-center justify-center">
                      <img
                        src={currentAngle.imageUrl}
                        alt={product.name}
                        style={{
                          transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                          transform: "scale(2.65)",
                        }}
                        className={`w-full h-full object-contain transition-transform duration-75 ${currentAngle.filterClass}`}
                      />
                    </div>
                    <div className="pt-2.5 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 mt-2">
                      <span className="font-bold text-[#1B3B6F]">
                        High-Resolution Pack Inspection (2.65×)
                      </span>
                      <span className="font-mono-tech text-[#1D4ED8]">
                        {product.sku} • {product.expiry}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 4-Angle Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-2.5">
              {galleryAngles.map((angle, idx) => {
                const isSelected = idx === activeAngleIdx;
                return (
                  <button
                    key={angle.id}
                    type="button"
                    onClick={() => setActiveAngleIdx(idx)}
                    className={`p-2 rounded-xl border text-left transition cursor-pointer ${
                      isSelected
                        ? "border-2 border-[#1D4ED8] bg-[#EFF6FF]/60 shadow-2xs"
                        : "border-slate-200 bg-white hover:border-[#93C5FD]"
                    }`}
                  >
                    <div className="h-12 w-full rounded-lg bg-[#F8FAFC] flex items-center justify-center p-1 mb-1 overflow-hidden">
                      <img
                        src={angle.imageUrl}
                        alt={angle.label}
                        className={`w-full h-full object-contain ${angle.filterClass}`}
                      />
                    </div>
                    <div className="font-bold text-[10px] text-slate-800 truncate">
                      {angle.label}
                    </div>
                    <div className="text-[9px] text-[#1D4ED8] font-semibold truncate">
                      {angle.tag}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Caption Bar */}
            <div className="px-3.5 py-2 rounded-xl bg-[#F8FAFC] border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between gap-2">
              <span className="truncate">{currentAngle.caption}</span>
              <span className="font-mono-tech text-[10px] font-bold text-[#16A34A] shrink-0">
                100% Authentic
              </span>
            </div>
          </div>

          {/* RIGHT 7 COLS: COMPREHENSIVE B2B WHOLESALE DETAILS & BUY BOX */}
          <div className="lg:col-span-7 space-y-5">
            {/* Brand Logo + SKU + Rating Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <Link
                href={`/products?q=${encodeURIComponent(product.brand)}`}
                className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF6FF] border border-slate-200 transition"
              >
                <img
                  src={brandInfo.logoUrl}
                  alt={product.brand}
                  className="h-6 w-18 object-contain"
                />
                <span className="text-xs font-bold text-[#1B3B6F]">
                  {product.brand}
                </span>
              </Link>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-mono-tech text-xs font-semibold">
                  SKU: {product.sku}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-green-50 border border-green-200 text-green-800 font-mono-tech text-xs font-bold">
                  {product.expiry}
                </span>
              </div>
            </div>

            {/* Product Title & Clinical Composition */}
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-slate-900 leading-snug">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                <strong>Composition:</strong>{" "}
                {product.composition || product.description}
              </p>

              {/* Rating + Gold Coins + GST Summary Pills */}
              <div className="flex flex-wrap items-center gap-2.5 mt-3">
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-xs font-bold text-slate-900">
                  <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                  <span>{product.rating.toFixed(1)}</span>
                  <span className="text-slate-500 font-normal">
                    ({product.reviews} Verified Pharmacies)
                  </span>
                </div>

                <span className="dk-badge-coin inline-flex items-center gap-1 py-1 px-2.5">
                  <Coins className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Earn {product.goldCoins} Gold Coins / Box</span>
                </span>

                <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#1D4ED8] text-xs font-semibold">
                  HSN: {product.hsnCode || "30041010"} •{" "}
                  {product.gstRate || "12% GST"}
                </span>
              </div>
            </div>

            {/* Pricing Box & Wholesale Tiered Slab Selector */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF]/60 border border-blue-200/80 space-y-4">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#1D4ED8]">
                    Wholesale PTR Price ({product.packSize})
                  </div>
                  <div className="flex items-baseline gap-2.5 mt-1">
                    <span className="text-2xl sm:text-4xl font-bold text-slate-900 tabular-nums">
                      ₹{effectiveUnitPtr.toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm text-slate-400 line-through tabular-nums">
                      MRP ₹{product.mrpPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="dk-badge-discount text-xs">
                      {product.discountPercent}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Inclusive of GST • Computerized HSN Tax Invoice provided
                  </div>
                </div>

                {/* Live Subtotal Summary Box */}
                <div className="px-4 py-2.5 rounded-xl bg-white border border-blue-200 text-right shadow-2xs">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Order Subtotal ({quantity} {quantity === 1 ? "Box" : "Boxes"})
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-[#1B3B6F] tabular-nums">
                    ₹{totalPtr.toLocaleString("en-IN")}
                  </div>
                  <div className="text-[11px] font-semibold text-[#16A34A]">
                    Total Trade Margin: ₹{totalSavings.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>

              {/* 3-Slab Wholesale Volume Selector */}
              <div>
                <div className="text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
                  <span>Select Wholesale Quantity Slab:</span>
                  <span className="text-[11px] text-[#EA580C] font-semibold">
                    {product.schemeText || "10+1 Free Strip Scheme Available"}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {pricingTiers.map((tier) => {
                    const active = selectedTier === tier.id;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => handleSelectTier(tier.id)}
                        className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                          active
                            ? "border-2 border-[#1D4ED8] bg-white shadow-xs"
                            : "border-slate-200 bg-white/70 hover:border-[#93C5FD]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                            {tier.tag}
                          </span>
                          {active && (
                            <CheckCircle2 className="w-4 h-4 text-[#1D4ED8]" />
                          )}
                        </div>
                        <div className="font-bold text-base text-slate-900 mt-1.5 tabular-nums">
                          ₹{tier.unitPtr} <span className="text-xs font-normal text-slate-500">/ box</span>
                        </div>
                        <div className="text-[11px] font-semibold text-slate-700 mt-0.5">
                          {tier.label}
                        </div>
                        <div className="text-[10px] text-[#1D4ED8] font-medium mt-0.5 truncate">
                          {tier.perk}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Stepper + Primary CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Stepper */}
                <div className="flex items-center justify-between sm:justify-start bg-white border border-slate-300 rounded-xl p-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-700 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(parseInt(e.target.value, 10) || 1)
                    }
                    className="w-14 text-center font-bold text-sm text-slate-900 outline-none"
                    aria-label="Quantity"
                  />
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-700 cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Quote CTA */}
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToQuote}
                  className="flex-1 btn-primary py-3.5 px-5 rounded-xl text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>
                    Add {quantity} {quantity === 1 ? "Box" : "Boxes"} to Quote • ₹
                    {totalPtr.toLocaleString("en-IN")}
                  </span>
                </motion.button>

                {/* Talk to Agent about this SKU */}
                <button
                  type="button"
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("open-support-chat", {
                        detail: {
                          initialMessage: `Hi, I am viewing ${product.name} (${product.sku}). Please share best case-lot PTR for ${quantity} boxes.`,
                        },
                      })
                    )
                  }
                  className="btn-orange py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Headphones className="w-4 h-4" />
                  <span>Negotiate with Agent</span>
                </button>
              </div>
            </div>

            {/* Pincode Delivery & Cold-Chain Checker */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <MapPin className="w-4 h-4 text-[#1D4ED8]" />
                  <span>Check Northeast Dispatch &amp; Cold-Chain SLA</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) =>
                      setPincode(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="Enter 6-digit Pincode"
                    className="w-36 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono-tech font-bold text-slate-800 outline-none focus:border-[#1D4ED8]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setDeliveryChecked(true);
                      toast.success(`Verified Express Dispatch to Pincode ${pincode}`);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#EFF6FF] hover:bg-[#1D4ED8] text-[#1D4ED8] hover:text-white text-xs font-bold transition cursor-pointer"
                  >
                    Check
                  </button>
                </div>
              </div>

              {deliveryChecked && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <div>
                      <div className="font-bold text-slate-800">
                        {pincode.startsWith("781")
                          ? "Same-Day 4-Hour Delivery"
                          : "Overnight Line-Haul (18h)"}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        From Pan Bazaar Hub
                      </div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                    <div>
                      <div className="font-bold text-slate-800">
                        100% Batch Traceable
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Direct {product.brand} C&amp;F
                      </div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#EA580C] shrink-0" />
                    <div>
                      <div className="font-bold text-slate-800">
                        GST Input Credit
                      </div>
                      <div className="text-[10px] text-slate-500">
                        HSN {product.hsnCode || "30041010"}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Supported B2B Payment Partners Mini Strip */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <span className="text-[11px] font-semibold text-slate-500">
                Accepted Payment &amp; 30-Day Credit Partners:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {paymentPartnersData.slice(0, 6).map((pm) => (
                  <div
                    key={pm.name}
                    title={pm.name}
                    className="h-7 px-1.5 rounded-md bg-white border border-slate-200 flex items-center justify-center"
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
        </div>

        {/* FREQUENTLY BOUGHT TOGETHER WHOLESALE BUNDLE */}
        <section className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                FREQUENTLY RESTOCKED TOGETHER
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                Complete Counter Combo with Extra 5% Bundle Margin
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-slate-500">
                  Combo PTR:{" "}
                  <strong className="text-lg text-slate-900">
                    ₹{bundleTotalPtr.toLocaleString("en-IN")}
                  </strong>{" "}
                  <span className="line-through text-slate-400">
                    ₹{bundleTotalMrp.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="text-[11px] font-bold text-[#16A34A]">
                  Save ₹{(bundleTotalMrp - bundleTotalPtr).toLocaleString("en-IN")} on 3 Lots
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  toast.success("Added All 3 Combo Products to Bulk Quote!", {
                    description: `Combined PTR ₹${bundleTotalPtr.toLocaleString("en-IN")}`,
                  })
                }
                className="btn-primary px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer shrink-0"
              >
                Add All 3 to Quote
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bundleItems.map((item, idx) => (
              <Link
                key={item.id}
                href={`/products/${item.id}`}
                className="p-3.5 rounded-2xl bg-[#F8FAFC] hover:bg-[#EFF6FF]/60 border border-slate-200 hover:border-[#93C5FD] flex items-center gap-3.5 transition"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl bg-white border border-slate-200 p-1.5 object-contain shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase text-[#1D4ED8]">
                    {idx === 0 ? "This Item" : `Combo #${idx + 1}`} • {item.brand}
                  </span>
                  <div className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                    {item.name}
                  </div>
                  <div className="text-xs font-bold text-[#16A34A] mt-0.5">
                    PTR ₹{item.ptrPrice}{" "}
                    <span className="text-[11px] text-slate-400 line-through font-normal">
                      ₹{item.mrpPrice}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CLINICAL SPECIFICATIONS, TRADE SCHEMES & BUYER REVIEWS TABS */}
        <section className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-2xs">
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 mb-6">
            {[
              { id: "specs", label: "Clinical Specs & HSN Details" },
              { id: "schemes", label: "Wholesale Margin & Scheme Slabs" },
              {
                id: "reviews",
                label: `Verified Pharmacy Reviews (${product.reviews})`,
              },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() =>
                  setActiveTab(t.id as "specs" | "schemes" | "reviews")
                }
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeTab === t.id
                    ? "bg-[#1B3B6F] text-white"
                    : "bg-[#F8FAFC] text-slate-600 hover:text-[#1D4ED8]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {activeTab === "specs" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-bold text-base text-slate-900">
                  Formulation &amp; Packaging Overview
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {product.description} Supplied directly from authorized C&amp;F depot stock in Guwahati with verified batch and long expiry window ({product.expiry}).
                </p>
                <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-2 text-xs">
                  <div className="font-bold text-slate-900">
                    Active Composition:
                  </div>
                  <div className="text-slate-600">
                    {product.composition || product.description}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 overflow-hidden text-xs">
                {[
                  ["SKU / Catalogue ID", product.sku],
                  ["Manufacturer / Brand", product.brand],
                  ["Therapeutic Department", product.category],
                  ["Pack Configuration", product.packSize],
                  ["Current Batch Expiry", product.expiry],
                  ["HSN Classification", product.hsnCode || "30041010"],
                  ["GST Slab", product.gstRate || "12% GST Included"],
                  [
                    "Storage Instructions",
                    product.storage || "Store below 25°C in a dry place",
                  ],
                ].map(([k, v], i) => (
                  <div
                    key={k}
                    className={`px-4 py-2.5 flex items-center justify-between gap-4 ${
                      i % 2 === 0 ? "bg-[#F8FAFC]" : "bg-white"
                    }`}
                  >
                    <span className="font-semibold text-slate-500">{k}</span>
                    <span className="font-bold text-slate-900 text-right">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "schemes" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 bg-[#F8FAFC]">
                    <th className="py-3 px-4 font-bold">Order Slab</th>
                    <th className="py-3 px-4 font-bold">Net Unit PTR</th>
                    <th className="py-3 px-4 font-bold">MRP</th>
                    <th className="py-3 px-4 font-bold">Free Scheme / Perk</th>
                    <th className="py-3 px-4 font-bold">Gold Coins</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {pricingTiers.map((tier) => (
                    <tr key={tier.id} className="hover:bg-blue-50/40">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {tier.label}
                      </td>
                      <td className="py-3 px-4 font-bold text-[#1D4ED8]">
                        ₹{tier.unitPtr}
                      </td>
                      <td className="py-3 px-4 text-slate-400 line-through">
                        ₹{product.mrpPrice}
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#16A34A]">
                        {tier.perk}
                      </td>
                      <td className="py-3 px-4 font-semibold text-amber-700">
                        +{product.goldCoins * tier.minQty} Coins
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  author: "City Medicos • Pan Bazaar, Guwahati",
                  rating: 5,
                  date: "Verified Partner Order",
                  comment: `Fresh batch (${product.expiry}) with intact outer shrink wrap and accurate HSN GST invoice. High counter demand.`,
                },
                {
                  author: "Care Hospital Pharmacy • Silchar",
                  rating: 5,
                  date: "Institutional Case Lot",
                  comment: `Ordered 12 boxes under the Master Case slab. Received the 10+1 scheme strips and overnight line-haul delivery on time.`,
                },
                {
                  author: "Health Point Chemist • Dibrugarh",
                  rating: 5,
                  date: "Repeat Buyer",
                  comment: `Best PTR margin in Assam for ${product.brand}. Gold coins were credited immediately to our partner ledger.`,
                },
              ].map((rev, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]"
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                      {rev.date}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    “{rev.comment}”
                  </p>
                  <div className="text-[11px] font-bold text-slate-900 pt-1">
                    {rev.author}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SIMILAR PRODUCTS SECTION (SAME CATEGORY / THERAPEUTIC CLASS) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#1D4ED8]" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Similar Products in {product.category}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Compare alternative pack sizes, molecules &amp; trade schemes in the same therapeutic class
                </p>
              </div>
            </div>
            <Link
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className="text-xs sm:text-sm font-semibold text-[#1D4ED8] hover:underline inline-flex items-center gap-1"
            >
              <span>View All {product.category}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {similarProducts.map((sim) => (
              <PharmaProductCard key={sim.id} product={sim} />
            ))}
          </div>
        </section>

        {/* RECOMMENDED WHOLESALE LOTS SECTION */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center">
                <Flame className="w-5 h-5 text-[#EA580C]" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Recommended Wholesale Lots for Your Pharmacy
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  High-margin bestsellers frequently added by Northeast pharmacies &amp; nursing homes
                </p>
              </div>
            </div>
            <Link
              href="/products"
              className="text-xs sm:text-sm font-semibold text-[#1D4ED8] hover:underline inline-flex items-center gap-1"
            >
              <span>Explore Full Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedProducts.map((rec) => (
              <PharmaProductCard key={rec.id} product={rec} />
            ))}
          </div>
        </section>
      </main>

      {/* FULLSCREEN LIGHTBOX ZOOM MODAL */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-3xl w-full p-6 relative shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                aria-label="Close zoom modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-sm font-bold text-slate-900 mb-3">
                {product.name} — {currentAngle.label}
              </div>
              <div className="h-[420px] w-full rounded-2xl bg-[#F8FAFC] border border-slate-200 flex items-center justify-center p-6 overflow-hidden">
                <img
                  src={currentAngle.imageUrl}
                  alt={product.name}
                  className={`w-full h-full object-contain scale-125 ${currentAngle.filterClass}`}
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>{currentAngle.caption}</span>
                <span className="font-mono-tech font-bold text-[#1D4ED8]">
                  PTR ₹{product.ptrPrice} ({product.discountPercent})
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
