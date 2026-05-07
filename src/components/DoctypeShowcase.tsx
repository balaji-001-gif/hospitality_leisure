import { useState } from 'react';

const doctypeGroups = [
  {
    group: '🏨 Property Management',
    color: 'text-amber-400',
    border: 'border-amber-500/30',
    doctypes: [
      {
        name: 'Property',
        fields: [
          { fieldname: 'property_name', label: 'Property Name', fieldtype: 'Data', reqd: true },
          { fieldname: 'property_type', label: 'Property Type', fieldtype: 'Select', options: 'Hotel\nResort\nBoutique Hotel\nApartment Hotel' },
          { fieldname: 'star_rating', label: 'Star Rating', fieldtype: 'Int' },
          { fieldname: 'total_rooms', label: 'Total Rooms', fieldtype: 'Int' },
          { fieldname: 'address', label: 'Address', fieldtype: 'Text' },
          { fieldname: 'currency', label: 'Default Currency', fieldtype: 'Link', options: 'Currency' },
          { fieldname: 'check_in_time', label: 'Check-in Time', fieldtype: 'Time' },
          { fieldname: 'check_out_time', label: 'Check-out Time', fieldtype: 'Time' },
        ],
      },
      {
        name: 'Room',
        fields: [
          { fieldname: 'room_number', label: 'Room Number', fieldtype: 'Data', reqd: true },
          { fieldname: 'property', label: 'Property', fieldtype: 'Link', options: 'Property' },
          { fieldname: 'room_type', label: 'Room Type', fieldtype: 'Link', options: 'Room Type' },
          { fieldname: 'floor', label: 'Floor', fieldtype: 'Int' },
          { fieldname: 'status', label: 'Status', fieldtype: 'Select', options: 'Available\nOccupied\nDirty\nOut of Order\nInspected' },
          { fieldname: 'base_rate', label: 'Base Rate', fieldtype: 'Currency' },
          { fieldname: 'max_occupancy', label: 'Max Occupancy', fieldtype: 'Int' },
          { fieldname: 'amenities', label: 'Amenities', fieldtype: 'Table', options: 'Room Amenity' },
        ],
      },
      {
        name: 'Reservation',
        fields: [
          { fieldname: 'naming_series', label: 'Series', fieldtype: 'Select', options: 'RES-.YYYY.-' },
          { fieldname: 'guest', label: 'Guest', fieldtype: 'Link', options: 'Guest Profile', reqd: true },
          { fieldname: 'room', label: 'Room', fieldtype: 'Link', options: 'Room', reqd: true },
          { fieldname: 'check_in_date', label: 'Check-in Date', fieldtype: 'Date', reqd: true },
          { fieldname: 'check_out_date', label: 'Check-out Date', fieldtype: 'Date', reqd: true },
          { fieldname: 'adults', label: 'Adults', fieldtype: 'Int' },
          { fieldname: 'children', label: 'Children', fieldtype: 'Int' },
          { fieldname: 'status', label: 'Status', fieldtype: 'Select', options: 'Confirmed\nChecked In\nChecked Out\nCancelled\nNo-Show' },
          { fieldname: 'rate_plan', label: 'Rate Plan', fieldtype: 'Link', options: 'Rate Plan' },
          { fieldname: 'total_amount', label: 'Total Amount', fieldtype: 'Currency', read_only: true },
        ],
      },
      {
        name: 'Guest Folio',
        fields: [
          { fieldname: 'reservation', label: 'Reservation', fieldtype: 'Link', options: 'Reservation' },
          { fieldname: 'guest', label: 'Guest', fieldtype: 'Link', options: 'Guest Profile' },
          { fieldname: 'folio_type', label: 'Folio Type', fieldtype: 'Select', options: 'Personal\nCorporate\nCity Ledger' },
          { fieldname: 'opening_balance', label: 'Opening Balance', fieldtype: 'Currency' },
          { fieldname: 'charges', label: 'Charges', fieldtype: 'Table', options: 'Folio Charge' },
          { fieldname: 'payments', label: 'Payments', fieldtype: 'Table', options: 'Folio Payment' },
          { fieldname: 'balance', label: 'Balance', fieldtype: 'Currency', read_only: true },
          { fieldname: 'status', label: 'Status', fieldtype: 'Select', options: 'Open\nSettled\nTransferred' },
        ],
      },
    ],
  },
  {
    group: '🍽️ Restaurant Management',
    color: 'text-red-400',
    border: 'border-red-500/30',
    doctypes: [
      {
        name: 'Restaurant Table',
        fields: [
          { fieldname: 'table_number', label: 'Table Number', fieldtype: 'Data', reqd: true },
          { fieldname: 'outlet', label: 'Outlet', fieldtype: 'Link', options: 'Restaurant Outlet' },
          { fieldname: 'capacity', label: 'Capacity', fieldtype: 'Int' },
          { fieldname: 'status', label: 'Status', fieldtype: 'Select', options: 'Available\nOccupied\nReserved\nClosed' },
          { fieldname: 'section', label: 'Section', fieldtype: 'Data' },
          { fieldname: 'qr_code', label: 'QR Code', fieldtype: 'Attach Image' },
        ],
      },
      {
        name: 'Food Order',
        fields: [
          { fieldname: 'naming_series', label: 'Series', fieldtype: 'Select', options: 'ORD-.YYYY.-' },
          { fieldname: 'table', label: 'Table', fieldtype: 'Link', options: 'Restaurant Table' },
          { fieldname: 'waiter', label: 'Waiter', fieldtype: 'Link', options: 'Employee' },
          { fieldname: 'order_type', label: 'Order Type', fieldtype: 'Select', options: 'Dine-in\nTakeaway\nDelivery\nRoom Service' },
          { fieldname: 'items', label: 'Items', fieldtype: 'Table', options: 'Food Order Item' },
          { fieldname: 'status', label: 'Status', fieldtype: 'Select', options: 'Ordered\nPreparing\nReady\nServed\nBilled\nCancelled' },
          { fieldname: 'kitchen_notes', label: 'Kitchen Notes', fieldtype: 'Small Text' },
          { fieldname: 'total', label: 'Total', fieldtype: 'Currency', read_only: true },
        ],
      },
      {
        name: 'Menu Item',
        fields: [
          { fieldname: 'item_name', label: 'Item Name', fieldtype: 'Data', reqd: true },
          { fieldname: 'category', label: 'Category', fieldtype: 'Link', options: 'Menu Category' },
          { fieldname: 'outlet', label: 'Outlet', fieldtype: 'Link', options: 'Restaurant Outlet' },
          { fieldname: 'price', label: 'Price', fieldtype: 'Currency', reqd: true },
          { fieldname: 'description', label: 'Description', fieldtype: 'Small Text' },
          { fieldname: 'image', label: 'Image', fieldtype: 'Attach Image' },
          { fieldname: 'is_veg', label: 'Vegetarian', fieldtype: 'Check' },
          { fieldname: 'preparation_time', label: 'Prep Time (mins)', fieldtype: 'Int' },
          { fieldname: 'recipe', label: 'Recipe', fieldtype: 'Link', options: 'Recipe' },
          { fieldname: 'active', label: 'Active', fieldtype: 'Check' },
        ],
      },
    ],
  },
  {
    group: '💆 Spa & Wellness',
    color: 'text-purple-400',
    border: 'border-purple-500/30',
    doctypes: [
      {
        name: 'Spa Appointment',
        fields: [
          { fieldname: 'naming_series', label: 'Series', fieldtype: 'Select', options: 'SPA-.YYYY.-' },
          { fieldname: 'client', label: 'Client', fieldtype: 'Link', options: 'Guest Profile' },
          { fieldname: 'treatment', label: 'Treatment', fieldtype: 'Link', options: 'Treatment Package' },
          { fieldname: 'therapist', label: 'Therapist', fieldtype: 'Link', options: 'Therapist' },
          { fieldname: 'room', label: 'Treatment Room', fieldtype: 'Link', options: 'Spa Room' },
          { fieldname: 'appointment_date', label: 'Appointment Date', fieldtype: 'Date', reqd: true },
          { fieldname: 'start_time', label: 'Start Time', fieldtype: 'Time' },
          { fieldname: 'duration', label: 'Duration (mins)', fieldtype: 'Int' },
          { fieldname: 'status', label: 'Status', fieldtype: 'Select', options: 'Scheduled\nConfirmed\nIn Progress\nCompleted\nCancelled' },
          { fieldname: 'amount', label: 'Amount', fieldtype: 'Currency' },
        ],
      },
    ],
  },
  {
    group: '💪 Gym & Fitness',
    color: 'text-green-400',
    border: 'border-green-500/30',
    doctypes: [
      {
        name: 'Gym Membership',
        fields: [
          { fieldname: 'naming_series', label: 'Series', fieldtype: 'Select', options: 'MEM-.YYYY.-' },
          { fieldname: 'member', label: 'Member', fieldtype: 'Link', options: 'Guest Profile', reqd: true },
          { fieldname: 'plan', label: 'Membership Plan', fieldtype: 'Link', options: 'Membership Plan' },
          { fieldname: 'start_date', label: 'Start Date', fieldtype: 'Date', reqd: true },
          { fieldname: 'end_date', label: 'End Date', fieldtype: 'Date' },
          { fieldname: 'status', label: 'Status', fieldtype: 'Select', options: 'Active\nExpired\nFrozen\nCancelled' },
          { fieldname: 'auto_renew', label: 'Auto Renew', fieldtype: 'Check' },
          { fieldname: 'locker_number', label: 'Locker Number', fieldtype: 'Data' },
          { fieldname: 'monthly_fee', label: 'Monthly Fee', fieldtype: 'Currency' },
        ],
      },
      {
        name: 'Fitness Class',
        fields: [
          { fieldname: 'class_name', label: 'Class Name', fieldtype: 'Data', reqd: true },
          { fieldname: 'instructor', label: 'Instructor', fieldtype: 'Link', options: 'Employee' },
          { fieldname: 'class_type', label: 'Class Type', fieldtype: 'Select', options: 'Yoga\nZumba\nPilates\nCycling\nBoxing\nCrossfit\nSwimming' },
          { fieldname: 'schedule_date', label: 'Schedule Date', fieldtype: 'Date' },
          { fieldname: 'start_time', label: 'Start Time', fieldtype: 'Time' },
          { fieldname: 'max_participants', label: 'Max Participants', fieldtype: 'Int' },
          { fieldname: 'enrolled', label: 'Enrolled', fieldtype: 'Int', read_only: true },
          { fieldname: 'status', label: 'Status', fieldtype: 'Select', options: 'Scheduled\nIn Progress\nCompleted\nCancelled' },
        ],
      },
    ],
  },
  {
    group: '🎪 Events & Banquets',
    color: 'text-blue-400',
    border: 'border-blue-500/30',
    doctypes: [
      {
        name: 'Event Booking',
        fields: [
          { fieldname: 'naming_series', label: 'Series', fieldtype: 'Select', options: 'EVT-.YYYY.-' },
          { fieldname: 'event_name', label: 'Event Name', fieldtype: 'Data', reqd: true },
          { fieldname: 'client', label: 'Client', fieldtype: 'Link', options: 'Customer' },
          { fieldname: 'venue', label: 'Venue', fieldtype: 'Link', options: 'Event Venue' },
          { fieldname: 'event_date', label: 'Event Date', fieldtype: 'Date', reqd: true },
          { fieldname: 'event_type', label: 'Event Type', fieldtype: 'Select', options: 'Wedding\nConference\nBirthday\nCorporate\nGala\nCocktail' },
          { fieldname: 'expected_guests', label: 'Expected Guests', fieldtype: 'Int' },
          { fieldname: 'catering_required', label: 'Catering Required', fieldtype: 'Check' },
          { fieldname: 'av_required', label: 'AV Required', fieldtype: 'Check' },
          { fieldname: 'package', label: 'Event Package', fieldtype: 'Link', options: 'Event Package' },
          { fieldname: 'deposit_amount', label: 'Deposit Amount', fieldtype: 'Currency' },
          { fieldname: 'total_value', label: 'Total Value', fieldtype: 'Currency' },
          { fieldname: 'status', label: 'Status', fieldtype: 'Select', options: 'Inquiry\nProposal\nConfirmed\nCompleted\nCancelled' },
        ],
      },
    ],
  },
];

export default function DoctypeShowcase() {
  const [activeGroup, setActiveGroup] = useState(0);
  const [activeDoctype, setActiveDoctype] = useState(0);

  const currentGroup = doctypeGroups[activeGroup];
  const currentDoctype = currentGroup.doctypes[activeDoctype] || currentGroup.doctypes[0];

  return (
    <section id="doctypes" className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium px-4 py-2 rounded-full mb-4">
            📋 DocType Architecture
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            80+{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Custom DocTypes
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Every DocType is built natively in Frappe Framework with proper naming series, workflows, permissions, and ERPNext integration.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left: Group & DocType selector */}
          <div className="lg:col-span-1 space-y-4">
            {doctypeGroups.map((group, gi) => (
              <div key={gi} className={`rounded-xl border ${group.border} overflow-hidden`}>
                <button
                  onClick={() => { setActiveGroup(gi); setActiveDoctype(0); }}
                  className={`w-full text-left px-4 py-3 font-semibold text-sm transition-colors ${
                    activeGroup === gi ? 'bg-white/10 text-white' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/8'
                  }`}
                >
                  {group.group}
                </button>
                {activeGroup === gi && (
                  <div className="bg-black/20 py-1">
                    {group.doctypes.map((dt, di) => (
                      <button
                        key={di}
                        onClick={() => setActiveDoctype(di)}
                        className={`w-full text-left px-5 py-2 text-xs transition-colors ${
                          activeDoctype === di ? `${currentGroup.color} bg-white/5` : 'text-gray-500 hover:text-gray-300'
                        }`}
                      >
                        → {dt.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: DocType Detail */}
          <div className="lg:col-span-3">
            <div className={`rounded-2xl border ${currentGroup.border} bg-gray-900/50 overflow-hidden`}>
              {/* Header */}
              <div className="px-6 py-4 bg-black/30 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-xl">DocType: {currentDoctype.name}</h3>
                  <p className="text-gray-500 text-sm">Frappe Framework | Module: {currentGroup.group}</p>
                </div>
                <span className={`${currentGroup.color} text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full`}>
                  {currentDoctype.fields.length} fields
                </span>
              </div>

              {/* Field Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left text-gray-500 font-medium px-6 py-3">Field Name</th>
                      <th className="text-left text-gray-500 font-medium px-4 py-3">Label</th>
                      <th className="text-left text-gray-500 font-medium px-4 py-3">Field Type</th>
                      <th className="text-left text-gray-500 font-medium px-4 py-3">Options / Details</th>
                      <th className="text-left text-gray-500 font-medium px-4 py-3">Flags</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentDoctype.fields.map((field, fi) => (
                      <tr key={fi} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                        <td className="px-6 py-3 font-mono text-amber-300 text-xs">{field.fieldname}</td>
                        <td className="px-4 py-3 text-white text-xs">{field.label}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${
                            field.fieldtype === 'Link' ? 'bg-blue-500/20 text-blue-300' :
                            field.fieldtype === 'Currency' ? 'bg-green-500/20 text-green-300' :
                            field.fieldtype === 'Select' ? 'bg-purple-500/20 text-purple-300' :
                            field.fieldtype === 'Table' ? 'bg-orange-500/20 text-orange-300' :
                            field.fieldtype === 'Check' ? 'bg-teal-500/20 text-teal-300' :
                            'bg-gray-500/20 text-gray-300'
                          }`}>
                            {field.fieldtype}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs font-mono">{(field as any).options || '—'}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            {(field as any).reqd && <span className="text-xs bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded">reqd</span>}
                            {(field as any).read_only && <span className="text-xs bg-gray-500/20 text-gray-400 px-1.5 py-0.5 rounded">read_only</span>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* JSON Preview */}
              <div className="px-6 py-4 bg-black/30 border-t border-white/5">
                <p className="text-gray-500 text-xs mb-2">📄 JSON Definition Preview (stored at <span className="text-amber-400">hospitality_leisure/{currentDoctype.name.toLowerCase().replace(/ /g,'_')}/{currentDoctype.name.toLowerCase().replace(/ /g,'_')}.json</span>)</p>
                <div className="bg-gray-950 rounded-lg p-4 font-mono text-xs text-gray-400 overflow-x-auto">
                  <span className="text-blue-400">{'{'}</span><br/>
                  <span className="ml-4 text-green-400">"doctype"</span>: <span className="text-amber-300">"DocType"</span>,<br/>
                  <span className="ml-4 text-green-400">"name"</span>: <span className="text-amber-300">"{currentDoctype.name}"</span>,<br/>
                  <span className="ml-4 text-green-400">"module"</span>: <span className="text-amber-300">"Hospitality Leisure"</span>,<br/>
                  <span className="ml-4 text-green-400">"fields"</span>: <span className="text-blue-400">[{currentDoctype.fields.length} field definitions]</span>,<br/>
                  <span className="ml-4 text-green-400">"permissions"</span>: <span className="text-blue-400">[role-based permissions]</span><br/>
                  <span className="text-blue-400">{'}'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full DocType Count */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'Hotel & Property', count: 18, emoji: '🏨' },
            { label: 'Restaurant & F&B', count: 14, emoji: '🍽️' },
            { label: 'Spa & Wellness', count: 10, emoji: '💆' },
            { label: 'Gym & Fitness', count: 10, emoji: '💪' },
            { label: 'Events & Venues', count: 12, emoji: '🎪' },
            { label: 'Other Leisure', count: 16, emoji: '⚓' },
          ].map((item) => (
            <div key={item.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">{item.emoji}</div>
              <div className="text-2xl font-bold text-amber-400">{item.count}</div>
              <div className="text-gray-500 text-xs mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
