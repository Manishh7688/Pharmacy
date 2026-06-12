import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Truck, ShieldCheck, CreditCard, Headphones, Warehouse, Users } from "lucide-react";

export const metadata = {
  title: "Services",
  description: "Comprehensive wholesale services by Maa Bhagwati Pharmaceuticals — cold chain, delivery, credit & more in Guwahati & Northeast India.",
};

const services = [
  { icon: Truck, title: "Pan-Northeast Delivery", desc: "Fast delivery across Assam and all Northeast states from our Guwahati hub." },
  { icon: ShieldCheck, title: "Cold Chain Management", desc: "Validated temperature-controlled logistics for vaccines and sensitive products." },
  { icon: CreditCard, title: "Flexible Credit & Billing", desc: "Monthly credit for verified clients with easy GST invoicing." },
  { icon: Warehouse, title: "Bulk & Institutional Supply", desc: "Special pricing and handling for hospitals, tenders and large orders." },
  { icon: Headphones, title: "Dedicated Account Support", desc: "Personal relationship managers and real-time stock alerts via WhatsApp." },
  { icon: Users, title: "New Product Introduction", desc: "Regular updates on new launches and molecule introductions." },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="text-[#0F766E] text-xs font-semibold tracking-[3px] mb-3">WHAT WE OFFER</div>
        <h1 className="text-5xl font-semibold tracking-[-2px]">Comprehensive Wholesale Services</h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">More than just supplying medicines — we provide end-to-end support.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="modern-card p-9 rounded-3xl bg-white border border-slate-100">
                <div className="mb-7 inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-[#0F766E]/10">
                  <Icon className="w-7 h-7 text-[#0F766E]" />
                </div>
                <h3 className="font-semibold text-2xl tracking-[-0.5px] mb-3">{service.title}</h3>
                <p className="text-[15px] text-slate-600 leading-relaxed">{service.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}
