import { NavLink } from "react-router-dom";
import { useSidebarState } from "../../store/useSidebarState";
import { useUserDetailsState } from "../../store/useUserDetailsState";
import { IoNotifications } from "react-icons/io5";

const TopHeader = () => {
  const userDetails = useUserDetailsState((state: any) => state.userDetails);
  const isLoading = useUserDetailsState((state: any) => state.isLoading);
  const changeActiveLinkId = useSidebarState(
    (state: any) => state.changeActiveLinkId
  );

  return (
    <div className="bg-white">
      <div className="h-[60px] bg-white sticky flex justify-between items-center container mx-auto">
        {isLoading ? (
          <></>
        ) : (
          <div className="flex gap-2 items-center">
            {userDetails.avatar ? (
              <div className="w-[50px] h-[50px] rounded-full bg-primary-color overflow-hidden">
                <img src={userDetails.avatar.url} alt="" />
              </div>
            ) : (
              <div className="w-[50px] h-[50px] rounded-full bg-primary-color"></div>
            )}
            <div className="flex flex-col">
              <h3 className="text-title-dark text-[14px] p-0 m-0 leading-4">
                {userDetails.name}
              </h3>
              <h3 className="text-title-lighter text-[12px] p-0 m-0 leading-4">
                {userDetails.isSuperAdmin
                  ? "مدير النظام"
                  : userDetails.role?.title}
              </h3>
            </div>
          </div>
        )}
        <NavLink
          to={"/notifications"}
          onClick={() => changeActiveLinkId(4)}
          className={"relative"}
        >
          <div className="absolute w-3 h-3 rounded-full bg-primary-color border border-white"></div>
          <IoNotifications size={25} color="#AEBDD9" />
        </NavLink>
      </div>
    </div>
  );
};

export default TopHeader;
