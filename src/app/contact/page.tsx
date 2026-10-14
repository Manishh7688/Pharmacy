"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

interface FormData {
  name: string;
  business: string;
  phone: string;
  email: string;
  license: string;
  message: string;
}

const inquiryTypes = [
  "Dealer Price Bulk Enquiry",
  "New Pharmacy / Clinic Setup",
  "Cold-Chain Vaccine / Insulin Order",
  "30-Day Credit Onboarding",
];

export default function ContactPage() {
  const [selectedType, setSelectedType] = useState(inquiryTypes[0]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Wholesale bulk enquiry submitted!", {
      description: `${selectedType} — Our Pan Bazaar desk will share your PTR quote shortly.`,
    });
    reset();
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB]">
      <Navbar />

      <div className="bg-gradient-to-r from-[#1B3B6F] to-[#1D4ED8] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-xs font-bold uppercase tracking-wider text-[#FDE047] mb-2">
            DEALER PRICE BULK ENQUIRY &amp; ONBOARDING
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Request Wholesale PTR Quote or Open Partner Account
          </h1>
          <p className="text-sm sm:text-base text-blue-100 mt-1.5 max-w-2xl">
            Connect directly with our Pan Bazaar central dispatch hub for case-lot pricing, hospital tenders, and new pharmacy setup kits.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <div className="mb-5">
              <div className="text-xs font-bold uppercase text-slate-700 mb-2">
                Select Enquiry Category
              </div>
              <div className="flex flex-wrap gap-2">
                {inquiryTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`category-tab text-xs ${
                      selectedType === type ? "active" : ""
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    {...register("name", { required: true })}
                    className="input-modern"
                    placeholder="Proprietor / Purchase Manager"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Pharmacy / Hospital Name *
                  </label>
                  <input
                    {...register("business", { required: true })}
                    className="input-modern"
                    placeholder="e.g. City Medicos, Guwahati"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    {...register("phone", { required: true })}
                    className="input-modern"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className="input-modern"
                    placeholder="orders@pharmacy.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Drug License No. / GSTIN (Optional for Initial Quote)
                </label>
                <input
                  {...register("license")}
                  className="input-modern"
                  placeholder="DL-ASM-... or 18AABCM..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Product List / Bulk Requirement *
                </label>
                <textarea
                  {...register("message", { required: true })}
                  rows={4}
                  className="input-modern"
                  placeholder="Enter molecule names, brands (Dr. Morepen, Cipla, Sun Pharma, Ethicon), and box quantities..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-orange py-3.5 rounded-xl font-bold text-sm inline-flex items-center justify-center gap-2"
              >
                <span>
                  {isSubmitting ? "Submitting Enquiry..." : "Submit Bulk Price Enquiry"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right Contact Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-2xs">
              <h3 className="font-bold text-lg text-slate-900">
                Registered Office &amp; Central Vault
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-[#1D4ED8] shrink-0" />
                  <span>
                    <strong className="text-slate-900 block">
                      Maa Bhagwati Pharmaceuticals
                    </strong>
                    Bishop Plaza, Col. J. Ali Road, Pan Bazaar, Guwahati, Assam
                    781001
                  </span>
                </div>
                <a
                  href="tel:+919876543210"
                  className="flex gap-3 hover:text-[#1D4ED8] font-medium"
                >
                  <Phone className="w-5 h-5 text-[#1D4ED8] shrink-0" />
                  <span>+91 98765 43210 / +91 94354 23754</span>
                </a>
                <a
                  href="mailto:sales@maabhagwatipharma.com"
                  className="flex gap-3 hover:text-[#1D4ED8] font-medium"
                >
                  <Mail className="w-5 h-5 text-[#1D4ED8] shrink-0" />
                  <span>sales@maabhagwatipharma.com</span>
                </a>
                <div className="flex gap-3">
                  <Clock className="w-5 h-5 text-[#1D4ED8] shrink-0" />
                  <span>
                    Mon – Sat: 8:30 AM – 7:30 PM &amp; Sun: 9:00 AM – 1:00 PM
                  </span>
                </div>
              </div>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Stock List on WhatsApp</span>
              </a>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-2.5">
              <div className="font-bold text-sm text-slate-900">
                Why Partner With Maa Bhagwati?
              </div>
              {[
                "100% Genuine Products from 150+ Top Brands",
                "Same-Day 4h Guwahati & Overnight NE Delivery",
                "HSN-Mapped GST Invoice & 30-Day Credit Line",
              ].map((b) => (
                <div key={b} className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
