"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Search,
  Star,
  SlidersHorizontal,
  ThermometerSnowflake,
  ShieldCheck,
  Truck,
  FileText,
  ChevronDown,
  X,
} from "lucide-react";
import {
  DentalkartProductCard,
  dentalkartPharmaProducts,
  WholesaleProduct,
} from "@/components/widgets/DentalkartWidgets";

const extraProducts: WholesaleProduct[] = [
  {
    id: 9,
    sku: "DK-CAL-500",
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
    imageUrl:
      "https://r2dkmedia.dentalkart.com/media/catalog/product/ctlp/d/r/drmorefwdkjr.jpg?w=512",
  },
  {
    id: 10,
    sku: "DK-CUR-010",
    name: "Curatick Oral & Mucosal Wound Dressing Patch (Pack of 10)",
    brand: "Curatick / Medtech",
    category: "Surgicals & Consumables",
    badge: "Best Seller",
    stockAlert: "Only 6 Packs Left",
    optionsCount: "Add • 2 Offers",
    rating: 4.5,
    reviews: 12,
    description:
      "Transparent, Vitamin-E enriched resorbable adhesive wound dressing patch for oral ulcers and post-surgical mucosa.",
    ptrPrice: 449,
    mrpPrice: 1200,
    discountPercent: "62.58% Off",
    goldCoins: 8,
    packSize: "Box of 10 Patches",
    expiry: "Exp: May 2028",
    imageUrl:
      "https://r2dkmedia.dentalkart.com/backend-media-uploads/HomepageImages/Gingival-Cuff-Former-Navratri-Mobile-fadeb9.jpg?w=512",
  },
  {
    id: 11,
    sku: "DK-CAR-401",
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
    imageUrl:
      "https://r2dkmedia.dentalkart.com/media/catalog/product/1/a/1artboard_16.jpg?w=512",
  },
  {
    id: 12,
    sku: "DK-STE-500",
    name: "Life Steridex Disinfection & Cold Sterilization Soaking Tray (5L)",
    brand: "Life Steriware",
    category: "Surgicals & Consumables",
    badge: "Hot Seller",
    stockAlert: "Only 5 Units Left",
    optionsCount: "Add • 1 Offer",
    rating: 4.7,
    reviews: 22,
    description:
      "Autoclavable soaking tray with perforated inner liner and lid for cold sterilization of hospital & dental instruments.",
    ptrPrice: 3895,
    mrpPrice: 11000,
    discountPercent: "64.59% Off",
    goldCoins: 60,
    packSize: "1 Complete 5L Unit",
    expiry: "5-Year Warranty",
    imageUrl:
      "https://r2dkmedia.dentalkart.com/backend-media-uploads/HomepageImages/new.jpg?w=512",
  },
];

const allCatalogueProducts: WholesaleProduct[] = [
  ...dentalkartPharmaProducts,
  ...extraProducts,
];

const categories = [
  "All",
  "Antibiotics",
  "Anti-Diabetic",
  "Cardiovascular",
  "Gastrointestinal",
  "OTC & Nutraceuticals",
  "Surgicals & Consumables",
];

const brandsList = [
  "All Brands",
  "Dr. Morepen",
  "Ethicon / J&J",
  "Healthium / Samit",
  "Biocon / Abbott",
  "Sun Pharma / Torrent",
  "Life Steriware",
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"recommended" | "low" | "high">("recommended");
  const [coldChainOnly, setColdChainOnly] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = allCatalogueProducts
    .filter((product) => {
      const matchesCat =
        activeCategory === "All" || product.category === activeCategory;
      const matchesBrand =
        selectedBrand === "All Brands" || product.brand === selectedBrand;
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCold = !coldChainOnly || Boolean(product.coldChain);
      return matchesCat && matchesBrand && matchesSearch && matchesCold;
    })
    .sort((a, b) => {
      if (sortBy === "low") return a.ptrPrice - b.ptrPrice;
      if (sortBy === "high") return b.ptrPrice - a.ptrPrice;
      return b.rating - a.rating;
    });

  return (
    <div className="min-h-screen bg-[#F4F7FB]">
      <Navbar />

      {/* Dentalkart Category Header & Description Banner */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-5 sm:py-6">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2">
            <span>Home</span>
            <span>/</span>
            <span className="font-semibold text-[#1D4ED8]">
              Wholesale Pharmacy &amp; Surgical Catalogue
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl sm:text-3xl font-bold text-slate-900">
                  Wholesale Medicines &amp; Clinical Consumables
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-green-100 text-green-800 text-xs font-bold">
                  4.8 <Star className="w-3.5 h-3.5 fill-green-700 text-green-700" />
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-3xl leading-relaxed">
                Pharmaceutical formulations and surgical consumables are date-sensitive restock essentials. Every item below lists its pack configuration, verified expiry window, wholesale PTR rate, and Gold Coin trade reward.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-3.5 py-2 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-bold text-[#1D4ED8]">
                {filteredProducts.length} Products
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dentalkart Category Layout: Left Sidebar Filters + Right Product Grid */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-5 sm:py-6">
        {/* Mobile Filter & Sort Toggle Bar (Exact Dentalkart Mobile Category UX) */}
        <div className="lg:hidden mb-4 bg-white border border-slate-200 rounded-xl p-2.5 flex items-center justify-between gap-2 shadow-2xs">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex-1 py-2 px-3 rounded-lg bg-[#F8FAFC] border border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#1D4ED8]" />
            <span>Filters</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <div className="flex-1">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "recommended" | "low" | "high")
              }
              aria-label="Sort products"
              className="w-full py-2 px-3 rounded-lg bg-[#F8FAFC] border border-slate-200 text-xs font-bold text-slate-800 outline-none"
            >
              <option value="recommended">Sort: Recommended</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT SIDEBAR: DENTALKART "FILTERS BY" PANEL (Collapsible on Mobile, Sticky on Desktop) */}
          <aside
            className={`${
              mobileFiltersOpen ? "block" : "hidden"
            } lg:block lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 space-y-6 lg:sticky lg:top-36`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#1D4ED8]" />
                FILTERS BY
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory("All");
                    setSelectedBrand("All Brands");
                    setSearchTerm("");
                    setColdChainOnly(false);
                  }}
                  className="text-xs font-semibold text-[#1D4ED8] hover:underline"
                >
                  Reset All
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="lg:hidden p-1 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Search Filter */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                Quick Molecule Search
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Amoxicillin, Vicryl, Insulin..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-modern pl-9 py-2 text-xs"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <div className="text-xs font-bold uppercase text-slate-700 mb-2.5">
                Therapeutic Category
              </div>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-[#1D4ED8]"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={activeCategory === cat}
                      onChange={() => setActiveCategory(cat)}
                      className="accent-[#1D4ED8]"
                    />
                    <span className={activeCategory === cat ? "font-bold text-[#1D4ED8]" : ""}>
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="pt-4 border-t border-slate-200">
              <div className="text-xs font-bold uppercase text-slate-700 mb-2.5">
                Brands
              </div>
              <div className="space-y-1.5">
                {brandsList.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-[#1D4ED8]"
                  >
                    <input
                      type="radio"
                      name="brand"
                      checked={selectedBrand === brand}
                      onChange={() => setSelectedBrand(brand)}
                      className="accent-[#1D4ED8]"
                    />
                    <span className={selectedBrand === brand ? "font-bold text-[#1D4ED8]" : ""}>
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Cold Chain Availability */}
            <div className="pt-4 border-t border-slate-200">
              <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={coldChainOnly}
                  onChange={(e) => setColdChainOnly(e.target.checked)}
                  className="accent-[#1D4ED8] w-4 h-4"
                />
                <ThermometerSnowflake className="w-4 h-4 text-[#0284C7]" />
                <span>Cold-Chain (+2°C to +8°C)</span>
              </label>
            </div>
          </aside>

          {/* RIGHT MAIN AREA: SORT BAR + PRODUCT CARDS */}
          <div className="lg:col-span-9 space-y-5">
            {/* Horizontal Category Pills + Desktop Sort Bar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`category-tab text-xs whitespace-nowrap ${
                      activeCategory === cat ? "active" : ""
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="hidden lg:flex items-center gap-2 shrink-0 text-xs">
                <span className="text-slate-500 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "recommended" | "low" | "high")
                  }
                  className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold text-slate-800 outline-none"
                >
                  <option value="recommended">Recommended</option>
                  <option value="low">Price - Low to High</option>
                  <option value="high">Price - High to Low</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <DentalkartProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
                <div className="text-lg font-bold text-slate-900 mb-1">
                  No matching wholesale items found
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  Try clearing your filters or contact our Pan Bazaar sales desk for custom molecule sourcing.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory("All");
                    setSelectedBrand("All Brands");
                    setSearchTerm("");
                    setColdChainOnly(false);
                  }}
                  className="btn-primary px-5 py-2.5 rounded-xl text-xs"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Dentalkart-Style Category Editorial & Buying Guide */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-8 mt-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Why Buy Wholesale Medicines &amp; Surgical Consumables from Maa Bhagwati Pharmaceuticals?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Pharmaceutical formulations, cold-chain insulins, and sterile surgical sutures are date-sensitive clinical consumables. What matters most to a retail chemist or hospital purchase officer is that every master carton arrives with a long expiry window, legible batch number, intact cold-chain custody, and an HSN-mapped GST invoice.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5 mb-1">
                    <ShieldCheck className="w-4 h-4 text-[#16A34A]" /> 100% Genuine Products
                  </div>
                  <p className="text-xs text-slate-500">
                    Direct C&amp;F depot procurement from Dr. Morepen, Cipla, Sun Pharma, Abbott, and Ethicon.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5 mb-1">
                    <Truck className="w-4 h-4 text-[#1D4ED8]" /> Fast Pan-Northeast Delivery
                  </div>
                  <p className="text-xs text-slate-500">
                    Same-day 4-hour delivery in Guwahati and overnight insulated dispatch to 8 Northeast states.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5 mb-1">
                    <FileText className="w-4 h-4 text-[#EA580C]" /> GST Invoice &amp; Credit Line
                  </div>
                  <p className="text-xs text-slate-500">
                    Claim 100% input tax credit with computerized HSN invoices and 30-day partner credit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
