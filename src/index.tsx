import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import UserContextProvider from "./context/UserContext";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <UserContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </UserContextProvider>
);
