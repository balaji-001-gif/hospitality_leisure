import { useState } from 'react';
import { Menu, X, Hotel } from 'lucide-react';

const navLinks = [
  { label: 'Industries', href: '#industries' },
  { label: 'Modules', href: '#modules' },
  { label: 'DocTypes', href: '#doctypes' },
  { label: 'Workspaces', href: '#workspaces' },
  { label: 'Reports', href: '#reports' },
  { label: 'Setup Guide', href: '#setup' },
  { label: 'Download', href: '#download' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/95 backdrop-blur-md border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-600 rounded-lg flex items-center justify-center">
              <Hotel size={20} className="text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-lg leading-none">HospitaLeisure</span>
              <div className="text-amber-400 text-xs font-medium">ERPNext v15 Solution</div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-300 hover:text-amber-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#download"
              className="ml-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-amber-400 hover:to-orange-500 transition-all shadow-lg shadow-amber-500/25"
            >
              Get Started →
            </a>
          </div>

          <button
            className="lg:hidden text-gray-300 hover:text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-gray-300 hover:text-amber-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
