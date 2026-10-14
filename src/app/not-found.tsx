import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col justify-between">
      <Navbar />
      <div className="max-w-lg mx-auto text-center px-6 py-20">
        <span className="dk-badge-bestseller">ERROR 404</span>
        <h1 className="text-6xl font-bold tracking-tight text-[#1B3B6F] mt-3">
          404
        </h1>
        <p className="mt-3 text-base text-slate-600">
          The wholesale product or category page you are looking for could not be found.
        </p>
        <Link
          href="/"
          className="mt-6 btn-primary px-6 py-3 rounded-xl inline-flex items-center gap-2 text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Maa Bhagwati Store</span>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
