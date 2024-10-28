import React from "react";
import ReactDOM from "react-dom/client";
import { ChatBot } from "./layout/chatBot/chatBot";

import App from "./App";
import "./css/style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChatBot />
    <App />
  </React.StrictMode>
);
