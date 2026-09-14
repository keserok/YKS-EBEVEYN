/**
 * Meta (Facebook) Pixel Event Tracker Utility
 * Safely dispatches standard and custom Meta events with fallback protection.
 */

export const getPixelId = () => {
  return import.meta.env.VITE_META_PIXEL_ID || window.__META_PIXEL_ID__ || "";
};

export const fbq = (...args) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq(...args);
  }
};

/**
 * Standard Event: PageView
 * Fired automatically on initial load and route/screen changes.
 */
export const trackPageView = () => {
  fbq("track", "PageView");
};

/**
 * Standard Event: Lead
 * Fired when parent submits their name, branch, and phone number at the gate.
 */
export const trackLead = (data = {}) => {
  fbq("track", "Lead", {
    content_name: data.content_name || "YKS Ebeveyn Teşhisi",
    content_category: data.studentBranch || "Ebeveyn Karnesi",
    ...data
  });
};

/**
 * Standard Event: ViewContent
 * Fired when parent opens their personalized diagnostic result dossier.
 */
export const trackViewContent = (data = {}) => {
  fbq("track", "ViewContent", {
    content_name: data.title || "Kaostan Düzene YKS Teşhis Raporu",
    content_category: data.archetype || "Ebeveyn Arketipi",
    value: 299,
    currency: "TRY",
    ...data
  });
};

/**
 * Standard Event: InitiateCheckout
 * Fired when parent clicks "Shopier ile Güvenli Satın Al" or the mobile floating CTA.
 */
export const trackInitiateCheckout = (data = {}) => {
  fbq("track", "InitiateCheckout", {
    content_name: "Kaostan Düzene: YKS Ebeveyn Rehberi (PDF)",
    content_category: "Dijital Kitap & Kriz Protokolü",
    value: data.value || 299,
    currency: data.currency || "TRY",
    num_items: 1,
    ...data
  });
};

/**
 * Custom Event: StartQuiz
 * Fired when parent begins the test on the splash screen.
 */
export const trackQuizStart = () => {
  fbq("trackCustom", "QuizStart", {
    step: 1,
    timestamp: new Date().toISOString()
  });
};
