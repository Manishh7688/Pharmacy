"use client";

import { useState } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
  price: number;
  expiry: string;
}

const initialProducts: Product[] = [
  { id: 1, name: "Amoxicillin 500mg Capsules", category: "Antibiotics", stock: 245, price: 95, expiry: "2026-11-12" },
  { id: 2, name: "Azithromycin 500mg Tablets", category: "Antibiotics", stock: 87, price: 72, expiry: "2026-08-03" },
  { id: 3, name: "Paracetamol 650mg Tablets", category: "Analgesics", stock: 1320, price: 35, expiry: "2027-02-18" },
  { id: 4, name: "Metformin 500mg SR", category: "Anti-Diabetic", stock: 19, price: 58, expiry: "2026-07-22" },
];

export default function DashboardProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const adjustStock = (id: number, delta: number) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p
      )
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Inventory Management</h1>
        <button
          onClick={() => alert("Add product modal would open here (demo)")}
          className="btn-primary px-5 py-2 rounded-xl"
        >
          + Add New Product
        </button>
      </div>

      <input
        placeholder="Search products or categories..."
        className="input-modern max-w-xs mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="dashboard-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="text-left p-4">Product</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Stock</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Expiry</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b last:border-0 hover:bg-slate-50">
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4 text-sm text-slate-500">{p.category}</td>
                <td className="p-4 font-semibold tabular-nums">{p.stock}</td>
                <td className="p-4">₹{p.price}</td>
                <td className="p-4 text-sm">{p.expiry}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => adjustStock(p.id, 10)} className="text-xs px-2 py-1 border rounded hover:bg-green-50">+10</button>
                  <button onClick={() => adjustStock(p.id, -1)} className="text-xs px-2 py-1 border rounded hover:bg-red-50">−1</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      <p className="text-xs text-slate-500 mt-3">Demo: Stock changes are client-side only.</p>
    </div>
  );
}
