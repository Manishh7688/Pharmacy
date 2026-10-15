"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Flame,
  Clock,
  Sparkles,
  FileUp,
  Mic,
  ArrowUpRight,
  ShoppingCart,
  Star,
  ThermometerSnowflake,
  Coins,
  ChevronDown,
  MessageSquare,
  SlidersHorizontal,
  Package,
  Building2,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import {
  wholesalePharmaProducts,
  topPharmaBrands,
  pharmaCategories,
} from "@/components/widgets/PharmaWidgets";

const rotatingHints = [
  "Search 'Mormox-CV 625 Tablets' (35% PTR Off)...",
  "Search 'Ethicon Vicryl #3-0 Suture' (48% Off)...",
  "Search 'Biocon Insulin Glargine Cold-Chain'...",
  "Search by Molecule, Brand, SKU or HSN Code...",
  "Search 'Pantoprazole DSR' or '10+1 Free Schemes'...",
];

const trendingSearches = [
  { label: "Mormox-CV 625", tag: "Hot" },
  { label: "Vicryl #3-0 Suture", tag: "48% Off" },
  { label: "Basalog Insulin", tag: "Cold-Chain" },
  { label: "Dr. Morepen", tag: "Brand" },
  { label: "Pentate-DSR", tag: "10+1" },
  { label: "Steridex Tray", tag: "Surgical" },
];

const searchScopes = [
  "All",
  "Antibiotics",
  "Surgicals & Consumables",
  "Anti-Diabetic",
  "Gastrointestinal",
  "OTC & Nutraceuticals",
];

export default function SmartSearchBar({ isMobile = false }: { isMobile?: boolean }) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [scope, setScope] = useState("All");
  const [scopeMenuOpen, setScopeMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"all" | "products" | "brands">("all");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isListening, setIsListening] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Amoxicillin 625",
    "Ethicon Sutures",
    "Cold-Chain Insulin",
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHintIndex((prev) => (prev + 1) % rotatingHints.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === "Escape") {
        setIsOpen(false);
        setScopeMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobile]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setScopeMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return wholesalePharmaProducts.filter((p) => {
      const matchesScope = scope === "All" || p.category === scope;
      if (!q) return matchesScope;
      const matchesText =
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchesScope && matchesText;
    });
  }, [query, scope]);

  const filteredBrands = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return topPharmaBrands.slice(0, 6);
    return topPharmaBrands.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.tag.toLowerCase().includes(q) ||
        b.highlight.toLowerCase().includes(q)
    );
  }, [query]);

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pharmaCategories.slice(0, 4);
    return pharmaCategories.filter((c) => c.name.toLowerCase().includes(q));
  }, [query]);

  const saveRecentAndNavigate = (searchTerm: string, productId?: number) => {
    const clean = searchTerm.trim();
    if (clean) {
      setRecentSearches((prev) =>
        [clean, ...prev.filter((item) => item.toLowerCase() !== clean.toLowerCase())].slice(0, 5)
      );
    }
    setIsOpen(false);
    if (productId) {
      router.push(`/products/${productId}`);
    } else {
      router.push(clean ? `/products?q=${encodeURIComponent(clean)}` : "/products");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIndex >= 0 && selectedIndex < filteredProducts.length) {
      const chosen = filteredProducts[selectedIndex];
      saveRecentAndNavigate(chosen.name, chosen.id);
      return;
    }
    saveRecentAndNavigate(query);
  };

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) setIsOpen(true);
    const maxIdx = Math.min(filteredProducts.length, 5) - 1;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < maxIdx ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : maxIdx));
    }
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    setIsOpen(true);
    toast.info("Listening for medicine or brand name...", {
      description: "Try saying 'Mormox-CV 625' or 'Ethicon Suture'",
    });
    setTimeout(() => {
      setIsListening(false);
      setQuery("Mormox-CV 625");
      toast.success("Voice matched: 'Mormox-CV 625'");
    }, 1800);
  };

  const triggerAgentWithQuery = () => {
    setIsOpen(false);
    window.dispatchEvent(
      new CustomEvent("open-support-chat", {
        detail: {
          initialMessage: query.trim()
            ? `Hi, I need wholesale PTR pricing & stock availability for: ${query.trim()}`
            : "Hi, I need help finding a wholesale medicine lot.",
        },
      })
    );
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <form
        onSubmit={handleSubmit}
        className={`relative flex items-center w-full rounded-xl border-2 transition-all duration-200 ${
          isOpen
            ? "border-[#1D4ED8] bg-white shadow-[0_8px_30px_rgba(29,78,216,0.15)] ring-4 ring-[#1D4ED8]/10"
            : "border-[#CBD5E1] hover:border-[#93C5FD] bg-[#F8FAFC]"
        }`}
      >
        {/* Left Category Scope Selector (Desktop) */}
        {!isMobile && (
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setScopeMenuOpen(!scopeMenuOpen)}
              className="h-10 pl-3 pr-2.5 flex items-center gap-1.5 text-xs font-bold text-[#1B3B6F] border-r border-slate-200 hover:bg-blue-50/70 rounded-l-lg transition cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#1D4ED8]" />
              <span className="max-w-[90px] truncate">
                {scope === "All" ? "All Dept" : scope.split(" ")[0]}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            <AnimatePresence>
              {scopeMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-1.5 w-52 bg-white rounded-xl border border-slate-200 shadow-xl py-1.5 z-50"
                >
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Filter Search Department
                  </div>
                  {searchScopes.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setScope(item);
                        setScopeMenuOpen(false);
                        setIsOpen(true);
                        inputRef.current?.focus();
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-semibold flex items-center justify-between hover:bg-blue-50 transition ${
                        scope === item ? "text-[#1D4ED8] bg-blue-50/60" : "text-slate-700"
                      }`}
                    >
                      <span>{item}</span>
                      {scope === item && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Search Icon + Input + Animated Rotating Placeholder */}
        <div className="relative flex-1 flex items-center min-w-0">
          <Search
            className={`w-4 h-4 ml-3 shrink-0 transition-colors ${
              isOpen ? "text-[#1D4ED8]" : "text-slate-400"
            }`}
          />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(-1);
              if (!isOpen) setIsOpen(true);
            }}
            onKeyDown={handleKeyDownInput}
            placeholder={isOpen ? "Type medicine, molecule, brand, SKU..." : ""}
            className={`w-full pl-2.5 pr-4 bg-transparent text-slate-900 outline-none font-medium ${
              isMobile ? "py-2 text-xs" : "py-2.5 text-sm"
            }`}
            aria-label="Search wholesale medicines, brands, and surgicals"
          />

          {!query && !isOpen && (
            <div
              onClick={() => {
                setIsOpen(true);
                inputRef.current?.focus();
              }}
              className="absolute left-9 right-2 pointer-events-none overflow-hidden h-5 flex items-center"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={hintIndex}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className={`text-slate-400 truncate ${
                    isMobile ? "text-xs" : "text-xs sm:text-sm"
                  }`}
                >
                  {rotatingHints[hintIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Right Action Controls inside Searchbar */}
        <div className="flex items-center gap-1 pr-1.5 shrink-0">
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedIndex(-1);
                inputRef.current?.focus();
              }}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              aria-label="Clear search query"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={handleVoiceSearch}
            title="Voice Search by Medicine Name"
            className={`p-1.5 rounded-lg transition relative cursor-pointer ${
              isListening
                ? "bg-red-100 text-red-600 animate-pulse"
                : "text-slate-500 hover:text-[#1D4ED8] hover:bg-blue-50"
            }`}
            aria-label="Voice search"
          >
            <Mic className="w-3.5 h-3.5" />
          </button>

          {!isMobile && (
            <button
              type="button"
              onClick={() =>
                toast.info("Quick Stock List / Rx Upload", {
                  description:
                    "Upload CSV, PDF, or photo of your requirement sheet for instant PTR billing.",
                })
              }
              title="Upload Prescription / Bulk Stock List"
              className="px-2 py-1 rounded-lg text-slate-600 hover:text-[#1D4ED8] hover:bg-blue-50 text-[11px] font-semibold inline-flex items-center gap-1 transition cursor-pointer"
            >
              <FileUp className="w-3.5 h-3.5 text-[#00A8E8]" />
              <span className="hidden xl:inline">Rx List</span>
            </button>
          )}

          {!isMobile && !isOpen && !query && (
            <span className="hidden 2xl:inline-flex items-center px-1.5 py-0.5 rounded border border-slate-200 bg-white text-[10px] font-mono-tech text-slate-400">
              ⌘K
            </span>
          )}

          <button
            type="submit"
            className={`rounded-lg bg-gradient-to-r from-[#1D4ED8] to-[#1B3B6F] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white font-semibold transition shadow-xs cursor-pointer ${
              isMobile ? "px-3 py-1.5 text-xs" : "px-4 py-1.5 text-xs"
            }`}
          >
            Search
          </button>
        </div>
      </form>

      {/* MEGA INSTANT SEARCH DROPDOWN PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-[0_24px_60px_-12px_rgba(15,23,42,0.25)] overflow-hidden z-50 max-h-[82vh] flex flex-col"
          >
            {/* Top Filter Bar inside Dropdown */}
            <div className="px-4 py-2.5 bg-[#F8FAFC] border-b border-slate-200 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1.5">
                {[
                  { id: "all", label: "All Matches", icon: Sparkles },
                  {
                    id: "products",
                    label: `Products (${filteredProducts.length})`,
                    icon: Package,
                  },
                  {
                    id: "brands",
                    label: `Brands (${filteredBrands.length})`,
                    icon: Building2,
                  },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id as "all" | "products" | "brands")}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition cursor-pointer ${
                        active
                          ? "bg-[#1B3B6F] text-white shadow-2xs"
                          : "text-slate-600 hover:bg-blue-50 hover:text-[#1D4ED8]"
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400">
                <span>Click any item to open Product Detail &amp; Zoom</span>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="p-4 overflow-y-auto space-y-5">
              {!query.trim() && (
                <>
                  {recentSearches.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          Recent Wholesale Searches
                        </span>
                        <button
                          type="button"
                          onClick={() => setRecentSearches([])}
                          className="text-[11px] font-semibold text-slate-400 hover:text-red-500"
                        >
                          Clear
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {recentSearches.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setQuery(item)}
                            className="px-3 py-1 rounded-full bg-slate-100 hover:bg-[#EFF6FF] text-slate-700 hover:text-[#1D4ED8] text-xs font-medium inline-flex items-center gap-1.5 transition cursor-pointer"
                          >
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{item}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
                      <Flame className="w-3.5 h-3.5 text-[#FF6B35]" />
                      Trending in Northeast Pharmacies Today
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {trendingSearches.map((t) => (
                        <button
                          key={t.label}
                          type="button"
                          onClick={() => setQuery(t.label)}
                          className="group px-3 py-1.5 rounded-xl border border-slate-200 hover:border-[#1D4ED8] bg-white hover:bg-[#EFF6FF]/60 text-xs font-semibold text-slate-800 inline-flex items-center gap-1.5 transition shadow-2xs cursor-pointer"
                        >
                          <span className="group-hover:text-[#1D4ED8]">{t.label}</span>
                          <span className="px-1.5 py-0.2 rounded bg-orange-100 text-[#EA580C] text-[10px] font-bold">
                            {t.tag}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {(activeTab === "all" || activeTab === "products") && (
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#1D4ED8]" />
                      {query.trim()
                        ? `Instant Wholesale Matches (${filteredProducts.length})`
                        : "Hot-Moving Wholesale Lots"}
                    </span>
                    <Link
                      href={
                        query.trim()
                          ? `/products?q=${encodeURIComponent(query.trim())}`
                          : "/products"
                      }
                      onClick={() => setIsOpen(false)}
                      className="text-xs font-bold text-[#1D4ED8] hover:underline inline-flex items-center gap-1"
                    >
                      <span>View Full Catalogue</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {filteredProducts.length > 0 ? (
                    <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                      {filteredProducts.slice(0, 5).map((product, idx) => {
                        const isHighlighted = idx === selectedIndex;
                        return (
                          <div
                            key={product.id}
                            className={`p-2.5 sm:p-3 flex items-center justify-between gap-3 transition ${
                              isHighlighted ? "bg-[#EFF6FF]" : "hover:bg-slate-50"
                            }`}
                          >
                            <div
                              onClick={() =>
                                saveRecentAndNavigate(product.name, product.id)
                              }
                              className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
                            >
                              <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-slate-200 p-1 shrink-0 flex items-center justify-center">
                                <img
                                  src={product.imageUrl}
                                  alt={product.name}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D4ED8]">
                                    {product.brand}
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-mono-tech">
                                    • {product.sku}
                                  </span>
                                  {product.coldChain && (
                                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-sky-100 text-sky-800 text-[9px] font-bold">
                                      <ThermometerSnowflake className="w-2.5 h-2.5" /> Cold-Chain
                                    </span>
                                  )}
                                </div>
                                <div className="font-bold text-xs sm:text-sm text-slate-900 hover:text-[#1D4ED8] truncate">
                                  {product.name}
                                </div>
                                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                                  <span>{product.packSize}</span>
                                  <span>•</span>
                                  <span className="inline-flex items-center gap-0.5 text-amber-600 font-semibold">
                                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                    {product.rating}
                                  </span>
                                  <span className="hidden sm:inline-flex items-center gap-0.5 text-amber-700 font-semibold">
                                    • <Coins className="w-3 h-3 text-amber-500" /> +{product.goldCoins} Coins
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2.5 shrink-0">
                              <div className="text-right">
                                <div className="font-bold text-sm text-slate-900 tabular-nums">
                                  ₹{product.ptrPrice}
                                </div>
                                <div className="flex items-center gap-1 justify-end">
                                  <span className="text-[10px] text-slate-400 line-through">
                                    ₹{product.mrpPrice}
                                  </span>
                                  <span className="text-[10px] font-bold text-[#16A34A]">
                                    {product.discountPercent}
                                  </span>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toast.success(`Added ${product.name} to Bulk Quote!`, {
                                    description: `PTR ₹${product.ptrPrice} • ${product.packSize}`,
                                  });
                                }}
                                className="px-3 py-1.5 rounded-lg bg-[#EFF6FF] hover:bg-[#1D4ED8] text-[#1D4ED8] hover:text-white border border-[#93C5FD] text-xs font-bold inline-flex items-center gap-1 transition cursor-pointer"
                              >
                                <ShoppingCart className="w-3.5 h-3.5" />
                                <span>Add</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center bg-slate-50">
                      <p className="text-xs sm:text-sm font-bold text-slate-800">
                        No direct catalogue match for “{query}”
                      </p>
                      <p className="text-xs text-slate-500 mt-1 mb-3">
                        We stock 5,240+ formulations in our Pan Bazaar vault. Ask our Live Pharmacist Desk for instant sourcing!
                      </p>
                      <button
                        type="button"
                        onClick={triggerAgentWithQuery}
                        className="btn-orange px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Ask Live Agent for “{query}”</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {(activeTab === "all" || activeTab === "brands") &&
                filteredBrands.length > 0 && (
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2.5">
                      <Building2 className="w-3.5 h-3.5 text-[#0284C7]" />
                      Authorized Brands in Stock
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {filteredBrands.slice(0, 6).map((b) => (
                        <Link
                          key={b.name}
                          href={`/products?brand=${encodeURIComponent(b.name)}`}
                          onClick={() => setIsOpen(false)}
                          className="group p-2 rounded-xl border border-slate-200 hover:border-[#1D4ED8] bg-[#F8FAFC] hover:bg-[#EFF6FF]/60 flex items-center gap-2.5 transition"
                        >
                          <img
                            src={b.logoUrl}
                            alt={b.name}
                            className="w-14 h-9 object-contain rounded-lg bg-white border border-slate-200 p-0.5 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="font-bold text-xs text-slate-900 group-hover:text-[#1D4ED8] truncate">
                              {b.name}
                            </div>
                            <div className="text-[10px] text-[#16A34A] font-semibold truncate">
                              {b.highlight}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

              {activeTab === "all" && filteredCategories.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
                    <Layers className="w-3.5 h-3.5 text-[#16A34A]" />
                    Therapeutic Departments
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {filteredCategories.map((c) => (
                      <Link
                        key={c.name}
                        href={`/products?category=${encodeURIComponent(c.name)}`}
                        onClick={() => setIsOpen(false)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-[#EFF6FF] text-xs font-semibold text-slate-700 hover:text-[#1D4ED8] flex items-center gap-2 transition"
                      >
                        <img
                          src={c.imageUrl}
                          alt={c.name}
                          className="w-5 h-5 rounded-full object-contain bg-white"
                        />
                        <span>{c.name}</span>
                        <span className="text-[10px] text-slate-400">({c.count})</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Live Pharmacist Prompt Bar */}
            <div className="px-4 py-2.5 bg-gradient-to-r from-[#1B3B6F] to-[#1D4ED8] text-white flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-ping" />
                <span className="font-medium">
                  Need bulk case-lot rates or can&apos;t find a molecule?
                </span>
              </div>
              <button
                type="button"
                onClick={triggerAgentWithQuery}
                className="px-3 py-1 rounded-lg bg-[#FF6B35] hover:bg-[#EA580C] text-white font-bold text-[11px] inline-flex items-center gap-1.5 transition cursor-pointer shrink-0"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Talk to Live Agent Now</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
