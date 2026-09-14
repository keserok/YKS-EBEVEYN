import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  HeartHandshake,
  Target,
  Layers,
  Sparkles,
  SlidersHorizontal,
  AlertCircle,
  Eye,
  Award,
  Users,
  Flame,
  Box,
  Compass,
  MoonStar,
  Zap,
  BookOpen,
  Check
} from "lucide-react";

const ICON_MAP = {
  ShieldCheck,
  HeartHandshake,
  Target,
  Layers,
  Sparkles,
  SlidersHorizontal,
  AlertCircle,
  Eye,
  Award,
  Users,
  Flame,
  Box,
  Compass,
  MoonStar,
  Zap,
  BookOpen
};

export default function StepCard({
  option,
  isSelected,
  onSelect
}) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, mouseX: 50, mouseY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const IconComponent = ICON_MAP[option.icon] || Sparkles;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    const mouseXPercent = (x / rect.width) * 100;
    const mouseYPercent = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, mouseX: mouseXPercent, mouseY: mouseYPercent });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, mouseX: 50, mouseY: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(option.value)}
      whileTap={{ scale: 0.98 }}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        transition: isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
      className={`relative group cursor-pointer rounded-2xl sm:rounded-3xl p-5 sm:p-7 transition-all duration-300 flex flex-col justify-between overflow-hidden border select-none ${
        isSelected
          ? "bg-gradient-to-b from-gold/[0.18] via-gold/[0.08] to-black/80 border-gold shadow-[0_15px_45px_-10px_rgba(212,175,55,0.45)] ring-2 ring-gold"
          : "bg-white/[0.03] hover:bg-white/[0.07] border-white/15 hover:border-gold/50 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.8)]"
      }`}
    >
      {/* Specular Radial Glow */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl transition-opacity duration-300 opacity-80"
          style={{
            background: `radial-gradient(400px circle at ${tilt.mouseX}% ${tilt.mouseY}%, rgba(212, 175, 55, 0.18), transparent 70%)`
          }}
        />
      )}

      {/* Top Bar: Letter, Badge & Check Indicator */}
      <div className="relative z-10 flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <span
            className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs sm:text-sm font-bold tracking-wider transition-all ${
              isSelected
                ? "bg-gold text-obsidian shadow-[0_0_15px_rgba(212,175,55,0.6)] scale-105"
                : "bg-white/10 text-architectural-white group-hover:bg-gold/20 group-hover:text-gold-light"
            }`}
          >
            {option.id}
          </span>

          {option.badge && (
            <span
              className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono font-medium tracking-wider uppercase border transition-colors ${
                isSelected
                  ? "bg-gold/20 border-gold/50 text-gold-light font-semibold"
                  : "bg-white/[0.05] border-white/10 text-architectural-muted group-hover:border-gold/40 group-hover:text-gold-light"
              }`}
            >
              {option.badge}
            </span>
          )}
        </div>

        {/* Check Indicator */}
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 ${
            isSelected
              ? "bg-gold border-gold text-obsidian shadow-[0_0_12px_rgba(212,175,55,0.5)] scale-110"
              : "border-white/25 bg-black/50 group-hover:border-gold/60"
          }`}
        >
          {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
        </div>
      </div>

      {/* Middle Section: Title & One-line Punchy Meaning */}
      <div className="relative z-10 my-2 space-y-2">
        <div className="flex items-start gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 mt-0.5 transition-colors ${
              isSelected
                ? "bg-gold/25 border-gold text-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                : "bg-white/[0.05] border-white/15 text-architectural-muted group-hover:text-gold group-hover:border-gold/40"
            }`}
          >
            <IconComponent className="w-5 h-5" />
          </div>

          <h3
            className={`font-serif text-lg sm:text-2xl font-medium leading-snug tracking-tight transition-colors ${
              isSelected
                ? "text-white drop-shadow-[0_1px_10px_rgba(212,175,55,0.2)]"
                : "text-white/95 group-hover:text-white"
            }`}
          >
            {option.title}
          </h3>
        </div>

        <p
          className={`text-sm sm:text-base font-light leading-relaxed pl-13 transition-colors ${
            isSelected ? "text-slate-100 font-normal" : "text-slate-300 group-hover:text-slate-200"
          }`}
        >
          {option.desc}
        </p>
      </div>

      {/* Bottom Selection Status */}
      <div className="relative z-10 pt-3 mt-2 border-t border-white/5 flex items-center justify-between text-xs">
        <span className="font-mono text-[11px] text-architectural-subtle uppercase">
          {isSelected ? "Seçilen Cevap" : "Seçmek için dokun"}
        </span>
        <span
          className={`font-semibold tracking-wider transition-colors ${
            isSelected ? "text-gold" : "text-architectural-muted group-hover:text-gold-light"
          }`}
        >
          {isSelected ? "SEÇİLDİ ✓" : "SEÇ"}
        </span>
      </div>
    </motion.div>
  );
}
