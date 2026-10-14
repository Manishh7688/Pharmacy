export default function DashboardUsersPage() {
  const clients = [
    {
      id: 1,
      name: "City Medicos",
      license: "DL-ASM-KAM-1042",
      phone: "+91 98765 43210",
      location: "Guwahati (781001)",
      creditTier: "30-Day Credit",
      totalOrders: 142,
    },
    {
      id: 2,
      name: "Care Multi-Specialty Hospital",
      license: "DL-ASM-CAC-2089",
      phone: "+91 94351 23456",
      location: "Silchar (788001)",
      creditTier: "Hospital Contract",
      totalOrders: 89,
    },
    {
      id: 3,
      name: "Health Point Pharmacy",
      license: "DL-ASM-DIB-3310",
      phone: "+91 70012 34567",
      location: "Dibrugarh (786001)",
      creditTier: "15-Day Credit",
      totalOrders: 67,
    },
    {
      id: 4,
      name: "Hills Lifecare Medicos",
      license: "DL-MEG-EKH-0912",
      phone: "+91 98630 11223",
      location: "Shillong (793001)",
      creditTier: "30-Day Priority",
      totalOrders: 54,
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
          VERIFIED B2B DEALERS &amp; HOSPITALS
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Partner Pharmacies &amp; Institutions
        </h1>
      </div>

      <div className="dashboard-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-[#F8FAFC] text-xs font-bold text-slate-700 uppercase">
                <th className="p-4">Business Name</th>
                <th className="p-4">Drug License</th>
                <th className="p-4">Pincode / Hub</th>
                <th className="p-4">Credit Tier</th>
                <th className="p-4">Phone</th>
                <th className="p-4 text-right">Total Orders</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
              {clients.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">{c.name}</td>
                  <td className="p-4 font-mono-tech text-xs text-[#1D4ED8]">
                    {c.license}
                  </td>
                  <td className="p-4 text-slate-600">{c.location}</td>
                  <td className="p-4">
                    <span className="dk-badge-bestseller">{c.creditTier}</span>
                  </td>
                  <td className="p-4 text-slate-600">{c.phone}</td>
                  <td className="p-4 text-right font-bold text-[#16A34A]">
                    {c.totalOrders}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
