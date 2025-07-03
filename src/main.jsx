import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import { ProfilesProvider } from "./hooks/useProfiles.jsx";
import { EntriesProvider }  from "./hooks/useEntries.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProfilesProvider>
        <EntriesProvider>
          <App />
        </EntriesProvider>
      </ProfilesProvider>
    </BrowserRouter>
  </React.StrictMode>
);