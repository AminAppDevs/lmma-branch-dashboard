import App from "./App";
import Login from "./lib/auth/Login";
import Cookies from "universal-cookie";
import { useEffect } from "react";
const cookies = new Cookies();
import { useNavigate } from "react-router-dom";

export const RequireAuth = ({ children, isLoginPage }: any) => {
  const navigate = useNavigate();
  const isLogin: any = cookies.get("isLogin");
  useEffect(() => {
    if (!isLogin) {
      navigate("/login", { replace: true });
    } else if (isLogin && isLoginPage) {
      navigate("/", { replace: true });
    }
  }, [isLogin, isLoginPage, navigate]);

  if (!isLogin) {
    return <Login />;
  } else if (isLogin && isLoginPage) {
    return <App />;
  } else {
    return children;
  }
};
