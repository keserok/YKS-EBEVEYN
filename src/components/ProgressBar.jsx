import React from "react";
import { motion } from "framer-motion";

export default function ProgressBar({ currentStep, totalSteps, parentName }) {
  const progressPercent = ((currentStep) / totalSteps) * 100;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-obsidian/80 backdrop-blur-md border-b border-white/5">
      {/* Top Animated Gold Progress Line */}
      <div className="w-full h-[3px] bg-white/5 relative overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-gold via-gold-shimmer to-gold-bronze relative"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle Lead Pulse Glow on the tip */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gold blur-[4px] animate-pulse" />
        </motion.div>
      </div>

      {/* Top Navigation Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Left: Brand Monogram & Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-gold/40 bg-black/90 flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.25)] p-0.5">
            <img
              src="/luxury_pen_icon.jpg"
              alt="Kaostan Düzene"
              className="w-full h-full object-contain filter brightness-110"
            />
          </div>
          <span className="font-cinzel text-xs sm:text-sm font-semibold tracking-epic text-gold">KAOSTAN DÜZENE</span>
          <span className="text-white/20 text-xs font-light hidden sm:inline">|</span>
          <span className="text-[11px] font-sans text-architectural-muted tracking-wider uppercase hidden sm:inline-block">
            YKS Ebeveyn Değerlendirmesi
          </span>
        </div>

        {/* Right: Parent Name & Step Counter */}
        <div className="flex items-center gap-4 z-10">
          {parentName && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs text-architectural-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="font-medium truncate max-w-[160px]">{parentName}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.04] border border-white/10 font-mono text-xs">
            <span className="text-gold font-bold tracking-wider">
              {String(currentStep).padStart(2, "0")}
            </span>
            <span className="text-architectural-subtle">/</span>
            <span className="text-architectural-muted">
              {String(totalSteps).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
