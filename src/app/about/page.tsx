import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import {
  CheckCircle2,
  Users,
  Building2,
  Award,
  ThermometerSnowflake,
  ShieldCheck,
  ArrowRight,
  Truck,
} from "lucide-react";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Maa Bhagwati Pharmaceuticals — Northeast India's trusted B2B pharmaceutical wholesaler and distributor based in Pan Bazaar, Guwahati, Assam.",
};

const values = [
  {
    title: "100% Genuine Depot Sourcing",
    desc: "Every formulation is procured directly from authorized C&F depots of Dr. Morepen, Cipla, Sun Pharma, Abbott, and Ethicon with full batch traceability.",
  },
  {
    title: "Validated Cold-Chain (+2°C to +8°C)",
    desc: "Continuous temperature-monitored walk-in cold rooms and insulated gel-pack dispatch boxes for vaccines, insulins, and critical care biologics.",
  },
  {
    title: "HSN-Mapped GST & Trade Margins",
    desc: "Transparent wholesale PTR/PTS pricing, 10+1 trade schemes, and instant GST e-invoicing for retail pharmacies and hospitals.",
  },
  {
    title: "Fast Pan-Northeast Fulfillment",
    desc: "Same-day 4-hour delivery across Guwahati and overnight line-haul supply to all 8 Northeast Indian states.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F4F7FB]">
      <Navbar />

      {/* Dentalkart-Style Clean Medical Banner */}
      <div className="bg-gradient-to-r from-[#1B3B6F] via-[#1D4ED8] to-[#0284C7] text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-xs font-bold tracking-wider uppercase text-[#FDE047]">
              SINCE 2015 • ISO 9001:2015 CERTIFIED WHOLESALER
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Northeast India’s Most Dependable B2B Pharmaceutical Store
            </h1>
            <p className="text-sm sm:text-lg text-blue-100 max-w-2xl leading-relaxed">
              Stocking 5,240+ genuine formulations across 150+ trusted manufacturers, serving 250+ pharmacies, nursing homes, and hospitals from Pan Bazaar, Guwahati.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-center">
            <div className="bg-white rounded-2xl p-4 shadow-xl border border-blue-100 max-w-xs w-full text-slate-900">
              <img
                src="https://r2dkmedia.dentalkart.com/backend-media-uploads/HomepageImages/new.jpg?w=512"
                alt="Maa Bhagwati Pharma Inventory"
                className="w-full h-40 object-contain rounded-xl bg-slate-50 p-2"
              />
              <div className="mt-3 text-center">
                <div className="font-bold text-sm text-[#1B3B6F]">
                  Pan Bazaar Central Hub
                </div>
                <div className="text-xs text-slate-500">
                  Drug Control Dept. Assam Licensed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
              OUR STORY &amp; MISSION
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Empowering Pharmacies &amp; Hospitals with Seamless Digital-First Wholesale Supply
            </h2>
            <div className="space-y-3 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <p>
                Founded in 2015 in the commercial heart of Guwahati’s Pan Bazaar, Maa Bhagwati Pharmaceuticals was built to solve the biggest challenge faced by pharmacies and hospitals across Assam and Northeast India: fragmented stock availability and unpredictable delivery timelines.
              </p>
              <p>
                Inspired by modern clinical e-commerce platforms like Dentalkart, we combine a 5,240+ SKU central warehouse with transparent PTR/PTS wholesale pricing, live batch expiry visibility, and same-day dispatch.
              </p>
              <p>
                From everyday antibiotics like Dr. Morepen Mormox-CV and chronic cardiac/diabetic medicines to Ethicon surgical sutures and +2°C to +8°C vaccines, we deliver 100% genuine stock straight to your counter.
              </p>
            </div>
            <div className="pt-3 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="btn-primary px-6 py-3 rounded-xl text-xs sm:text-sm inline-flex items-center gap-2"
              >
                <span>Explore 5,240+ Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="btn-orange px-6 py-3 rounded-xl text-xs sm:text-sm"
              >
                Apply for Dealership / Credit
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {[
              {
                icon: Building2,
                title: "Headquartered in Pan Bazaar, Guwahati",
                sub: "Bishop Plaza, Col. J. Ali Road — connected to all Northeast transport corridors.",
              },
              {
                icon: Users,
                title: "250+ Active B2B Healthcare Partners",
                sub: "Supplying retail pharmacies, dental & medical clinics, nursing homes, and ICU hospitals.",
              },
              {
                icon: ThermometerSnowflake,
                title: "Validated Cold-Chain Custody",
                sub: "24/7 power-backed +2°C to +8°C cold rooms and insulated transit boxes.",
              },
              {
                icon: Award,
                title: "ISO 9001:2015 & GST Compliant",
                sub: "Licensed by Drug Control Department, Assam with full HSN e-invoicing.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-4 shadow-2xs"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm sm:text-base text-slate-900">
                      {item.title}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      {item.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Core Pillars */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
              THE MAA BHAGWATI PROMISE
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Why Healthcare Buyers Prefer Our Platform
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="p-5 rounded-xl bg-[#F8FAFC] border border-slate-200 flex gap-3.5"
              >
                <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-slate-900">
                    {v.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
