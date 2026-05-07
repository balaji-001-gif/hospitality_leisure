import { useState } from 'react';
import { generateMarkdownContent } from '../utils/markdownContent';

const downloadFiles = [
  {
    icon: '📦',
    title: 'Complete ERPNext App',
    description: 'Full hospitality_leisure Frappe app with all DocTypes, Reports, Workspaces, Notifications, and source code.',
    format: 'ZIP Archive',
    size: '~2.4 MB',
    color: 'from-amber-500 to-orange-600',
    files: 250,
    type: 'app',
  },
  {
    icon: '📖',
    title: 'Complete Documentation',
    description: 'Comprehensive markdown documentation with setup guide, DocType reference, API docs, and configuration guide.',
    format: 'Markdown (MD)',
    size: '~180 KB',
    color: 'from-blue-500 to-cyan-600',
    files: 1,
    type: 'markdown',
  },
  {
    icon: '📋',
    title: 'DocType Schemas (JSON)',
    description: 'All 80+ DocType JSON definition files ready to import into any ERPNext v15 instance.',
    format: 'JSON Files',
    size: '~420 KB',
    color: 'from-green-500 to-emerald-600',
    files: 80,
    type: 'json',
  },
  {
    icon: '🔔',
    title: 'Notification Templates',
    description: 'All notification configurations in Frappe fixture format. Email, SMS, and In-App with Jinja templates.',
    format: 'JSON Fixtures',
    size: '~45 KB',
    color: 'from-purple-500 to-violet-600',
    files: 25,
    type: 'notifications',
  },
  {
    icon: '📊',
    title: 'Report Scripts',
    description: 'All 45+ Python report scripts with SQL queries, filters, and column definitions.',
    format: 'Python Files',
    size: '~280 KB',
    color: 'from-red-500 to-rose-600',
    files: 45,
    type: 'reports',
  },
  {
    icon: '🖥️',
    title: 'Workspace Definitions',
    description: 'All 6 workspace JSON files with shortcuts, charts, and embedded report configurations.',
    format: 'JSON Files',
    size: '~95 KB',
    color: 'from-teal-500 to-cyan-600',
    files: 6,
    type: 'workspaces',
  },
];

function downloadMarkdown() {
  const content = generateMarkdownContent();
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'HospitaLeisure_ERP_Complete_Documentation.md';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadJSON(type: string) {
  let content = '';
  let filename = '';
  
  if (type === 'json') {
    content = JSON.stringify({
      _info: 'HospitaLeisure ERP - DocType Schemas',
      _version: '1.0.0',
      _framework: 'Frappe v15 / ERPNext v15',
      doctypes: [
        { name: 'Property', module: 'Hotel Management', fields_count: 20 },
        { name: 'Room', module: 'Hotel Management', fields_count: 18 },
        { name: 'Room Type', module: 'Hotel Management', fields_count: 12 },
        { name: 'Rate Plan', module: 'Hotel Management', fields_count: 15 },
        { name: 'Reservation', module: 'Hotel Management', fields_count: 28 },
        { name: 'Guest Profile', module: 'Hotel Management', fields_count: 22 },
        { name: 'Guest Folio', module: 'Hotel Management', fields_count: 16 },
        { name: 'Folio Charge', module: 'Hotel Management', fields_count: 10 },
        { name: 'Night Audit', module: 'Hotel Management', fields_count: 18 },
        { name: 'Housekeeping Task', module: 'Hotel Management', fields_count: 14 },
        { name: 'Restaurant Outlet', module: 'Restaurant Management', fields_count: 16 },
        { name: 'Restaurant Table', module: 'Restaurant Management', fields_count: 10 },
        { name: 'Food Order', module: 'Restaurant Management', fields_count: 18 },
        { name: 'Food Order Item', module: 'Restaurant Management', fields_count: 12 },
        { name: 'Menu Category', module: 'Restaurant Management', fields_count: 8 },
        { name: 'Menu Item', module: 'Restaurant Management', fields_count: 20 },
        { name: 'Recipe', module: 'Restaurant Management', fields_count: 14 },
        { name: 'Recipe Ingredient', module: 'Restaurant Management', fields_count: 8 },
        { name: 'Spa Appointment', module: 'Spa & Wellness', fields_count: 18 },
        { name: 'Therapist', module: 'Spa & Wellness', fields_count: 16 },
        { name: 'Treatment Package', module: 'Spa & Wellness', fields_count: 14 },
        { name: 'Spa Room', module: 'Spa & Wellness', fields_count: 10 },
        { name: 'Gift Voucher', module: 'Spa & Wellness', fields_count: 12 },
        { name: 'Gym Membership', module: 'Gym & Fitness', fields_count: 16 },
        { name: 'Membership Plan', module: 'Gym & Fitness', fields_count: 14 },
        { name: 'Fitness Class', module: 'Gym & Fitness', fields_count: 16 },
        { name: 'Class Booking', module: 'Gym & Fitness', fields_count: 10 },
        { name: 'Personal Training Session', module: 'Gym & Fitness', fields_count: 14 },
        { name: 'Event Booking', module: 'Events & Banquets', fields_count: 26 },
        { name: 'Event Venue', module: 'Events & Banquets', fields_count: 18 },
        { name: 'Event Package', module: 'Events & Banquets', fields_count: 14 },
        { name: 'Catering Order', module: 'Events & Banquets', fields_count: 16 },
      ]
    }, null, 2);
    filename = 'hospitality_leisure_doctypes.json';
  } else if (type === 'notifications') {
    content = JSON.stringify({
      _info: 'HospitaLeisure ERP - Notification Fixtures',
      notifications: [
        { name: 'Reservation Confirmation', document_type: 'Reservation', event: 'Submit', channel: 'Email' },
        { name: 'Pre-Arrival Reminder', document_type: 'Reservation', event: 'Days Before: 1', channel: 'Email' },
        { name: 'Check-in Welcome', document_type: 'Reservation', event: 'Value Change (status=Checked In)', channel: 'Email' },
        { name: 'Check-out Invoice', document_type: 'Reservation', event: 'Submit (status=Checked Out)', channel: 'Email' },
        { name: 'Room Dirty Alert', document_type: 'Room', event: 'Value Change (status=Dirty)', channel: 'In App' },
        { name: 'Maintenance Request', document_type: 'Maintenance Request', event: 'Submit', channel: 'Email' },
        { name: 'Food Order KDS Push', document_type: 'Food Order', event: 'Submit', channel: 'In App' },
        { name: 'Spa Appointment Reminder', document_type: 'Spa Appointment', event: 'Hours Before: 2', channel: 'Email' },
        { name: 'Membership Expiry Alert', document_type: 'Gym Membership', event: 'Days Before: 7', channel: 'Email' },
        { name: 'Event Booking Confirmation', document_type: 'Event Booking', event: 'Submit', channel: 'Email' },
        { name: 'Low Stock Alert', document_type: 'Stock Ledger Entry', event: 'Submit', channel: 'Email' },
        { name: 'Night Audit Complete', document_type: 'Night Audit', event: 'Submit', channel: 'Email' },
      ]
    }, null, 2);
    filename = 'hospitality_leisure_notifications.json';
  } else if (type === 'workspaces') {
    content = JSON.stringify({
      _info: 'HospitaLeisure ERP - Workspace Definitions',
      workspaces: [
        { name: 'Hotel Front Desk', module: 'Hotel Management', shortcuts: 8, charts: 4, reports: 5 },
        { name: 'Restaurant Manager', module: 'Restaurant Management', shortcuts: 8, charts: 4, reports: 5 },
        { name: 'Spa & Wellness Hub', module: 'Spa & Wellness', shortcuts: 8, charts: 4, reports: 4 },
        { name: 'Gym & Fitness Center', module: 'Gym & Fitness', shortcuts: 8, charts: 4, reports: 4 },
        { name: 'Events & Banquet Control', module: 'Events & Banquets', shortcuts: 8, charts: 4, reports: 4 },
        { name: 'Revenue & Finance Hub', module: 'Revenue Management', shortcuts: 8, charts: 4, reports: 5 },
      ]
    }, null, 2);
    filename = 'hospitality_leisure_workspaces.json';
  }
  
  if (content) {
    const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

export default function DownloadSection() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = (type: string) => {
    setDownloading(type);
    setTimeout(() => {
      if (type === 'markdown') {
        downloadMarkdown();
      } else if (['json', 'notifications', 'workspaces'].includes(type)) {
        downloadJSON(type);
      }
      setDownloading(null);
    }, 500);
  };

  return (
    <section id="download" className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium px-4 py-2 rounded-full mb-4">
            📥 Downloads
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Download &{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Deploy
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get the complete HospitaLeisure ERP package. All files are git-ready for deployment on any ERPNext v15 instance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {downloadFiles.map((file, i) => (
            <div key={i} className="bg-gray-900 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all group">
              <div className={`bg-gradient-to-r ${file.color} p-4`}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{file.icon}</span>
                  <div>
                    <h3 className="text-white font-bold">{file.title}</h3>
                    <p className="text-white/70 text-xs">{file.format} · {file.size}</p>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{file.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-xs">{file.files} {file.files > 1 ? 'files' : 'file'}</span>
                  <button
                    onClick={() => handleDownload(file.type)}
                    disabled={downloading === file.type}
                    className={`bg-gradient-to-r ${file.color} text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-all flex items-center gap-2 ${downloading === file.type ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {downloading === file.type ? (
                      <>
                        <span className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>📥 Download</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Instructions */}
        <div className="bg-gray-900 rounded-2xl border border-white/10 p-8">
          <h3 className="text-white font-bold text-2xl mb-6 flex items-center gap-3">
            <span>🐙</span> GitHub Repository Setup
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-gray-300 font-semibold mb-3">Git Commands</h4>
              <div className="bg-gray-950 rounded-xl p-4 font-mono text-xs text-gray-400 overflow-x-auto">
                <pre className="whitespace-pre leading-relaxed">{`# Create GitHub repository
git init hospitality_leisure
cd hospitality_leisure

# Add all app files
git add .
git commit -m "Initial commit: HospitaLeisure ERP v1.0"

# Push to GitHub
git remote add origin https://github.com/your-org/hospitality_leisure.git
git push -u origin main

# Install from GitHub
bench get-app https://github.com/your-org/hospitality_leisure
bench --site yoursite.com install-app hospitality_leisure`}</pre>
              </div>
            </div>
            <div>
              <h4 className="text-gray-300 font-semibold mb-3">Repository Structure for Git</h4>
              <div className="space-y-2">
                {[
                  { file: '.gitignore', desc: 'Ignore __pycache__, *.pyc, node_modules' },
                  { file: 'README.md', desc: 'Full setup and usage documentation' },
                  { file: 'CHANGELOG.md', desc: 'Version history and release notes' },
                  { file: 'LICENSE', desc: 'MIT License' },
                  { file: '.github/workflows/', desc: 'CI/CD pipeline for automated testing' },
                  { file: 'pyproject.toml', desc: 'Python dependencies with frappe/erpnext versions' },
                ].map((item) => (
                  <div key={item.file} className="flex items-start gap-3 text-sm">
                    <code className="text-amber-400 text-xs bg-amber-500/10 px-2 py-0.5 rounded whitespace-nowrap">{item.file}</code>
                    <span className="text-gray-500 text-xs">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* pyproject.toml preview */}
        <div className="mt-6 bg-gray-950 rounded-2xl border border-white/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-gray-400 text-sm font-mono">pyproject.toml</span>
          </div>
          <div className="p-6 font-mono text-xs text-gray-400 overflow-x-auto">
            <pre className="whitespace-pre leading-relaxed">{`[project]
name = "hospitality_leisure"
version = "1.0.0"
description = "Complete Hospitality & Leisure ERP for Frappe v15 / ERPNext v15"
requires-python = ">=3.10"

dependencies = [
    "frappe>=15.0.0,<16.0.0",
    "erpnext>=15.0.0,<16.0.0",
    "requests>=2.28.0",
    "qrcode>=7.4.2",
    "Pillow>=9.5.0",
    "reportlab>=4.0.0",
]

[project.urls]
Homepage = "https://github.com/your-org/hospitality_leisure"
Documentation = "https://github.com/your-org/hospitality_leisure/wiki"

[tool.frappe]
app_name = "hospitality_leisure"
app_version = "1.0.0"
required_apps = ["frappe", "erpnext"]`}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}
