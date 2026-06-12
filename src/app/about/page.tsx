import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle, Users, Building2, Award } from "lucide-react";

export const metadata = {
  title: "About Us",
  description: "Learn about Maa Bhagwati Pharmaceuticals — a leading pharmaceutical wholesaler and distributor based in Pan Bazaar, Guwahati, Assam.",
};

const values = [
  "Quality First — We never compromise on the authenticity and quality of medicines.",
  "Customer Centric — Your success is our success. We go the extra mile for every client.",
  "Transparency — Complete documentation, batch traceability, and clear communication.",
  "Reliability — Consistent stock and on-time deliveries you can count on.",
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <div className="bg-[#f8fafc] pt-14 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="uppercase text-[#0F766E] text-xs tracking-[3px] font-semibold mb-3">SINCE 2015</div>
          <h1 className="text-6xl font-semibold tracking-[-2.4px]">About Maa Bhagwati Pharmaceuticals</h1>
          <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto">
            A family-run pharmaceutical wholesaling business built on trust, quality, and deep roots in the Northeast.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <h2 className="font-semibold text-4xl tracking-[-1.5px] mb-6">Our Story</h2>
            <div className="prose prose-slate max-w-none text-[15px] leading-relaxed text-slate-600">
              <p>Maa Bhagwati Pharmaceuticals was founded in 2015 in the heart of Guwahati’s Pan Bazaar with a simple mission: to make high-quality, affordable medicines easily accessible to every pharmacy and healthcare institution in Assam and the Northeast.</p>
              <p>Starting with a small warehouse and a handful of trusted suppliers, we have grown into one of the most respected pharmaceutical wholesalers in the region. Today we stock over 5,000 SKUs and proudly serve more than 250 pharmacies, hospitals, nursing homes, and clinics across 8 states.</p>
              <p>Our commitment remains unchanged — genuine products, fair pricing, and reliable service delivered with personal care.</p>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0F766E]/10 flex items-center justify-center"><Building2 className="text-[#0F766E]" /></div>
                <div>
                  <div className="font-semibold">Headquartered in Guwahati</div>
                  <div className="text-sm text-slate-500">Pan Bazaar, Assam</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0F766E]/10 flex items-center justify-center"><Users className="text-[#0F766E]" /></div>
                <div>
                  <div className="font-semibold">250+ Active Clients</div>
                  <div className="text-sm text-slate-500">Pharmacies • Hospitals • Clinics</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0F766E]/10 flex items-center justify-center"><Award className="text-[#0F766E]" /></div>
                <div>
                  <div className="font-semibold">ISO 9001:2015 Certified</div>
                  <div className="text-sm text-slate-500">Licensed by Drug Control Department, Assam</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-2 gap-6">
          <div className="modern-card p-10 rounded-3xl bg-white">
            <div className="font-semibold text-[#0F766E] text-sm tracking-widest mb-3">OUR MISSION</div>
            <p className="text-xl leading-snug">To be the most trusted pharmaceutical distribution partner in Northeast India by delivering quality medicines with integrity, efficiency, and care.</p>
          </div>
          <div className="modern-card p-10 rounded-3xl bg-white">
            <div className="font-semibold text-[#0F766E] text-sm tracking-widest mb-3">OUR VISION</div>
            <p className="text-xl leading-snug">To build the most reliable and responsive pharmaceutical supply chain that empowers every healthcare provider in the region to serve patients better.</p>
          </div>
        </div>

        <div className="mt-20">
          <div className="text-center mb-8">
            <div className="text-[#0F766E] uppercase tracking-[2px] text-sm font-semibold">OUR CORE VALUES</div>
            <h3 className="text-3xl font-semibold tracking-tight mt-2">What Drives Us Every Day</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {values.map((value, idx) => (
              <div key={idx} className="flex gap-4 bg-white p-7 rounded-2xl border border-slate-100">
                <CheckCircle className="w-6 h-6 text-[#0F766E] shrink-0 mt-0.5" />
                <p className="text-slate-600">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
