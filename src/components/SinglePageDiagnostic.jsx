import React, { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { STEPS_DATA } from "../data/stepsData";
import { calculatePackage } from "../utils/algorithm";
import ResultDossier from "./ResultDossier";
import { trackQuizStart, trackLead, trackViewContent } from "../utils/metaPixel";

const BRANCH_OPTIONS = [
  "12. Sınıf — Sayısal",
  "12. Sınıf — Eşit Ağırlık",
  "Mezun Grubu — Sayısal",
  "Mezun Grubu — Eşit Ağırlık",
  "11. Sınıf",
  "Sözel / Dil"
];

export default function SinglePageDiagnostic({ onSaveLead, onSecretAdminTrigger }) {
  // Answers state for the 4 questions: { 1: "val", 2: "val", 3: "val", 4: "val" }
  const [answers, setAnswers] = useState({});
  const [studentBranch, setStudentBranch] = useState("");

  // Result state
  const [isRevealed, setIsRevealed] = useState(false);
  const [packageResult, setPackageResult] = useState(null);
  const [leadData, setLeadData] = useState(null);

  // Navigation refs
  const questionsRef = useRef(null);
  const branchSectionRef = useRef(null);
  const resultRef = useRef(null);
  const logoClicksRef = useRef(0);

  const answeredCount = Object.keys(answers).length;
  const isAllQuestionsAnswered = answeredCount === 4;

  const triggerHaptic = (ms = 16) => {
    if (typeof window !== "undefined" && window.navigator?.vibrate) {
      try {
        window.navigator.vibrate(ms);
      } catch {}
    }
  };

  // Header-offset aware smooth scrolling (optimized for mobile sticky header)
  const scrollToId = (id, offset = 65) => {
    const el = document.getElementById(id);
    if (!el) return;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  };

  const handleScrollToQuestions = () => {
    triggerHaptic(20);
    trackQuizStart();
    scrollToId("diagnostic-questions", 65);
  };

  const handleSelectOption = (stepId, value) => {
    triggerHaptic(14);
    const updatedAnswers = { ...answers, [stepId]: value };
    setAnswers(updatedAnswers);

    // Auto-advance with thumb ergonomic offset
    if (stepId < 4) {
      setTimeout(() => {
        scrollToId(`question-card-${stepId + 1}`, 65);
      }, 100);
    } else {
      // 4th question completed -> smooth slide to branch selector
      setTimeout(() => {
        scrollToId("branch-selector-section", 65);
      }, 130);
    }
  };

  const handleSelectBranchAndReveal = (selectedBranch) => {
    triggerHaptic(28);
    setStudentBranch(selectedBranch);

    if (!isAllQuestionsAnswered) {
      scrollToId("diagnostic-questions", 65);
      return;
    }

    const calculatedResult = calculatePackage(answers);
    setPackageResult(calculatedResult);

    const info = {
      parentName: "Değerli Velimiz",
      agencyName: "Değerli Velimiz",
      studentBranch: selectedBranch
    };
    setLeadData(info);

    if (onSaveLead) {
      onSaveLead({
        parentName: "Değerli Velimiz",
        phone: "Doğrudan Sipariş",
        studentBranch: selectedBranch,
        packageResult: calculatedResult,
        answers
      });
    }

    // Meta Pixel Conversion Events
    trackLead({ studentBranch: selectedBranch });
    trackViewContent({
      title: calculatedResult.title,
      archetype: calculatedResult.dominantArchetype
    });

    setIsRevealed(true);

    // Smooth glide directly into result & purchase section
    setTimeout(() => {
      scrollToId("result-section", 30);
    }, 120);
  };

  const handleRestart = () => {
    setAnswers({});
    setStudentBranch("");
    setIsRevealed(false);
    setPackageResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogoClick = () => {
    logoClicksRef.current += 1;
    if (logoClicksRef.current >= 5) {
      logoClicksRef.current = 0;
      if (onSecretAdminTrigger) onSecretAdminTrigger();
    }
  };

  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-gold/30 selection:text-gold-light pb-24 overflow-x-hidden">
      {/* 1. TOP EDITORIAL HEADER - COMPACT & MOBILE OPTIMIZED */}
      <header className="px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#0B0C10]/95 backdrop-blur-xl sticky top-0 z-30 transition-all">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 text-left cursor-default outline-none touch-manipulation"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg overflow-hidden border border-gold/40 bg-black flex items-center justify-center p-0.5 shadow-sm">
              <img
                src="/luxury_pen_icon.jpg"
                alt="Kaostan Düzene"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-cinzel text-xs sm:text-base font-bold tracking-widest text-white">
              KAOSTAN DÜZENE
            </span>
          </button>

          <span className="text-[10px] sm:text-xs font-mono tracking-wider uppercase text-slate-400">
            Klinik Protokol
          </span>
        </div>
      </header>

      {/* 2. HERO SECTION - MOBILE PUNCHY HOOK */}
      <section className="px-4 sm:px-8 pt-8 sm:pt-16 pb-8 sm:pb-12 max-w-3xl mx-auto text-center relative z-10">
        <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-gold mb-3 sm:mb-4">
          Jordan B. Peterson Ekolü • 4 Adımlı Teşhis
        </p>

        <h1 className="font-serif text-2xl sm:text-5xl md:text-6xl font-normal leading-[1.22] tracking-tight text-white mb-4 sm:mb-6">
          Sınav senesinde evladınızın{" "}
          <span className="text-gold italic font-medium">güvenli limanı</span> mısınız,{" "}
          yoksa bir gardiyanı mı?
        </h1>

        <p className="text-sm sm:text-lg text-slate-300 font-light max-w-xl mx-auto leading-relaxed mb-6 sm:mb-8">
          Aşağıdaki 4 kriz anını yanıtlayın; çocuğunuzun sınav direncinin arkasındaki asıl sebebi ve bu akşam odasında uygulayabileceğiniz acil ateşkes kuralını anında açın.
        </p>

        <button
          type="button"
          onClick={handleScrollToQuestions}
          className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-gold via-gold-shimmer to-gold text-obsidian font-bold text-xs sm:text-sm tracking-widest uppercase shadow-[0_6px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_10px_35px_rgba(212,175,55,0.55)] active:scale-95 cursor-pointer touch-manipulation transition-all"
        >
          <span>4 Soruluk Teşhise Başla</span>
          <ChevronDown className="w-4 h-4 text-obsidian" />
        </button>
      </section>

      {/* 3. INTERACTIVE 4-QUESTION DIAGNOSTIC SECTION */}
      <section
        ref={questionsRef}
        id="diagnostic-questions"
        className="px-3.5 sm:px-6 py-4 max-w-3xl mx-auto relative z-10"
      >
        {/* Minimal Progress Bar */}
        <div className="mb-5 pb-2.5 border-b border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>01 / KRİZ ANALİZİ</span>
          <span className="text-gold font-semibold">{answeredCount} / 4 Tamamlandı</span>
        </div>

        {/* Questions Stack */}
        <div className="space-y-6 sm:space-y-8">
          {STEPS_DATA.map((step, idx) => {
            const currentSelectedValue = answers[step.id];
            const isSelected = !!currentSelectedValue;

            return (
              <div
                key={step.id}
                id={`question-card-${step.id}`}
                className={`p-4 sm:p-7 rounded-2xl transition-all duration-200 border ${
                  isSelected
                    ? "bg-[#101216] border-gold/40 shadow-[0_8px_30px_rgba(0,0,0,0.7)]"
                    : "bg-[#0D0E12] border-white/10"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-slate-400 uppercase">
                    SORU 0{idx + 1}
                  </span>
                  {isSelected && (
                    <span className="text-xs text-gold font-mono flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Kaydedildi
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-lg sm:text-2xl font-medium text-white mb-1.5 leading-snug">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 font-light mb-4 sm:mb-5 leading-relaxed">
                  {step.subtitle}
                </p>

                {/* 4 Clean Mobile-Friendly Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {step.options.map((opt) => {
                    const isOptionActive = currentSelectedValue === opt.value;

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectOption(step.id, opt.value)}
                        className={`min-h-[56px] p-3.5 sm:p-4 rounded-xl text-left transition-all duration-150 cursor-pointer touch-manipulation active:scale-[0.98] border ${
                          isOptionActive
                            ? "bg-gold/15 border-gold shadow-[0_0_20px_rgba(212,175,55,0.25)] ring-1 ring-gold/40"
                            : "bg-white/[0.02] border-white/10 hover:border-white/20 active:bg-white/[0.05]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <span className="w-5 h-5 rounded-md bg-black/80 border border-white/20 font-mono text-[10px] font-bold text-slate-300 flex items-center justify-center shrink-0">
                            {opt.id}
                          </span>
                          {isOptionActive && (
                            <Check className="w-4 h-4 text-gold shrink-0" />
                          )}
                        </div>
                        <strong className="text-xs sm:text-sm text-white font-medium block mb-1 leading-snug">
                          {opt.title}
                        </strong>
                        <p className="text-[11px] sm:text-xs text-slate-400 font-light leading-relaxed">
                          {opt.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. FINAL BRANCH SELECTOR (Instant 1-Tap Trigger for Diagnosis & Purchase) */}
        <div
          ref={branchSectionRef}
          id="branch-selector-section"
          className="mt-8 sm:mt-10 p-5 sm:p-8 rounded-2xl bg-[#101216] border border-gold/40 text-center"
        >
          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-gold uppercase block mb-1.5">
            02 / KİŞİSELLEŞTİRME
          </span>
          <h3 className="font-serif text-xl sm:text-3xl font-medium text-white mb-1.5">
            Çocuğunuzun Durumu / Alanı
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 font-light max-w-md mx-auto mb-5 leading-relaxed">
            Kişisel karne ve bu akşam uygulayabileceğiniz acil kriz protokolünü açmak için alanınızı seçin:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 max-w-xl mx-auto">
            {BRANCH_OPTIONS.map((branch) => {
              const isBranchActive = studentBranch === branch;

              return (
                <button
                  key={branch}
                  type="button"
                  onClick={() => handleSelectBranchAndReveal(branch)}
                  className={`min-h-[48px] py-3 px-2 rounded-xl text-[11px] sm:text-xs font-mono transition-all text-center cursor-pointer touch-manipulation active:scale-95 flex items-center justify-center border ${
                    isBranchActive
                      ? "bg-gradient-to-r from-gold to-amber-500 text-obsidian font-bold border-gold shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                      : "bg-white/[0.03] border-white/10 text-slate-200 hover:border-gold/30 hover:text-white"
                  }`}
                >
                  {branch}
                </button>
              );
            })}
          </div>

          {!isAllQuestionsAnswered && (
            <p className="text-[11px] text-amber-400/80 font-mono mt-3.5">
              ↑ Lütfen önce yukarıdaki 4 soruyu yanıtlayınız.
            </p>
          )}
        </div>
      </section>

      {/* 5. REVEALED RESULT DOSSIER & DIRECT SHOPIER PURCHASE */}
      <AnimatePresence>
        {isRevealed && packageResult && (
          <div ref={resultRef} id="result-section">
            <ResultDossier
              leadData={leadData}
              packageResult={packageResult}
              onRestart={handleRestart}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
