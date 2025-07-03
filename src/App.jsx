import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Log from "./pages/Log";
import History from "./pages/History";
import ProfileSwitcher from "./components/ProfileSwitcher";
import { ProfilesProvider } from "./hooks/useProfiles";
import { useEntries } from "./hooks/useEntries";

export default function App() {
  return (
    <BrowserRouter>
      <ProfilesProvider>
        <EntriesProvider>
          <div className="mx-auto max-w-3xl px-4 py-8">
            <h1 className="mb-4 text-center text-4xl font-bold">
              Fitness Tracker
            </h1>

            {/* profile selector */}
            <ProfileSwitcher />

            {/* navigation */}
            <nav className="mb-8 flex justify-center gap-6 font-medium">
              {["Dashboard", "Log", "History"].map((p) => (
                <NavLink
                  key={p}
                  to={p === "Dashboard" ? "/" : `/${p.toLowerCase()}`}
                  className={({ isActive }) =>
                    isActive ? "text-blue-600" : "text-gray-600"
                  }
                >
                  {p}
                </NavLink>
              ))}
            </nav>

            {/* routes */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/log" element={<Log />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </div>
        </EntriesProvider>
      </ProfilesProvider>
    </BrowserRouter>
  );
}