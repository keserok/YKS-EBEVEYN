import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, GraduationCap, ArrowRight, ShieldCheck, Sparkles, Lock } from "lucide-react";

export default function LeadGate({ onProceed, onSecretAdminTrigger }) {
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [studentBranch, setStudentBranch] = useState("12. Sınıf - Sayısal");
  const [errorMsg, setErrorMsg] = useState("");

  const isValid = parentName.trim().length >= 2 && phone.trim().length >= 7;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) {
      setErrorMsg("Lütfen adınızı ve telefon numaranızı eksiksiz doldurunuz.");
      return;
    }

    const cleanName = parentName.trim();
    const cleanPhone = phone.trim();

    if (
      (cleanName.toLowerCase() === "media" || cleanName.toLowerCase() === "admin") &&
      cleanPhone === "0000"
    ) {
      onSecretAdminTrigger();
      return;
    }

    if (typeof window !== "undefined" && window.navigator?.vibrate) {
      try {
        window.navigator.vibrate(22);
      } catch {}
    }

    onProceed({
      parentName: cleanName,
      agencyName: cleanName,
      phone: cleanPhone,
      studentBranch
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-10 z-20 overflow-hidden">
      {/* Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-b from-gold/20 via-gold/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg luxury-glass p-6 sm:p-10 rounded-3xl border border-gold/40 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95)] relative overflow-hidden"
      >
        <div className="absolute top-0 inset-x-10 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-90 pointer-events-none" />

        <div className="text-center mb-6 pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-xs font-mono font-bold tracking-wider text-emerald-400 mb-3 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>%100 ANALİZ TAMAMLANDI</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl text-white font-medium tracking-tight mb-2">
            Ebeveyn Karnenizi Açın
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            % Yetkinlik Skorunuz ve Arketip Raporunuz hazırlandı. Karnenizi görüntülemek için bilgilerinizi doğrulayın:
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 relative z-10">
          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-widest text-slate-300 font-semibold">
              Adınız ve Soyadınız
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gold">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={parentName}
                onChange={(e) => {
                  setParentName(e.target.value);
                  if (errorMsg) setErrorMsg("");
                }}
                placeholder="Örn: Ayşe Yılmaz veya Burak Berkan"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/60 border border-white/20 focus:border-gold focus:bg-black/80 text-base text-white placeholder-slate-500 outline-none transition-all shadow-inner"
                autoFocus
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-widest text-slate-300 font-semibold">
              Telefon Numaranız
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gold">
                <Phone className="w-5 h-5" />
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errorMsg) setErrorMsg("");
                }}
                placeholder="05XX XXX XX XX"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/60 border border-white/20 focus:border-gold focus:bg-black/80 text-base text-white placeholder-slate-500 outline-none transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-widest text-slate-300 font-semibold">
              Çocuğunuzun Durumu / Alanı
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <select
                value={studentBranch}
                onChange={(e) => setStudentBranch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#111317] border border-white/20 focus:border-gold text-base text-white outline-none transition-all shadow-inner cursor-pointer"
              >
                <option value="12. Sınıf - Sayısal">12. Sınıf — Sayısal</option>
                <option value="12. Sınıf - Eşit Ağırlık">12. Sınıf — Eşit Ağırlık</option>
                <option value="Mezun Grubu - Sayısal">Mezun Grubu — Sayısal</option>
                <option value="Mezun Grubu - Eşit Ağırlık">Mezun Grubu — Eşit Ağırlık</option>
                <option value="11. Sınıf">11. Sınıf</option>
                <option value="Sözel / Dil">Sözel / Yabancı Dil</option>
              </select>
            </div>
          </div>

          {errorMsg && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs sm:text-sm text-rose-400 font-semibold text-center"
            >
              {errorMsg}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full flex items-center justify-center gap-3 py-5 sm:py-5.5 px-8 rounded-2xl sm:rounded-3xl font-bold text-lg sm:text-xl tracking-wider sm:tracking-widest uppercase transition-all duration-300 mt-3 active:scale-[0.98] ${
              isValid
                ? "bg-[linear-gradient(110deg,#F59E0B,25%,#FEF08A,50%,#EAB308,75%,#F59E0B)] bg-[length:250%_100%] animate-shimmer text-obsidian shadow-[0_12px_45px_rgba(234,179,8,0.45)] hover:shadow-[0_18px_60px_rgba(234,179,8,0.7)] cursor-pointer"
                : "bg-white/10 text-slate-500 cursor-not-allowed opacity-60"
            }`}
          >
            <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-obsidian shrink-0" />
            <span>Karnemi & Raporumu Aç</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-obsidian shrink-0" />
          </button>

          <div className="flex items-center justify-center gap-2 pt-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Bilgileriniz %100 gizli tutulur.</span>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
