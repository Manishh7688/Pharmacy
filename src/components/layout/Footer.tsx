"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Star } from "lucide-react";
import BrandLogo from "@/components/common/BrandLogo";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-12 pb-24 md:pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Dentalkart-Style Stats & App/Connect Strip */}
        <div className="bg-[#1B3B6F] rounded-2xl p-6 sm:p-8 mb-12 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#FDE047]">
              STAY CONNECTED • NORTHEAST B2B PHARMACY NETWORK
            </div>
            <h3 className="text-xl sm:text-3xl font-bold">
              Serving 250+ Pharmacies &amp; Hospitals Across 8 States
            </h3>
            <p className="text-xs sm:text-sm text-blue-100">
              Download our daily PTR rate sheet or send your prescription/stock list on WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-center">
              <div className="text-lg sm:text-xl font-bold text-[#FDE047]">5,240+</div>
              <div className="text-[11px] text-blue-100">Active SKUs</div>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-center">
              <div className="text-lg sm:text-xl font-bold text-white flex items-center justify-center gap-1">
                4.8 <Star className="w-4 h-4 fill-[#FDE047] text-[#FDE047]" />
              </div>
              <div className="text-[11px] text-blue-100">Average Rating</div>
            </div>
            <Link
              href="/contact"
              className="btn-orange px-5 py-3 rounded-xl text-xs sm:text-sm font-bold"
            >
              Dealer Price Bulk Enquiry
            </Link>
          </div>
        </div>

        {/* 5-Column Dentalkart Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800 text-sm">
          {/* Col 1: Brand & About */}
          <div className="lg:col-span-3 space-y-3">
            <BrandLogo variant="dark" showInstaBadge={false} size="md" />
            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              Northeast India’s leading B2B pharmaceutical wholesaler and cold-chain distributor. Supplying 100% genuine medicines, surgical sutures, and hospital consumables since 2015.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-semibold text-[#38BDF8]">
                ISO 9001:2015
              </span>
              <span className="px-2.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-semibold text-slate-300">
                GST VERIFIED
              </span>
            </div>
          </div>

          {/* Col 2: ABOUT & QUICK LINKS */}
          <div className="lg:col-span-2 space-y-2.5">
            <div className="font-bold text-white text-xs tracking-wider uppercase mb-3">
              ABOUT
            </div>
            <ul className="space-y-2 text-slate-400 text-xs sm:text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Cold-Chain Logistics
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  Wholesale FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: DEALERSHIP & BULK */}
          <div className="lg:col-span-3 space-y-2.5">
            <div className="font-bold text-white text-xs tracking-wider uppercase mb-3">
              DEALERSHIP &amp; BULK
            </div>
            <ul className="space-y-2 text-slate-400 text-xs sm:text-sm">
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Dealer Price Bulk Enquiry
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  New Pharmacy / Clinic Setup
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition">
                  Freebies &amp; 10+1 Schemes
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="hover:text-white transition">
                  Apply for 30-Day Credit Line
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: REGISTERED OFFICE ADDRESS */}
          <div className="lg:col-span-4 space-y-3">
            <div className="font-bold text-white text-xs tracking-wider uppercase mb-3">
              REGISTERED OFFICE ADDRESS
            </div>
            <div className="space-y-2.5 text-slate-400 text-xs sm:text-sm">
              <div className="flex gap-2.5">
                <MapPin className="w-4 h-4 text-[#38BDF8] shrink-0 mt-1" />
                <span>
                  <strong className="text-white">
                    MAA BHAGWATI PHARMACEUTICALS
                  </strong>
                  <br />
                  Bishop Plaza, Col. J. Ali Road, Pan Bazaar, Guwahati, Assam —
                  781001
                </span>
              </div>
              <a
                href="tel:+919876543210"
                className="flex gap-2.5 hover:text-white transition"
              >
                <Phone className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <span>+91-98765-43210 / +91-94354-23754</span>
              </a>
              <a
                href="mailto:sales@maabhagwatipharma.com"
                className="flex gap-2.5 hover:text-white transition"
              >
                <Mail className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <span>sales@maabhagwatipharma.com</span>
              </a>
              <div className="flex gap-2.5">
                <Clock className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <span>
                  Mon–Sat: 8:30 AM – 7:30 PM &amp; Sun: 9:00 AM – 1:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Partners & Copyright (Dentalkart Bottom Bar) */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2015–{new Date().getFullYear()}, MAA BHAGWATI PHARMACEUTICALS •
            Crafted with love in India
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-slate-500 mr-1">Our Payment Partners:</span>
            {["GPay", "Paytm", "RuPay", "PhonePe", "Visa", "MasterCard", "NEFT/RTGS"].map(
              (pm) => (
                <span
                  key={pm}
                  className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-[11px]"
                >
                  {pm}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
