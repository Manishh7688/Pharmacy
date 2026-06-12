"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection for sticky header animation
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Fixed Header - always visible at top, content scrolls underneath (not scrollable with page) */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white shadow-md border-b border-slate-200' 
            : 'bg-white/95 backdrop-blur-md border-b border-slate-200'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
            {/* Logo with animation */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                animate={{ scale: scrolled ? 0.95 : 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-10 h-10 rounded-xl bg-[#0F766E] flex items-center justify-center"
              >
                <span className="text-white font-bold text-2xl tracking-tighter">MB</span>
              </motion.div>
              <div>
                <div className="font-semibold text-2xl tracking-[-1.5px] text-[#0F172A] group-hover:text-[#0F766E] transition-colors">
                  Maa Bhagwati
                </div>
                <div className="text-[10px] text-[#0F766E] font-medium -mt-1.5 tracking-[1px]">PHARMACEUTICALS</div>
              </div>
            </Link>

            {/* Desktop Navigation with subtle animations */}
            <div className="hidden md:flex items-center gap-9 text-sm font-medium">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="nav-link text-slate-600 hover:text-[#0F172A] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <a 
                href="tel:+919876543210" 
                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#0F172A] transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </a>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/contact" 
                  className="btn-primary px-6 py-2.5 rounded-full text-sm font-semibold"
                >
                  Get Quote
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden p-2 text-slate-700"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu with animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className={`md:hidden border-t overflow-hidden ${scrolled ? 'bg-white' : 'bg-white/95 backdrop-blur-md'}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <div className="px-6 py-6 flex flex-col gap-4 text-base">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="py-1.5 text-slate-700 active:text-[#0F766E]"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t flex flex-col gap-3">
                  <a href="tel:+919876543210" className="flex items-center gap-2 text-[#0F766E] font-medium">
                    <Phone className="w-4 h-4" /> +91 98765 43210
                  </a>
                  <motion.div whileTap={{ scale: 0.97 }}>
                    <Link 
                      href="/contact" 
                      onClick={() => setIsOpen(false)}
                      className="btn-primary text-center py-3 rounded-full font-semibold block"
                    >
                      Request a Quote
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer div - pushes page content down so it doesn't hide under the fixed header */}
      <div className={`transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`} />
    </>
  );
}
