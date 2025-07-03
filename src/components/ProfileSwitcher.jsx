import { useState } from "react";
import { useProfiles } from "../hooks/useProfiles";

export default function ProfileSwitcher() {
  const { profiles, activeId, setActiveId, addProfile, removeProfile } =
    useProfiles();
  const [name, setName] = useState("");

  return (
    <div className="mb-6 space-y-2">
      <select
        value={activeId}
        onChange={(e) => setActiveId(e.target.value)}
        className="rounded border px-3 py-2"
      >
        {profiles.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <div className="flex gap-2">
        <input
          placeholder="New profile name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 rounded border px-3 py-2"
        />
        <button
          onClick={() => {
            if (name.trim()) {
              addProfile(name.trim());
              setName("");
            }
          }}
          className="rounded bg-green-600 px-4 py-2 text-white"
        >
          Add
        </button>
        {profiles.length > 1 && (
          <button
            onClick={() => removeProfile(activeId)}
            className="rounded bg-red-600 px-3 py-2 text-white"
          >
            Delete current
          </button>
        )}
      </div>
    </div>
  );
}