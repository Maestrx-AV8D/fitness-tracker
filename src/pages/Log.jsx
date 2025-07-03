import React, { useState } from "react";
import { useEntries } from "../hooks/useEntries";


export default function Log() {
  const { addEntry } = useEntries();
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const save = (e) => {
    e.preventDefault();
    addEntry({
      date,
      segments: [{ type: "Run", distance, duration }],
    });
    setDistance("");
    setDuration("");
  };

  return (
    <form onSubmit={save} className="space-y-4">
      <h2 className="text-2xl font-semibold">New Run</h2>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border rounded px-2 py-1 w-full" />
      <input type="number" placeholder="Distance km" value={distance} onChange={(e) => setDistance(e.target.value)} className="border rounded px-2 py-1 w-full" />
      <input type="number" placeholder="Duration min" value={duration} onChange={(e) => setDuration(e.target.value)} className="border rounded px-2 py-1 w-full" />
      <button className="w-full bg-blue-600 text-white py-2 rounded">Save</button>
    </form>
  );
}