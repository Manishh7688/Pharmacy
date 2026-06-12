"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Search, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: number;
  name: string;
  category: string;
  manufacturer: string;
  pack: string;
  priceRange: string;
  description: string;
}

const allProducts: Product[] = [
  { id: 1, name: "Amoxicillin 500mg Capsules", category: "Antibiotics", manufacturer: "Cipla / Sun Pharma", pack: "10x10", priceRange: "₹85 – ₹110", description: "Broad-spectrum penicillin antibiotic." },
  { id: 2, name: "Azithromycin 500mg Tablets", category: "Antibiotics", manufacturer: "Mankind / Macleods", pack: "3x1", priceRange: "₹58 – ₹72", description: "Macrolide antibiotic for respiratory infections." },
  { id: 3, name: "Paracetamol 650mg Tablets", category: "Analgesics", manufacturer: "Micro Labs / Abbott", pack: "15x10", priceRange: "₹28 – ₹42", description: "Fast-acting analgesic and antipyretic." },
  { id: 4, name: "Ibuprofen 400mg + Paracetamol 325mg", category: "Analgesics", manufacturer: "Dr. Reddy's", pack: "10x10", priceRange: "₹65 – ₹89", description: "Combination for enhanced pain relief." },
  { id: 5, name: "Metformin 500mg SR Tablets", category: "Anti-Diabetic", manufacturer: "USV / Sun Pharma", pack: "10x10", priceRange: "₹42 – ₹58", description: "First-line treatment for Type-2 Diabetes." },
  { id: 6, name: "Atorvastatin 10mg Tablets", category: "Cardiovascular", manufacturer: "Zydus / Torrent", pack: "10x10", priceRange: "₹48 – ₹65", description: "Statin for lowering cholesterol." },
  { id: 7, name: "Amlodipine 5mg Tablets", category: "Cardiovascular", manufacturer: "Mankind / Ipca", pack: "10x10", priceRange: "₹25 – ₹38", description: "Calcium channel blocker for hypertension." },
  { id: 8, name: "Omeprazole 20mg Capsules", category: "Gastrointestinal", manufacturer: "Dr. Reddy's / Alkem", pack: "10x10", priceRange: "₹32 – ₹48", description: "Proton pump inhibitor for acidity." },
];

const categories = ["All", "Antibiotics", "Analgesics", "Anti-Diabetic", "Cardiovascular", "Gastrointestinal", "OTC & Nutraceuticals", "Surgicals & Consumables"];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEnquire = (product: Product) => {
    window.location.href = `/contact?product=${encodeURIComponent(product.name)}`;
  };

  return (
    <>
      <Navbar />

      <div className="bg-[#f8fafc] border-b">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="max-w-2xl">
            <div className="uppercase tracking-[2.5px] text-xs font-semibold text-[#0F766E]">COMPLETE CATALOGUE</div>
            <h1 className="text-5xl tracking-[-2.2px] font-semibold mt-2">Our Products</h1>
            <p className="mt-3 text-lg text-slate-600">Over 5,000 SKUs across major therapeutic categories.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-9">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`category-tab ${activeCategory === cat ? "active" : ""}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full max-w-sm">
            <Search className="w-4 h-4 absolute left-4 top-3.5 text-slate-400" />
            <input type="text" placeholder="Search medicines..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-modern pl-11 py-2.5 text-sm" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 pb-20">
          <AnimatePresence>
            {filteredProducts.length > 0 ? filteredProducts.map((product) => (
              <motion.div key={product.id} layout className="product-card bg-white border border-slate-200 rounded-3xl p-7 flex flex-col">
                <div>
                  <div className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-[#0F766E]/10 text-[#0F766E] mb-4">{product.category}</div>
                  <h3 className="font-semibold text-xl tracking-tight leading-tight mb-1">{product.name}</h3>
                  <p className="text-sm text-slate-500 mb-3">{product.manufacturer}</p>
                  <p className="text-sm text-slate-600 leading-snug">{product.description}</p>
                </div>
                <div className="mt-auto pt-7 flex items-end justify-between">
                  <div>
                    <div className="text-xs text-slate-500">Pack / Price</div>
                    <div className="font-semibold tabular-nums tracking-tight">{product.pack} • {product.priceRange}</div>
                  </div>
                  <button onClick={() => handleEnquire(product)} className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#0F172A] text-white text-sm font-medium hover:bg-black transition">
                    Enquire <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )) : <div className="col-span-full py-12 text-center text-slate-500">No products found.</div>}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </>
  );
}
