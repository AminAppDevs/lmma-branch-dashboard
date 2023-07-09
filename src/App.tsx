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
import ForgetPasswordPhonePage from "./lib/auth/ForgetPasswordPhone";
import Cookies from "universal-cookie";
const cookies = new Cookies();
import { useLocation } from "react-router-dom";
import AdminAccountDetails from "./lib/account/AdminAccountDetails";
import UserDetails from "./lib/users/UserDetails";
import UserBlocked from "./utils/UserBlocked";
import StoresRequestJoin from "./lib/stores/StoresRequestJoin";
import AllStores from "./lib/stores/AllStores";
import ReviewStoreJoinDetails from "./lib/stores/ReviewStoreJoinDetails";

const App = () => {
  const getUserDetails = useUserDetailsState((state: any) => state.fetch);
  const useUserDetailsStore: any = useUserDetailsState();
  const isLoading = useUserDetailsState((state: any) => state.isLoading);
  const adminId: number = cookies.get("adminId");
  const isLogin: any = cookies.get("isLogin");
  const location = useLocation();

  useEffect(() => {
    getUserDetails(adminId);
    if (location.pathname == "/") {
      if (isLogin) {
        getUserDetails(adminId);
      }
    }
  }, [getUserDetails, adminId, isLogin]);

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
  ) : !useUserDetailsStore?.userDetails.isActive && isLogin ? (
    <UserBlocked />
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
        {/* Users */}
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
          path="/users/user_details/:id"
          element={
            <RequireAuth>
              <UserDetails />
            </RequireAuth>
          }
        />
        <Route
          path="/admin_account_details"
          element={
            <RequireAuth>
              <AdminAccountDetails />
            </RequireAuth>
          }
        />
        {/* Notifications */}
        <Route
          path="/notifications"
          element={
            <RequireAuth>
              <Notifications />
            </RequireAuth>
          }
        />
        {/* Stores */}
        <Route
          path="/stores/join_request"
          element={
            <RequireAuth>
              <StoresRequestJoin />
            </RequireAuth>
          }
        />
        <Route
          path="/stores/join_request/:id"
          element={
            <RequireAuth>
              <ReviewStoreJoinDetails />
            </RequireAuth>
          }
        />
        <Route
          path="/stores/all_stores"
          element={
            <RequireAuth>
              <AllStores />
            </RequireAuth>
          }
        />
      </Routes>
    </RootLayout>
  );
};

export default App;
