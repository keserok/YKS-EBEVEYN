import { MOCK_LEADS } from '../data/mockLeads';

const STORAGE_KEY = 'mediart_leads';

export function getStoredLeads() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with mock leads
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_LEADS));
      return MOCK_LEADS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_LEADS));
      return MOCK_LEADS;
    }
    return parsed;
  } catch (err) {
    console.warn('Storage read error:', err);
    return MOCK_LEADS;
  }
}

export function saveLead(newLead) {
  try {
    const current = getStoredLeads();
    const updated = [newLead, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Storage save error:', err);
    return [];
  }
}

export function updateLeadStatus(id, newStatus) {
  try {
    const current = getStoredLeads();
    const updated = current.map(item => {
      if (item.id === id) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Storage update status error:', err);
    return [];
  }
}

export function deleteLead(id) {
  try {
    const current = getStoredLeads();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Storage delete error:', err);
    return [];
  }
}
