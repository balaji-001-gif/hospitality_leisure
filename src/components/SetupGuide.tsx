import { useState } from 'react';

const steps = [
  {
    number: '01',
    title: 'Prerequisites',
    icon: '🔧',
    commands: [],
    description: 'Ensure you have a working ERPNext v15 bench installation with Python 3.10+, Node.js 18+, and MariaDB 10.6+.',
    notes: [
      'ERPNext v15 installed and running',
      'Developer mode enabled on site',
      'Git installed on server',
      'bench CLI available',
    ],
  },
  {
    number: '02',
    title: 'Install the App',
    icon: '📥',
    description: 'Clone the hospitality_leisure app into your bench apps directory and install it on your site.',
    commands: [
      '# Navigate to your bench directory',
      'cd /home/frappe/frappe-bench',
      '',
      '# Get the app from GitHub',
      'bench get-app https://github.com/your-org/hospitality_leisure',
      '',
      '# Install on your site',
      'bench --site yoursite.com install-app hospitality_leisure',
    ],
    notes: [],
  },
  {
    number: '03',
    title: 'Run Migrations',
    icon: '🗄️',
    description: 'Apply database migrations to create all DocType tables and initial data.',
    commands: [
      '# Apply migrations',
      'bench --site yoursite.com migrate',
      '',
      '# Install fixtures (roles, reports, workspaces)',
      'bench --site yoursite.com execute hospitality_leisure.setup.install.after_install',
      '',
      '# Build assets',
      'bench build --app hospitality_leisure',
    ],
    notes: [],
  },
  {
    number: '04',
    title: 'Configure Roles & Permissions',
    icon: '🔐',
    description: 'Set up role-based access control for all hospitality modules.',
    commands: [],
    notes: [
      'Hotel Manager — Full access to property module',
      'Front Desk Manager — Reservations, check-in/out',
      'Receptionist — View/create reservations only',
      'Housekeeping Supervisor — Room status, tasks',
      'F&B Manager — Restaurant, kitchen, inventory',
      'Waiter / Cashier — POS and order management',
      'Spa Manager — Appointments, therapists, retail',
      'Gym Manager — Memberships, classes, equipment',
      'Events Coordinator — Event bookings, venues',
      'Revenue Manager — Reports, pricing, analytics',
    ],
  },
  {
    number: '05',
    title: 'Initial Configuration',
    icon: '⚙️',
    description: 'Set up your properties, outlets, and master data through the setup wizard.',
    commands: [
      '# Access setup wizard in ERPNext',
      '# Go to: Hospitality Leisure > Setup > Property Setup Wizard',
      '',
      '# Or import sample data',
      'bench --site yoursite.com import-doc apps/hospitality_leisure/hospitality_leisure/fixtures/sample_data/',
    ],
    notes: [
      '1. Create your Property record',
      '2. Add Room Types and Rooms',
      '3. Configure Rate Plans and Seasons',
      '4. Set up Restaurant Outlets and Menu',
      '5. Create Therapists and Spa Rooms',
      '6. Configure Membership Plans',
      '7. Set up Notification Email accounts',
    ],
  },
  {
    number: '06',
    title: 'Scheduler & Automation',
    icon: '🤖',
    description: 'Enable automated tasks including Night Audit, membership renewals, and report emails.',
    commands: [
      '# Enable scheduler',
      'bench --site yoursite.com enable-scheduler',
      '',
      '# Verify scheduled jobs',
      'bench --site yoursite.com show-pending-jobs',
      '',
      '# Test night audit manually',
      'bench --site yoursite.com execute hospitality_leisure.tasks.night_audit.run_night_audit',
    ],
    notes: [],
  },
  {
    number: '07',
    title: 'OTA & POS Integration',
    icon: '🔌',
    description: 'Connect Online Travel Agencies and activate the POS bridge for F&B.',
    commands: [
      '# Configure POS Profile for F&B',
      '# Go to: Point of Sale > POS Profile > New',
      '# Set Company, Warehouse, Payment Methods',
      '',
      '# Enable OTA channel manager',
      '# Go to: Hospitality Leisure > Settings > OTA Channels',
      '# Add your Channel Manager API credentials',
    ],
    notes: [],
  },
  {
    number: '08',
    title: 'Go Live',
    icon: '🚀',
    description: 'Final checks before going live with the production system.',
    commands: [
      '# Run production checks',
      'bench --site yoursite.com doctor',
      '',
      '# Setup SSL certificate',
      'sudo certbot --nginx -d yoursite.com',
      '',
      '# Enable production mode',
      'sudo bench setup production frappe',
      '',
      '# Setup supervisor and nginx',
      'bench setup supervisor',
      'bench setup nginx',
    ],
    notes: [],
  },
];

export default function SetupGuide() {
  const [activeStep, setActiveStep] = useState(0);
  const current = steps[activeStep];

  return (
    <section id="setup" className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium px-4 py-2 rounded-full mb-4">
            🚀 Installation & Setup
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Complete{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Setup Guide
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Step-by-step installation guide for deploying HospitaLeisure ERP on your ERPNext v15 instance.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Step selector */}
          <div className="space-y-2">
            {steps.map((step, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`w-full text-left rounded-xl border px-4 py-3 transition-all flex items-center gap-3 ${
                  activeStep === i
                    ? 'bg-amber-500/20 border-amber-500/50 text-white'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/8'
                }`}
              >
                <span className={`font-mono text-xs font-bold ${activeStep === i ? 'text-amber-400' : 'text-gray-600'}`}>
                  {step.number}
                </span>
                <span className="text-lg">{step.icon}</span>
                <span className="text-sm font-medium">{step.title}</span>
              </button>
            ))}
          </div>

          {/* Step Detail */}
          <div className="lg:col-span-2 bg-gray-900 rounded-2xl border border-white/10 overflow-hidden">
            <div className="px-6 py-4 bg-black/30 border-b border-white/5">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{current.icon}</span>
                <div>
                  <div className="text-gray-500 text-xs font-mono">Step {current.number}</div>
                  <h3 className="text-white font-bold text-xl">{current.title}</h3>
                </div>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-400 mb-6 leading-relaxed">{current.description}</p>

              {current.commands.length > 0 && (
                <div className="bg-gray-950 rounded-xl border border-white/10 overflow-hidden mb-6">
                  <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    </div>
                    <span className="text-gray-500 text-xs font-mono">bash</span>
                  </div>
                  <div className="p-5 font-mono text-sm overflow-x-auto">
                    {current.commands.map((cmd, i) => (
                      <div key={i} className={`leading-relaxed ${
                        cmd.startsWith('#') ? 'text-gray-600' :
                        cmd === '' ? 'mb-2' :
                        'text-green-300'
                      }`}>
                        {cmd || ' '}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {current.notes.length > 0 && (
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5">
                  <h4 className="text-amber-400 font-semibold text-sm mb-3">📝 Notes</h4>
                  <ul className="space-y-2">
                    {current.notes.map((note, i) => (
                      <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">▸</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
