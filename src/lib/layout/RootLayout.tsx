import SideBar from "./SideBar";
import TopHeader from "./TopHeader";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useUserDetailsState } from "../../store/useUserDetailsState";
import { Oval } from "react-loader-spinner";

function RootLayout({ children }: any) {
  const location = useLocation();
  const getUserDetails = useUserDetailsState((state: any) => state.fetch);
  const isLoading = useUserDetailsState((state: any) => state.isLoading);
  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);
  const sideBarNotShow = (path: string) => {
    if (
      path === "/login" ||
      path === "/login_otp" ||
      path === "/forget_password" ||
      path === "/forget_password_otp" ||
      path === "/new_password"
    ) {
      return false;
    } else {
      return true;
    }
  };

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
    <div className="flex">
      {sideBarNotShow(location.pathname) ? (
        <div className="">
          <SideBar />
        </div>
      ) : (
        <></>
      )}
      <div className="w-full flex flex-col">
        {sideBarNotShow(location.pathname) ? <TopHeader /> : <></>}
        <main
          className={`w-full overflow-y-auto  ${
            sideBarNotShow(location.pathname)
              ? "h-[calc(100vh-60px)]"
              : "h-screen"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default RootLayout;
