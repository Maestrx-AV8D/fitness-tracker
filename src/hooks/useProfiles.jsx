import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "ft-profiles";
const ProfilesContext = createContext();

export function useProfiles() {
  return useContext(ProfilesContext);
}

export function ProfilesProvider({ children }) {
  const [profiles, setProfiles] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [
        { id: crypto.randomUUID(), name: "Default" }
      ];
    } catch {
      return [{ id: crypto.randomUUID(), name: "Default" }];
    }
  });

  const [activeId, setActiveId] = useState(profiles[0].id);

  /** Persist whenever profiles or activeId change */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  }, [profiles]);

  const addProfile = (name) =>
    setProfiles((prev) => [...prev, { id: crypto.randomUUID(), name }]);

  const removeProfile = (id) =>
    setProfiles((p) => p.filter((pr) => pr.id !== id));

  const value = { profiles, activeId, setActiveId, addProfile, removeProfile };
  return <ProfilesContext.Provider value={value}>{children}</ProfilesContext.Provider>;
}