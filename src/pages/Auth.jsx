import { useState } from "react";
import { useProfiles } from "../hooks/useProfiles";


export default function Auth() {
  const { profiles, addProfile, switchProfile } = useProfiles();
  const [name, setName] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed) addProfile(trimmed);
    setName("");
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-20">
      <h1 className="text-3xl font-bold">Choose / Create Profile</h1>

      {profiles.length > 0 && (
        <div className="flex gap-4">
          {profiles.map((p) => (
            <button
              key={p}
              className="px-4 py-2 bg-slate-200 rounded hover:bg-slate-300"
              onClick={() => switchProfile(p)}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={submit} className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="new profile name"
          className="border px-2 py-1 rounded"
        />
        <button className="bg-emerald-600 text-white px-3 py-1 rounded">
          Add
        </button>
      </form>
    </div>
  );
}