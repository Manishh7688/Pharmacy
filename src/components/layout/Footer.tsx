"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white/90 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#14B8A6] flex items-center justify-center">
                <span className="text-white font-bold text-xl tracking-tighter">MB</span>
              </div>
              <div className="font-semibold text-2xl tracking-[-1px] text-white">Maa Bhagwati Pharmaceuticals</div>
            </div>
            <p className="max-w-md text-white/70 text-[15px] leading-relaxed">
              A trusted pharmaceutical wholesaler and distributor serving pharmacies, hospitals, and clinics across 
              Guwahati and Northeast India with quality medicines since 2015.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm">
              <div className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium tracking-wider">EST. 2015</div>
              <div className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium tracking-wider">ISO 9001:2015</div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="font-semibold text-white mb-4 tracking-wide text-sm">QUICK LINKS</div>
            <div className="space-y-[9px] text-sm">
              {[
                { href: "/about", label: "About Us" },
                { href: "/products", label: "Our Products" },
                { href: "/services", label: "Services" },
                { href: "/faq", label: "FAQs" },
                { href: "/contact", label: "Contact Us" },
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ x: 4 }} 
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link href={item.href} className="block hover:text-[#14B8A6] transition-colors">
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="font-semibold text-white mb-4 tracking-wide text-sm">CONTACT US</div>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 mt-1 shrink-0 text-[#14B8A6]" />
                <div>
                  Bishop Plaza, Col. J. Ali Road<br />
                  Pan Bazaar, Guwahati, Assam 781001
                </div>
              </div>
              <a href="tel:+919876543210" className="flex gap-3 hover:text-[#14B8A6] transition-colors">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-[#14B8A6]" />
                +91 98765 43210<br />+91 94354 23754
              </a>
              <a href="mailto:sales@maabhagwatipharma.com" className="flex gap-3 hover:text-[#14B8A6] transition-colors">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-[#14B8A6]" />
                sales@maabhagwatipharma.com
              </a>
              <div className="flex gap-3 pt-1">
                <Clock className="w-4 h-4 mt-0.5 shrink-0 text-[#14B8A6]" />
                <div>
                  Mon – Sat: 8:30 AM – 7:30 PM<br />
                  Sunday: 9:00 AM – 1:00 PM
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="font-semibold text-white mb-3 tracking-wide text-sm">FOLLOW US</div>
              <div className="flex items-center gap-3">
                {/* Facebook */}
                <motion.a
                  href="https://facebook.com/maabhagwatipharma"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-[#14B8A6] hover:text-white transition-all duration-200"
                  aria-label="Facebook"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </motion.a>

                {/* Instagram */}
                <motion.a
                  href="https://instagram.com/maabhagwatipharma"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-[#14B8A6] hover:text-white transition-all duration-200"
                  aria-label="Instagram"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                  href="https://linkedin.com/company/maa-bhagwati-pharmaceuticals"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-[#14B8A6] hover:text-white transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.064 0-1.14.92-2.064 2.063-2.064 1.14 0 2.064.925 2.064 2.064 0 1.139-.925 2.064-2.064 2.064zM6.948 20.452H3.722V9h3.226v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </motion.a>

                {/* X (Twitter) */}
                <motion.a
                  href="https://x.com/maabhagwatipharma"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-[#14B8A6] hover:text-white transition-all duration-200"
                  aria-label="X (Twitter)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25l-7.451 8.52L4.5 2.25H1.5l6.9 7.9L1.5 21.75h3l6.3-7.2 5.4 7.2h3l-7.2-8.25 6.75-7.5h-3z" />
                  </svg>
                </motion.a>

                {/* YouTube */}
                <motion.a
                  href="https://youtube.com/@maabhagwatipharma"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-[#14B8A6] hover:text-white transition-all duration-200"
                  aria-label="YouTube"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </motion.a>
              </div>
            </div>

            <div className="text-sm text-white/70">
              Business inquiries: <a href="mailto:sales@maabhagwatipharma.com" className="hover:text-[#14B8A6] underline">sales@maabhagwatipharma.com</a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <div>© {new Date().getFullYear()} Maa Bhagwati Pharmaceuticals. All rights reserved.</div>
          <div className="flex gap-5">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
