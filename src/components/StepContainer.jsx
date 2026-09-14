import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepCard from "./StepCard";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

export default function StepContainer({
  stepData,
  currentStepIndex,
  totalSteps = 7,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  onBack,
  canProceed
}) {
  const currentSelection = useMemo(() => {
    if (Array.isArray(selectedAnswer)) return selectedAnswer;
    return selectedAnswer ? [selectedAnswer] : [];
  }, [selectedAnswer]);

  const currentSelectionRef = useRef(currentSelection);
  useEffect(() => {
    currentSelectionRef.current = currentSelection;
  }, [currentSelection]);

  const triggerHaptic = (duration = 12) => {
    if (typeof window !== "undefined" && window.navigator?.vibrate) {
      try {
        window.navigator.vibrate(duration);
      } catch {}
    }
  };

  const handleToggle = useCallback(
    (val) => {
      triggerHaptic(14);
      onSelectAnswer([val]);
    },
    [onSelectAnswer]
  );

  // Keyboard shortcut listener (1, 2, 3, 4, Enter)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        if (e.key === "Enter" && !e.shiftKey && canProceed) {
          e.preventDefault();
          onNext();
        }
        return;
      }

      if (e.key === "1" && stepData.options[0]) {
        handleToggle(stepData.options[0].value);
      } else if (e.key === "2" && stepData.options[1]) {
        handleToggle(stepData.options[1].value);
      } else if (e.key === "3" && stepData.options[2]) {
        handleToggle(stepData.options[2].value);
      } else if (e.key === "4" && stepData.options[3]) {
        handleToggle(stepData.options[3].value);
      } else if (e.key === "Enter" && canProceed) {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [stepData, canProceed, handleToggle, onNext]);

  const isLastStep = currentStepIndex === totalSteps;

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 pt-20 pb-32 sm:py-24 z-20 max-w-5xl mx-auto w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={stepData.id}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="w-full flex flex-col relative"
        >
          {/* Header Section */}
          <div className="mb-6 sm:mb-8 text-left">
            {/* Step Tag and Progress Pill */}
            <div className="flex items-center justify-between gap-4 mb-3">
              <span className="font-mono text-xs sm:text-sm font-bold tracking-luxury uppercase text-gold">
                {stepData.tag}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 font-mono text-xs font-semibold text-white">
                Soru {currentStepIndex} / {totalSteps}
              </span>
            </div>

            {/* Step Title - Bigger & High Contrast */}
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-white font-medium tracking-tight leading-tight mb-2">
              {stepData.title}
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-lg text-slate-300 font-light leading-relaxed">
              {stepData.subtitle}
            </p>
          </div>

          {/* Options Grid (2x2 on desktop, 1 col on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5 mb-8">
            {stepData.options.map((option) => (
              <StepCard
                key={option.id}
                option={option}
                isSelected={currentSelection.includes(option.value)}
                onSelect={handleToggle}
              />
            ))}
          </div>

          {/* Desktop Navigation Row */}
          <div className="hidden sm:flex items-center justify-between pt-6 border-t border-white/10">
            {currentStepIndex > 1 ? (
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold uppercase tracking-widest text-architectural-muted hover:text-white transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Önceki Soru</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              disabled={!canProceed}
              onClick={() => {
                triggerHaptic(18);
                onNext();
              }}
              className={`group relative inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-sm font-bold tracking-luxury uppercase transition-all duration-300 shadow-xl ${
                canProceed
                  ? isLastStep
                    ? "bg-gradient-to-r from-gold via-gold-shimmer to-gold text-obsidian shadow-[0_0_35px_rgba(212,175,55,0.5)] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)] cursor-pointer hover:scale-[1.02] active:scale-98"
                    : "bg-gradient-to-r from-gold to-gold-bronze text-obsidian shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] cursor-pointer hover:scale-[1.02] active:scale-98"
                  : "bg-white/5 border border-white/10 text-architectural-muted opacity-40 cursor-not-allowed"
              }`}
            >
              {isLastStep ? (
                <>
                  <Sparkles className="w-4 h-4 text-obsidian animate-pulse" />
                  <span>Analizi Tamamla & Karnemi Aç</span>
                  <ArrowRight className="w-4 h-4 text-obsidian group-hover:translate-x-1 transition-transform" />
                </>
              ) : (
                <>
                  <span>Sonraki Soru</span>
                  <ArrowRight className="w-4 h-4 text-obsidian group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          {/* Mobile Sticky Bottom Bar: Thumb-Friendly & iOS Safe-Area Aware */}
          <div className="sm:hidden fixed bottom-0 left-0 right-0 px-4 pt-3.5 pb-[max(1rem,env(safe-area-inset-bottom,1rem))] bg-obsidian/95 backdrop-blur-2xl border-t border-white/10 z-40 flex items-center gap-3 shadow-[0_-12px_40px_rgba(0,0,0,0.9)]">
            {currentStepIndex > 1 && (
              <button
                type="button"
                onClick={() => {
                  triggerHaptic(10);
                  onBack();
                }}
                className="w-13 h-13 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white shrink-0 active:scale-95 transition-transform"
                aria-label="Önceki Soru"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}

            <button
              type="button"
              disabled={!canProceed}
              onClick={() => {
                triggerHaptic(20);
                onNext();
              }}
              className={`flex-1 flex items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-bold tracking-widest uppercase transition-all shadow-lg active:scale-98 ${
                canProceed
                  ? "bg-gradient-to-r from-gold via-gold-shimmer to-gold text-obsidian shadow-[0_0_25px_rgba(212,175,55,0.5)]"
                  : "bg-white/10 text-architectural-muted opacity-50"
              }`}
            >
              {isLastStep ? (
                <>
                  <Sparkles className="w-4 h-4 text-obsidian" />
                  <span>Karnemi Gör</span>
                  <ArrowRight className="w-4 h-4 text-obsidian" />
                </>
              ) : (
                <>
                  <span>Sonraki Soru</span>
                  <ArrowRight className="w-4 h-4 text-obsidian" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
