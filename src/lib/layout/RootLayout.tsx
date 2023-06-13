import SideBar from "./SideBar";
import TopHeader from "./TopHeader";

function RootLayout({ children }: any) {
  return (
    <div className="flex">
      <div className="">
        <SideBar />
      </div>
      <div className="w-full flex flex-col">
        <TopHeader />
        <main className="w-full overflow-y-auto  h-[calc(100vh-60px)]">
          {children}
        </main>
      </div>
    </div>
  );
}

export default RootLayout;
