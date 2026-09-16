"use client";

// CSS UI Mockups for Harappa Biosciences (e-commerce) and Lantern360 (workforce)

export function HarappamockUp() {
  return (
    <div className="w-full h-full bg-[#f8f9fa] p-4 font-mono text-xs overflow-hidden select-none">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/6">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-black/8 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-sm bg-black/50" />
          </div>
          <span className="text-black/60 text-[10px] font-semibold tracking-widest uppercase">
            Admin Panel
          </span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-5 h-5 rounded-full bg-black/5 border border-black/8" />
          <div className="w-12 h-5 rounded bg-black/5 border border-black/8" />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { label: "Revenue", val: "₹2.4L", width: "74%" },
          { label: "Orders", val: "384", width: "88%" },
          { label: "Products", val: "156", width: "62%" },
          { label: "Users", val: "1.2K", width: "81%" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white border border-black/6 shadow-xs rounded-lg p-2"
          >
            <div className="text-black/40 text-[8px] mb-1">{s.label}</div>
            <div className="text-black/80 text-sm font-bold">{s.val}</div>
            <div className="w-full h-0.5 mt-1.5 rounded bg-black/5 overflow-hidden">
              <div
                className="h-full rounded bg-black/25"
                style={{ width: s.width }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Orders table */}
      <div className="bg-white border border-black/6 shadow-xs rounded-xl p-3 mb-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-black/50 text-[9px] uppercase tracking-widest font-semibold">
            Recent Orders
          </span>
          <span className="text-black/35 text-[8px]">View all →</span>
        </div>
        <div className="space-y-1.5">
          {[
            { id: "#ORD-891", product: "Biotin 10000mcg", status: "Delivered", price: "₹549" },
            { id: "#ORD-890", product: "Vitamin D3 + K2", status: "Processing", price: "₹799" },
            { id: "#ORD-889", product: "Omega 3 Fish Oil", status: "Shipped", price: "₹649" },
          ].map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between py-1.5 border-b border-black/5 last:border-0"
            >
              <div className="flex gap-2 items-center">
                <span className="text-black/40 text-[8px] w-14">{order.id}</span>
                <span className="text-black/70 text-[9px] font-medium">{order.product}</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[8px] px-1.5 py-0.5 rounded-full border ${
                    order.status === "Delivered"
                      ? "border-black/15 text-black/60 bg-black/[0.03]"
                      : order.status === "Processing"
                      ? "border-black/10 text-black/45 bg-black/[0.02]"
                      : "border-black/12 text-black/50 bg-black/[0.02]"
                  }`}
                >
                  {order.status}
                </span>
                <span className="text-black/80 text-[9px] font-bold">
                  {order.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row: inventory + chart */}
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 bg-white border border-black/6 shadow-xs rounded-xl p-3">
          <span className="text-black/45 text-[8px] uppercase tracking-widest font-semibold">
            Revenue Chart
          </span>
          <div className="flex items-end gap-1 mt-2 h-12">
            {[40, 65, 45, 80, 60, 90, 70, 85, 55, 95, 75, 88].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-black/10 hover:bg-black/25 transition-colors"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
        <div className="bg-white border border-black/6 shadow-xs rounded-xl p-3">
          <span className="text-black/45 text-[8px] uppercase tracking-widest font-semibold block mb-2">
            Inventory
          </span>
          <div className="space-y-1.5">
            {[
              { name: "In Stock", val: "142", pct: 91 },
              { name: "Low Stock", val: "11", pct: 7 },
              { name: "Out", val: "3", pct: 2 },
            ].map((inv) => (
              <div key={inv.name}>
                <div className="flex justify-between mb-0.5">
                  <span className="text-black/45 text-[7px]">{inv.name}</span>
                  <span className="text-black/70 text-[7px] font-medium">{inv.val}</span>
                </div>
                <div className="w-full h-0.5 bg-black/5 rounded overflow-hidden">
                  <div
                    className="h-full bg-black/30 rounded"
                    style={{ width: `${inv.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function LanternMockup() {
  return (
    <div className="w-full h-full bg-[#f8f9fa] p-4 font-mono text-xs overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/6">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-black/8 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-black/50" />
          </div>
          <span className="text-black/60 text-[10px] font-semibold tracking-widest uppercase">
            Lantern360 Dashboard
          </span>
        </div>
        <div className="flex gap-1">
          {["Live", "Today"].map((t) => (
            <span
              key={t}
              className="text-[8px] px-2 py-0.5 rounded border border-black/10 bg-white text-black/50 shadow-2xs"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3 h-[calc(100%-40px)]">
        {/* Left: Employee list */}
        <div className="col-span-2 bg-white border border-black/6 shadow-xs rounded-xl p-3 overflow-hidden">
          <div className="text-black/45 text-[8px] uppercase tracking-widest font-semibold mb-2">
            Employees
          </div>
          <div className="space-y-2">
            {[
              { name: "Rahul S.", status: "Active", dist: "12.3 km" },
              { name: "Priya M.", status: "Active", dist: "8.7 km" },
              { name: "Amit K.", status: "Break", dist: "5.1 km" },
              { name: "Sneha P.", status: "Active", dist: "15.2 km" },
              { name: "Raj T.", status: "Offline", dist: "—" },
            ].map((emp) => (
              <div
                key={emp.name}
                className="flex items-center justify-between py-1 border-b border-black/4 last:border-0"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      emp.status === "Active"
                        ? "bg-black/75"
                        : emp.status === "Break"
                        ? "bg-black/35"
                        : "bg-black/15"
                    }`}
                  />
                  <span className="text-black/70 text-[9px] font-medium">{emp.name}</span>
                </div>
                <span className="text-black/40 text-[8px]">{emp.dist}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Map + stats */}
        <div className="col-span-3 flex flex-col gap-2">
          {/* Map placeholder */}
          <div className="flex-1 bg-white border border-black/6 shadow-xs rounded-xl relative overflow-hidden">
            {/* Grid lines simulating map */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Polyline simulation */}
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 200 120"
                className="opacity-70"
              >
                <polyline
                  points="20,90 45,70 70,50 95,60 120,40 150,55 175,35"
                  fill="none"
                  stroke="rgba(0,0,0,0.35)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="4 2"
                />
                {[[20, 90], [70, 50], [120, 40], [175, 35]].map(([x, y], i) => (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="3"
                    fill="none"
                    stroke="rgba(0,0,0,0.4)"
                    strokeWidth="1"
                  />
                ))}
                <circle cx="175" cy="35" r="4" fill="rgba(0,0,0,0.7)" />
              </svg>
            </div>
            <div className="absolute top-2 left-2 text-[8px] text-black/35 uppercase tracking-widest font-semibold">
              GPS Live Map
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Present", val: "38/45" },
              { label: "On Leave", val: "4" },
              { label: "Tasks Done", val: "127" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white border border-black/6 shadow-xs rounded-xl p-2 text-center"
              >
                <div className="text-black/75 text-sm font-bold">{s.val}</div>
                <div className="text-black/40 text-[7px] mt-0.5 uppercase tracking-wide">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Attendance bar */}
          <div className="bg-white border border-black/6 shadow-xs rounded-xl p-2">
            <div className="flex justify-between mb-1">
              <span className="text-black/40 text-[8px]">Attendance Rate</span>
              <span className="text-black/70 text-[8px] font-bold">84%</span>
            </div>
            <div className="w-full h-1 bg-black/5 rounded overflow-hidden">
              <div className="h-full w-[84%] bg-black/35 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
