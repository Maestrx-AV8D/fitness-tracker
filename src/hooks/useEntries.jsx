import { createContext, useContext, useEffect, useState } from "react";
import { useProfiles } from "./useProfiles";

const EntriesContext = createContext();

export function useEntries() {
  return useContext(EntriesContext);
}

export function EntriesProvider({ children }) {
  const { activeId } = useProfiles();          // ① profile-aware
  const storageKey = `ft-entries::${activeId}`;

  const [entries, setEntries] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) ?? [];
    } catch {
      return [];
    }
  });

  /** keep only the active profile’s entries in localStorage */
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(entries));
  }, [entries, storageKey]);

  /* whenever the user switches profile, load that profile’s log */
  useEffect(() => {
    try {
      setEntries(JSON.parse(localStorage.getItem(storageKey)) ?? []);
    } catch {
      setEntries([]);
    }
  }, [storageKey]);

  const addEntry = (e) => setEntries((prev) => [...prev, e]);
  const deleteEntry = (id) => setEntries((p) => p.filter((e) => e.id !== id));

  return (
    <EntriesContext.Provider value={{ entries, addEntry, deleteEntry }}>
      {children}
    </EntriesContext.Provider>
  );
}