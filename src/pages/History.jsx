import React from "react";
import useEntries from "../hooks/useEntries.jsx";

/**
 * History – simple list of every saved entry.
 * Props:
 *   entries   array of { date, segments }
 *   onDelete  function(index)  — remove one log item
 */
export default function History({ entries, onDelete }) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">History</h2>

      {entries.length === 0 ? (
        <p className="text-gray-500">No entries yet.</p>
      ) : (
        <ul className="space-y-4">
          {entries.map((entry, idx) => (
            <li key={idx} className="border rounded p-4 bg-gray-50">
              <div className="font-bold">{entry.date}</div>
              <pre className="whitespace-pre-wrap text-sm">
                {JSON.stringify(entry.segments, null, 2)}
              </pre>

              <button
                onClick={() => onDelete(idx)}
                className="mt-2 text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete Entry
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}