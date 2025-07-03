import React, { useState } from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import History   from "./pages/History.jsx";
import Log       from "./pages/Log.jsx";

export default function App() {
  const [entries, setEntries] = useState([]);
  const todayISO = new Date().toISOString().slice(0, 10);

  const removeEntry = (i) => setEntries((e) => e.filter((_, idx) => idx !== i));

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="mx-auto max-w-3xl bg-white shadow rounded-lg p-8 space-y-10">
        {/* Header & nav */}
        <header className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Fitness Tracker</h1>
          <nav className="flex justify-center gap-10 text-sm font-medium">
            {["dashboard", "log", "history"].map((p) => (
              <NavLink
                key={p}
                to={`/${p}`}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-gray-600 hover:text-blue-500"
                }
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </NavLink>
            ))}
          </nav>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/"          element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard entries={entries} />} />
          <Route path="/log"       element={
            <Log
              initialDate={todayISO}
              entries={entries}
              setEntries={setEntries}
            />
          }/>
          <Route path="/history"   element={
            <History entries={entries} onDelete={removeEntry} />
          } />
          <Route path="*"          element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}