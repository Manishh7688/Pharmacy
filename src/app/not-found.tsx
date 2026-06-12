import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-7xl font-semibold tracking-tighter text-[#0F172A]">404</h1>
      <p className="mt-4 text-xl text-slate-600">Page not found</p>
      <Link href="/" className="mt-8 btn-primary px-8 py-3 rounded-2xl">Return to Home</Link>
    </div>
  );
}
