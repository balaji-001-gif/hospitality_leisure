import { useState } from 'react';
import { RESERVATION_PY, NIGHT_AUDIT_PY, FOOD_ORDER_PY, HOOKS_PY } from '../data/sourceCode';

const codeFiles = [
  {
    name: 'reservation.py',
    path: 'hotel/doctype/reservation/',
    lang: 'python',
    description: 'Full reservation lifecycle controller',
    icon: '🏨',
    code: RESERVATION_PY,
  },
  {
    name: 'night_audit.py',
    path: 'hotel/doctype/night_audit/',
    lang: 'python',
    description: 'Automated night audit processing',
    icon: '🌙',
    code: NIGHT_AUDIT_PY,
  },
  {
    name: 'food_order.py',
    path: 'restaurant/doctype/food_order/',
    lang: 'python',
    description: 'F&B order with KDS and folio posting',
    icon: '🍽️',
    code: FOOD_ORDER_PY,
  },
  {
    name: 'hooks.py',
    path: 'hospitality_leisure/',
    lang: 'python',
    description: 'App hooks — core configuration',
    icon: '⚙️',
    code: HOOKS_PY,
  },
];

function downloadPython(filename: string, code: string) {
  const blob = new Blob([code], { type: 'text/x-python;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function CodeShowcase() {
  const [activeFile, setActiveFile] = useState(0);
  const current = codeFiles[activeFile];

  return (
    <section id="code" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium px-4 py-2 rounded-full mb-4">
            💻 Source Code
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Production-Ready{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Python Code
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Every controller follows Frappe best practices — separation of concerns, proper validation, workflow integration, and ERPNext accounting hooks.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-4">
          {/* File list */}
          <div className="space-y-2">
            {codeFiles.map((file, i) => (
              <button
                key={i}
                onClick={() => setActiveFile(i)}
                className={`w-full text-left rounded-xl border px-4 py-3 transition-all ${
                  activeFile === i
                    ? 'bg-amber-500/20 border-amber-500/50 text-white'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{file.icon}</span>
                  <span className="font-mono text-sm">{file.name}</span>
                </div>
                <div className="text-xs text-gray-600 mt-1 font-mono">{file.path}</div>
                <div className="text-xs text-gray-500 mt-1">{file.description}</div>
              </button>
            ))}
          </div>

          {/* Code viewer */}
          <div className="lg:col-span-3 bg-gray-950 rounded-2xl border border-white/10 overflow-hidden">
            <div className="px-4 py-3 bg-white/5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <span className="text-gray-400 text-xs font-mono ml-2">
                  {current.path}{current.name}
                </span>
              </div>
              <button
                onClick={() => downloadPython(current.name, current.code)}
                className="text-xs bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-lg hover:bg-amber-500/30 transition-colors"
              >
                📥 Download
              </button>
            </div>
            <div className="overflow-auto max-h-[600px]">
              <pre className="p-6 text-xs text-gray-300 leading-relaxed whitespace-pre font-mono">
                <code>{current.code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
