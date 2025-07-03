import React from "react";
import { useEntries } from "../hooks/useEntries";
import { aggregateByDay } from "../utils/aggregate.js";

export default function Dashboard() {
  const { entries } = useEntries();
  const data = aggregateByDay(entries, 7);

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      {data.length === 0 ? (
        <p className="text-gray-500">Log something to see stats.</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre> // simple placeholder
      )}
    </section>
  );
}