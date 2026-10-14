export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F4F7FB] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-3 border-[#1D4ED8] border-t-transparent animate-spin" />
        <div className="text-xs font-bold text-[#1B3B6F] uppercase tracking-wider">
          Loading Wholesale Store...
        </div>
      </div>
    </div>
  );
}
