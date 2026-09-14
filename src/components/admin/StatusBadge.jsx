import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const STATUS_OPTIONS = [
  { label: 'Yeni Talep', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  { label: 'Görüşme Yapıldı', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
  { label: 'Tasarım Hazırlanıyor', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
  { label: 'Canlıya Alındı', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
];

export default function StatusBadge({ status, onStatusChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const currentOption = STATUS_OPTIONS.find(o => o.label === status) || STATUS_OPTIONS[0];

  return (
    <div className="relative inline-block text-left" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${currentOption.color} hover:brightness-110`}
      >
        <span>{status || 'Yeni Talep'}</span>
        <ChevronDown className="w-3 h-3 opacity-70" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-1 w-44 rounded-2xl bg-charcoal-light border border-white/10 shadow-2xl p-1.5 z-40 space-y-1 backdrop-blur-xl">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.label}
                onClick={() => {
                  onStatusChange(opt.label);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-xs rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                  status === opt.label
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-architectural-muted hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{opt.label}</span>
                {status === opt.label && <Check className="w-3.5 h-3.5 text-gold" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
