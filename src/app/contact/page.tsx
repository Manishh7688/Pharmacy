"use client";

import { useForm } from "react-hook-form";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";

interface FormData {
  name: string;
  business: string;
  phone: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await new Promise(r => setTimeout(r, 800));
    toast.success("Enquiry received!", { description: "Our team will contact you shortly." });
    reset();
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-16">
        <div className="text-center mb-12">
          <div className="text-[#0F766E] text-xs font-bold tracking-[2.5px]">GET IN TOUCH</div>
          <h1 className="text-5xl font-semibold tracking-[-2px] mt-2">Let’s Discuss Your Requirements</h1>
        </div>

        <div className="grid lg:grid-cols-5 gap-9">
          <div className="lg:col-span-3">
            <div className="bg-white border border-slate-200 rounded-3xl p-9">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Full Name *</label>
                    <input {...register("name", { required: true })} className="input-modern" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Business Name *</label>
                    <input {...register("business", { required: true })} className="input-modern" placeholder="Pharmacy name" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Phone *</label>
                    <input {...register("phone", { required: true })} className="input-modern" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Email</label>
                    <input type="email" {...register("email")} className="input-modern" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Message *</label>
                  <textarea {...register("message", { required: true })} rows={5} className="input-modern" placeholder="Your requirements..." />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full btn-primary py-4 rounded-2xl font-semibold">
                  {isSubmitting ? "Sending..." : "Send Enquiry"}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="modern-card bg-white p-8 rounded-3xl">
              <h3 className="font-semibold text-xl mb-6">Office & Warehouse</h3>
              <div className="space-y-5 text-sm">
                <div className="flex gap-4"><MapPin className="w-5 h-5 text-[#0F766E] mt-px" />Bishop Plaza, Pan Bazaar, Guwahati, Assam 781001</div>
                <a href="tel:+919876543210" className="flex gap-4 hover:text-[#0F766E]"><Phone className="w-5 h-5 text-[#0F766E] mt-px" />+91 98765 43210 / +91 94354 23754</a>
                <a href="mailto:sales@maabhagwatipharma.com" className="flex gap-4 hover:text-[#0F766E]"><Mail className="w-5 h-5 text-[#0F766E] mt-px" />sales@maabhagwatipharma.com</a>
                <div className="flex gap-4"><Clock className="w-5 h-5 text-[#0F766E] mt-px" />Mon–Sat 8:30 AM – 7:30 PM</div>
              </div>
            </div>
            <a href="https://wa.me/919876543210" target="_blank" className="block text-center px-6 py-3 bg-[#25D366] text-black rounded-2xl font-semibold">Chat on WhatsApp</a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
