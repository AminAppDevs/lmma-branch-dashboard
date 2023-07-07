import logoLight from "../../assets/logo-light.svg";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import {
  handleIsPermissionExist,
  handleSubMenuContainPremission,
  menuData,
} from "./menu.data";
import {
  IoRadioButtonOnSharp,
  IoChevronBackOutline,
  IoChevronDownOutline,
} from "react-icons/io5";
import { useSidebarState } from "../../store/useSidebarState";
import { useUserDetailsState } from "../../store/useUserDetailsState";
import { useCookies } from "react-cookie";

const SideBar = () => {
  const activeNavLink = useSidebarState((state: any) => state.activeNavLink);
  const activeSubMenu = useSidebarState((state: any) => state.activeSubMenu);
  const roleDetails = useUserDetailsState((state: any) => state.roleDetails);
  const userDetails = useUserDetailsState((state: any) => state.userDetails);
  const useSidebarStore: any = useSidebarState();
  const [, , removeCookie] = useCookies(["isLogin", "adminId", "token"]);
  const navigate = useNavigate();
  const changeActiveLinkId = useSidebarState(
    (state: any) => state.changeActiveLinkId
  );

  /// handle logout
  const handleLogout = async () => {
    removeCookie("isLogin", { path: "/" });
    removeCookie("adminId", { path: "/" });
    removeCookie("token", { path: "/" });
    navigate("/login");
  };

  const submenu_animation = {
    // system view
    open: {
      height: "0",
      transition: {
        damping: 100,
      },
    },
    closed: {
      height: "auto",
      transition: {
        damping: 100,
      },
    },
  };

  return (
    <div className="bg-white z-[999] w-full h-screen overflow-y-auto md:relative fixed border-l border-gray-50 flex justify-between flex-col">
      {/* Menu */}
      <div>
        <div className="h-[60px] bg-title-dark flex items-center justify-between px-3">
          <img src={logoLight} alt="" />
          <div className="bg-white px-4 py-[5px] text-title-light rounded-full text-[14px]">
            فرع الرياض
          </div>
          <div
            className="bg-red-500 px-3 py-1 rounded-full text-white text-[14px] lg:hidden inline-block cursor-pointer"
            onClick={() => useSidebarStore.setIsSideBarOpen(false)}
          >
            اغلاق
          </div>
        </div>
        <ul className="p-3">
          {menuData.map((menuItem, menuIndex) => {
            return menuItem.isSubmenu ? (
              <ul key={menuIndex}>
                {handleSubMenuContainPremission(
                  userDetails?.isSuperAdmin,
                  menuItem.children,
                  roleDetails?.permissions
                ) ? (
                  <div
                    onClick={() => changeActiveLinkId(menuItem.id)}
                    className={
                      activeNavLink === menuItem.id
                        ? " bg-primary-color py-3 px-3 rounded-xl text-[16px] text-white cursor-pointer mb-2 flex items-center justify-between"
                        : "text-title-dark py-3 px-3 text-[16px] cursor-pointer flex items-center justify-between"
                    }
                  >
                    <div className="flex gap-2 items-center">
                      <menuItem.icon size={20} />
                      <span>{menuItem.title}</span>
                    </div>
                    <div>
                      {activeNavLink === menuItem.id ? (
                        <IoChevronDownOutline size={18} color="#fff" />
                      ) : (
                        <IoChevronBackOutline size={18} color="#5E77A8" />
                      )}
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                <motion.div
                  variants={submenu_animation}
                  animate={menuItem.id != activeSubMenu ? "open" : "closed"}
                  className="overflow-hidden "
                  transition={{ ease: "easeOut", duration: 2 }}
                >
                  {menuItem.children?.map((submenuItem, subMenuIndex) => {
                    return handleIsPermissionExist(
                      userDetails?.isSuperAdmin,
                      submenuItem.permission,
                      roleDetails?.permissions
                    ) ? (
                      <li key={subMenuIndex}>
                        <NavLink
                          to={submenuItem.path}
                          onClick={() =>
                            useSidebarStore.setIsSideBarOpen(false)
                          }
                          className={({ isActive, isPending }) =>
                            isPending
                              ? "pending"
                              : isActive
                              ? "text-primary-color px-2 py-[7px] text-[15px] inline-block mr-3"
                              : "text-title-lighter px-2 py-[7px] text-[15px] inline-block mr-3"
                          }
                        >
                          <div className="flex items-center gap-2">
                            <IoRadioButtonOnSharp size={10} />
                            {submenuItem.title}
                          </div>
                        </NavLink>
                      </li>
                    ) : (
                      <div key={subMenuIndex}></div>
                    );
                  })}
                </motion.div>
              </ul>
            ) : handleIsPermissionExist(
                userDetails?.isSuperAdmin,
                menuItem.permission,
                roleDetails?.permissions
              ) ? (
              <li
                key={menuIndex}
                onClick={() => changeActiveLinkId(menuItem.id)}
                className={
                  activeNavLink === menuItem.id
                    ? " bg-primary-color py-3 px-3 rounded-xl text-[16px] text-white cursor-pointer"
                    : "text-title-dark py-3 px-3 text-[16px] cursor-pointer"
                }
              >
                <NavLink
                  to={menuItem.path}
                  className="flex items-center gap-2"
                  onClick={() => useSidebarStore.setIsSideBarOpen(false)}
                >
                  <menuItem.icon size={20} />
                  {menuItem.title}
                </NavLink>
              </li>
            ) : (
              <div key={menuIndex}></div>
            );
          })}
        </ul>
      </div>
      {/* button */}
      <button
        type="button"
        className="bg-red-500 bg-opacity-10 h-[45px] text-red-500 flex items-center justify-center cursor-pointer"
        onClick={handleLogout}
      >
        تسجيل الخروج
      </button>
    </div>
  );
};

export default SideBar;
