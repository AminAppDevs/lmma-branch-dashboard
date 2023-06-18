import RootLayout from "./lib/layout/RootLayout";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";
import ForgetPasswordOtp from "./lib/auth/ForgetPasswordOtp";
import LoginOtp from "./lib/auth/LoginOtp";
import NewPassword from "./lib/auth/NewPassword";
import Orders from "./lib/orders/Orders";
import Sales from "./lib/sales/Sales";
import AllUsers from "./lib/users/AllUsers";
import AddNewUser from "./lib/users/AddNewUser";
import Login from "./lib/auth/Login";
import Home from "./lib/home/Home";
import Notifications from "./lib/notifications/Notifications";
import CreactNewRole from "./lib/users/CreactNewRole";
import UserRoles from "./lib/users/UsersRoles";
import ForgetPasswordPhonePage from "./lib/auth/ForgetPasswordPhone";

const App = () => {
  return (
    <RootLayout>
      <Routes>
        <Route
          path="/*"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/login"
          element={
            <RequireAuth path="login" isLoginPage={true}>
              <Login />
            </RequireAuth>
          }
        />
        <Route
          path="/login_otp"
          element={
            <RequireAuth path="login_otp" isLoginPage={true}>
              <LoginOtp />
            </RequireAuth>
          }
        />
        <Route
          path="/forget_password"
          element={
            <RequireAuth path="forget_password" isLoginPage={true}>
              <ForgetPasswordPhonePage />
            </RequireAuth>
          }
        />
        <Route
          path="/forget_password_otp"
          element={
            <RequireAuth path="forget_password_otp" isLoginPage={true}>
              <ForgetPasswordOtp />
            </RequireAuth>
          }
        />
        <Route
          path="/new_password"
          element={
            <RequireAuth path="new_password" isLoginPage={true}>
              <NewPassword />
            </RequireAuth>
          }
        />
        {/* Pages */}
        <Route
          path="/sales_orders/sales"
          element={
            <RequireAuth>
              <Sales />
            </RequireAuth>
          }
        />
        <Route
          path="/sales_orders/orders"
          element={
            <RequireAuth>
              <Orders />
            </RequireAuth>
          }
        />
        <Route
          path="/users/all_users"
          element={
            <RequireAuth>
              <AllUsers />
            </RequireAuth>
          }
        />
        <Route
          path="/users/roles"
          element={
            <RequireAuth>
              <UserRoles />
            </RequireAuth>
          }
        />
        <Route
          path="/users/create_branch_role"
          element={
            <RequireAuth>
              <CreactNewRole />
            </RequireAuth>
          }
        />
        <Route
          path="/users/add_new_user"
          element={
            <RequireAuth>
              <AddNewUser />
            </RequireAuth>
          }
        />
        <Route
          path="/notifications"
          element={
            <RequireAuth>
              <Notifications />
            </RequireAuth>
          }
        />
      </Routes>
    </RootLayout>
  );
};

export default App;
