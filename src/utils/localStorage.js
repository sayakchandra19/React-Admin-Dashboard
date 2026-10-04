import {
  mockDataTeam,
  mockDataContacts,
  mockDataInvoices,
  mockTransactions,
  mockBarData,
  mockPieData,
  mockLineData,
  mockGeographyData,
} from "../data/mockData.js";

// Local Storage Keys
export const STORAGE_KEYS = {
  TEAM: "admin_dashboard_team",
  CONTACTS: "admin_dashboard_contacts",
  INVOICES: "admin_dashboard_invoices",
  TRANSACTIONS: "admin_dashboard_transactions",
  EVENTS: "admin_dashboard_events",
  BAR: "admin_dashboard_bar",
  LINE: "admin_dashboard_line",
  PIE: "admin_dashboard_pie",
  GEOGRAPHY: "admin_dashboard_geography",
};

// Default initial calendar events
export const defaultEvents = [
  {
    id: "evt-1234",
    title: "All-day event",
    start: "2022-09-14",
    allDay: true,
  },
  {
    id: "evt-2345",
    title: "Timed event",
    start: "2022-09-28T12:00:00",
    allDay: false,
  },
  {
    id: "evt-3456",
    title: "Quarterly Review",
    start: "2026-10-15T10:00:00",
    allDay: false,
  },
];

/**
 * Safely retrieve parsed JSON data from localStorage with fallback
 */
export const getData = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null || item === undefined || item === "") {
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error reading key "${key}" from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Safely write stringified JSON data to localStorage
 */
export const setData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving key "${key}" to localStorage:`, error);
    return false;
  }
};

/**
 * Remove a specific key from localStorage
 */
export const removeData = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing key "${key}" from localStorage:`, error);
    return false;
  }
};

/**
 * Clear all dashboard-related keys from localStorage
 */
export const clearData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error("Error clearing dashboard data from localStorage:", error);
    return false;
  }
};

/**
 * Get all default application data from mockData
 */
export const getDefaultData = () => ({
  [STORAGE_KEYS.TEAM]: mockDataTeam,
  [STORAGE_KEYS.CONTACTS]: mockDataContacts,
  [STORAGE_KEYS.INVOICES]: mockDataInvoices,
  [STORAGE_KEYS.TRANSACTIONS]: mockTransactions,
  [STORAGE_KEYS.EVENTS]: defaultEvents,
  [STORAGE_KEYS.BAR]: mockBarData,
  [STORAGE_KEYS.LINE]: mockLineData,
  [STORAGE_KEYS.PIE]: mockPieData,
  [STORAGE_KEYS.GEOGRAPHY]: mockGeographyData,
});

/**
 * Initialize localStorage with default data if empty
 */
export const initializeLocalStorage = () => {
  const defaults = getDefaultData();
  Object.entries(defaults).forEach(([key, defaultValue]) => {
    const existing = getData(key, null);
    if (existing === null || !Array.isArray(existing)) {
      setData(key, defaultValue);
    }
  });
};

/**
 * Reset all data to mockData defaults
 */
export const resetDemoData = () => {
  const defaults = getDefaultData();
  Object.entries(defaults).forEach(([key, defaultValue]) => {
    setData(key, defaultValue);
  });
  return defaults;
};

/**
 * Export all dashboard data as a formatted JSON string
 */
export const exportAllData = () => {
  const exportPayload = {
    version: "1.0",
    exportDate: new Date().toISOString(),
    data: {
      team: getData(STORAGE_KEYS.TEAM, mockDataTeam),
      contacts: getData(STORAGE_KEYS.CONTACTS, mockDataContacts),
      invoices: getData(STORAGE_KEYS.INVOICES, mockDataInvoices),
      transactions: getData(STORAGE_KEYS.TRANSACTIONS, mockTransactions),
      events: getData(STORAGE_KEYS.EVENTS, defaultEvents),
      bar: getData(STORAGE_KEYS.BAR, mockBarData),
      line: getData(STORAGE_KEYS.LINE, mockLineData),
      pie: getData(STORAGE_KEYS.PIE, mockPieData),
      geography: getData(STORAGE_KEYS.GEOGRAPHY, mockGeographyData),
    },
  };
  return JSON.stringify(exportPayload, null, 2);
};

/**
 * Validate and import all data from a JSON string
 */
export const importAllData = (jsonString) => {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== "object") {
      throw new Error("Invalid JSON: Root must be an object.");
    }

    const payload = parsed.data || parsed;

    if (!payload || typeof payload !== "object") {
      throw new Error("Invalid data format: Expected data object.");
    }

    const imported = {};

    if (Array.isArray(payload.team)) {
      setData(STORAGE_KEYS.TEAM, payload.team);
      imported[STORAGE_KEYS.TEAM] = payload.team;
    }
    if (Array.isArray(payload.contacts)) {
      setData(STORAGE_KEYS.CONTACTS, payload.contacts);
      imported[STORAGE_KEYS.CONTACTS] = payload.contacts;
    }
    if (Array.isArray(payload.invoices)) {
      setData(STORAGE_KEYS.INVOICES, payload.invoices);
      imported[STORAGE_KEYS.INVOICES] = payload.invoices;
    }
    if (Array.isArray(payload.transactions)) {
      setData(STORAGE_KEYS.TRANSACTIONS, payload.transactions);
      imported[STORAGE_KEYS.TRANSACTIONS] = payload.transactions;
    }
    if (Array.isArray(payload.events)) {
      setData(STORAGE_KEYS.EVENTS, payload.events);
      imported[STORAGE_KEYS.EVENTS] = payload.events;
    }
    if (Array.isArray(payload.bar)) {
      setData(STORAGE_KEYS.BAR, payload.bar);
      imported[STORAGE_KEYS.BAR] = payload.bar;
    }
    if (Array.isArray(payload.line)) {
      setData(STORAGE_KEYS.LINE, payload.line);
      imported[STORAGE_KEYS.LINE] = payload.line;
    }
    if (Array.isArray(payload.pie)) {
      setData(STORAGE_KEYS.PIE, payload.pie);
      imported[STORAGE_KEYS.PIE] = payload.pie;
    }
    if (Array.isArray(payload.geography)) {
      setData(STORAGE_KEYS.GEOGRAPHY, payload.geography);
      imported[STORAGE_KEYS.GEOGRAPHY] = payload.geography;
    }

    return imported;
  } catch (error) {
    throw new Error(`Import failed: ${error.message}`);
  }
};

/**
 * Helper to generate a collision-free unique ID
 */
export const generateUniqueId = (prefix = "id") => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
};
