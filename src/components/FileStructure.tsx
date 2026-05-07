import { useState } from 'react';

type TreeNode = {
  name: string;
  type: 'folder' | 'file';
  description?: string;
  lang?: string;
  children?: TreeNode[];
};

const fileTree: TreeNode[] = [
  {
    name: 'hospitality_leisure/', type: 'folder', children: [
      { name: 'hospitality_leisure/', type: 'folder', children: [
        { name: '__init__.py', type: 'file', lang: 'python', description: 'App init — version and app metadata' },
        { name: 'hooks.py', type: 'file', lang: 'python', description: 'App hooks: scheduler, fixtures, doctype JS, permissions' },
        { name: 'modules.txt', type: 'file', lang: 'text', description: 'Module list: Hotel, Restaurant, Spa, Gym, Events, Finance' },
        { name: 'patches.txt', type: 'file', lang: 'text', description: 'Database patch history for migrations' },
        { name: 'setup/', type: 'folder', children: [
          { name: '__init__.py', type: 'file', lang: 'python', description: '' },
          { name: 'install.py', type: 'file', lang: 'python', description: 'after_install hook: create default data, roles, configurations' },
          { name: 'uninstall.py', type: 'file', lang: 'python', description: 'before_uninstall: cleanup custom fields and data' },
        ]},
        { name: 'hotel/', type: 'folder', children: [
          { name: '__init__.py', type: 'file', lang: 'python', description: '' },
          { name: 'doctype/', type: 'folder', children: [
            { name: 'property/', type: 'folder', children: [
              { name: 'property.json', type: 'file', lang: 'json', description: 'DocType definition for Property master' },
              { name: 'property.py', type: 'file', lang: 'python', description: 'Property controller with validation' },
              { name: 'property.js', type: 'file', lang: 'javascript', description: 'Client-side form scripts' },
            ]},
            { name: 'room/', type: 'folder', children: [
              { name: 'room.json', type: 'file', lang: 'json', description: 'Room DocType with status workflow' },
              { name: 'room.py', type: 'file', lang: 'python', description: 'Room controller — status transitions, validation' },
              { name: 'room.js', type: 'file', lang: 'javascript', description: 'Room form scripts and custom buttons' },
            ]},
            { name: 'reservation/', type: 'folder', children: [
              { name: 'reservation.json', type: 'file', lang: 'json', description: 'Reservation DocType — full booking lifecycle' },
              { name: 'reservation.py', type: 'file', lang: 'python', description: 'Booking logic, availability check, folio creation' },
              { name: 'reservation.js', type: 'file', lang: 'javascript', description: 'Availability checker, rate fetch, quick actions' },
            ]},
            { name: 'guest_folio/', type: 'folder', children: [
              { name: 'guest_folio.json', type: 'file', lang: 'json', description: 'Folio DocType for all guest charges' },
              { name: 'guest_folio.py', type: 'file', lang: 'python', description: 'Balance calculation, ERPNext invoice posting' },
            ]},
            { name: 'night_audit/', type: 'folder', children: [
              { name: 'night_audit.json', type: 'file', lang: 'json', description: 'Night Audit DocType — daily batch processing' },
              { name: 'night_audit.py', type: 'file', lang: 'python', description: 'Automated room charge posting, occupancy calculation' },
            ]},
            { name: 'housekeeping_task/', type: 'folder', children: [
              { name: 'housekeeping_task.json', type: 'file', lang: 'json', description: 'Room cleaning tasks assignment' },
              { name: 'housekeeping_task.py', type: 'file', lang: 'python', description: 'Task assignment and status tracking' },
            ]},
          ]},
          { name: 'report/', type: 'folder', children: [
            { name: 'daily_occupancy_report/', type: 'folder', children: [
              { name: 'daily_occupancy_report.json', type: 'file', lang: 'json', description: 'Report definition' },
              { name: 'daily_occupancy_report.py', type: 'file', lang: 'python', description: 'Report logic with filters' },
            ]},
            { name: 'night_audit_summary/', type: 'folder', children: [
              { name: 'night_audit_summary.json', type: 'file', lang: 'json', description: 'Night audit report definition' },
              { name: 'night_audit_summary.py', type: 'file', lang: 'python', description: 'Revenue aggregation query' },
            ]},
            { name: 'revenue_by_room_type/', type: 'folder', children: [
              { name: 'revenue_by_room_type.json', type: 'file', lang: 'json', description: '' },
              { name: 'revenue_by_room_type.py', type: 'file', lang: 'python', description: 'RevPAR, ADR calculations' },
            ]},
          ]},
          { name: 'page/', type: 'folder', children: [
            { name: 'room_status_board/', type: 'folder', children: [
              { name: 'room_status_board.json', type: 'file', lang: 'json', description: 'Page definition' },
              { name: 'room_status_board.js', type: 'file', lang: 'javascript', description: 'Live room status visualization' },
              { name: 'room_status_board.html', type: 'file', lang: 'html', description: 'Room grid template' },
            ]},
            { name: 'tape_chart/', type: 'folder', children: [
              { name: 'tape_chart.json', type: 'file', lang: 'json', description: 'Page definition' },
              { name: 'tape_chart.js', type: 'file', lang: 'javascript', description: 'Drag-drop availability calendar' },
            ]},
          ]},
        ]},
        { name: 'restaurant/', type: 'folder', children: [
          { name: 'doctype/', type: 'folder', children: [
            { name: 'restaurant_outlet/', type: 'folder', children: [
              { name: 'restaurant_outlet.json', type: 'file', lang: 'json', description: 'Outlet master with POS linking' },
            ]},
            { name: 'food_order/', type: 'folder', children: [
              { name: 'food_order.json', type: 'file', lang: 'json', description: 'Order DocType with KDS workflow' },
              { name: 'food_order.py', type: 'file', lang: 'python', description: 'Order validation, KDS push, folio posting' },
              { name: 'food_order.js', type: 'file', lang: 'javascript', description: 'KDS button, quick pay, split bill' },
            ]},
            { name: 'menu_item/', type: 'folder', children: [
              { name: 'menu_item.json', type: 'file', lang: 'json', description: 'Menu item with pricing and recipe link' },
            ]},
            { name: 'recipe/', type: 'folder', children: [
              { name: 'recipe.json', type: 'file', lang: 'json', description: 'Recipe with ingredients for cost calculation' },
              { name: 'recipe.py', type: 'file', lang: 'python', description: 'Auto-calculate recipe cost from BOM' },
            ]},
          ]},
          { name: 'report/', type: 'folder', children: [
            { name: 'daily_fb_sales_report/', type: 'folder', children: [
              { name: 'daily_fb_sales_report.py', type: 'file', lang: 'python', description: 'Outlet-wise sales analysis' },
            ]},
            { name: 'food_cost_analysis/', type: 'folder', children: [
              { name: 'food_cost_analysis.py', type: 'file', lang: 'python', description: 'Recipe cost vs. selling price' },
            ]},
          ]},
        ]},
        { name: 'spa/', type: 'folder', children: [
          { name: 'doctype/', type: 'folder', children: [
            { name: 'spa_appointment/', type: 'folder', children: [
              { name: 'spa_appointment.json', type: 'file', lang: 'json', description: 'Appointment DocType with therapist scheduling' },
              { name: 'spa_appointment.py', type: 'file', lang: 'python', description: 'Conflict detection, therapist availability' },
            ]},
            { name: 'treatment_package/', type: 'folder', children: [
              { name: 'treatment_package.json', type: 'file', lang: 'json', description: 'Spa packages with session tracking' },
            ]},
            { name: 'therapist/', type: 'folder', children: [
              { name: 'therapist.json', type: 'file', lang: 'json', description: 'Therapist profile, skills, availability' },
            ]},
          ]},
        ]},
        { name: 'gym/', type: 'folder', children: [
          { name: 'doctype/', type: 'folder', children: [
            { name: 'gym_membership/', type: 'folder', children: [
              { name: 'gym_membership.json', type: 'file', lang: 'json', description: 'Membership with auto-renewal logic' },
              { name: 'gym_membership.py', type: 'file', lang: 'python', description: 'Expiry alerts, auto-renew, locker management' },
            ]},
            { name: 'fitness_class/', type: 'folder', children: [
              { name: 'fitness_class.json', type: 'file', lang: 'json', description: 'Class schedule with capacity management' },
            ]},
          ]},
        ]},
        { name: 'events/', type: 'folder', children: [
          { name: 'doctype/', type: 'folder', children: [
            { name: 'event_booking/', type: 'folder', children: [
              { name: 'event_booking.json', type: 'file', lang: 'json', description: 'Full event lifecycle DocType' },
              { name: 'event_booking.py', type: 'file', lang: 'python', description: 'Venue conflict check, deposit invoice' },
            ]},
            { name: 'event_venue/', type: 'folder', children: [
              { name: 'event_venue.json', type: 'file', lang: 'json', description: 'Venue master with capacity and facilities' },
            ]},
          ]},
        ]},
        { name: 'public/', type: 'folder', children: [
          { name: 'js/', type: 'folder', children: [
            { name: 'hospitality_common.js', type: 'file', lang: 'javascript', description: 'Shared JS utilities across modules' },
            { name: 'pos_bridge.js', type: 'file', lang: 'javascript', description: 'POS to folio posting bridge' },
          ]},
          { name: 'css/', type: 'folder', children: [
            { name: 'hospitality.css', type: 'file', lang: 'css', description: 'Custom styles for workspaces and pages' },
          ]},
          { name: 'build.json', type: 'file', lang: 'json', description: 'Asset bundling configuration' },
        ]},
        { name: 'templates/', type: 'folder', children: [
          { name: 'pages/', type: 'folder', children: [
            { name: 'booking.html', type: 'file', lang: 'html', description: 'Online booking portal template' },
            { name: 'menu.html', type: 'file', lang: 'html', description: 'Online menu ordering page' },
            { name: 'spa_booking.html', type: 'file', lang: 'html', description: 'Spa appointment booking page' },
          ]},
          { name: 'emails/', type: 'folder', children: [
            { name: 'reservation_confirmation.html', type: 'file', lang: 'html', description: 'Reservation email template' },
            { name: 'check_in_welcome.html', type: 'file', lang: 'html', description: 'Check-in welcome email' },
          ]},
        ]},
        { name: 'tasks.py', type: 'file', lang: 'python', description: 'Scheduled tasks: night audit, renewal alerts, report emails' },
        { name: 'api.py', type: 'file', lang: 'python', description: 'REST API endpoints for online booking portals' },
        { name: 'fixtures/', type: 'folder', children: [
          { name: 'custom_fields.json', type: 'file', lang: 'json', description: 'Custom fields added to ERPNext core DocTypes' },
          { name: 'roles.json', type: 'file', lang: 'json', description: 'All hospitality roles definition' },
          { name: 'notification.json', type: 'file', lang: 'json', description: 'All notification templates' },
          { name: 'workspace.json', type: 'file', lang: 'json', description: 'All workspace definitions' },
        ]},
      ]},
      { name: 'setup.py', type: 'file', lang: 'python', description: 'Python package setup file' },
      { name: 'pyproject.toml', type: 'file', lang: 'toml', description: 'Poetry/pip dependencies' },
      { name: 'requirements.txt', type: 'file', lang: 'text', description: 'Python requirements' },
      { name: 'MANIFEST.in', type: 'file', lang: 'text', description: 'Package manifest' },
      { name: 'README.md', type: 'file', lang: 'markdown', description: 'Complete documentation' },
      { name: '.github/', type: 'folder', children: [
        { name: 'workflows/', type: 'folder', children: [
          { name: 'ci.yml', type: 'file', lang: 'yaml', description: 'GitHub Actions CI pipeline' },
          { name: 'release.yml', type: 'file', lang: 'yaml', description: 'Automated release workflow' },
        ]},
      ]},
    ],
  },
];

function TreeItem({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 2);
  const isFolder = node.type === 'folder';

  const langColors: Record<string, string> = {
    python: 'text-blue-400',
    json: 'text-yellow-400',
    javascript: 'text-green-400',
    html: 'text-orange-400',
    css: 'text-pink-400',
    markdown: 'text-purple-400',
    yaml: 'text-cyan-400',
    text: 'text-gray-400',
    toml: 'text-teal-400',
  };

  return (
    <div>
      <div
        className={`flex items-center gap-1 py-0.5 px-2 rounded hover:bg-white/5 cursor-pointer group ${depth === 0 ? 'mt-1' : ''}`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => isFolder && setExpanded(!expanded)}
      >
        {isFolder ? (
          <>
            <span className="text-gray-500 text-xs w-3">{expanded ? '▼' : '▶'}</span>
            <span className="text-amber-400 text-xs">📁</span>
            <span className="text-amber-300 text-xs font-mono">{node.name}</span>
          </>
        ) : (
          <>
            <span className="text-transparent text-xs w-3">·</span>
            <span className="text-xs">📄</span>
            <span className={`text-xs font-mono ${node.lang ? langColors[node.lang] || 'text-gray-300' : 'text-gray-300'}`}>
              {node.name}
            </span>
            {node.description && (
              <span className="text-gray-700 text-xs ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                — {node.description}
              </span>
            )}
          </>
        )}
      </div>
      {isFolder && expanded && node.children && (
        <div>
          {node.children.map((child, i) => (
            <TreeItem key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FileStructure() {
  return (
    <section id="files" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium px-4 py-2 rounded-full mb-4">
            🗂️ File Structure
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Complete App{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Structure
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Full folder structure for the <code className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">hospitality_leisure</code> Frappe app — git-ready for immediate deployment.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Tree View */}
          <div className="bg-gray-950 rounded-2xl border border-white/10 overflow-hidden">
            <div className="px-4 py-3 bg-white/5 border-b border-white/10 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-gray-400 text-xs font-mono ml-2">File Explorer</span>
            </div>
            <div className="p-3 max-h-[600px] overflow-y-auto">
              {fileTree.map((node, i) => (
                <TreeItem key={i} node={node} depth={0} />
              ))}
            </div>
          </div>

          {/* Key Files Content Preview */}
          <div className="space-y-4">
            {/* hooks.py */}
            <div className="bg-gray-950 rounded-2xl border border-white/10 overflow-hidden">
              <div className="px-4 py-3 bg-white/5 border-b border-white/5 flex items-center justify-between">
                <span className="text-blue-400 text-xs font-mono">hooks.py</span>
                <span className="text-gray-600 text-xs">Core App File</span>
              </div>
              <div className="p-4 font-mono text-xs text-gray-400 overflow-x-auto max-h-52 overflow-y-auto">
                <pre className="whitespace-pre leading-relaxed">{`app_name = "hospitality_leisure"
app_title = "Hospitality & Leisure ERP"
app_publisher = "Your Organization"
app_description = "Complete Hospitality & Leisure ERP on ERPNext v15"
app_email = "info@yourorg.com"
app_license = "MIT"
app_version = "1.0.0"

# Fixtures to export
fixtures = [
    "Custom Field",
    "Custom DocPerm", 
    "Property Type",
    {"dt": "Notification", "filters": [["module", "=", "Hospitality Leisure"]]},
    {"dt": "Workspace", "filters": [["module", "=", "Hospitality Leisure"]]},
]

# Scheduled tasks
scheduler_events = {
    "daily": [
        "hospitality_leisure.tasks.run_night_audit",
        "hospitality_leisure.tasks.send_membership_expiry_alerts",
        "hospitality_leisure.tasks.send_arrival_reminders",
    ],
    "hourly": [
        "hospitality_leisure.tasks.update_room_status",
        "hospitality_leisure.tasks.check_ota_bookings",
    ]
}

# DocType client scripts
doctype_js = {
    "Reservation": "public/js/reservation.js",
    "Food Order": "public/js/food_order.js",
    "Spa Appointment": "public/js/spa_appointment.js",
}

# Override doctype classes
override_doctype_class = {
    "Sales Invoice": "hospitality_leisure.overrides.HospitalitySalesInvoice"
}

# Permissions
permission_query_conditions = {
    "Reservation": "hospitality_leisure.permissions.get_reservation_query",
    "Room": "hospitality_leisure.permissions.get_room_query",
}`}</pre>
              </div>
            </div>

            {/* modules.txt */}
            <div className="bg-gray-950 rounded-2xl border border-white/10 overflow-hidden">
              <div className="px-4 py-3 bg-white/5 border-b border-white/5">
                <span className="text-green-400 text-xs font-mono">modules.txt</span>
              </div>
              <div className="p-4 font-mono text-xs text-gray-400">
                <pre className="whitespace-pre leading-relaxed">{`Hotel Management
Restaurant Management
Spa & Wellness
Gym & Fitness
Events & Banquets
Marina & Leisure
Revenue Management
Hospitality Setup`}</pre>
              </div>
            </div>

            {/* Legend */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-gray-300 font-semibold text-sm mb-3">🎨 File Type Legend</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { lang: 'python', label: 'Python (.py)', color: 'text-blue-400' },
                  { lang: 'json', label: 'JSON DocType', color: 'text-yellow-400' },
                  { lang: 'javascript', label: 'JavaScript', color: 'text-green-400' },
                  { lang: 'html', label: 'HTML Template', color: 'text-orange-400' },
                  { lang: 'css', label: 'CSS Styles', color: 'text-pink-400' },
                  { lang: 'yaml', label: 'YAML/CI', color: 'text-cyan-400' },
                ].map((item) => (
                  <div key={item.lang} className="flex items-center gap-2">
                    <span className={`text-xs font-mono ${item.color}`}>■</span>
                    <span className="text-gray-400 text-xs">{item.label}</span>
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
