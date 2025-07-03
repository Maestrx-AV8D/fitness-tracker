import React from "react";
import SummaryVisuals from "../components/SummaryVisuals.jsx";
import useEntries from "../hooks/useEntries.jsx";
/**
 * Dashboard – shows quick charts.
 * Expects a prop:  entries  (array coming down from <App />)
 */
export default function Dashboard({ entries }) {
  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-semibold">Dashboard</h2>

      {entries.length === 0 ? (
        <p className="text-gray-500">Log a workout to see your stats 😊</p>
      ) : (
        <>
          <SummaryVisuals
            entries={entries}
            rangeDays={7}
            title="Last 7 Days"
          />
          <SummaryVisuals
            entries={entries}
            rangeDays={30}
            title="Last 30 Days"
          />
        </>
      )}
    </section>
  );
}