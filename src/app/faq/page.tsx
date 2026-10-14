"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Plus, Minus, MessageCircle, ArrowRight } from "lucide-react";

const faqs = [
  {
    q: "What areas and pincodes do you deliver to across Northeast India?",
    a: "We deliver across all districts of Assam (including same-day 4-hour InstaPharma delivery in Guwahati) and all 8 Northeast states — Meghalaya, Arunachal Pradesh, Nagaland, Manipur, Mizoram, Tripura, and Sikkim.",
  },
  {
    q: "How are PTR/PTS trade prices, margins, and PharmaCoins calculated?",
    a: "Every wholesale box lists its direct Price-to-Retailer (PTR), MRP, and percentage margin. Verified partner pharmacies also earn bonus PharmaCoins and 10+1 or 10+2 free strip schemes on case-lot orders.",
  },
  {
    q: "Do you provide 30-day credit facilities and GST input tax credit invoices?",
    a: "Yes. Every order comes with a computerized HSN-mapped GST tax invoice so you can claim 100% GST input credit. Verified pharmacies and hospitals with valid Drug Licenses are eligible for 15-to-30-day revolving credit.",
  },
  {
    q: "How do you maintain cold-chain custody for vaccines and insulins?",
    a: "Cold-chain items (+2°C to +8°C) are stored in our 24/7 IoT-monitored walk-in cold rooms in Pan Bazaar and dispatched in validated 72-hour gel-pack insulated cold boxes.",
  },
  {
    q: "What documents are needed to open a wholesale dealership account?",
    a: "Simply share your Retail/Hospital Drug License (Form 20/21), GSTIN certificate (if registered), and proprietor PAN/contact details via our Contact page or WhatsApp Order Desk.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="min-h-screen bg-[#F4F7FB]">
      <Navbar />

      <div className="bg-gradient-to-r from-[#1B3B6F] to-[#1D4ED8] text-white py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-xs font-bold uppercase tracking-wider text-[#FDE047] mb-2">
            HELP CENTER &amp; WHOLESALE FAQ
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-blue-100 mt-2">
            Answers on PTR wholesale pricing, GST billing, cold-chain delivery, and credit onboarding.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center gap-4 px-6 py-4 text-left font-bold text-sm sm:text-base text-slate-900 hover:text-[#1D4ED8] transition"
              >
                <span>{faq.q}</span>
                <span className="w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center shrink-0">
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              {isOpen && (
                <div className="px-6 pb-5 pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}

        <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="font-bold text-base text-slate-900">
              Need a custom dealer price quote or new pharmacy starter kit?
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Our Pan Bazaar sales desk responds within 15 minutes during business hours.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/contact"
              className="btn-primary px-5 py-2.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5"
            >
              <span>Dealer Bulk Enquiry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange px-4 py-2.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Desk</span>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
