"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: number;
  sku: string;
  name: string;
  brand: string;
  category: string;
  stock: number;
  ptrPrice: number;
  expiry: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    sku: "DK-MOR-625",
    name: "Dr. Morepen Mormox-CV 625 Tablets",
    brand: "Dr. Morepen",
    category: "Antibiotics",
    stock: 245,
    ptrPrice: 895,
    expiry: "2028-08-12",
  },
  {
    id: 2,
    sku: "DK-MOR-500",
    name: "Dr. Morepen Mormox-500 Capsules",
    brand: "Dr. Morepen",
    category: "Antibiotics",
    stock: 112,
    ptrPrice: 1065,
    expiry: "2028-11-03",
  },
  {
    id: 3,
    sku: "DK-ETH-301",
    name: "Ethicon Vicryl Plus #3-0 Suture (Pack of 12)",
    brand: "Ethicon / J&J",
    category: "Surgicals",
    stock: 48,
    ptrPrice: 4495,
    expiry: "2028-05-18",
  },
  {
    id: 4,
    sku: "DK-INS-901",
    name: "Biocon Basalog Insulin Glargine Cold-Chain",
    brand: "Biocon",
    category: "Anti-Diabetic",
    stock: 64,
    ptrPrice: 1490,
    expiry: "2028-07-22",
  },
];

export default function DashboardProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const adjustStock = (id: number, delta: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p
      )
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
            FEFO BATCH &amp; PTR LEDGER
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Inventory Management
          </h1>
        </div>
        <button
          type="button"
          onClick={() =>
            toast.success("Batch Intake Modal", {
              description: "Connected to warehouse barcode scanner in production.",
            })
          }
          className="btn-orange px-5 py-2.5 rounded-xl text-xs font-bold self-start sm:self-auto"
        >
          + Add New Wholesale Lot
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          placeholder="Search SKU, molecule or brand..."
          className="input-modern pl-10 py-2 text-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="dashboard-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-[#F8FAFC] text-xs font-bold text-slate-700 uppercase">
                <th className="p-4">SKU / Product</th>
                <th className="p-4">Brand</th>
                <th className="p-4">Category</th>
                <th className="p-4">Master Boxes</th>
                <th className="p-4">PTR Rate</th>
                <th className="p-4">Expiry</th>
                <th className="p-4 text-right">Adjust</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="p-4">
                    <div className="text-[10px] font-mono-tech text-slate-400">
                      {p.sku}
                    </div>
                    <div className="font-bold text-slate-900">{p.name}</div>
                  </td>
                  <td className="p-4 font-semibold text-[#1D4ED8]">{p.brand}</td>
                  <td className="p-4 text-slate-600">{p.category}</td>
                  <td className="p-4 font-bold tabular-nums text-slate-900">
                    {p.stock}
                  </td>
                  <td className="p-4 font-bold text-[#16A34A]">₹{p.ptrPrice}</td>
                  <td className="p-4 text-xs text-slate-500">{p.expiry}</td>
                  <td className="p-4 text-right space-x-1.5">
                    <button
                      type="button"
                      onClick={() => adjustStock(p.id, 10)}
                      className="px-2.5 py-1 rounded-md border border-slate-300 hover:bg-green-50 text-xs font-bold text-green-700"
                    >
                      +10
                    </button>
                    <button
                      type="button"
                      onClick={() => adjustStock(p.id, -1)}
                      className="px-2.5 py-1 rounded-md border border-slate-300 hover:bg-red-50 text-xs font-bold text-red-700"
                    >
                      −1
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
