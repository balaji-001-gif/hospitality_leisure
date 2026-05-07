import { ArrowDown, Star, Zap, Shield, Globe } from 'lucide-react';

const stats = [
  { value: '12+', label: 'Industry Modules' },
  { value: '80+', label: 'DocTypes' },
  { value: '45+', label: 'Custom Reports' },
  { value: '100%', label: 'ERPNext v15 Native' },
];

const badges = [
  { icon: <Zap size={14} />, text: 'Frappe Framework v15' },
  { icon: <Shield size={14} />, text: 'Production Ready' },
  { icon: <Globe size={14} />, text: 'Multi-Branch Support' },
  { icon: <Star size={14} />, text: 'Open Source' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gray-950">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(245,158,11,0.18) 0%, transparent 70%)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 40% at 80% 80%, rgba(239,68,68,0.08) 0%, transparent 60%)'
        }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(245,158,11,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-32 left-10 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-32 right-10 w-80 h-80 bg-orange-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge row */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {badges.map((b, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium px-3 py-1.5 rounded-full">
              {b.icon} {b.text}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          <span className="block">Hospitality &</span>
          <span className="block bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Leisure ERP
          </span>
          <span className="block text-4xl sm:text-5xl lg:text-6xl text-gray-300 font-normal mt-2">
            Powered by ERPNext v15
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          A complete, production-ready Frappe custom app covering <strong className="text-amber-400">Hotels, Resorts, Restaurants, Spas, Gyms, Event Venues, Golf Clubs, Theme Parks, Cinemas, Cruise Lines, Camping & Marinas</strong> — all integrated into one powerful ERPNext v15 ecosystem.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <a
            href="#download"
            className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-amber-400 hover:to-orange-500 transition-all shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:-translate-y-0.5"
          >
            📥 Download Full App
          </a>
          <a
            href="#setup"
            className="bg-white/5 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
          >
            🚀 Setup Guide
          </a>
          <a
            href="#doctypes"
            className="bg-white/5 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
          >
            📋 View DocTypes
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {stats.map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="text-3xl font-bold text-amber-400 mb-1">{s.value}</div>
              <div className="text-gray-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 animate-bounce">
          <ArrowDown className="mx-auto text-gray-600" size={24} />
        </div>
      </div>
    </section>
  );
}
