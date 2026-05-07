const notifications = [
  {
    trigger: 'On Reservation Confirmed',
    doctype: 'Reservation',
    event: 'on_submit',
    channel: ['Email', 'SMS'],
    recipients: ['Guest', 'Front Desk'],
    icon: '📩',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    subject: 'Your Reservation at {{ property_name }} is Confirmed!',
    template: 'Dear {{ guest_name }}, your reservation ({{ name }}) for {{ room_type }} from {{ check_in_date }} to {{ check_out_date }} is confirmed. Amount: {{ currency }} {{ total_amount }}.',
  },
  {
    trigger: 'Pre-Arrival Reminder',
    doctype: 'Reservation',
    event: 'Days Before: 1',
    channel: ['Email', 'WhatsApp'],
    recipients: ['Guest'],
    icon: '⏰',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    subject: 'Your stay at {{ property_name }} is Tomorrow!',
    template: 'Dear {{ guest_name }}, we look forward to welcoming you tomorrow. Check-in time is {{ check_in_time }}. Please let us know your ETA.',
  },
  {
    trigger: 'Room Dirty Alert',
    doctype: 'Room',
    event: 'on_update (status=Dirty)',
    channel: ['In-App', 'Email'],
    recipients: ['Housekeeping Supervisor'],
    icon: '🧹',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    subject: 'Room {{ room_number }} Needs Cleaning',
    template: 'Room {{ room_number }} ({{ room_type }}) has been marked as Dirty. Priority: {{ priority }}. Please assign a housekeeper.',
  },
  {
    trigger: 'Low Inventory Alert',
    doctype: 'Stock Entry',
    event: 'Item below reorder level',
    channel: ['Email', 'In-App'],
    recipients: ['Purchasing Manager', 'F&B Manager'],
    icon: '📦',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    subject: 'Low Stock Alert: {{ item_name }}',
    template: 'Stock for {{ item_name }} has fallen to {{ current_qty }} {{ uom }}, below reorder level of {{ reorder_level }}. Please raise a Purchase Order.',
  },
  {
    trigger: 'Spa Appointment Reminder',
    doctype: 'Spa Appointment',
    event: 'Hours Before: 2',
    channel: ['SMS', 'Email'],
    recipients: ['Guest', 'Therapist'],
    icon: '💆',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    subject: 'Your Spa Appointment in 2 Hours',
    template: 'Dear {{ client_name }}, your {{ treatment }} with {{ therapist_name }} is in 2 hours at {{ start_time }}. Please arrive 10 minutes early.',
  },
  {
    trigger: 'Membership Expiry Alert',
    doctype: 'Gym Membership',
    event: 'Days Before: 7',
    channel: ['Email', 'SMS'],
    recipients: ['Member'],
    icon: '💪',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    subject: 'Your Gym Membership Expires in 7 Days',
    template: 'Dear {{ member_name }}, your {{ plan_name }} membership expires on {{ end_date }}. Renew now to continue enjoying unlimited access.',
  },
  {
    trigger: 'Event Booking Confirmation',
    doctype: 'Event Booking',
    event: 'on_submit',
    channel: ['Email'],
    recipients: ['Client', 'Events Manager'],
    icon: '🎪',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    subject: 'Event Booking Confirmed: {{ event_name }}',
    template: 'Dear {{ client_name }}, your event "{{ event_name }}" at {{ venue_name }} on {{ event_date }} is confirmed. Deposit: {{ currency }} {{ deposit_amount }}.',
  },
  {
    trigger: 'Night Audit Completion',
    doctype: 'Night Audit',
    event: 'on_submit',
    channel: ['Email'],
    recipients: ['Hotel Manager', 'Finance Manager'],
    icon: '🌙',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    subject: 'Night Audit Complete for {{ audit_date }}',
    template: 'Night audit for {{ audit_date }} completed. Total Revenue: {{ total_revenue }}. Occupancy: {{ occupancy_rate }}%. Attached is the full audit report.',
  },
];

export default function NotificationsSection() {
  return (
    <section id="notifications" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium px-4 py-2 rounded-full mb-4">
            🔔 Notification System
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Smart{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Notifications
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Event-driven and scheduled notifications via Email, SMS, and In-App alerts — all defined as Frappe Notification JSON fixtures with Jinja templating.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {notifications.map((notif, i) => (
            <div key={i} className={`rounded-2xl border ${notif.border} ${notif.bg} p-6`}>
              <div className="flex items-start gap-4 mb-4">
                <span className="text-2xl">{notif.icon}</span>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-white font-semibold">{notif.trigger}</h3>
                    <div className="flex gap-1 flex-wrap">
                      {notif.channel.map((ch) => (
                        <span key={ch} className="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded-md">{ch}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 mt-1">
                    <span className="text-gray-500 text-xs">DocType: <span className={`${notif.color}`}>{notif.doctype}</span></span>
                    <span className="text-gray-500 text-xs">Event: <span className="text-gray-400">{notif.event}</span></span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="bg-black/30 rounded-lg px-3 py-2">
                  <span className="text-gray-600 text-xs">Subject: </span>
                  <span className="text-gray-300 text-xs font-mono">{notif.subject}</span>
                </div>
                <div className="bg-black/30 rounded-lg px-3 py-2">
                  <span className="text-gray-600 text-xs block mb-1">Template:</span>
                  <span className="text-gray-400 text-xs leading-relaxed">{notif.template}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 text-xs">Recipients:</span>
                  {notif.recipients.map((r) => (
                    <span key={r} className="text-xs bg-white/5 border border-white/10 text-gray-400 px-2 py-0.5 rounded-md">{r}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notification JSON example */}
        <div className="mt-12 bg-gray-950 rounded-2xl border border-white/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-gray-400 text-sm font-mono">hospitality_leisure/notification/reservation_confirmation.json</span>
          </div>
          <div className="p-6 font-mono text-xs overflow-x-auto">
            <pre className="text-gray-400 leading-relaxed whitespace-pre">{`{
  "doctype": "Notification",
  "name": "Reservation Confirmation",
  "document_type": "Reservation",
  "event": "New",
  "send_alert_on": "Submit",
  "subject": "Your Reservation at {{ doc.property_name }} is Confirmed!",
  "recipients": [
    {
      "receiver_by_document_field": "guest_email",
      "cc": "frontdesk@property.com"
    }
  ],
  "channel": "Email",
  "message": "Dear {{ doc.guest_name }},\\n\\nYour reservation {{ doc.name }} is confirmed.\\n\\nRoom: {{ doc.room }}\\nCheck-in: {{ doc.check_in_date }}\\nCheck-out: {{ doc.check_out_date }}\\nTotal: {{ doc.currency }} {{ doc.total_amount }}\\n\\nWe look forward to welcoming you!",
  "enabled": 1
}`}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}
