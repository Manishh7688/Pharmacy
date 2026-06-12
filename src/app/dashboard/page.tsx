import { Package, Users, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Products</p>
              <p className="text-4xl font-semibold mt-1">5,240</p>
            </div>
            <Package className="w-10 h-10 text-[#0F766E]" />
          </div>
        </div>
        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Active Clients</p>
              <p className="text-4xl font-semibold mt-1">248</p>
            </div>
            <Users className="w-10 h-10 text-[#0F766E]" />
          </div>
        </div>
        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Monthly Revenue</p>
              <p className="text-4xl font-semibold mt-1">₹48.2L</p>
            </div>
            <TrendingUp className="w-10 h-10 text-[#0F766E]" />
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <h2 className="font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <a href="/dashboard/products" className="btn-primary px-5 py-2 rounded-xl">Manage Inventory</a>
          <a href="/dashboard/users" className="btn-secondary px-5 py-2 rounded-xl">View Clients</a>
          <a href="/products" className="btn-secondary px-5 py-2 rounded-xl">View Public Catalogue</a>
        </div>
      </div>
    </div>
  );
}
