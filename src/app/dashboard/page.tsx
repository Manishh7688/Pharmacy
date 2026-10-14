import Link from "next/link";
import {
  Package,
  Users,
  TrendingUp,
  ThermometerSnowflake,
  ArrowUpRight,
  Truck,
} from "lucide-react";

export default function DashboardPage() {
  const kpis = [
    {
      label: "Total Wholesale SKUs",
      value: "5,240",
      delta: "+140 New Arrivals",
      icon: Package,
      color: "bg-[#EFF6FF] text-[#1D4ED8]",
    },
    {
      label: "Active B2B Partners",
      value: "248",
      delta: "99.4% Fill Rate",
      icon: Users,
      color: "bg-[#E0F2FE] text-[#0284C7]",
    },
    {
      label: "Monthly Trade GMV",
      value: "₹48.2L",
      delta: "+14.8% vs Last Month",
      icon: TrendingUp,
      color: "bg-[#DCFCE7] text-[#16A34A]",
    },
    {
      label: "Cold-Chain Stability",
      value: "99.94%",
      delta: "+2°C to +8°C Verified",
      icon: ThermometerSnowflake,
      color: "bg-[#FFF7ED] text-[#EA580C]",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
            PAN BAZAAR WHOLESALE HUB
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Partner Operations Dashboard
          </h1>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/dashboard/products"
            className="btn-primary px-4 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5"
          >
            <span>Manage Inventory</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/products"
            className="btn-secondary px-4 py-2.5 rounded-xl text-xs font-bold"
          >
            View Public Store
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="dashboard-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500">
                  {kpi.label}
                </span>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpi.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-900 tabular-nums">
                {kpi.value}
              </div>
              <div className="text-xs font-semibold text-[#16A34A] mt-1">
                {kpi.delta}
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg text-slate-900 flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#1D4ED8]" />
            Today’s Active InstaPharma Dispatches
          </h2>
          <Link
            href="/dashboard/users"
            className="text-xs font-bold text-[#1D4ED8] hover:underline"
          >
            View All Clients →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {[
            {
              client: "City Medicos • Guwahati",
              items: "Dr. Morepen Mormox-CV 625 & 40 SKUs",
              status: "Out for 4h Delivery",
            },
            {
              client: "Care Hospital • Silchar",
              items: "Ethicon Vicryl Sutures & Cold-Chain Insulin",
              status: "Cold-Box Sealed (+4.2°C)",
            },
            {
              client: "Health Point • Dibrugarh",
              items: "Chronic Cardiac & Diabetic Master Lot",
              status: "Line-Haul Dispatched",
            },
            {
              client: "Hills Lifecare • Shillong",
              items: "Surgical Dressings & Antibiotics",
              status: "GST e-Way Generated",
            },
          ].map((d) => (
            <div
              key={d.client}
              className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 flex items-center justify-between gap-3"
            >
              <div>
                <div className="font-bold text-sm text-slate-900">{d.client}</div>
                <div className="text-xs text-slate-500 mt-0.5">{d.items}</div>
              </div>
              <span className="dk-badge-discount shrink-0">{d.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
