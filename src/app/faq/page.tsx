"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "What areas do you deliver to?", a: "We deliver across Assam and all Northeast states from our Guwahati warehouse." },
  { q: "What is the minimum order value?", a: "No strict minimum. Recommended starting order ₹15,000+ for best rates and free local delivery." },
  { q: "Do you provide credit facilities?", a: "Yes, monthly credit is available for verified pharmacies and hospitals after documentation." },
  { q: "How do you ensure medicine quality?", a: "All stock is sourced from authorized distributors. We maintain proper storage and provide full batch traceability." },
  { q: "Do you handle cold chain products?", a: "Yes. We have dedicated validated cold chain logistics with temperature monitoring for vaccines and insulins." },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-14">
        <div className="text-center mb-10">
          <div className="text-[#0F766E] text-xs tracking-[3px] font-semibold">HELP CENTER</div>
          <h1 className="text-5xl font-semibold tracking-[-1.8px] mt-2">Frequently Asked Questions</h1>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="border border-slate-200 rounded-2xl bg-white overflow-hidden">
                <button onClick={() => toggle(index)} className="w-full flex justify-between items-center px-7 py-5 text-left font-medium text-lg">
                  {faq.q}
                  {isOpen ? <Minus className="w-5 h-5 text-[#0F766E]" /> : <Plus className="w-5 h-5 text-[#0F766E]" />}
                </button>
                {isOpen && <div className="px-7 pb-7 text-slate-600 leading-relaxed">{faq.a}</div>}
              </div>
            );
          })}
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Footer />
    </>
  );
}
