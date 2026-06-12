export default function DashboardUsersPage() {
  const clients = [
    { id: 1, name: "City Medicos", phone: "98765 43210", location: "Guwahati", totalOrders: 142 },
    { id: 2, name: "Care Hospital", phone: "94351 23456", location: "Silchar", totalOrders: 89 },
    { id: 3, name: "Health Point Pharmacy", phone: "70012 34567", location: "Dibrugarh", totalOrders: 67 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight mb-6">Clients &amp; Users</h1>

      <div className="dashboard-card p-0">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-right">Total Orders</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(c => (
              <tr key={c.id} className="border-b last:border-none">
                <td className="p-4 font-medium">{c.name}</td>
                <td className="p-4">{c.phone}</td>
                <td className="p-4">{c.location}</td>
                <td className="p-4 text-right font-semibold">{c.totalOrders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
