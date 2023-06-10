import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import App from "./App.tsx";
import "./index.css";
import Login from "./lib/auth/Login.tsx";
import { RequireAuth } from "./RequireAuth.tsx";
import LoginOtp from "./lib/auth/LoginOtp.tsx";
import ForgetPassword from "./lib/auth/ForgetPasswordPhone.tsx";
import ForgetPasswordOtp from "./lib/auth/ForgetPasswordOtp.tsx";
import NewPassword from "./lib/auth/NewPassword.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <div id="login-otp"></div>
      <div id="rest-password-otp"></div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <RequireAuth>
                <App />
              </RequireAuth>
            }
          />
          <Route
            path="/login"
            element={
              <RequireAuth isLoginPage={true}>
                <Login />
              </RequireAuth>
            }
          />
          <Route path="/login_otp" element={<LoginOtp />} />
          <Route path="/forget_password" element={<ForgetPassword />} />
          <Route path="/forget_password_otp" element={<ForgetPasswordOtp />} />
          <Route path="/new_password" element={<NewPassword />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>
);
