import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import AppContextProvider from "./context/AppContext";
import ChatContextProvider from "./context/ChatContext";
import UserContextProvider from "./context/UserContext";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <UserContextProvider>
    <AppContextProvider>
      <ChatContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ChatContextProvider>
    </AppContextProvider>
  </UserContextProvider>
);
