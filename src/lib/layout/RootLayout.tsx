import SideBar from "./SideBar";
import TopHeader from "./TopHeader";
import { useLocation } from "react-router-dom";

function RootLayout({ children }: any) {
  const location = useLocation();

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

  return (
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
