import React, { useState } from "react";
import SummaryVisuals from "../components/SummaryVisuals.jsx";
import { downloadCSV } from "../utils/csv.js";
import useEntries from "../hooks/useEntries.jsx";

export default function Log({ initialDate, entries, setEntries }) {
  /* ---- local state for this page ---- */
  const [date, setDate] = useState(initialDate);

  const workoutTypes = ["Run", "Cycle", "Gym", "Swim", "Yoga", "Other"];
  const blankSeg = (over = {}) => ({
    id: Date.now() + Math.random(),
    type: "Run",
    distance: "",
    duration: "",
    exercise: "",
    sets: "",
    reps: "",
    weight: "",
    avgSpeed: "",
    laps: "",
    notes: "",
    ...over,
  });
  const [segments, setSegments] = useState([blankSeg()]);

  /* ---- helpers ---- */
  const segChange = (id, field, val) =>
    setSegments((s) => s.map((seg) => (seg.id === id ? { ...seg, [field]: val } : seg)));
  const segType   = (id, type) => setSegments((s) => s.map((seg) => (seg.id === id ? blankSeg({ id, type }) : seg)));
  const addSeg    = () => setSegments((s) => [...s, blankSeg()]);
  const remSeg    = (id) => setSegments((s) => s.filter((seg) => seg.id !== id));

  /* ---- save entry ---- */
  const addEntry = (e) => {
    e.preventDefault();
    if (!segments.length) return;
    setEntries([{ date, segments }, ...entries]);
    setSegments([blankSeg()]);
  };

  /* ---- JSX ---- */
  return (
    <>
      {/* ── Entry form ── */}
      <form onSubmit={addEntry} className="space-y-6">
        <label className="block">
          <span className="font-medium">Date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1 w-full rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* segments */}
        {segments.map((seg) => (
          <div key={seg.id} className="border rounded p-4 space-y-3 bg-gray-50">
            <div className="flex items-center gap-2">
              <select
                value={seg.type}
                onChange={(e) => segType(seg.id, e.target.value)}
                className="flex-1 rounded border-gray-300"
              >
                {workoutTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              {segments.length > 1 && (
                <button
                  type="button"
                  onClick={() => remSeg(seg.id)}
                  className="text-xs bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1"
                >
                  Remove
                </button>
              )}
            </div>

            {/* dynamic fields */}
            {seg.type === "Run" && (
              <>
                <input
                  type="number"
                  placeholder="Distance (km)"
                  value={seg.distance}
                  onChange={(e) => segChange(seg.id, "distance", e.target.value)}
                  className="w-full rounded border-gray-300"
                />
                <input
                  type="number"
                  placeholder="Duration (min)"
                  value={seg.duration}
                  onChange={(e) => segChange(seg.id, "duration", e.target.value)}
                  className="w-full rounded border-gray-300"
                />
              </>
            )}

            {seg.type === "Gym" && (
              <>
                <input
                  type="text"
                  placeholder="Exercise"
                  value={seg.exercise}
                  onChange={(e) => segChange(seg.id, "exercise", e.target.value)}
                  className="w-full rounded border-gray-300"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Sets"
                    value={seg.sets}
                    onChange={(e) => segChange(seg.id, "sets", e.target.value)}
                    className="flex-1 rounded border-gray-300"
                  />
                  <input
                    type="number"
                    placeholder="Reps"
                    value={seg.reps}
                    onChange={(e) => segChange(seg.id, "reps", e.target.value)}
                    className="flex-1 rounded border-gray-300"
                  />
                </div>
                <input
                  type="number"
                  placeholder="Weight (kg)"
                  value={seg.weight}
                  onChange={(e) => segChange(seg.id, "weight", e.target.value)}
                  className="w-full rounded border-gray-300"
                />
              </>
            )}

            {/* … keep the other segment-type blocks unchanged … */}
          </div>
        ))}

        <button
          type="button"
          onClick={addSeg}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded"
        >
          Add Segment
        </button>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Save Entry
        </button>
      </form>

      {/* quick overview + export */}
      <SummaryVisuals entries={entries} />
      <button
        onClick={() => downloadCSV(entries)}
        className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded"
      >
        Download CSV
      </button>
    </>
  );
}