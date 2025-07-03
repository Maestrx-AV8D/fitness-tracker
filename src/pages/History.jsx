import React from "react";
import { useEntries } from "../hooks/useEntries";

export default function History() {
  const { entries, deleteEntry } = useEntries();

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">History</h2>
      {entries.length === 0 ? (
        <p className="text-gray-500">No entries yet.</p>
      ) : (
        <ul className="space-y-4">
          {entries.map((e) => (
            <li key={e.id} className="border rounded p-4 bg-gray-50">
              <div className="font-bold">{e.date}</div>
              <pre className="whitespace-pre-wrap text-sm">
                {JSON.stringify(e.segments, null, 2)}
              </pre>
              <button
                onClick={() => deleteEntry(e.id)}
                className="mt-2 text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}