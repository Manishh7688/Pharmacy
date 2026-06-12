"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ShieldCheck, Truck, Award, Users, ArrowRight, 
  CheckCircle, Star 
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const stats = [
  { number: "10+", label: "Years of Excellence" },
  { number: "5,000+", label: "Products in Stock" },
  { number: "250+", label: "Happy Clients" },
  { number: "8", label: "States Served" },
];

const whyUs = [
  {
    icon: ShieldCheck,
    title: "100% Genuine Products",
    desc: "Sourced directly from leading manufacturers & authorized distributors with full batch traceability.",
  },
  {
    icon: Truck,
    title: "Reliable Cold Chain Logistics",
    desc: "Temperature-controlled delivery across Northeast India ensuring product integrity.",
  },
  {
    icon: Award,
    title: "Licensed & Certified",
    desc: "Valid Drug License, GST, ISO 9001:2015 certified wholesaler based in Guwahati.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    desc: "Experienced team providing personalized service, credit facilities & timely updates.",
  },
];

const featuredProducts = [
  { name: "Antibiotics Range", category: "Prescription", count: "850+" },
  { name: "Cardiovascular", category: "Chronic Care", count: "620+" },
  { name: "Analgesics & Anti-inflammatory", category: "Pain Management", count: "480+" },
  { name: "Anti-Diabetic", category: "Chronic Care", count: "310+" },
  { name: "Gastrointestinal", category: "Prescription", count: "290+" },
  { name: "OTC & Nutraceuticals", category: "Consumer", count: "1,200+" },
];

const testimonials = [
  {
    name: "Ramesh Agarwal",
    role: "Owner, City Medicos, Guwahati",
    quote: "Maa Bhagwati has been our most reliable wholesaler for the last 6 years. Excellent stock availability and very competitive pricing.",
    rating: 5,
  },
  {
    name: "Dr. Anjali Sharma",
    role: "Director, Care Hospital, Silchar",
    quote: "Their cold chain management is outstanding. We never worry about the quality of temperature-sensitive injectables they supply.",
    rating: 5,
  },
  {
    name: "Pranab Jyoti Das",
    role: "Proprietor, Health Point Pharmacy, Dibrugarh",
    quote: "Prompt delivery even in remote areas of Upper Assam. The team is extremely responsive and professional.",
    rating: 5,
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero-bg text-white pt-20 pb-24 md:pt-24 md:pb-28">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-white/10 text-sm font-medium tracking-wider">
            ESTABLISHED 2015 • GUWAHATI, ASSAM
          </div>
          
          <h1 className="hero-title text-5xl md:text-7xl font-semibold tracking-[-3.2px] leading-[0.96] mb-6">
            Trusted Pharmaceutical<br />Wholesaler in Guwahati
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl md:text-2xl text-white/80 tracking-tight mb-10">
            Quality medicines. Reliable delivery. Competitive prices.<br className="hidden md:block" /> 
            Serving pharmacies, hospitals &amp; clinics across Northeast India.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="btn-primary px-10 py-4 rounded-2xl font-semibold text-lg inline-flex items-center justify-center gap-3">
              Explore Our Products <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="btn-secondary px-9 py-4 rounded-2xl font-semibold text-lg border-white/70 text-white hover:bg-white hover:text-[#0F172A]">
              Request a Quote
            </Link>
          </div>

          <div className="mt-8 text-xs tracking-widest text-white/50">DRUG LICENSED • GST REGISTERED • ISO CERTIFIED</div>
        </div>
      </section>

      {/* TRUST BAR / STATS */}
      <section className="border-b border-slate-200 bg-white py-7">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-semibold tracking-tighter text-[#0F172A] stat-number">{stat.number}</div>
                <div className="text-sm text-slate-500 mt-1 font-medium tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center mb-12">
          <div className="uppercase tracking-[2px] text-xs font-semibold text-[#0F766E] mb-3">THE MAA BHAGWATI DIFFERENCE</div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-1.6px]">Why Leading Healthcare Providers<br />Choose Us</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUs.map((item, index) => (
            <div key={index} className="modern-card bg-white p-8 rounded-3xl">
              <div className="w-12 h-12 rounded-2xl bg-[#0F766E]/10 flex items-center justify-center mb-6">
                <item.icon className="w-6 h-6 text-[#0F766E]" />
              </div>
              <h3 className="font-semibold text-2xl tracking-tight mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed text-[15px]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS PREVIEW */}
      <section className="bg-[#f8fafc] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="text-[#0F766E] font-semibold tracking-widest text-xs">OUR RANGE</div>
              <h2 className="text-4xl tracking-[-1.8px] font-semibold mt-1">Extensive Product Portfolio</h2>
            </div>
            <Link href="/products" className="mt-4 md:mt-0 inline-flex items-center gap-2 text-[#0F766E] font-semibold group">
              View complete catalogue <ArrowRight className="group-hover:translate-x-0.5 transition" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredProducts.map((product, idx) => (
              <Link 
                key={idx} 
                href="/products" 
                className="product-card group bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between hover:border-[#0F766E]/40"
              >
                <div>
                  <div className="text-xs font-semibold text-[#0F766E] tracking-[1px]">{product.category}</div>
                  <div className="text-2xl font-semibold tracking-tight mt-3 group-hover:text-[#0F766E] transition-colors">{product.name}</div>
                </div>
                <div className="mt-8 flex items-baseline justify-between">
                  <div>
                    <span className="text-4xl font-semibold tabular-nums tracking-[-1.5px]">{product.count}</span>
                    <span className="text-sm text-slate-500 ml-1">SKUs</span>
                  </div>
                  <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-[#0F766E] transition" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="text-[#0F766E] uppercase tracking-[2px] text-xs font-semibold mb-2">TRUSTED BY HEALTHCARE PROFESSIONALS</div>
          <h2 className="text-4xl tracking-[-1.5px] font-semibold">What Our Clients Say</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div key={index} className="testimonial modern-card bg-white p-8 rounded-3xl border border-slate-100">
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#0F766E] text-[#0F766E]" />
                ))}
              </div>
              <p className="text-[15px] leading-relaxed text-slate-600">“{t.quote}”</p>
              <div className="mt-7">
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-slate-500">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#0F172A] text-white py-16">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-4xl font-semibold tracking-[-1.2px]">Ready to partner with a reliable wholesaler?</h2>
          <p className="mt-4 text-lg text-white/70">Get in touch today for competitive pricing, bulk orders, and consistent supply.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-9">
            <Link href="/contact" className="btn-primary px-9 py-4 rounded-2xl text-lg font-semibold inline-flex justify-center items-center gap-3">
              Contact Sales Team
            </Link>
            <a href="tel:+919876543210" className="px-9 py-4 rounded-2xl border border-white/30 text-white hover:bg-white/10 font-semibold text-lg flex justify-center items-center">
              Call Now: +91 98765 43210
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
