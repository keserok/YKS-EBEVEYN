import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BackgroundFx from "./components/BackgroundFx";
import ProgressBar from "./components/ProgressBar";
import SplashScreen from "./components/SplashScreen";
import LeadGate from "./components/LeadGate";
import StepContainer from "./components/StepContainer";
import ResultDossier from "./components/ResultDossier";
import VaultUnlockFx from "./components/VaultUnlockFx";
import AdminDashboard from "./components/admin/AdminDashboard";
import { STEPS_DATA } from "./data/stepsData";
import { calculatePackage } from "./utils/algorithm";
import { getStoredLeads, saveLead, updateLeadStatus } from "./utils/storage";
import { trackPageView, trackLead, trackViewContent, trackQuizStart } from "./utils/metaPixel";

export default function App() {
  // Current view: 'splash' | 'step' | 'gate' | 'vault_unlock' | 'result' | 'admin'
  const [currentView, setCurrentView] = useState("splash");
  const [currentStepIndex, setCurrentStepIndex] = useState(1); // 1 to 7

  // Lead and Form State
  const [parentName, setParentName] = useState("");
  const [answers, setAnswers] = useState({});

  // Result Dossier State
  const [packageResult, setPackageResult] = useState(null);
  const [leadData, setLeadData] = useState(null);

  // Admin Leads State - lazy initialized from localStorage
  const [leads, setLeads] = useState(() => getStoredLeads());

  // Update lead status in admin
  const handleUpdateStatus = (leadId, newStatus) => {
    const updated = updateLeadStatus(leadId, newStatus);
    setLeads(updated);
  };

  // Step 0: Splash -> Step 1 (Immediate Quiz Start for maximum completion rate)
  const handleStartExperience = () => {
    trackQuizStart();
    setCurrentStepIndex(1);
    setCurrentView("step");
  };

  // Step Answer Selection
  const handleSelectAnswer = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [currentStepIndex]: value
    }));
  };

  // Step Next button handler
  const handleNextStep = () => {
    if (currentStepIndex < 7) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      // Step 7 complete -> Now transition to LeadGate to capture info before revealing report
      setCurrentView("gate");
    }
  };

  // Step Back button handler
  const handleBackStep = () => {
    if (currentStepIndex > 1) {
      setCurrentStepIndex((prev) => prev - 1);
    } else {
      setCurrentView("splash");
    }
  };

  // Gate Proceed -> Calculate Score & Reveal Result Dossier
  const handleGateProceed = ({ parentName, phone, studentBranch }) => {
    setParentName(parentName);

    const result = calculatePackage(answers);
    setPackageResult(result);

    const leadInfo = {
      parentName,
      agencyName: parentName,
      phone,
      studentBranch
    };
    setLeadData(leadInfo);

    // Save lead to local storage
    const now = new Date();
    const timestamp = `${now.toISOString().slice(0, 10)} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    
    const newLead = {
      id: `lead_${Date.now()}`,
      timestamp,
      agencyName: parentName,
      phone: phone || "Belirtilmemiş",
      assignedPackage: result.title,
      packageTier: result.dominantArchetype,
      deliveryDays: `%${result.scorePercent} Dirayet`,
      status: "Yeni Talep",
      studentBranch,
      answers
    };

    saveLead(newLead);
    setLeads((prev) => [newLead, ...prev]);

    // Meta Pixel Conversion Events: Lead & ViewContent
    trackLead({ parentName, studentBranch });
    trackViewContent({ title: result.title, archetype: result.dominantArchetype });

    // Go to results
    setCurrentView("result");
  };

  // Secret Admin Vault Trigger: 'media' / 'admin' + '0000'
  const handleSecretAdminTrigger = () => {
    setCurrentView("vault_unlock");
  };

  // Vault Unlock animation complete -> Open Admin Dashboard
  const handleVaultUnlockComplete = () => {
    const loaded = getStoredLeads();
    setLeads(loaded);
    setCurrentView("admin");
  };

  // Restart Quiz
  const handleRestart = () => {
    trackPageView();
    setAnswers({});
    setCurrentStepIndex(1);
    setPackageResult(null);
    setCurrentView("splash");
  };

  // Current step data
  const currentStepData = STEPS_DATA.find((s) => s.id === currentStepIndex) || STEPS_DATA[0];
  const canProceed = Boolean(answers[currentStepIndex] && answers[currentStepIndex].length > 0);

  return (
    <div className="relative min-h-screen bg-obsidian text-architectural-white font-sans selection:bg-gold/25 selection:text-gold-light overflow-x-hidden">
      {/* Dynamic Background FX */}
      <BackgroundFx currentView={currentView} currentStep={currentStepIndex} />

      {/* Top Progress Bar - Visible in Step Mode */}
      {currentView === "step" && (
        <ProgressBar
          currentStep={currentStepIndex}
          totalSteps={7}
          parentName={parentName}
        />
      )}

      {/* Main View Flow with Smooth Page Transitions */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {currentView === "splash" && (
            <motion.div
              key="view-splash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <SplashScreen onStart={handleStartExperience} />
            </motion.div>
          )}

          {currentView === "step" && (
            <motion.div
              key={`view-step-${currentStepIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <StepContainer
                stepData={currentStepData}
                currentStepIndex={currentStepIndex}
                totalSteps={7}
                selectedAnswer={answers[currentStepIndex]}
                onSelectAnswer={handleSelectAnswer}
                onNext={handleNextStep}
                onBack={handleBackStep}
                canProceed={canProceed}
              />
            </motion.div>
          )}

          {currentView === "gate" && (
            <motion.div
              key="view-gate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <LeadGate
                onProceed={handleGateProceed}
                onSecretAdminTrigger={handleSecretAdminTrigger}
              />
            </motion.div>
          )}

          {currentView === "vault_unlock" && (
            <motion.div
              key="view-vault"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <VaultUnlockFx onComplete={handleVaultUnlockComplete} />
            </motion.div>
          )}

          {currentView === "result" && packageResult && (
            <motion.div
              key="view-result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ResultDossier
                leadData={leadData}
                packageResult={packageResult}
                onRestart={handleRestart}
              />
            </motion.div>
          )}

          {currentView === "admin" && (
            <motion.div
              key="view-admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <AdminDashboard
                leads={leads}
                onUpdateStatus={handleUpdateStatus}
                onClose={() => setCurrentView("splash")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
