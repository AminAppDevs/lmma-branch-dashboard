import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import "./index.css";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <React.StrictMode>
      <CookiesProvider>
        <div id="login-otp"></div>
        <div id="rest-password-otp"></div>
        <App />
      </CookiesProvider>
    </React.StrictMode>
  </BrowserRouter>
);
