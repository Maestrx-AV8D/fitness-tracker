import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "fitness-entries";
const EntriesContext = createContext();

/* ——————————— Provider ——————————— */
export function EntriesProvider({ children }) {
  // ① bootstrap from localStorage
  const [entries, setEntries] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  // ② write every change back to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  // ③ helpers
  const addEntry = (entry) =>
    setEntries((prev) => [...prev, { id: crypto.randomUUID(), ...entry }]);

  const deleteEntry = (id) =>
    setEntries((prev) => prev.filter((e) => e.id !== id));

  return (
    <EntriesContext.Provider value={{ entries, addEntry, deleteEntry }}>
      {children}
    </EntriesContext.Provider>
  );
}

/* ——————————— Hook ——————————— */
export default function useEntries() {
  const ctx = useContext(EntriesContext);
  if (!ctx)
    throw new Error("useEntries must be used inside <EntriesProvider>.");
  return ctx; // { entries, addEntry, deleteEntry }
}