import { useState } from 'react';

const reportCategories = [
  {
    category: '🏨 Hotel Reports',
    reports: [
      { name: 'Daily Occupancy Report', type: 'Script Report', description: 'Shows room-wise occupancy, ADR, RevPAR for any date range with comparison.', columns: ['Room Number', 'Room Type', 'Guest Name', 'Check-in', 'Check-out', 'Nights', 'Rate', 'Revenue'] },
      { name: 'Arrival & Departure List', type: 'Script Report', description: 'List of all expected arrivals and departures for a selected date with guest details.', columns: ['Booking Ref', 'Guest', 'Room', 'ETA/ETD', 'Nights', 'Status', 'Special Requests'] },
      { name: 'In-House Guest List', type: 'Query Report', description: 'Real-time list of all currently checked-in guests with room and folio details.', columns: ['Room', 'Guest Name', 'Check-in Date', 'Nights', 'Balance Due', 'Rate Plan'] },
      { name: 'Night Audit Summary', type: 'Script Report', description: 'Automated nightly report with room charges posted, payments received, and closing balance.', columns: ['Department', 'Opening Balance', 'Charges', 'Payments', 'Closing Balance'] },
      { name: 'Revenue by Room Type', type: 'Script Report', description: 'Revenue breakdown by room category for revenue management decisions.', columns: ['Room Type', 'Rooms Available', 'Rooms Sold', 'ADR', 'RevPAR', 'Total Revenue'] },
      { name: 'Housekeeping Status Report', type: 'Query Report', description: 'Real-time room cleanliness status for housekeeping supervisor.', columns: ['Room', 'Floor', 'Status', 'Assigned To', 'Last Updated', 'Priority'] },
    ],
  },
  {
    category: '🍽️ F&B Reports',
    reports: [
      { name: 'Daily F&B Sales Report', type: 'Script Report', description: 'Comprehensive sales analysis by outlet, category, and payment mode.', columns: ['Outlet', 'Category', 'Items Sold', 'Revenue', 'Discount', 'Net Revenue', 'Tax'] },
      { name: 'Food Cost Analysis', type: 'Script Report', description: 'Recipe cost vs. selling price analysis for all menu items with cost percentage.', columns: ['Item', 'Category', 'Selling Price', 'Recipe Cost', 'Cost%', 'Contribution Margin'] },
      { name: 'Menu Engineering Report', type: 'Script Report', description: 'Stars/Plowhorses/Puzzles/Dogs classification for menu optimization.', columns: ['Item', 'Category', 'Popularity', 'Profitability', 'Classification', 'Recommendation'] },
      { name: 'Wastage & Void Report', type: 'Query Report', description: 'Tracks all food items voided or wasted with reasons for loss control.', columns: ['Date', 'Outlet', 'Item', 'Qty', 'Cost', 'Reason', 'Authorized By'] },
    ],
  },
  {
    category: '💆 Spa Reports',
    reports: [
      { name: 'Therapist Performance Report', type: 'Script Report', description: 'Utilization rate, revenue generated, and customer ratings per therapist.', columns: ['Therapist', 'Appointments', 'Hours', 'Revenue', 'Utilization%', 'Avg Rating'] },
      { name: 'Treatment Package Sales', type: 'Query Report', description: 'Sales analysis of all spa packages and individual treatments.', columns: ['Package', 'Type', 'Qty Sold', 'Revenue', 'Redeemed', 'Outstanding'] },
      { name: 'Membership Revenue Report', type: 'Script Report', description: 'Recurring membership revenue tracking with renewal pipeline.', columns: ['Member', 'Plan', 'Start Date', 'End Date', 'Monthly Fee', 'Status', 'Auto-Renew'] },
    ],
  },
  {
    category: '💪 Gym Reports',
    reports: [
      { name: 'Active Members Dashboard', type: 'Script Report', description: 'Total active, expired, and frozen memberships with revenue impact.', columns: ['Plan Type', 'Active', 'Expired', 'Frozen', 'Monthly Revenue', 'At-Risk'] },
      { name: 'Class Attendance Report', type: 'Query Report', description: 'Attendance tracking for all fitness classes with instructor performance.', columns: ['Class', 'Instructor', 'Date', 'Scheduled', 'Attended', 'Attendance%'] },
      { name: 'Membership Expiry Alert', type: 'Script Report', description: 'Members expiring in next 7/15/30 days for proactive renewal campaigns.', columns: ['Member', 'Plan', 'Expiry Date', 'Days Left', 'Contact', 'Action Taken'] },
    ],
  },
  {
    category: '🎪 Events & Finance',
    reports: [
      { name: 'Event Revenue Summary', type: 'Script Report', description: 'Total event revenue by type, venue, and month with profitability analysis.', columns: ['Event', 'Client', 'Date', 'Venue', 'Guests', 'Revenue', 'Cost', 'Profit'] },
      { name: 'City Ledger Report', type: 'Script Report', description: 'Outstanding corporate accounts with aging analysis and collection tracking.', columns: ['Company', 'Invoice', 'Date', 'Amount', '0-30', '31-60', '61-90', '90+'] },
      { name: 'Flash Report (Daily P&L)', type: 'Script Report', description: 'Management daily flash showing all department revenues vs. budget with variance.', columns: ['Department', 'Budget', 'Actual', 'Variance', 'Var%', 'Last Year', 'YoY%'] },
    ],
  },
];

export default function ReportsSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeReport, setActiveReport] = useState(0);

  const currentCategory = reportCategories[activeCategory];
  const currentReport = currentCategory.reports[activeReport];

  return (
    <section id="reports" className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium px-4 py-2 rounded-full mb-4">
            📊 Reports & Analytics
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            45+{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Custom Reports
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Script Reports and Query Reports built with Python/SQL, exposed natively in Frappe with filters, export-to-PDF/Excel, and scheduled email delivery.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {reportCategories.map((cat, i) => (
            <button
              key={i}
              onClick={() => { setActiveCategory(i); setActiveReport(0); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                activeCategory === i
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Report list */}
          <div className="space-y-2">
            {currentCategory.reports.map((rep, i) => (
              <button
                key={i}
                onClick={() => setActiveReport(i)}
                className={`w-full text-left rounded-xl border px-4 py-3 transition-all ${
                  activeReport === i
                    ? 'bg-amber-500/20 border-amber-500/50 text-white'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/8'
                }`}
              >
                <div className="font-medium text-sm">{rep.name}</div>
                <div className={`text-xs mt-0.5 ${activeReport === i ? 'text-amber-300' : 'text-gray-600'}`}>
                  {rep.type}
                </div>
              </button>
            ))}
          </div>

          {/* Report Detail */}
          <div className="lg:col-span-2 bg-gray-900 rounded-2xl border border-white/10 overflow-hidden">
            <div className="px-6 py-4 bg-black/30 border-b border-white/5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg">{currentReport.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">{currentReport.description}</p>
                </div>
                <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-1 rounded-md whitespace-nowrap ml-4">
                  {currentReport.type}
                </span>
              </div>
            </div>

            {/* Preview Table */}
            <div className="p-6">
              <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-3">📋 Report Columns</h4>
              <div className="overflow-x-auto rounded-lg border border-white/10">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-white/5">
                      {currentReport.columns.map((col, ci) => (
                        <th key={ci} className="text-left text-gray-400 font-medium px-4 py-2 whitespace-nowrap border-b border-white/5">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {currentReport.columns.map((_, ci) => (
                        <td key={ci} className="px-4 py-3 text-gray-600 border-b border-white/5">
                          <div className="w-16 h-2 bg-gray-800 rounded animate-pulse" />
                        </td>
                      ))}
                    </tr>
                    <tr>
                      {currentReport.columns.map((_, ci) => (
                        <td key={ci} className="px-4 py-3 text-gray-600 border-b border-white/5">
                          <div className="w-12 h-2 bg-gray-800 rounded animate-pulse" />
                        </td>
                      ))}
                    </tr>
                    <tr>
                      {currentReport.columns.map((_, ci) => (
                        <td key={ci} className="px-4 py-3 text-gray-600">
                          <div className="w-20 h-2 bg-gray-800 rounded animate-pulse" />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Python code snippet */}
              <div className="mt-6 bg-gray-950 rounded-xl border border-white/5 overflow-hidden">
                <div className="px-4 py-2 border-b border-white/5 flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-gray-600 text-xs font-mono">
                    {currentReport.name.toLowerCase().replace(/ /g,'_')}.py
                  </span>
                </div>
                <div className="p-4 font-mono text-xs">
                  <div className="text-purple-400">import <span className="text-white">frappe</span></div>
                  <div className="mt-2 text-purple-400">def <span className="text-blue-300">execute</span><span className="text-white">(filters=None):</span></div>
                  <div className="ml-4 text-gray-500">"""Auto-generated report for {currentReport.name}"""</div>
                  <div className="ml-4 text-white">columns = get_columns()</div>
                  <div className="ml-4 text-white">data = get_data(filters)</div>
                  <div className="ml-4 text-purple-400">return <span className="text-white">columns, data</span></div>
                  <div className="mt-2 text-purple-400">def <span className="text-blue-300">get_columns</span><span className="text-white">():</span></div>
                  <div className="ml-4 text-purple-400">return <span className="text-yellow-300">[</span></div>
                  {currentReport.columns.slice(0,3).map((col, i) => (
                    <div key={i} className="ml-8 text-amber-300">"{`{"fieldname": "${col.toLowerCase().replace(/ /g,'_')}", "label": "${col}", "fieldtype": "Data"}`}"</div>
                  ))}
                  <div className="ml-4 text-yellow-300">]</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
