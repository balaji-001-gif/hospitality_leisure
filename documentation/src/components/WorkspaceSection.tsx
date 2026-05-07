const workspaces = [
  {
    name: 'Hotel Front Desk',
    icon: '🏨',
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    description: 'Central hub for front desk operations with live room status, arrivals, departures, and in-house guest management.',
    shortcuts: [
      'New Reservation', 'Check-in Guest', 'Check-out Guest', 'Room Status Board',
      'Guest Folio', 'Night Audit', 'Housekeeping Tasks', 'Maintenance Request',
    ],
    charts: ['Occupancy Rate (Today)', 'Arrivals vs Departures (Weekly)', 'Revenue by Room Type', 'Room Status Pie Chart'],
    reports: ['Daily Occupancy Report', 'Arrival List', 'Departure List', 'In-House Guest List', 'Revenue Summary'],
  },
  {
    name: 'Restaurant Manager',
    icon: '🍽️',
    color: 'from-red-500 to-rose-600',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    description: 'Complete F&B management workspace with live order tracking, KDS, table map, and revenue analytics.',
    shortcuts: [
      'New Food Order', 'Table Map View', 'Kitchen Display', 'Menu Management',
      'Daily Cash Closing', 'Inventory Check', 'Staff Attendance', 'POS Session',
    ],
    charts: ['Sales by Item Category', 'Hourly Revenue', 'Table Turnover Rate', 'Top 10 Menu Items'],
    reports: ['Daily Sales Report', 'Food Cost Analysis', 'Wastage Report', 'Menu Engineering Report', 'Staff Performance'],
  },
  {
    name: 'Spa & Wellness Hub',
    icon: '💆',
    color: 'from-purple-500 to-violet-600',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    description: 'Spa appointment management with therapist calendar, treatment tracking, and membership management.',
    shortcuts: [
      'New Appointment', 'Therapist Schedule', 'Treatment Packages', 'Client History',
      'Gift Vouchers', 'Membership Cards', 'Retail Sales', 'Room Availability',
    ],
    charts: ['Daily Appointments', 'Revenue by Treatment', 'Therapist Utilization', 'Membership Growth'],
    reports: ['Appointment Schedule', 'Therapist Performance', 'Package Sales Report', 'Retail Sales Report'],
  },
  {
    name: 'Gym & Fitness Center',
    icon: '💪',
    color: 'from-green-500 to-emerald-600',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    description: 'Comprehensive gym management with member tracking, class schedules, trainer assignments, and equipment logs.',
    shortcuts: [
      'New Member', 'Class Schedule', 'Personal Training', 'Locker Assignment',
      'Equipment Log', 'Attendance Check', 'Renewal Alerts', 'Body Progress',
    ],
    charts: ['Active Members Trend', 'Class Attendance', 'Revenue by Plan', 'Equipment Utilization'],
    reports: ['Membership Status Report', 'Class Attendance Report', 'Expiry Alert List', 'Revenue by Membership Plan'],
  },
  {
    name: 'Events & Banquet Control',
    icon: '🎪',
    color: 'from-blue-500 to-cyan-600',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    description: 'Full event lifecycle management from inquiry to post-event reporting with catering, AV, and staffing coordination.',
    shortcuts: [
      'New Event Booking', 'Venue Calendar', 'Catering Order', 'AV Equipment',
      'Staff Assignment', 'Client Contract', 'Payment Tracking', 'Event Checklist',
    ],
    charts: ['Events This Month', 'Revenue by Event Type', 'Venue Utilization', 'Booking Pipeline'],
    reports: ['Event Schedule', 'Catering Cost Report', 'Venue Occupancy Report', 'Pending Payments'],
  },
  {
    name: 'Revenue & Finance Hub',
    icon: '💰',
    color: 'from-yellow-500 to-amber-600',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    description: 'Unified financial dashboard aggregating all revenue streams, city ledger, outstanding accounts, and budget tracking.',
    shortcuts: [
      'Daily Flash Report', 'City Ledger', 'Outstanding Invoices', 'Rate Management',
      'Budget Analysis', 'Night Audit', 'Accounts Reconciliation', 'Tax Reports',
    ],
    charts: ['Total Revenue by Department', 'Monthly P&L', 'Outstanding AR Aging', 'Budget vs Actual'],
    reports: ['Flash Report', 'Revenue by Source', 'City Ledger Summary', 'Tax Liability Report', 'Budget Variance'],
  },
];

export default function WorkspaceSection() {
  return (
    <section id="workspaces" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium px-4 py-2 rounded-full mb-4">
            🖥️ ERPNext Workspaces
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Purpose-Built{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Workspaces
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Six dedicated workspaces with role-based access, custom dashboards, quick action shortcuts, and embedded reports — all defined in JSON for version control.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workspaces.map((ws, i) => (
            <div key={i} className={`rounded-2xl border ${ws.border} ${ws.bg} overflow-hidden group hover:scale-[1.02] transition-transform duration-200`}>
              {/* Header */}
              <div className={`bg-gradient-to-r ${ws.color} px-6 py-4`}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{ws.icon}</span>
                  <div>
                    <h3 className="text-white font-bold text-lg">{ws.name}</h3>
                    <p className="text-white/70 text-xs">ERPNext Workspace (JSON)</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">{ws.description}</p>

                {/* Quick Actions */}
                <div className="mb-5">
                  <h4 className="text-gray-300 font-semibold text-xs uppercase tracking-wider mb-2">⚡ Quick Actions</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {ws.shortcuts.map((s) => (
                      <span key={s} className="bg-white/5 border border-white/10 text-gray-400 text-xs px-2 py-1 rounded-md">{s}</span>
                    ))}
                  </div>
                </div>

                {/* Charts */}
                <div className="mb-5">
                  <h4 className="text-gray-300 font-semibold text-xs uppercase tracking-wider mb-2">📊 Dashboard Charts</h4>
                  <ul className="space-y-1">
                    {ws.charts.map((c) => (
                      <li key={c} className="text-gray-500 text-xs flex items-center gap-1.5">
                        <span className="text-amber-500">▸</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Reports */}
                <div>
                  <h4 className="text-gray-300 font-semibold text-xs uppercase tracking-wider mb-2">📋 Embedded Reports</h4>
                  <ul className="space-y-1">
                    {ws.reports.map((r) => (
                      <li key={r} className="text-gray-500 text-xs flex items-center gap-1.5">
                        <span className="text-blue-400">▸</span> {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Workspace JSON snippet */}
        <div className="mt-16 bg-gray-950 rounded-2xl border border-white/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-gray-400 text-sm font-mono">hospitality_leisure/workspace/hotel_front_desk/hotel_front_desk.json</span>
          </div>
          <div className="p-6 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-400 leading-relaxed whitespace-pre">{`{
  "doctype": "Workspace",
  "name": "Hotel Front Desk",
  "module": "Hospitality Leisure",
  "category": "Modules",
  "icon": "hotel",
  "label": "Hotel Front Desk",
  "public": 1,
  "roles": [
    {"role": "Front Desk Manager"},
    {"role": "Receptionist"},
    {"role": "Hotel Manager"}
  ],
  "shortcuts": [
    {"label": "New Reservation", "link_to": "Reservation", "type": "DocType"},
    {"label": "Check-in Guest", "link_to": "checkin_guest", "type": "Page"},
    {"label": "Room Status Board", "link_to": "room_status", "type": "Page"},
    {"label": "Night Audit", "link_to": "night_audit", "type": "Report"}
  ],
  "charts": [
    {"chart_name": "Today Occupancy Rate", "col": 12},
    {"chart_name": "Arrivals vs Departures", "col": 12}
  ],
  "content": "[{...cards and sections...}]"
}`}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}
