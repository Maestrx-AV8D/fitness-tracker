// src/App.jsx
import React, { useState } from 'react';
import SummaryVisuals from './components/SummaryVisuals.jsx';
import { downloadCSV } from './utils/csv.js';

export default function App() {
  /* ─── State ─────────────────────────────────────────── */
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [segments, setSegments] = useState([
    {
      id: Date.now(),
      type: 'Run',
      distance: '', duration: '',
      exercise: '', sets: '', reps: '', weight: '',
      avgSpeed: '', laps: '', notes: '',
    },
  ]);
  const [entries, setEntries] = useState([]);

  const workoutTypes = ['Run', 'Gym', 'Bike', 'Swim', 'Cycle', 'Yoga', 'Other'];

  /* ─── Helpers ───────────────────────────────────────── */
  const resetSegment = (overrides = {}) => ({
    id: Date.now() + Math.random(),
    type: 'Run', distance: '', duration: '',
    exercise: '', sets: '', reps: '', weight: '',
    avgSpeed: '', laps: '', notes: '',
    ...overrides,
  });

  /* ─── Handlers ─────────────────────────────────────── */
  const handleTypeChange = (id, type) =>
    setSegments(s => s.map(seg => seg.id === id ? resetSegment({ id, type }) : seg));

  const handleSegChange = (id, field, value) =>
    setSegments(s => s.map(seg => seg.id === id ? { ...seg, [field]: value } : seg));

  const addSeg = () => setSegments(s => [...s, resetSegment()]);
  const removeSeg = id => setSegments(s => s.filter(seg => seg.id !== id));

  const addEntry = e => {
    e.preventDefault();
    if (!segments.length) return;
    setEntries([{ date, segments }, ...entries]);
    setSegments([resetSegment()]);
  };

  const delEntry = idx => setEntries(e => e.filter((_, i) => i !== idx));

  /* ─── UI ────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-0">
      <div className="mx-auto max-w-xl bg-white shadow rounded-lg p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center">Fitness Tracker</h1>

        {/* -------- Entry Form -------- */}
        <form onSubmit={addEntry} className="space-y-6">
          {/* Date */}
          <label className="block">
            <span className="font-medium">Date</span>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
              className="mt-1 w-full rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </label>

          {/* Segments */}
          {segments.map(seg => (
            <div key={seg.id} className="border rounded p-4 space-y-3 bg-gray-50">
              {/* Header */}
              <div className="flex items-center gap-2">
                <select
                  value={seg.type}
                  onChange={e => handleTypeChange(seg.id, e.target.value)}
                  className="flex-1 rounded border-gray-300"
                >
                  {workoutTypes.map(t => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                {segments.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSeg(seg.id)}
                    className="text-xs bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1"
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Dynamic fields */}
              {seg.type === 'Run' && (
                <>
                  <input
                    type="number" placeholder="Distance (km)" value={seg.distance}
                    onChange={e => handleSegChange(seg.id, 'distance', e.target.value)}
                    className="w-full rounded border-gray-300"
                  />
                  <input
                    type="number" placeholder="Duration (min)" value={seg.duration}
                    onChange={e => handleSegChange(seg.id, 'duration', e.target.value)}
                    className="w-full rounded border-gray-300"
                  />
                </>
              )}

              {seg.type === 'Gym' && (
                <>
                  <input
                    type="text" placeholder="Exercise" value={seg.exercise}
                    onChange={e => handleSegChange(seg.id, 'exercise', e.target.value)}
                    className="w-full rounded border-gray-300"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number" placeholder="Sets" value={seg.sets}
                      onChange={e => handleSegChange(seg.id, 'sets', e.target.value)}
                      className="flex-1 rounded border-gray-300"
                    />
                    <input
                      type="number" placeholder="Reps" value={seg.reps}
                      onChange={e => handleSegChange(seg.id, 'reps', e.target.value)}
                      className="flex-1 rounded border-gray-300"
                    />
                  </div>
                  <input
                    type="number" placeholder="Weight (kg)" value={seg.weight}
                    onChange={e => handleSegChange(seg.id, 'weight', e.target.value)}
                    className="w-full rounded border-gray-300"
                  />
                </>
              )}

              {(seg.type === 'Bike' || seg.type === 'Cycle') && (
                <>
                  <input
                    type="number" placeholder="Distance (km)" value={seg.distance}
                    onChange={e => handleSegChange(seg.id, 'distance', e.target.value)}
                    className="w-full rounded border-gray-300"
                  />
                  <input
                    type="number" placeholder="Duration (min)" value={seg.duration}
                    onChange={e => handleSegChange(seg.id, 'duration', e.target.value)}
                    className="w-full rounded border-gray-300"
                  />
                  <input
                    type="number" placeholder="Avg Speed (km/h)" value={seg.avgSpeed}
                    onChange={e => handleSegChange(seg.id, 'avgSpeed', e.target.value)}
                    className="w-full rounded border-gray-300"
                  />
                </>
              )}

              {seg.type === 'Swim' && (
                <>
                  <input
                    type="number" placeholder="Laps" value={seg.laps}
                    onChange={e => handleSegChange(seg.id, 'laps', e.target.value)}
                    className="w-full rounded border-gray-300"
                  />
                  <input
                    type="number" placeholder="Duration (min)" value={seg.duration}
                    onChange={e => handleSegChange(seg.id, 'duration', e.target.value)}
                    className="w-full rounded border-gray-300"
                  />
                </>
              )}

              {seg.type === 'Yoga' && (
                <input
                  type="number" placeholder="Duration (min)" value={seg.duration}
                  onChange={e => handleSegChange(seg.id, 'duration', e.target.value)}
                  className="w-full rounded border-gray-300"
                />
              )}

              {seg.type === 'Other' && (
                <textarea
                  placeholder="Notes" value={seg.notes}
                  onChange={e => handleSegChange(seg.id, 'notes', e.target.value)}
                  className="w-full rounded border-gray-300"
                />
              )}
            </div>
          ))}

          {/* Controls */}
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

        {/* -------- Dashboard & Export -------- */}
        <SummaryVisuals entries={entries} />

        <button
          onClick={() => downloadCSV(entries)}
          className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded"
        >
          Download CSV
        </button>

        {/* -------- Training Log -------- */}
        <h2 className="text-2xl font-semibold pt-4">Training Log</h2>
        {entries.length === 0 ? (
          <p className="text-center text-gray-500">No entries yet – start logging!</p>
        ) : (
          <ul className="space-y-4">
            {entries.map((entry, idx) => (
              <li key={idx} className="border rounded p-4 bg-gray-50">
                <div className="font-bold">{entry.date}</div>
                <ul className="list-disc list-inside pl-2 mt-1 space-y-1">
                  {entry.segments.map((s, i) => (
                    <li key={i} className="text-sm">
                      {s.type === 'Run' && `Run • ${s.distance} km • ${s.duration} min`}
                      {s.type === 'Gym' && `${s.exercise} • ${s.sets}×${s.reps} @ ${s.weight}kg`}
                      {(s.type === 'Bike' || s.type === 'Cycle') && `Ride • ${s.distance} km • ${s.duration} min • ${s.avgSpeed} km/h`}
                      {s.type === 'Swim' && `Swim • ${s.laps} laps • ${s.duration} min`}
                      {s.type === 'Yoga' && `Yoga • ${s.duration} min`}
                      {s.type === 'Other' && s.notes}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => delEntry(idx)}
                  className="mt-2 text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete Entry
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}