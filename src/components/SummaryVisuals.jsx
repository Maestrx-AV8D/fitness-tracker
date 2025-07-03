import React from "react";
import { aggregateByDay } from "../utils/aggregate";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

export default function SummaryVisuals({ entries, range, title }) {
  const data = aggregateByDay(entries, range);               // returns [{ date:'07-03', totalDistance: 5, totalDuration: 45 }, …]

  return (
    <div className="mb-10">
      <h3 className="text-lg font-medium mb-3">{title}</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalDuration" name="Minutes" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}