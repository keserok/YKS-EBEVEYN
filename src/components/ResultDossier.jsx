import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Lock,
  Star,
  X,
  Download,
  ChevronDown,
  BookOpen
} from "lucide-react";
import LegalModal from "./common/LegalModal";
import { trackInitiateCheckout } from "../utils/metaPixel";

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

  // Payment & Direct Transfer State
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);

  // Legal Modal State
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState("mesafeli");
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [termsError, setTermsError] = useState(false);

  const parentName = leadData?.parentName || leadData?.agencyName || "Değerli Velimiz";
  const studentBranch = leadData?.studentBranch || "12. Sınıf";
  const scorePercent = packageResult?.scorePercent || 70;

  // Ref for Smooth Snap Scroll to Checkout Dossier
  const checkoutRef = useRef(null);
  const hasSnappedRef = useRef(false);

  // Automatic Snap Scroll Listener (Triggers once when user starts scrolling down)
  useEffect(() => {
    const handleScroll = () => {
      if (!hasSnappedRef.current && window.scrollY > 35 && window.scrollY < 400) {
        hasSnappedRef.current = true;
        checkoutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const handleWheel = (e) => {
      if (!hasSnappedRef.current && e.deltaY > 15 && window.scrollY < 300) {
        hasSnappedRef.current = true;
        checkoutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const triggerHaptic = (duration = 15) => {
    if (typeof window !== "undefined" && window.navigator?.vibrate) {
      try {
        window.navigator.vibrate(duration);
      } catch {}
    }
  };

  const scrollToCheckout = () => {
    triggerHaptic(18);
    hasSnappedRef.current = true;
    checkoutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const SHOPIER_URL = "https://www.shopier.com/50831713";

  // Direct 1-tap transfer to Shopier checkout
  const handleDirectShopierTransfer = () => {
    triggerHaptic(30);
    setIsRedirecting(true);
    setIsPurchased(true);

    // Meta Pixel Conversion Event: InitiateCheckout
    trackInitiateCheckout({ value: 299, currency: "TRY" });

    // Studio-grade redirect: smooth micro-interaction feedback then direct transfer
    setTimeout(() => {
      window.location.href = SHOPIER_URL;
    }, 350);
  };

  const handleShopierPurchase = () => {
    handleDirectShopierTransfer();
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

        {/* 2.2 VURUCU KLİNİK TAVSİYELER & KRİZ KURALLARI (3 Net Kart) */}
        <div className="my-6 sm:my-8 space-y-4">
          <div className="flex items-center justify-between gap-2 px-1 border-b border-white/10 pb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold">
              02 / Acil Klinik Eylem Reçetesi
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Uygulama: Anında
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. NE YAPMAMALISINIZ (KRİTİK TUZAK) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#140C0F] border border-rose-500/30 shadow-lg relative flex flex-col justify-between">
              <div>
                <div className="border-l-2 border-rose-500 pl-2.5 text-rose-400 font-mono text-xs font-bold uppercase tracking-widest mb-3">
                  Ne Yapmamalısınız?
                </div>
                <h4 className="font-serif text-lg sm:text-xl text-white font-medium mb-2 leading-snug">
                  Kritik İletişim Tuzağı
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {packageResult?.invisibleTrap}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-rose-500/20 text-[11px] font-mono text-rose-300 font-medium">
                Kaçış refleksi ve sahte çalışmayı tetikler.
              </div>
            </div>

            {/* 2. NE YAPMALISINIZ (ACİL ATEŞKES) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0B1511] border border-emerald-500/30 shadow-lg relative flex flex-col justify-between">
              <div>
                <div className="border-l-2 border-emerald-500 pl-2.5 text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest mb-3">
                  Bu Akşam Ne Yapmalısınız?
                </div>
                <h4 className="font-serif text-lg sm:text-xl text-white font-medium mb-2 leading-snug">
                  Acil Ateşkes Hamlesi
                </h4>
                <ul className="text-xs sm:text-sm text-slate-300 font-light space-y-2 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{packageResult?.prescriptions?.[0] || "Deneme akşamı ilk 4 saat tam sessizlik uygulayın."}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{packageResult?.prescriptions?.[1] || "Odayı gencin kutsal egemenlik alanı ilan edin."}</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-500/20 text-[11px] font-mono text-emerald-300 font-medium">
                Güvenli liman hissi yaratır ve direnci kırar.
              </div>
            </div>

            {/* 3. GENCİN İÇ DÜNYASI (PSİKOLOJİK GERÇEK) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#17130B] border border-amber-500/30 shadow-lg relative flex flex-col justify-between">
              <div>
                <div className="border-l-2 border-amber-500 pl-2.5 text-amber-400 font-mono text-xs font-bold uppercase tracking-widest mb-3">
                  Gencin İç Dünyası
                </div>
                <h4 className="font-serif text-lg sm:text-xl text-white font-medium mb-2 leading-snug">
                  Sessiz Çığlık
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {packageResult?.teenImpact}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-amber-500/20 text-[11px] font-mono text-amber-300 font-medium">
                Sınavdan değil, hayal kırıklığı yaratmaktan korkuyor.
              </div>
            </div>
          </div>
        </div>

        {/* 2.3 DOĞRUDAN SATIN ALMA ANKASI */}
        <div className="my-6 sm:my-8 text-center">
          <button
            type="button"
            onClick={scrollToCheckout}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-gold via-gold-shimmer to-gold text-obsidian font-bold text-xs sm:text-sm uppercase tracking-widest transition-all shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_8px_35px_rgba(212,175,55,0.55)] cursor-pointer active:scale-98"
          >
            <span>Çözüm Protokollerine & Satın Almaya İn</span>
            <ChevronDown className="w-4 h-4 text-obsidian group-hover:translate-y-0.5 transition-transform shrink-0" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 3. DÖNÜŞÜM MOTORU: TEK VE NET SATIN ALMA BÖLÜMÜ (#checkout-dossier)       */}
        {/* ========================================================================= */}
        <div
          ref={checkoutRef}
          id="checkout-dossier"
          className="my-8 scroll-mt-6 p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-gold/15 via-black/95 to-obsidian border-2 border-gold shadow-[0_20px_70px_rgba(212,175,55,0.3)] relative overflow-hidden"
        >
          {/* Top Discount Headline */}
          <div className="text-center mb-6">
            <span className="inline-block py-1 text-rose-400 font-mono text-xs sm:text-sm font-bold uppercase tracking-widest border-b border-rose-500/40 mb-3">
              %40 TESTİ TAMAMLAYANLARA ÖZEL İNDİRİM • 15 DAKİKA GEÇERLİ
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-white font-medium tracking-tight mb-2">
              Kaostan Düzene: YKS Ebeveyn Rehberi
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light max-w-lg mx-auto">
              Evinizdeki sınav yangınını söndürecek 10 bölümlük klinik başucu e-kitabı ve yazdırılabilir kriz protokolleri.
            </p>
          </div>

          {/* Book Mockup & Deliverables Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-6 pb-6 border-b border-white/10">
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative group max-w-[220px] sm:max-w-[260px]">
                <div className="absolute -inset-3 bg-gradient-to-r from-gold/40 to-amber-600/30 rounded-3xl blur-xl opacity-80" />
                <div className="relative rounded-2xl overflow-hidden border-2 border-gold/60 shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
                  <img
                    src="/kaostan_duzene_book.jpg"
                    alt="Kaostan Düzene Kitap Mockup"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              <span className="text-[11px] font-mono text-gold-light font-bold mt-2.5 flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" /> PDF Olarak Anında İndirilir
              </span>
            </div>

            <div className="md:col-span-7 space-y-3 text-left">
              <span className="text-xs font-mono uppercase font-bold text-gold tracking-wider block mb-1">
                Pakete Dahil Olan Tüm İçerikler:
              </span>

              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white text-xs sm:text-sm block">
                    10 Bölümlük Klinik E-Kitap (PDF)
                  </strong>
                  <span className="text-[11px] sm:text-xs text-slate-300 font-light">
                    Jordan Peterson ekolünden; pazar akşamı krizlerinden sirkadiyen uyku intizamına evdeki sınav stresini bitiren rehber.
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-gold/10 border border-gold/30 flex items-start gap-3">
                <span className="text-lg shrink-0">🎁</span>
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-white text-xs sm:text-sm block">
                      Bonus 1: Deneme Sonrası 24 Saat Kriz Tablosu
                    </strong>
                    <span className="text-[10px] font-mono font-bold text-gold-light uppercase bg-gold/20 px-2 py-0.5 rounded">
                      Değer: ₺150
                    </span>
                  </div>
                  <span className="text-[11px] sm:text-xs text-slate-300 font-light">
                    İlk 4 saat tam sessizlik ve pazar kavgalarını bıçak gibi kesen somut protokol.
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-gold/10 border border-gold/30 flex items-start gap-3">
                <span className="text-lg shrink-0">🎁</span>
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-white text-xs sm:text-sm block">
                      Bonus 2: İmzalanabilir Oda Egemenlik Sözleşmesi
                    </strong>
                    <span className="text-[10px] font-mono font-bold text-gold-light uppercase bg-gold/20 px-2 py-0.5 rounded">
                      Değer: ₺100
                    </span>
                  </div>
                  <span className="text-[11px] sm:text-xs text-slate-300 font-light">
                    Gencin özerkliğini koruyan, kapı dinlemeleri ve teftişleri sonlandıran resmi sözleşme metni.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & High-Converting CTA Box */}
          <div className="text-center max-w-md mx-auto space-y-4">
            <div className="flex items-center justify-center gap-4">
              <span className="text-2xl sm:text-3xl text-slate-400 line-through font-serif decoration-rose-500 decoration-2">
                499 ₺
              </span>
              <span className="text-5xl sm:text-7xl font-bold font-serif text-gold-light tracking-tight drop-shadow-[0_0_30px_rgba(212,175,55,0.6)]">
                299 ₺
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Ödemenizi tamamladığınız anda PDF rehberiniz ekranda anında indirmeye açılır ve e-posta adresinize gönderilir. WhatsApp veya herhangi bir bekleme süreci yoktur.
            </p>

            <button
              type="button"
              onClick={handleDirectShopierTransfer}
              disabled={isRedirecting}
              className="w-full py-5 px-8 rounded-2xl bg-gradient-to-r from-gold via-gold-shimmer to-gold text-obsidian font-bold text-base sm:text-lg tracking-widest uppercase transition-all shadow-[0_15px_45px_rgba(212,175,55,0.5)] hover:shadow-[0_20px_60px_rgba(212,175,55,0.7)] cursor-pointer active:scale-98 flex items-center justify-center gap-3"
            >
              {isRedirecting ? (
                <>
                  <div className="w-5 h-5 border-2 border-obsidian border-t-transparent rounded-full animate-spin" />
                  <span>Shopier'a Aktarılıyor...</span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 text-obsidian shrink-0" />
                  <span>Shopier ile Güvenli Satın Al & İndir (299 ₺)</span>
                  <ArrowRight className="w-5 h-5 text-obsidian shrink-0" />
                </>
              )}
            </button>

            <div className="text-[11px] text-slate-400 text-center pt-1 font-light leading-relaxed">
              <span>Devam ederek </span>
              <button
                type="button"
                onClick={() => openLegal("onbilgi")}
                className="text-gold underline hover:text-gold-light cursor-pointer font-medium"
              >
                Ön Bilgilendirme
              </button>
              <span> ve </span>
              <button
                type="button"
                onClick={() => openLegal("mesafeli")}
                className="text-gold underline hover:text-gold-light cursor-pointer font-medium"
              >
                Mesafeli Satış Sözleşmesi
              </button>
              <span> şartlarını kabul etmiş sayılırsınız.</span>
            </div>

            <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300 font-mono">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Anında PDF İndir
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-gold">
                <Lock className="w-3.5 h-3.5" /> 256-Bit SSL & 3D Secure
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-sky-400">
                <ShieldCheck className="w-3.5 h-3.5" /> Shopier Güvencesi
              </span>
              <span>•</span>
              <span className="text-slate-400">30 Gün İade</span>
            </div>
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

          {/* RESTART & LEGAL FOOTER (100% Shopier Compliance) */}
          <div className="pt-8 border-t border-white/10 flex flex-col items-center gap-4 text-center">
            <button
              type="button"
              onClick={onRestart}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Testi Baştan Çöz</span>
            </button>

            {/* Legal Links Bar - 100% Shopier Compliance */}
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

            {/* Payment Scheme & Shopier Security Trust Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <div className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-2">
                <span className="font-bold italic text-blue-400 text-xs tracking-wider">VISA</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500 opacity-90" />
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-400 opacity-90" />
                </div>
                <span className="font-semibold text-white text-[11px]">Mastercard</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-1.5">
                <span className="font-bold text-red-400 text-xs tracking-wide">TROY</span>
              </div>
              <div className="px-4 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-emerald-400 text-xs font-mono font-medium shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Shopier Güvencesi</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-gold/10 border border-gold/30 flex items-center gap-2 text-gold text-xs font-mono">
                <Lock className="w-3.5 h-3.5" />
                <span>256-Bit SSL 3D Secure</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 font-mono max-w-xl mx-auto leading-relaxed pt-1">
              Tüm ödemeleriniz Shopier Güvenli Ödeme altyapısı ile 256-Bit SSL şifreleme ve 3D Secure SMS doğrulaması altında korunur. 6502 Sayılı Tüketicinin Korunması Kanunu ve Mesafeli Sözleşmeler Yönetmeliği'ne %100 uygundur.
            </p>
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
                    ÖDEME MERKEZİ
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white tracking-tight">
                    Shopier Güvenli Sayfası Açıldı
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xs mx-auto leading-relaxed">
                    299 ₺ ödemenizi Shopier üzerinde tamamladığınız anda PDF rehberiniz ekranda anında indirmeye açılır ve e-posta adresinize otomatik iletilir.
                  </p>

                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono text-left space-y-1">
                    <div className="flex items-center gap-2 font-bold text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Sıfır Bekleme • Doğrudan Teslimat</span>
                    </div>
                    <p className="text-[11px] text-slate-300 pl-6 leading-relaxed">
                      WhatsApp veya herhangi bir manuel onay süreci yoktur; ödeme onaylandığı an PDF dosyanız cihazınıza anında indirilebilir olacaktır.
                    </p>
                  </div>

                  <div className="pt-3 space-y-2">
                    <button
                      type="button"
                      onClick={() => {
                        triggerHaptic(20);
                        window.location.href = SHOPIER_URL;
                      }}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-gold via-gold-shimmer to-gold text-obsidian font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4 text-obsidian shrink-0" />
                      <span>Shopier Ödeme Sayfasına Git</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowCheckoutModal(false);
                        setIsPurchased(false);
                      }}
                      className="text-xs text-slate-400 hover:text-white pt-2 inline-block cursor-pointer font-mono"
                    >
                      Kapat ve Rapora Dön
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

      {/* 6. STUDIO MOBILE STICKY FLOATING CTA BAR (ui-ux-pro-max) */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 px-4 py-3 bg-[#0B0C10]/95 backdrop-blur-2xl border-t border-gold/30 shadow-[0_-12px_40px_rgba(0,0,0,0.9)] flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold font-serif text-gold-light">
              299 ₺
            </span>
            <span className="text-xs text-slate-500 line-through">
              499 ₺
            </span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Anında PDF İndir
          </span>
        </div>

        <button
          type="button"
          onClick={handleDirectShopierTransfer}
          disabled={isRedirecting}
          className="py-3 px-5 rounded-xl bg-gradient-to-r from-gold via-gold-shimmer to-gold text-obsidian font-bold text-xs uppercase tracking-wider shadow-[0_4px_25px_rgba(212,175,55,0.45)] active:scale-95 flex items-center gap-2 cursor-pointer shrink-0"
        >
          {isRedirecting ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-obsidian border-t-transparent rounded-full animate-spin" />
              <span>Aktarılıyor...</span>
            </>
          ) : (
            <>
              <Lock className="w-3.5 h-3.5 text-obsidian shrink-0" />
              <span>Hemen İndir</span>
              <ArrowRight className="w-3.5 h-3.5 text-obsidian shrink-0" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
