import SideBar from "./SideBar";
import TopHeader from "./TopHeader";
import { useLocation } from "react-router-dom";
import { useSidebarState } from "../../store/useSidebarState";

function RootLayout({ children }: any) {
  const location = useLocation();
  const useSidebarStore: any = useSidebarState();

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
    <div>
      <div className="min-w-[100%]  block lg:hidden absolute">
        {useSidebarStore.isSideBarOpen ? <SideBar /> : <></>}
      </div>
      <div className="flex">
        {sideBarNotShow(location.pathname) ? (
          <div className="lg:block hidden min-w-[16rem]">
            <SideBar />{" "}
          </div>
        ) : (
          <></>
        )}
        <div className="w-full flex flex-col">
          {sideBarNotShow(location.pathname) ? <TopHeader /> : <></>}
          <main
            className={`w-full overflow-scroll  ${
              sideBarNotShow(location.pathname)
                ? "h-[calc(100vh-60px)]"
                : "h-[100vh]"
            }`}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
