import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { aggregate } from '../utils/aggregate.js';

const COLORS = ['#2563eb', '#34d399', '#fbbf24', '#c084fc', '#f87171', '#14b8a6','#60a5fa'];

export default function SummaryVisuals({ entries }) {
  if (!entries.length) return null;

  const { minsThisWeek, kmThisWeek, activityTotals } = aggregate(entries);

  // Convert activityTotals to pie-chart friendly format
  const pieData = Object.keys(activityTotals).map((k) => ({
    name: k,
    value: activityTotals[k]
  }));

  // Bar chart: last 7 entries by date (total mins / entry)
  const barData = entries.slice(0, 7).reverse().map((e) => ({
    name: e.date.slice(5), // HH-MM
    mins: e.segments.reduce((t, s) => t + Number(s.duration || 0), 0),
  }));

  return (
    <div style={{ marginTop: '2rem' }}>
      {/* Summary cards */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Card label="Minutes this week" value={`${minsThisWeek} min`} />
        <Card label="Distance (run/bike)" value={`${kmThisWeek.toFixed(1)} km`} />
      </div>

      {/* Charts */}
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
        <div>
          <h3 style={{ textAlign: 'center' }}>Last 7 logged days (min)</h3>
          <BarChart width={300} height={200} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="mins" fill="#2563eb" />
          </BarChart>
        </div>

        <div>
          <h3 style={{ textAlign: 'center' }}>Time by type</h3>
          <PieChart width={300} height={200}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((_, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

function Card({ label, value }) {
  return (
    <div style={{
      flex: '1 1 130px',
      background: '#f3f4f6',
      borderRadius: 8,
      padding: '1rem',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '0.8rem', color: '#555' }}>{label}</div>
      <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{value}</div>
    </div>
  );
}