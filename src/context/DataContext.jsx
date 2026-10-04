import React, { createContext, useContext, useState, useEffect } from "react";
import {
  STORAGE_KEYS,
  getData,
  setData,
  clearData,
  resetDemoData,
  exportAllData,
  importAllData,
  initializeLocalStorage,
  generateUniqueId,
  defaultEvents,
} from "../utils/localStorage";

import {
  mockDataTeam,
  mockDataContacts,
  mockDataInvoices,
  mockTransactions,
  mockBarData,
  mockLineData,
  mockPieData,
  mockGeographyData,
} from "../data/mockData";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  // Initialize storage with defaults if not present
  useEffect(() => {
    initializeLocalStorage();
  }, []);

  // Application Data States (lazy init from Local Storage)
  const [team, setTeam] = useState(() =>
    getData(STORAGE_KEYS.TEAM, mockDataTeam)
  );
  const [contacts, setContacts] = useState(() =>
    getData(STORAGE_KEYS.CONTACTS, mockDataContacts)
  );
  const [invoices, setInvoices] = useState(() =>
    getData(STORAGE_KEYS.INVOICES, mockDataInvoices)
  );
  const [transactions, setTransactions] = useState(() =>
    getData(STORAGE_KEYS.TRANSACTIONS, mockTransactions)
  );
  const [events, setEvents] = useState(() =>
    getData(STORAGE_KEYS.EVENTS, defaultEvents)
  );
  const [barData, setBarData] = useState(() =>
    getData(STORAGE_KEYS.BAR, mockBarData)
  );
  const [lineData, setLineData] = useState(() =>
    getData(STORAGE_KEYS.LINE, mockLineData)
  );
  const [pieData, setPieData] = useState(() =>
    getData(STORAGE_KEYS.PIE, mockPieData)
  );
  const [geographyData, setGeographyData] = useState(() =>
    getData(STORAGE_KEYS.GEOGRAPHY, mockGeographyData)
  );

  // Mobile Responsive Sidebar State
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  const toggleSidebar = () => setIsSidebarToggled((prev) => !prev);

  // Global Notification State
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const notify = (message, severity = "success") => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  // Sync state changes to Local Storage
  useEffect(() => {
    setData(STORAGE_KEYS.TEAM, team);
  }, [team]);

  useEffect(() => {
    setData(STORAGE_KEYS.CONTACTS, contacts);
  }, [contacts]);

  useEffect(() => {
    setData(STORAGE_KEYS.INVOICES, invoices);
  }, [invoices]);

  useEffect(() => {
    setData(STORAGE_KEYS.TRANSACTIONS, transactions);
  }, [transactions]);

  useEffect(() => {
    setData(STORAGE_KEYS.EVENTS, events);
  }, [events]);

  useEffect(() => {
    setData(STORAGE_KEYS.BAR, barData);
  }, [barData]);

  useEffect(() => {
    setData(STORAGE_KEYS.LINE, lineData);
  }, [lineData]);

  useEffect(() => {
    setData(STORAGE_KEYS.PIE, pieData);
  }, [pieData]);

  useEffect(() => {
    setData(STORAGE_KEYS.GEOGRAPHY, geographyData);
  }, [geographyData]);

  // ==========================================
  // TEAM CRUD
  // ==========================================
  const addTeamMember = (member) => {
    const newMember = {
      ...member,
      id: member.id || generateUniqueId("team"),
    };
    setTeam((prev) => [newMember, ...prev]);
    notify(`Team member "${newMember.name}" added successfully.`);
    return newMember;
  };

  const updateTeamMember = (id, updatedFields) => {
    setTeam((prev) =>
      prev.map((item) =>
        String(item.id) === String(id) ? { ...item, ...updatedFields } : item
      )
    );
    notify("Team member updated successfully.");
  };

  const deleteTeamMember = (id) => {
    setTeam((prev) => prev.filter((item) => String(item.id) !== String(id)));
    notify("Team member deleted successfully.", "info");
  };

  // ==========================================
  // CONTACTS CRUD
  // ==========================================
  const addContact = (contact) => {
    const newContact = {
      ...contact,
      id: contact.id || generateUniqueId("contact"),
      registrarId: contact.registrarId || Math.floor(100000 + Math.random() * 900000),
    };
    setContacts((prev) => [newContact, ...prev]);
    notify(`Contact "${newContact.name}" added successfully.`);
    return newContact;
  };

  const updateContact = (id, updatedFields) => {
    setContacts((prev) =>
      prev.map((item) =>
        String(item.id) === String(id) ? { ...item, ...updatedFields } : item
      )
    );
    notify("Contact updated successfully.");
  };

  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((item) => String(item.id) !== String(id)));
    notify("Contact deleted successfully.", "info");
  };

  // ==========================================
  // INVOICES CRUD
  // ==========================================
  const addInvoice = (invoice) => {
    const newInvoice = {
      ...invoice,
      id: invoice.id || generateUniqueId("inv"),
      date: invoice.date || new Date().toISOString().split("T")[0],
    };
    setInvoices((prev) => [newInvoice, ...prev]);
    notify(`Invoice for "${newInvoice.name}" created successfully.`);
    return newInvoice;
  };

  const updateInvoice = (id, updatedFields) => {
    setInvoices((prev) =>
      prev.map((item) =>
        String(item.id) === String(id) ? { ...item, ...updatedFields } : item
      )
    );
    notify("Invoice updated successfully.");
  };

  const deleteInvoice = (id) => {
    setInvoices((prev) => prev.filter((item) => String(item.id) !== String(id)));
    notify("Invoice deleted successfully.", "info");
  };

  // ==========================================
  // TRANSACTIONS CRUD
  // ==========================================
  const addTransaction = (transaction) => {
    const newTx = {
      ...transaction,
      txId: transaction.txId || generateUniqueId("tx"),
      date: transaction.date || new Date().toISOString().split("T")[0],
      cost: parseFloat(transaction.cost || 0).toFixed(2),
    };
    setTransactions((prev) => [newTx, ...prev]);
    notify(`Transaction ${newTx.txId} recorded successfully.`);
    return newTx;
  };

  const updateTransaction = (txId, updatedFields) => {
    setTransactions((prev) =>
      prev.map((item) =>
        String(item.txId) === String(txId) ? { ...item, ...updatedFields } : item
      )
    );
    notify("Transaction updated successfully.");
  };

  const deleteTransaction = (txId) => {
    setTransactions((prev) =>
      prev.filter((item) => String(item.txId) !== String(txId))
    );
    notify("Transaction deleted successfully.", "info");
  };

  // ==========================================
  // CALENDAR EVENTS CRUD
  // ==========================================
  const addEvent = (event) => {
    const newEvent = {
      ...event,
      id: event.id || generateUniqueId("evt"),
    };
    setEvents((prev) => [...prev, newEvent]);
    notify(`Event "${newEvent.title}" scheduled successfully.`);
    return newEvent;
  };

  const updateEvent = (id, updatedFields) => {
    setEvents((prev) =>
      prev.map((item) =>
        String(item.id) === String(id) ? { ...item, ...updatedFields } : item
      )
    );
    notify("Event updated successfully.");
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((item) => String(item.id) !== String(id)));
    notify("Event removed successfully.", "info");
  };

  // ==========================================
  // DATA MANAGEMENT (Reset, Clear, Import, Export)
  // ==========================================
  const resetToDemo = () => {
    const defaults = resetDemoData();
    setTeam(defaults[STORAGE_KEYS.TEAM]);
    setContacts(defaults[STORAGE_KEYS.CONTACTS]);
    setInvoices(defaults[STORAGE_KEYS.INVOICES]);
    setTransactions(defaults[STORAGE_KEYS.TRANSACTIONS]);
    setEvents(defaults[STORAGE_KEYS.EVENTS]);
    setBarData(defaults[STORAGE_KEYS.BAR]);
    setLineData(defaults[STORAGE_KEYS.LINE]);
    setPieData(defaults[STORAGE_KEYS.PIE]);
    setGeographyData(defaults[STORAGE_KEYS.GEOGRAPHY]);
    notify("Demo data restored successfully.");
  };

  const clearAll = () => {
    clearData();
    setTeam([]);
    setContacts([]);
    setInvoices([]);
    setTransactions([]);
    setEvents([]);
    notify("All custom data cleared.", "warning");
  };

  const exportData = () => {
    const jsonString = exportAllData();
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `admin-dashboard-data-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    notify("Dashboard data exported as JSON.");
  };

  const importData = (jsonString) => {
    try {
      const imported = importAllData(jsonString);
      if (imported[STORAGE_KEYS.TEAM]) setTeam(imported[STORAGE_KEYS.TEAM]);
      if (imported[STORAGE_KEYS.CONTACTS]) setContacts(imported[STORAGE_KEYS.CONTACTS]);
      if (imported[STORAGE_KEYS.INVOICES]) setInvoices(imported[STORAGE_KEYS.INVOICES]);
      if (imported[STORAGE_KEYS.TRANSACTIONS]) setTransactions(imported[STORAGE_KEYS.TRANSACTIONS]);
      if (imported[STORAGE_KEYS.EVENTS]) setEvents(imported[STORAGE_KEYS.EVENTS]);
      if (imported[STORAGE_KEYS.BAR]) setBarData(imported[STORAGE_KEYS.BAR]);
      if (imported[STORAGE_KEYS.LINE]) setLineData(imported[STORAGE_KEYS.LINE]);
      if (imported[STORAGE_KEYS.PIE]) setPieData(imported[STORAGE_KEYS.PIE]);
      if (imported[STORAGE_KEYS.GEOGRAPHY]) setGeographyData(imported[STORAGE_KEYS.GEOGRAPHY]);
      notify("Data imported successfully!");
      return true;
    } catch (err) {
      notify(err.message, "error");
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
        // Data
        team,
        contacts,
        invoices,
        transactions,
        events,
        barData,
        lineData,
        pieData,
        geographyData,
        // Team operations
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        // Contacts operations
        addContact,
        updateContact,
        deleteContact,
        // Invoices operations
        addInvoice,
        updateInvoice,
        deleteInvoice,
        // Transactions operations
        addTransaction,
        updateTransaction,
        deleteTransaction,
        // Events operations
        addEvent,
        updateEvent,
        deleteEvent,
        // Data Management
        resetToDemo,
        clearAll,
        exportData,
        importData,
        // Notification
        notification,
        notify,
        closeNotification,
        // Mobile Sidebar
        isSidebarToggled,
        setIsSidebarToggled,
        toggleSidebar,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export default DataContext;
