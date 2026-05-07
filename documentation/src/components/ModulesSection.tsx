import { Users, BarChart2, Bell, FileText, CreditCard, Package, Calendar, Wrench, Globe, Shield, Zap } from 'lucide-react';

const modules = [
  {
    icon: <Calendar size={24} />,
    title: 'Reservation & Booking Engine',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    items: ['Online Booking Portal', 'OTA Channel Manager', 'Dynamic Pricing Engine', 'Availability Calendar', 'Group Bookings', 'Waitlist Management'],
  },
  {
    icon: <Users size={24} />,
    title: 'Guest & Member CRM',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    items: ['Guest Profile & History', 'Loyalty Points Engine', 'Membership Tiers', 'Preference Tracking', 'Birthday Automation', 'Communication Log'],
  },
  {
    icon: <CreditCard size={24} />,
    title: 'Billing & POS Integration',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    items: ['ERPNext POS Bridge', 'Guest Folio Posting', 'Split Billing', 'City Ledger', 'Multi-currency', 'Payment Gateway Integration'],
  },
  {
    icon: <Package size={24} />,
    title: 'Inventory & Procurement',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    items: ['Real-time Stock Tracking', 'Minibar Consumption', 'Recipe Costing', 'Supplier Management', 'Purchase Requisitions', 'Wastage Tracking'],
  },
  {
    icon: <Wrench size={24} />,
    title: 'Maintenance & Housekeeping',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    items: ['Room Status Workflow', 'Maintenance Requests', 'Preventive Maintenance', 'Asset Management', 'Inspection Checklists', 'Work Order Tracking'],
  },
  {
    icon: <Users size={24} />,
    title: 'HR & Staff Management',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    items: ['Shift Scheduling', 'Attendance & Biometric', 'Payroll Integration', 'Training Records', 'Tip Distribution', 'Duty Roster Management'],
  },
  {
    icon: <BarChart2 size={24} />,
    title: 'Revenue Management',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    items: ['RevPAR / RevPASH Tracking', 'Occupancy Analytics', 'Rate Parity Monitor', 'Forecasting Engine', 'Budget vs Actual', 'Competitor Rate Analysis'],
  },
  {
    icon: <Bell size={24} />,
    title: 'Notifications & Alerts',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    items: ['Booking Confirmations', 'Check-in Reminders', 'Low Stock Alerts', 'Maintenance Due Alerts', 'Membership Expiry', 'Night Audit Reports'],
  },
  {
    icon: <Globe size={24} />,
    title: 'Online Portals & Booking',
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20',
    items: ['Guest Self-service Portal', 'Online Menu Ordering', 'Spa Booking Page', 'Gym Class Registration', 'Event RSVP Portal', 'Digital Check-in'],
  },
  {
    icon: <FileText size={24} />,
    title: 'Reports & Analytics',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    items: ['Daily Revenue Report', 'Occupancy Dashboard', 'F&B Cost Analysis', 'Staff Performance', 'Guest Satisfaction', 'Flash Report'],
  },
  {
    icon: <Shield size={24} />,
    title: 'Compliance & Security',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    items: ['Guest ID Verification', 'Fire Safety Compliance', 'Health & Safety Records', 'GDPR Data Management', 'Audit Trails', 'Role-based Access'],
  },
  {
    icon: <Zap size={24} />,
    title: 'Automation & Workflows',
    color: 'text-lime-400',
    bg: 'bg-lime-500/10',
    border: 'border-lime-500/20',
    items: ['Night Audit Automation', 'Auto-Invoice Generation', 'Scheduled Reports', 'Email Triggers', 'Approval Workflows', 'Batch Processing'],
  },
];

export default function ModulesSection() {
  return (
    <section id="modules" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium px-4 py-2 rounded-full mb-4">
            ⚙️ Core Modules
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Comprehensive{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Module Suite
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            12 core modules built on Frappe Framework, seamlessly integrated with ERPNext v15's Accounts, Stock, HR, and CRM.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modules.map((mod, i) => (
            <div
              key={i}
              className={`rounded-2xl border ${mod.border} ${mod.bg} p-6 hover:scale-105 transition-transform duration-200`}
            >
              <div className={`${mod.color} mb-4`}>{mod.icon}</div>
              <h3 className="text-white font-semibold mb-3 text-sm">{mod.title}</h3>
              <ul className="space-y-1.5">
                {mod.items.map((item) => (
                  <li key={item} className="text-gray-400 text-xs flex items-center gap-1.5">
                    <span className={`${mod.color} text-xs`}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
