import App from "./App";
import Login from "./lib/auth/Login";
import Cookies from "universal-cookie";
import { useEffect } from "react";
const cookies = new Cookies();
import { useNavigate } from "react-router-dom";
import LoginOtp from "./lib/auth/LoginOtp";
import ForgetPasswordPhonePage from "./lib/auth/ForgetPasswordPhone";
import ForgetPasswordOtp from "./lib/auth/ForgetPasswordOtp";
import NewPAssword from "./lib/auth/NewPassword";

export const RequireAuth = ({ children, isLoginPage, path }: any) => {
  const navigate = useNavigate();
  const isLogin: any = cookies.get("isLogin");
  useEffect(() => {
    if (!isLogin) {
      if (path === "login_otp") {
        navigate("/login_otp", { replace: true });
      } else if (path === "forget_password") {
        navigate("/forget_password", { replace: true });
      } else if (path === "forget_password_otp") {
        navigate("/forget_password_otp", { replace: true });
      } else if (path === "new_password") {
        navigate("/new_password", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    } else if (isLogin && isLoginPage) {
      navigate("/", { replace: true });
    }
  }, [navigate, isLogin, path, isLoginPage]);

  if (!isLogin) {
    if (path === "login_otp") {
      return <LoginOtp />;
    } else if (path === "forget_password") {
      return <ForgetPasswordPhonePage />;
    } else if (path === "forget_password_otp") {
      return <ForgetPasswordOtp />;
    } else if (path === "login") {
      return <Login />;
    } else if (path === "new_password") {
      return <NewPAssword />;
    }
  } else if (isLogin && isLoginPage) {
    return <App />;
  } else {
    return children;
  }
};
