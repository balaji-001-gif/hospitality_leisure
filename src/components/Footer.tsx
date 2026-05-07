import { Hotel, Globe, Mail, Heart } from 'lucide-react';

const footerLinks = [
  {
    title: 'Industries',
    links: [
      { label: 'Hotels & Resorts', href: '#industries' },
      { label: 'Restaurants & F&B', href: '#industries' },
      { label: 'Spas & Wellness', href: '#industries' },
      { label: 'Gyms & Fitness', href: '#industries' },
      { label: 'Events & Banquets', href: '#industries' },
      { label: 'Marinas & Cruise', href: '#industries' },
    ],
  },
  {
    title: 'Technical',
    links: [
      { label: 'DocTypes', href: '#doctypes' },
      { label: 'Workspaces', href: '#workspaces' },
      { label: 'Reports', href: '#reports' },
      { label: 'Notifications', href: '#notifications' },
      { label: 'File Structure', href: '#files' },
      { label: 'API Reference', href: '#download' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Setup Guide', href: '#setup' },
      { label: 'Download App', href: '#download' },
      { label: 'Frappe Docs', href: 'https://frappeframework.com' },
      { label: 'ERPNext v15', href: 'https://erpnext.com' },
      { label: 'GitHub', href: '#' },
      { label: 'Community Forum', href: 'https://discuss.frappe.io' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-600 rounded-lg flex items-center justify-center">
                <Hotel size={20} className="text-white" />
              </div>
              <div>
                <span className="text-white font-bold text-lg leading-none">HospitaLeisure</span>
                <div className="text-amber-400 text-xs font-medium">ERP Solution</div>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              A complete Frappe Framework v15 application covering 12+ hospitality and leisure industries. Built natively on ERPNext v15 for maximum integration.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-gray-500 hover:text-amber-400 transition-colors text-sm font-mono">
                GitHub
              </a>
              <a href="#" className="text-gray-500 hover:text-amber-400 transition-colors">
                <Globe size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-amber-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-white font-semibold mb-4">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-amber-400 text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ERPNext Version Badge */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { label: 'ERPNext v15+', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
            { label: 'Frappe v15+', color: 'text-green-400 bg-green-500/10 border-green-500/20' },
            { label: 'Python 3.10+', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
            { label: 'MariaDB 10.6+', color: 'text-orange-400 bg-orange-500/10 border-orange-500/20' },
            { label: 'MIT License', color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
            { label: 'Open Source', color: 'text-teal-400 bg-teal-500/10 border-teal-500/20' },
          ].map((badge) => (
            <span key={badge.label} className={`text-xs border px-3 py-1.5 rounded-full font-medium ${badge.color}`}>
              {badge.label}
            </span>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm flex items-center gap-1.5">
            Built with <Heart size={14} className="text-red-500" /> on Frappe Framework v15
          </p>
          <p className="text-gray-600 text-sm">
            © 2025 HospitaLeisure ERP. Open Source under MIT License.
          </p>
        </div>

        {/* Stats bar */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { label: 'DocTypes', value: '80+' },
            { label: 'Reports', value: '45+' },
            { label: 'Workspaces', value: '6' },
            { label: 'Notifications', value: '25+' },
            { label: 'Industries', value: '12' },
            { label: 'Modules', value: '8' },
            { label: 'API Endpoints', value: '30+' },
            { label: 'Test Cases', value: '100+' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 border border-white/5 rounded-xl p-3 text-center">
              <div className="text-amber-400 font-bold text-lg">{stat.value}</div>
              <div className="text-gray-600 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
