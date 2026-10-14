import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import {
  Truck,
  ShieldCheck,
  CreditCard,
  Headphones,
  Warehouse,
  Users,
  ThermometerSnowflake,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "Services & Cold-Chain Logistics",
  description:
    "Comprehensive B2B pharmaceutical wholesale services by Maa Bhagwati Pharmaceuticals — InstaPharma express delivery, cold-chain logistics, 30-day credit & hospital supply.",
};

const services = [
  {
    icon: Truck,
    badge: "Same-Day Guwahati • 12–24h NE",
    title: "InstaPharma Pan-Northeast Delivery",
    desc: "Fast door-step dispatch from our Pan Bazaar hub across Assam, Meghalaya, Arunachal Pradesh, Nagaland, Manipur, Mizoram, and Tripura.",
  },
  {
    icon: ThermometerSnowflake,
    badge: "+2°C to +8°C Certified",
    title: "Validated Cold-Chain Logistics",
    desc: "Temperature-controlled storage and 72-hour gel-pack insulated transit boxes for vaccines, insulins, and biological injectables.",
  },
  {
    icon: CreditCard,
    badge: "30-Day Revolving Credit",
    title: "Flexible B2B Credit & GST Billing",
    desc: "Computerized HSN-mapped GST invoices for 100% input tax credit and monthly credit lines for verified pharmacies & hospitals.",
  },
  {
    icon: Warehouse,
    badge: "99.4% Order Fill Rate",
    title: "Hospital, ICU & Tender Bulk Supply",
    desc: "Institutional rate contracts for multi-specialty hospitals, dental & surgical clinics, and government healthcare tenders.",
  },
  {
    icon: Headphones,
    badge: "< 15 Min Quote Desk",
    title: "Dedicated WhatsApp Order Desk",
    desc: "Upload your prescription pad or stock restock sheet on WhatsApp and receive an itemized PTR quote within 15 minutes.",
  },
  {
    icon: Users,
    badge: "Starter Inventory Kit",
    title: "New Pharmacy / Clinic Setup Support",
    desc: "Complete opening-stock planning across fast-moving acute, chronic, OTC, and surgical categories with launch discounts.",
  },
];

const slas = [
  {
    region: "Guwahati Metro & Kamrup (781001–781038)",
    transit: "2 – 4 Hours (InstaPharma Same-Day)",
    mode: "Dedicated Cold & Ambient Van",
    freeFreight: "₹10,000+",
  },
  {
    region: "Lower & Central Assam (Nagaon, Tezpur, Nalbari)",
    transit: "6 – 12 Hours Express",
    mode: "Daily Surface Line-Haul",
    freeFreight: "₹15,000+",
  },
  {
    region: "Upper Assam & Barak Valley (Dibrugarh, Jorhat, Silchar)",
    transit: "12 – 18 Hours Overnight",
    mode: "Insulated Night Surface",
    freeFreight: "₹20,000+",
  },
  {
    region: "Meghalaya, Nagaland, Arunachal, Manipur, Mizoram, Tripura",
    transit: "18 – 36 Hours Priority",
    mode: "72h Validated Cold-Box / Express",
    freeFreight: "₹25,000+",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#F4F7FB]">
      <Navbar />

      {/* Banner */}
      <div className="bg-gradient-to-r from-[#1B3B6F] to-[#1D4ED8] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-xs font-bold uppercase tracking-wider text-[#FDE047] mb-3">
            INSTAPHARMA LOGISTICS &amp; B2B SERVICES
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Wholesale Supply &amp; Cold-Chain Services
          </h1>
          <p className="mt-3 text-sm sm:text-lg text-blue-100 max-w-2xl">
            End-to-end procurement, cold-chain custody, and credit support designed for retail pharmacies, clinics, and hospitals.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="dk-card p-6 flex flex-col justify-between bg-white"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="dk-badge-bestseller">{s.badge}</span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#1D4ED8]">
                  <span>ISO 9001:2015 Verified</span>
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Regional Delivery Table */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
                NORTHEAST INDIA DELIVERY SLA MATRIX
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Pincode &amp; Corridor Transit Windows
              </h2>
            </div>
            <Link
              href="/contact"
              className="btn-orange px-5 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Schedule Bulk Dispatch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[580px] text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-[#F8FAFC] text-xs font-bold text-slate-700 uppercase">
                  <th className="p-3.5">Delivery Corridor</th>
                  <th className="p-3.5">Estimated Transit</th>
                  <th className="p-3.5">Cold / Ambient Mode</th>
                  <th className="p-3.5 text-right">Free Freight Order</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                {slas.map((row) => (
                  <tr key={row.region} className="hover:bg-slate-50">
                    <td className="p-3.5 font-semibold text-slate-900">
                      {row.region}
                    </td>
                    <td className="p-3.5 text-[#1D4ED8] font-semibold">
                      {row.transit}
                    </td>
                    <td className="p-3.5 text-slate-600">{row.mode}</td>
                    <td className="p-3.5 text-right font-bold text-[#16A34A]">
                      {row.freeFreight}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
