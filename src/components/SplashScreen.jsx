import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Scale } from "lucide-react";

export default function SplashScreen({ onStart }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const lineVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 85
      }
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between px-4 sm:px-8 py-6 sm:py-10 z-20 overflow-hidden">
      {/* Ambient Vignette Backdrop */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-35">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-b from-gold/25 via-gold/10 to-transparent rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/90 to-obsidian/95" />
      </div>

      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-5 max-w-5xl mx-auto w-full">
        {/* Left: Brand Monogram with Luxury Pen Icon */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden border border-gold/40 bg-black/90 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)] p-1">
            <img
              src="/luxury_pen_icon.jpg"
              alt="Kaostan Düzene Kalem Logosu"
              className="w-full h-full object-contain filter brightness-110"
            />
          </div>
          <span className="font-cinzel text-sm sm:text-lg font-bold tracking-epic text-white block">
            KAOSTAN DÜZENE
          </span>
        </div>

        {/* Right: Peterson School Badge */}
        <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-wider text-architectural-muted px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
          <Scale className="w-3.5 h-3.5 text-gold shrink-0" />
          <span className="hidden sm:inline">Jordan B. Peterson Ekolü</span>
          <span className="sm:hidden">Peterson Ekolü</span>
        </div>
      </div>

      {/* Main Hero Container */}
      <div className="max-w-4xl mx-auto w-full my-auto py-8 sm:py-12 text-center flex flex-col items-center">
        {/* Elite Kicker: No box, no icon, pure typography */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs sm:text-sm font-semibold tracking-epic text-gold uppercase mb-4"
        >
          7 ADIMLI EBEVEYN TESTİ
        </motion.div>

        {/* Headline: Clean 2-Line Architecture with Visible '?' */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-serif text-4xl sm:text-7xl md:text-8xl font-normal leading-[1.12] tracking-tight text-white mb-6 select-none"
        >
          <div className="overflow-hidden pb-1">
            <motion.span variants={lineVariants} className="inline-block text-white">
              Nasıl bir YKS
            </motion.span>
          </div>
          <div className="overflow-visible pt-1 pr-6 sm:pr-8 inline-block">
            <motion.span
              variants={lineVariants}
              className="inline-block italic font-serif text-gold drop-shadow-[0_0_35px_rgba(212,175,55,0.45)] whitespace-nowrap"
            >
              ebeveynisin?
            </motion.span>
          </div>
        </motion.h1>

        {/* Core Peterson Manifesto - Significantly Larger */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="space-y-5 max-w-3xl mx-auto mb-10 px-2"
        >
          <p className="text-lg sm:text-2xl text-white font-light leading-relaxed">
            Sınav senesinde evladınızın <span className="text-gold font-semibold">güvenli limanı</span> mısınız, 
            yoksa farkında olmadan onu boğan bir <span className="text-rose-400 font-semibold">gardiyanı</span> mı?
          </p>

          <p className="text-base sm:text-2xl md:text-3xl text-slate-100 font-serif italic max-w-2xl mx-auto leading-relaxed text-center drop-shadow-sm font-normal">
            “Çocuğunuzu sınavın dehşetinden koruyamazsınız. Yapabileceğiniz tek şey; 
            onu bu fırtınayla yüzleşecek kadar yetkin, cesur ve dürüst kılmaktır.”
          </p>
        </motion.div>

        {/* Big CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            if (typeof window !== "undefined" && window.navigator?.vibrate) {
              try { window.navigator.vibrate(20); } catch {}
            }
            onStart();
          }}
          className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-4 px-8 sm:px-14 py-4.5 sm:py-5 rounded-2xl bg-gradient-to-r from-gold via-gold-shimmer to-gold text-obsidian font-bold text-base sm:text-lg tracking-luxury uppercase transition-all duration-300 shadow-[0_15px_45px_rgba(212,175,55,0.35)] hover:shadow-[0_20px_60px_rgba(212,175,55,0.55)] cursor-pointer active:scale-95"
        >
          <span className="relative z-10 text-obsidian font-bold">
            Testi Başlat & Karneni Gör
          </span>
          <div className="relative z-10 w-9 h-9 rounded-xl bg-black/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-5 h-5 text-obsidian" />
          </div>
        </motion.button>
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto w-full pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-architectural-subtle text-center sm:text-left">
        <div className="flex items-center gap-2 tracking-wider text-[11px] text-slate-400">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span>7 Senaryo • 3 Dakika • Anında Kişisel Teşhis</span>
        </div>
        <div className="font-mono text-[10px] text-architectural-muted/60">
          KAOSTAN DÜZENE • YKS EBEVEYN REHBERİ © 2026
        </div>
      </div>
    </div>
  );
}
