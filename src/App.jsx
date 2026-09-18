import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BackgroundFx from "./components/BackgroundFx";
import SinglePageDiagnostic from "./components/SinglePageDiagnostic";
import VaultUnlockFx from "./components/VaultUnlockFx";
import AdminDashboard from "./components/admin/AdminDashboard";
import { getStoredLeads, saveLead, updateLeadStatus } from "./utils/storage";

export default function App() {
  // Current view: 'diagnostic' (Single-page 4-step power funnel) | 'vault_unlock' | 'admin'
  const [currentView, setCurrentView] = useState("diagnostic");

  // Admin Leads State - lazy initialized from localStorage
  const [leads, setLeads] = useState(() => getStoredLeads());

  // Update lead status in admin
  const handleUpdateStatus = (leadId, newStatus) => {
    const updated = updateLeadStatus(leadId, newStatus);
    setLeads(updated);
  };

  // Lead save handler from SinglePageDiagnostic
  const handleSaveLead = ({ parentName, phone, studentBranch, packageResult, answers }) => {
    const now = new Date();
    const timestamp = `${now.toISOString().slice(0, 10)} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newLead = {
      id: `lead_${Date.now()}`,
      timestamp,
      agencyName: parentName,
      phone: phone || "Belirtilmemiş",
      assignedPackage: packageResult.title,
      packageTier: packageResult.dominantArchetype,
      deliveryDays: `%${packageResult.scorePercent} Dirayet`,
      status: "Yeni Talep",
      studentBranch,
      answers
    };

    saveLead(newLead);
    setLeads((prev) => [newLead, ...prev]);
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

  return (
    <div className="relative min-h-screen bg-obsidian text-architectural-white font-sans selection:bg-gold/25 selection:text-gold-light overflow-x-hidden">
      {/* Dynamic Background Atmosphere */}
      <BackgroundFx currentView={currentView} currentStep={1} />

      {/* Main View Flow */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {currentView === "diagnostic" && (
            <motion.div
              key="view-diagnostic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SinglePageDiagnostic
                onSaveLead={handleSaveLead}
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
                onClose={() => setCurrentView("diagnostic")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
