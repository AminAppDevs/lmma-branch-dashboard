import SideBar from "./SideBar";
import TopHeader from "./TopHeader";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function RootLayout({ children }: any) {
  const isLogin: any = cookies.get("isLogin");
  return (
    <div className="flex">
      {isLogin ? (
        <div className="">
          <SideBar />
        </div>
      ) : (
        <></>
      )}
      <div className="w-full flex flex-col">
        {isLogin ? <TopHeader /> : <></>}
        <main className="w-full overflow-y-auto  h-[calc(100vh-60px)]">
          {children}
        </main>
      </div>
    </div>
  );
}

export default RootLayout;
