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
import { useEffect } from "react";
import { useUserDetailsState } from "./store/useUserDetailsState";
import { Oval } from "react-loader-spinner";
import Notifications from "./lib/notifications/Notifications";
import CreactNewRole from "./lib/users/CreactNewRole";
import UserRoles from "./lib/users/UsersRoles";

const App = () => {
  const getUserDetails = useUserDetailsState((state: any) => state.fetch);
  const isLoading = useUserDetailsState((state: any) => state.isLoading);
  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);
  return isLoading ? (
    <div className="w-screen h-screen flex justify-center items-center">
      <Oval
        height={30}
        width={30}
        color="#F1646D"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#F1646D"
        strokeWidth={4}
        strokeWidthSecondary={4}
      />
    </div>
  ) : (
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
            <RequireAuth isLoginPage={true}>
              <Login />
            </RequireAuth>
          }
        />
        <Route path="/login_otp" element={<LoginOtp />} />
        <Route path="/forget_password" element={<ForgetPasswordOtp />} />
        <Route path="/forget_password_otp" element={<ForgetPasswordOtp />} />
        <Route path="/new_password" element={<NewPassword />} />
        {/* Pages */}
        <Route path="/sales_orders/sales" element={<Sales />} />
        <Route path="/sales_orders/orders" element={<Orders />} />
        <Route path="/users/all_users" element={<AllUsers />} />
        <Route path="/users/roles" element={<UserRoles />} />
        <Route path="/users/create_branch_role" element={<CreactNewRole />} />
        <Route path="/users/add_new_user" element={<AddNewUser />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </RootLayout>
  );
};

export default App;
