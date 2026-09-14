import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  Award,
  ArrowRight,
  Lock,
  Star,
  X,
  AlertTriangle,
  HeartHandshake
} from "lucide-react";
import LegalModal from "./common/LegalModal";

export default function ResultDossier({ leadData, packageResult, onRestart }) {
  // 15-minute countdown timer
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // Payment State
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);

  // Legal Modal State
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState("mesafeli");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);

  const parentName = leadData?.parentName || leadData?.agencyName || "Değerli Velimiz";
  const studentBranch = leadData?.studentBranch || "12. Sınıf";
  const scorePercent = packageResult?.scorePercent || 70;

  const triggerHaptic = (duration = 15) => {
    if (typeof window !== "undefined" && window.navigator?.vibrate) {
      try {
        window.navigator.vibrate(duration);
      } catch {}
    }
  };

  const handleStartCheckout = () => {
    triggerHaptic(20);
    setShowCheckoutModal(true);
  };

  const SHOPIER_URL = "https://www.shopier.com/50831713";

  const handleShopierPurchase = () => {
    if (!agreedToTerms) {
      setTermsError(true);
      return;
    }
    triggerHaptic(25);
    window.open(SHOPIER_URL, "_blank");
    setIsPurchased(true);
  };

  const openLegal = (tabId) => {
    setLegalModalTab(tabId);
    setLegalModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 py-12 sm:py-20 z-20 max-w-5xl mx-auto w-full">
      {/* 1. TOP CONFIRMATION BANNER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-gold/15 border border-gold/40 text-xs sm:text-sm font-mono shadow-lg"
      >
        <div className="flex items-center gap-2 text-white font-medium">
          <ShieldCheck className="w-4 h-4 text-gold shrink-0 animate-pulse" />
          <span>Klinik Doğrulama Tamamlandı • Kişisel Analiz Kilidi Açıldı</span>
        </div>
        <div className="flex items-center gap-2 bg-black/60 px-3.5 py-1.5 rounded-xl border border-gold/30 text-white">
          <Clock className="w-4 h-4 text-gold" />
          <span>Lansman İndirimi:</span>
          <strong className="text-gold font-bold text-sm">{formatTimer(timeLeft)}</strong>
        </div>
      </motion.div>

      {/* 2. MAIN REPORT CONTAINER */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="luxury-glass p-5 sm:p-10 rounded-3xl border border-gold/40 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.95)] relative overflow-hidden"
      >
        {/* Psychological Clinical Scanline Laser Reveal (1 pass on mount) */}
        <motion.div
          initial={{ top: "-5%", opacity: 0 }}
          animate={{
            top: ["-5%", "110%"],
            opacity: [0, 0.9, 1, 0.8, 0]
          }}
          transition={{ duration: 1.6, ease: "easeInOut", times: [0, 0.1, 0.5, 0.9, 1] }}
          className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold-shimmer to-transparent shadow-[0_0_20px_rgba(255,224,130,0.9)] pointer-events-none z-30"
        />

        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-90" />

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-mono tracking-widest text-gold uppercase block mb-1">
              YKS EBEVEYNLİK TEŞHİS RAPORU
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-white font-medium tracking-tight">
              Ebeveyn Yetkinlik Karneniz
            </h1>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/[0.05] border border-white/10 text-xs sm:text-sm">
            <span className="text-white font-semibold">{parentName}</span>
            <span className="text-white/30">•</span>
            <span className="text-gold-light font-mono">{studentBranch}</span>
          </div>
        </div>

        {/* 2.1 SKOR VE ARKETİP ALANI */}
        <div className="my-6 sm:my-8 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* Skor Dairesi */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-3xl bg-black/60 border border-gold/30 text-center relative overflow-hidden">
            {/* Clinical Radar Waves behind Score */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0.8 }}
              animate={{ scale: [0.85, 1.35, 1.45], opacity: [0.8, 0.25, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              className="absolute w-36 h-36 rounded-full border border-gold/50 pointer-events-none"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0.5 }}
              animate={{ scale: [0.95, 1.25, 1.35], opacity: [0.5, 0.15, 0] }}
              transition={{ duration: 2.4, delay: 0.7, repeat: Infinity, ease: "easeOut" }}
              className="absolute w-36 h-36 rounded-full border border-gold/30 pointer-events-none"
            />

            <div className="relative w-40 h-40 flex items-center justify-center mb-2 z-10">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  className="text-white/10"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  className="text-gold"
                  strokeWidth="10"
                  strokeDasharray={314}
                  strokeDashoffset={314 - (314 * scorePercent) / 100}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="font-serif text-5xl font-bold text-white tracking-tight">
                  %{scorePercent}
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-light">
                  DİRAYET
                </span>
              </div>
            </div>

            <span className="text-sm font-serif font-medium text-white mt-1">
              {scorePercent >= 80
                ? "Dirayetli Güvenli Liman"
                : scorePercent >= 60
                ? "Orta Dirayet / Gardiyanlık Riski"
                : scorePercent >= 40
                ? "Aşırı Korumacı / Yutan Ebeveyn"
                : "Kritik Eşik / Kronik Baskı"}
            </span>
          </div>

          {/* Arketip Kartı */}
          <div className="lg:col-span-8 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-gold/[0.12] via-white/[0.03] to-transparent border border-gold/40">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs font-mono uppercase tracking-widest text-gold font-semibold">
                Baskın Ebeveyn Türünüz:
              </span>
              <span
                className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase"
                style={{
                  backgroundColor: `${packageResult?.accentColor}25`,
                  color: packageResult?.accentColor,
                  border: `1px solid ${packageResult?.accentColor}60`
                }}
              >
                {packageResult?.badge}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-medium text-white mb-3">
              {packageResult?.title}
            </h2>

            <p className="text-sm sm:text-base font-serif italic text-gold-light/95 leading-relaxed bg-black/40 p-3.5 rounded-2xl border border-white/10 mb-3">
              {packageResult?.quote}
            </p>

            <p className="text-sm sm:text-base text-slate-200 font-light leading-relaxed">
              {packageResult?.diagnosis}
            </p>
          </div>
        </div>

        {/* 2.2 TEHLİKE VE PSİKOLOJİK ETKİ */}
        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30">
            <div className="flex items-center gap-2 mb-2 text-rose-300 text-xs sm:text-sm font-mono font-bold uppercase">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Evinizdeki En Büyük Tuzak</span>
            </div>
            <p className="text-sm sm:text-base text-white/95 leading-relaxed font-light">
              {packageResult?.invisibleTrap}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30">
            <div className="flex items-center gap-2 mb-2 text-amber-300 text-xs sm:text-sm font-mono font-bold uppercase">
              <HeartHandshake className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Gencin Yaşadığı Sessiz Baskı</span>
            </div>
            <p className="text-sm sm:text-base text-white/95 leading-relaxed font-light">
              {packageResult?.teenImpact}
            </p>
          </div>
        </div>

        {/* 2.3 ACİL REÇETE */}
        <div className="my-6 p-5 sm:p-6 rounded-3xl bg-black/60 border border-white/10">
          <h3 className="font-serif text-lg sm:text-2xl text-white mb-3 flex items-center gap-2 font-medium">
            <Award className="w-5 h-5 text-gold shrink-0" />
            <span>Bu Hafta Uygulamanız Gereken 4 Kural</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-200">
            {packageResult?.prescriptions?.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5"
              >
                <span className="w-6 h-6 rounded-lg bg-gold/20 text-gold flex items-center justify-center shrink-0 font-mono font-bold text-xs">
                  {idx + 1}
                </span>
                <span className="leading-snug text-white/90 text-sm sm:text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. SATIŞ VE DÖNÜŞÜM ALANI (IRRESISTIBLE HIGH-CONVERTING OFFER)             */}
        {/* ========================================================================= */}
        <div className="mt-12 pt-10 border-t border-gold/30">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-xs sm:text-sm font-mono font-bold tracking-wider text-gold-light inline-block mb-3">
              BAŞUCU KILAVUZU & PROTOKOLLER
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-medium tracking-tight mb-3">
              Kaostan Düzene: YKS Ebeveyn Rehberi
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
              Yüzeysel tavsiyeler değil; Jordan B. Peterson ekolünden mülhem, evinizi açık hava hapishanesinden güvenli bir limana dönüştürecek klinik rehber.
            </p>
          </div>

          {/* Book Mockup & 5 Core Pillars */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center mb-8">
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group max-w-[260px] sm:max-w-[320px]">
                <div className="absolute -inset-4 bg-gradient-to-r from-gold/30 to-amber-600/25 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="relative rounded-2xl overflow-hidden border-2 border-gold/50 shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
                  <img
                    src="/kaostan_duzene_book.jpg"
                    alt="Kaostan Düzene Kitap Mockup"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="mt-3 text-center">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-gold-light">
                    PDF E-Kitap + Yazdırılabilir Protokoller
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-white mb-3">
                Rehber Size Neler Kazandıracak?
              </h3>

              <div className="space-y-2.5 text-sm sm:text-base">
                {[
                  {
                    title: "Deneme Sonrası 24 Saat Metanet Kuralı",
                    desc: "İlk 4 saat tam sessizlik; pazar akşamı kavgalarını bıçak gibi kesen kriz protokolü."
                  },
                  {
                    title: "Dili Zehirden Arındırma Sözlüğü",
                    desc: "Gardiyan dili ('Kaç soru çözdün?') yerine genci ayağa kaldıran hakikat dili."
                  },
                  {
                    title: "Oda Egemenlik Sözleşmesi (İmzalanabilir)",
                    desc: "Kapıyı dinlemelerin sonu; gencin kendi kaderinin ağırlığını onurla taşıması."
                  },
                  {
                    title: "Biyolojik İntizam & Sirkadiyen Düzen",
                    desc: "Sabit uyanış ve uykudan 60 dk önce dijital karartma ile sinir sistemi koruması."
                  },
                  {
                    title: "Haftalık 2 Saatlik Sınavsız Aile Mabedi",
                    desc: "Evde sınav kelimesini yasaklayarak aile bağlarını yangından sağlam çıkarma."
                  }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10"
                  >
                    <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white font-medium block text-sm sm:text-base">
                        {item.title}
                      </strong>
                      <span className="text-xs sm:text-sm text-slate-300">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2 Ücretsiz Bonus */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-6">
            <div className="p-4 rounded-2xl bg-gold/10 border border-gold/30 flex items-center gap-3.5">
              <span className="text-2xl">🎁</span>
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-gold-light">
                  ÜCRETSİZ BONUS 1 (Değer: ₺150)
                </span>
                <strong className="text-sm sm:text-base text-white block">
                  Deneme Sonrası 24 Saat Kriz Tablosu
                </strong>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gold/10 border border-gold/30 flex items-center gap-3.5">
              <span className="text-2xl">🎁</span>
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-gold-light">
                  ÜCRETSİZ BONUS 2 (Değer: ₺100)
                </span>
                <strong className="text-sm sm:text-base text-white block">
                  İmzalanabilir Oda Egemenlik Sözleşmesi (PDF)
                </strong>
              </div>
            </div>
          </div>

          {/* FİYATLANDIRMA VE SATIN ALMA KUTUSU */}
          <div className="my-8 p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-gold/20 via-black/90 to-obsidian border-2 border-gold shadow-[0_20px_70px_rgba(212,175,55,0.3)] text-center relative">
            <span className="inline-block px-4 py-1.5 rounded-full bg-rose-500/25 border border-rose-500/60 text-rose-300 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 animate-pulse">
              %40 TESTİ TAMAMLAYANLARA ÖZEL İNDİRİM
            </span>

            <h3 className="font-serif text-2xl sm:text-4xl text-white font-medium mb-2">
              Rehber, Protokoller ve Tüm Bonuslar
            </h3>

            <div className="flex items-center justify-center gap-4 my-4">
              <span className="text-2xl sm:text-3xl text-slate-400 line-through font-serif decoration-rose-500 decoration-2">
                499 ₺
              </span>
              <span className="text-5xl sm:text-7xl font-bold font-serif text-gold-light tracking-tight drop-shadow-[0_0_30px_rgba(212,175,55,0.6)]">
                299 ₺
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto mb-6 font-light">
              Ödemenizi tamamladığınız anda PDF rehber anında ekranınıza açılır ve telefonunuza indirilir.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <button
                type="button"
                onClick={handleStartCheckout}
                className="w-full py-5 px-8 rounded-2xl bg-gradient-to-r from-gold via-gold-shimmer to-gold text-obsidian font-bold text-base sm:text-lg tracking-widest uppercase transition-all shadow-[0_15px_45px_rgba(212,175,55,0.5)] hover:shadow-[0_20px_60px_rgba(212,175,55,0.7)] cursor-pointer active:scale-98 flex items-center justify-center gap-3"
              >
                <Lock className="w-5 h-5 text-obsidian" />
                <span>Rehberi Hemen İndir (299 ₺)</span>
                <ArrowRight className="w-5 h-5 text-obsidian" />
              </button>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-5 text-xs text-slate-400 font-mono">
              <span>3D Secure</span>
              <span>•</span>
              <span>256-Bit SSL</span>
              <span>•</span>
              <span>Shopier Güvencesi</span>
              <span>•</span>
              <span>30 Gün İade</span>
            </div>
          </div>

          {/* 30 Gün Garanti */}
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center gap-4 my-6 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-gold/20 border border-gold/40 flex items-center justify-center text-gold shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-medium text-white mb-1">
                %100 Koşulsuz 30 Günlük İade Güvencesi
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Rehberi uyguladığınızda evinizdeki gerilim azalmazsa, 30 gün içinde tek soru sormadan 299 TL’nizi iade ediyoruz.
              </p>
            </div>
          </div>

          {/* Veli Yorumları */}
          <div className="my-8 space-y-4">
            <h4 className="font-serif text-xl sm:text-2xl text-center text-white font-medium mb-4">
              Rehberi Uygulayan Ebeveynler Ne Diyor?
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {[
                {
                  name: "Arzu K. (12. Sınıf Velisi)",
                  text: "Pazar akşamı deneme kavgalarımız 24 saat kuralıyla bıçak gibi kesildi. Oğlum artık odasının kapısını kilitlemiyor."
                },
                {
                  name: "Murat D. (Mezun Velisi)",
                  text: "Komşunun çocuğuyla kıyaslamayı kestiğim gün kızımın netleri artmaya başladı. Gerçek bir aile kurtarma rehberi."
                },
                {
                  name: "Selin H. (12. Sınıf Velisi)",
                  text: "Yutan ebeveyn olduğumu testte gördüm. Sabah uyanma sorumluluğunu ona devrettim, 3 haftada inanılmaz olgunlaştı."
                }
              ].map((rev, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="flex text-gold">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-gold" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 font-serif italic">
                    “{rev.text}”
                  </p>
                  <strong className="text-xs text-white block pt-1 border-t border-white/5 font-mono">
                    {rev.name}
                  </strong>
                </div>
              ))}
            </div>
          </div>

          {/* RESTART & LEGAL FOOTER (Crucial for İyzico Merchant Approval) */}
          <div className="pt-8 border-t border-white/10 flex flex-col items-center gap-4 text-center">
            <button
              type="button"
              onClick={onRestart}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Testi Baştan Çöz</span>
            </button>

            {/* Legal Links Bar - 100% Iyzico Compliance */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-mono text-slate-400">
              <button
                type="button"
                onClick={() => openLegal("mesafeli")}
                className="hover:text-gold transition-colors underline cursor-pointer"
              >
                Mesafeli Satış Sözleşmesi
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => openLegal("onbilgi")}
                className="hover:text-gold transition-colors underline cursor-pointer"
              >
                Ön Bilgilendirme Formu
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => openLegal("teslimat")}
                className="hover:text-gold transition-colors underline cursor-pointer"
              >
                Teslimat & İfa Şartları
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => openLegal("iade")}
                className="hover:text-gold transition-colors underline cursor-pointer"
              >
                30 Gün İade Şartları
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => openLegal("kvkk")}
                className="hover:text-gold transition-colors underline cursor-pointer"
              >
                Gizlilik & KVKK
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => openLegal("firma")}
                className="hover:text-gold transition-colors underline cursor-pointer"
              >
                Firma Bilgileri & İletişim
              </button>
            </div>

            {/* Payment Scheme & Security Trust Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <div className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 flex items-center gap-1.5">
                <span className="font-bold italic text-blue-400 text-xs tracking-wider">VISA</span>
              </div>
              <div className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 flex items-center gap-1.5">
                <div className="flex -space-x-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500 opacity-90" />
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-400 opacity-90" />
                </div>
                <span className="font-semibold text-white text-[11px]">Mastercard</span>
              </div>
              <div className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 flex items-center gap-1">
                <span className="font-bold text-red-400 text-xs tracking-wide">TROY</span>
              </div>
              <div className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 flex items-center gap-1.5 text-emerald-400 text-xs font-mono">
                <ShieldCheck className="w-4 h-4" />
                <span>Shopier Güvenli Ödeme</span>
              </div>
              <div className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 flex items-center gap-1.5 text-gold text-xs font-mono">
                <Lock className="w-3.5 h-3.5" />
                <span>256-Bit SSL 3D Secure</span>
              </div>
            </div>

            <span className="text-[10px] text-slate-500 font-mono">
              6502 Sayılı Tüketicinin Korunması Hakkında Kanun, Mesafeli Sözleşmeler Yönetmeliği ve Shopier Güvenli Ödeme Standartlarına %100 Uygundur.
            </span>
          </div>
        </div>
      </motion.div>

      {/* 4. MODAL: GÜVENLİ SHOPIER ÖDEME */}
      <AnimatePresence>
        {showCheckoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-[420px] luxury-glass p-6 sm:p-8 rounded-3xl border border-gold/30 shadow-[0_20px_70px_rgba(0,0,0,0.95)] relative text-center flex flex-col my-auto"
            >
              {/* Close Button - 44px touch target */}
              <button
                type="button"
                onClick={() => setShowCheckoutModal(false)}
                className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/[0.06] hover:bg-white/10 active:scale-95 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer transition-all"
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>

              {!isPurchased ? (
                <div>
                  {/* Top Minimal Label */}
                  <span className="font-mono text-[11px] tracking-epic text-gold uppercase block mb-3 font-semibold">
                    KAOSTAN DÜZENE
                  </span>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white tracking-tight mb-2">
                    YKS Ebeveyn Rehberi
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-light max-w-xs mx-auto mb-6 leading-relaxed">
                    Klinik e-kitap, kriz yönetimi ve yazdırılabilir protokoller
                  </p>

                  {/* Pricing Display */}
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <span className="text-2xl text-slate-500 line-through font-serif decoration-rose-500/80">
                      499 ₺
                    </span>
                    <span className="text-5xl font-serif font-bold text-gold drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]">
                      299 ₺
                    </span>
                  </div>

                  {/* Minimal Legal Terms Checkbox */}
                  <div className="mb-6 text-left">
                    <label
                      className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer text-xs select-none ${
                        termsError
                          ? "bg-rose-950/20 border-rose-500/60 text-rose-200"
                          : agreedToTerms
                          ? "bg-gold/[0.06] border-gold/40 text-slate-200"
                          : "bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => {
                          setAgreedToTerms(e.target.checked);
                          if (termsError) setTermsError(false);
                        }}
                        className="mt-0.5 w-4 h-4 rounded border-gold/40 text-gold focus:ring-gold bg-black/80 cursor-pointer accent-gold shrink-0"
                      />
                      <span className="leading-relaxed">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openLegal("onbilgi");
                          }}
                          className="text-gold underline hover:text-gold-light font-medium cursor-pointer"
                        >
                          Ön Bilgilendirme
                        </button>{" "}
                        ve{" "}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openLegal("mesafeli");
                          }}
                          className="text-gold underline hover:text-gold-light font-medium cursor-pointer"
                        >
                          Mesafeli Satış Sözleşmesi
                        </button>
                        'ni onaylıyorum.
                      </span>
                    </label>
                    {termsError && (
                      <p className="text-[11px] text-rose-400 text-center mt-1.5 font-medium">
                        Lütfen devam etmek için sözleşmeyi onaylayınız.
                      </p>
                    )}
                  </div>

                  {/* Primary CTA - Shopier Only! */}
                  <button
                    type="button"
                    onClick={handleShopierPurchase}
                    className={`w-full py-4.5 rounded-2xl font-bold text-sm sm:text-base tracking-widest uppercase transition-all shadow-xl active:scale-98 cursor-pointer ${
                      agreedToTerms
                        ? "bg-gradient-to-r from-gold via-gold-shimmer to-gold text-obsidian shadow-[0_10px_35px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_45px_rgba(212,175,55,0.6)]"
                        : "bg-white/[0.08] text-slate-500 border border-white/10 hover:border-white/20"
                    }`}
                  >
                    Shopier ile Güvenli Öde (299 ₺)
                  </button>

                  {/* Minimal Security Footer */}
                  <div className="flex items-center justify-center gap-2.5 pt-5 text-[11px] font-mono text-slate-400">
                    <span>3D Secure</span>
                    <span>•</span>
                    <span>256-Bit SSL</span>
                    <span>•</span>
                    <span>30 Gün İade</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <span className="font-mono text-[11px] tracking-epic text-gold uppercase block font-semibold">
                    ÖDEME SAYFASI
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white tracking-tight">
                    Shopier Ekranı Açıldı
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xs mx-auto leading-relaxed">
                    299 ₺ ödemenizi tamamladığınızda kılavuzunuz ve tüm protokoller SMS ve e-posta ile anında iletilecektir.
                  </p>

                  <div className="pt-3 space-y-2">
                    <button
                      type="button"
                      onClick={() => window.open(SHOPIER_URL, "_blank")}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-gold via-gold-shimmer to-gold text-obsidian font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg active:scale-98 cursor-pointer"
                    >
                      Ödeme Sayfasına Dön
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowCheckoutModal(false);
                        setIsPurchased(false);
                      }}
                      className="text-xs text-slate-400 hover:text-white pt-2 inline-block cursor-pointer font-mono"
                    >
                      Pencereyi Kapat
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. LEGAL MODAL */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        initialTab={legalModalTab}
      />
    </div>
  );
}
