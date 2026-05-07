import { useState } from 'react';

const industries = [
  {
    id: 'hotel',
    emoji: '🏨',
    name: 'Hotels & Resorts',
    color: 'from-amber-500 to-orange-600',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    description: 'Full Property Management System with room reservations, guest folios, housekeeping, night audit, and city ledger.',
    features: [
      'Room Reservation & Tape Chart',
      'Guest Check-in / Check-out',
      'Folio Management & Billing',
      'Housekeeping & Room Status',
      'Night Audit Automation',
      'Minibar & Amenity Inventory',
      'City Ledger & Corporate Billing',
      'Multi-property Management',
    ],
    modules: ['Property Management', 'Front Desk', 'Housekeeping', 'Revenue Management', 'Night Audit'],
  },
  {
    id: 'restaurant',
    emoji: '🍽️',
    name: 'Restaurants & F&B',
    color: 'from-red-500 to-rose-600',
    border: 'border-red-500/30',
    bg: 'bg-red-500/10',
    description: 'End-to-end restaurant management from table orders to kitchen display systems, inventory, and POS integration.',
    features: [
      'Table Management & Reservations',
      'KDS (Kitchen Display System)',
      'POS with ERPNext Integration',
      'Menu Engineering & Costing',
      'Recipe & Ingredient Management',
      'Multi-outlet Support',
      'Takeaway & Delivery Orders',
      'Happy Hour & Promotions',
    ],
    modules: ['Restaurant POS', 'Kitchen Management', 'Menu & Recipe', 'Table Management', 'Delivery'],
  },
  {
    id: 'spa',
    emoji: '💆',
    name: 'Spas & Wellness',
    color: 'from-purple-500 to-violet-600',
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/10',
    description: 'Complete spa management covering bookings, therapist scheduling, treatment packages, and retail product sales.',
    features: [
      'Appointment Booking System',
      'Therapist Roster & Skills',
      'Treatment Package Management',
      'Room & Bay Scheduling',
      'Retail Products & POS',
      'Membership & Loyalty Cards',
      'Gift Voucher Management',
      'Client Profile & History',
    ],
    modules: ['Spa Booking', 'Therapist Management', 'Packages', 'Retail POS', 'Memberships'],
  },
  {
    id: 'gym',
    emoji: '💪',
    name: 'Gyms & Fitness Centers',
    color: 'from-green-500 to-emerald-600',
    border: 'border-green-500/30',
    bg: 'bg-green-500/10',
    description: 'Full gym management with membership tracking, class scheduling, personal training, locker management, and equipment maintenance.',
    features: [
      'Member Enrollment & Billing',
      'Class Scheduling & Booking',
      'Personal Trainer Assignment',
      'Locker & Facility Management',
      'Equipment Maintenance Tracking',
      'Body Composition & Progress',
      'Attendance & Access Control',
      'Auto Membership Renewal',
    ],
    modules: ['Membership Management', 'Class Scheduling', 'Personal Training', 'Equipment', 'Lockers'],
  },
  {
    id: 'events',
    emoji: '🎪',
    name: 'Event Venues & Banquets',
    color: 'from-blue-500 to-cyan-600',
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/10',
    description: 'Comprehensive event planning with venue booking, catering, AV services, staffing, and full event lifecycle management.',
    features: [
      'Venue Availability Calendar',
      'Event Package Creation',
      'Catering Menu & Costing',
      'AV & Equipment Rentals',
      'Event Staff Scheduling',
      'Client Contracts & Deposits',
      'Day-of-Event Coordinator',
      'Post-Event Reporting',
    ],
    modules: ['Venue Management', 'Event Planning', 'Catering', 'Staffing', 'Contracts'],
  },
  {
    id: 'golf',
    emoji: '⛳',
    name: 'Golf Clubs & Country Clubs',
    color: 'from-lime-500 to-green-600',
    border: 'border-lime-500/30',
    bg: 'bg-lime-500/10',
    description: 'Golf course management with tee time booking, caddy assignments, pro shop POS, handicap tracking, and tournament management.',
    features: [
      'Tee Time Booking System',
      'Caddy Assignment & Roster',
      'Golf Cart Fleet Management',
      'Pro Shop Inventory & POS',
      'Handicap Index Tracking',
      'Tournament Management',
      'Lesson Scheduling',
      'Club Membership Tiers',
    ],
    modules: ['Tee Time Management', 'Pro Shop', 'Caddy Management', 'Tournament', 'Course Maintenance'],
  },
  {
    id: 'themepark',
    emoji: '🎢',
    name: 'Theme Parks & Attractions',
    color: 'from-pink-500 to-rose-600',
    border: 'border-pink-500/30',
    bg: 'bg-pink-500/10',
    description: 'Theme park operations with ticketing, ride management, F&B concessions, retail shops, and safety compliance tracking.',
    features: [
      'Online & Gate Ticketing',
      'Ride Maintenance & Safety',
      'Queue Management System',
      'Season Pass Management',
      'Concession Stand POS',
      'Retail Merchandise',
      'Group Booking Packages',
      'Visitor Analytics',
    ],
    modules: ['Ticketing', 'Ride Management', 'Concessions', 'Safety Compliance', 'Group Bookings'],
  },
  {
    id: 'cinema',
    emoji: '🎬',
    name: 'Cinemas & Entertainment',
    color: 'from-yellow-500 to-amber-600',
    border: 'border-yellow-500/30',
    bg: 'bg-yellow-500/10',
    description: 'Cinema management with seat booking, show scheduling, concession POS, loyalty programs, and revenue reporting.',
    features: [
      'Seat Selection & Booking',
      'Show Scheduling & Screens',
      'Concession POS & Combos',
      'Loyalty Points Program',
      'Online Ticket Sales',
      'Bulk Corporate Bookings',
      'Revenue per Screen Reports',
      'Distributor Settlements',
    ],
    modules: ['Show Scheduling', 'Seat Booking', 'Concession POS', 'Loyalty', 'Distributor Reports'],
  },
  {
    id: 'camping',
    emoji: '🏕️',
    name: 'Camping & Glamping',
    color: 'from-teal-500 to-cyan-600',
    border: 'border-teal-500/30',
    bg: 'bg-teal-500/10',
    description: 'Campsite management with pitch/cabin bookings, amenity access, activity scheduling, and nature-based experience packages.',
    features: [
      'Pitch & Cabin Booking',
      'Utility Hook-up Management',
      'Activity & Tour Scheduling',
      'Firewood & Supplies POS',
      'Check-in / Check-out',
      'Seasonal Pricing Rules',
      'Pet Policy Tracking',
      'Environmental Compliance',
    ],
    modules: ['Campsite Booking', 'Activity Management', 'Supplies POS', 'Seasonal Pricing', 'Amenities'],
  },
  {
    id: 'marina',
    emoji: '⚓',
    name: 'Marinas & Boat Clubs',
    color: 'from-sky-500 to-blue-600',
    border: 'border-sky-500/30',
    bg: 'bg-sky-500/10',
    description: 'Full marina management with berth/slip booking, vessel registration, fuel dock, maintenance services, and charter management.',
    features: [
      'Berth & Slip Booking',
      'Vessel Registration & Database',
      'Fuel Dock Management',
      'Launch & Haul-out Scheduling',
      'Boat Maintenance Tracking',
      'Charter & Rental Management',
      'Electricity & Water Metering',
      'Customs & Port Compliance',
    ],
    modules: ['Berth Management', 'Vessel Registry', 'Fuel Dock', 'Marine Services', 'Charters'],
  },
  {
    id: 'cruise',
    emoji: '🚢',
    name: 'Cruise Lines',
    color: 'from-indigo-500 to-blue-600',
    border: 'border-indigo-500/30',
    bg: 'bg-indigo-500/10',
    description: 'Cruise operations management with cabin booking, shore excursions, onboard accounts, passenger manifests, and port compliance.',
    features: [
      'Cabin Booking & Allocation',
      'Passenger Manifest Management',
      'Onboard Account (Folio)',
      'Shore Excursion Booking',
      'Dining & Specialty Restaurant',
      'Spa & Entertainment Booking',
      'Port Customs Compliance',
      'Crew Manning & Scheduling',
    ],
    modules: ['Cabin Management', 'Passenger Accounts', 'Shore Excursions', 'Crew Management', 'Port Operations'],
  },
  {
    id: 'sports',
    emoji: '🏟️',
    name: 'Sports Complexes',
    color: 'from-orange-500 to-red-600',
    border: 'border-orange-500/30',
    bg: 'bg-orange-500/10',
    description: 'Sports facility management covering court/field bookings, leagues, tournaments, coaching, equipment rentals, and spectator ticketing.',
    features: [
      'Court & Field Booking',
      'League & Tournament Management',
      'Coaching Session Scheduling',
      'Equipment Rental & Tracking',
      'Spectator Ticketing',
      'Athlete Performance Records',
      'Referee Scheduling',
      'Facility Maintenance Logs',
    ],
    modules: ['Court Booking', 'League Management', 'Coaching', 'Equipment Rental', 'Spectator Tickets'],
  },
];

export default function IndustriesSection() {
  const [activeIndustry, setActiveIndustry] = useState(industries[0]);

  return (
    <section id="industries" className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium px-4 py-2 rounded-full mb-4">
            🏢 Industries Covered
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            One Platform,{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              All Industries
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The HospitaLeisure ERP covers 12+ hospitality and leisure industries with specialized modules built natively on Frappe Framework v15.
          </p>
        </div>

        {/* Industry Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {industries.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setActiveIndustry(ind)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                activeIndustry.id === ind.id
                  ? `bg-gradient-to-r ${ind.color} text-white border-transparent shadow-lg`
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{ind.emoji}</span>
              <span className="hidden sm:inline">{ind.name}</span>
            </button>
          ))}
        </div>

        {/* Detail Card */}
        <div className={`rounded-3xl border ${activeIndustry.border} ${activeIndustry.bg} p-8 lg:p-12 transition-all duration-300`}>
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className={`text-6xl`}>{activeIndustry.emoji}</div>
                <div>
                  <h3 className="text-3xl font-bold text-white">{activeIndustry.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {activeIndustry.modules.map((mod) => (
                      <span key={mod} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-md">
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">{activeIndustry.description}</p>
              <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${activeIndustry.color} text-white px-5 py-2.5 rounded-lg font-semibold text-sm`}>
                View DocTypes →
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">✅ Key Features</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeIndustry.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-amber-400 mt-0.5">▸</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
