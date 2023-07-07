import { useNavigate } from "react-router-dom";
import blockIcon from "../assets/blocked.svg";
import { useCookies } from "react-cookie";

const UserBlocked = () => {
  const [, , removeCookie] = useCookies(["isLogin", "adminId", "token"]);
  const navigate = useNavigate();
  /// handle logout
  const handleLogout = async () => {
    removeCookie("isLogin", { path: "/" });
    removeCookie("adminId", { path: "/" });
    removeCookie("token", { path: "/" });
    navigate("/login");
  };
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col px-2">
      <img src={blockIcon} alt="" className="w-[80px]" />
      <h3 className="text-[22px] mt-4 text-title-dark font-semibold">
        حسابك محظور
      </h3>
      <p className="text-title-light mt-1 text-[15px]">
        نأسف لا تستطيع الوصول لحسابك بسبب الحظر
      </p>
      <button
        type="button"
        onClick={handleLogout}
        className="bg-primary-color hover:bg-primary-color-hover transition-colors cursor-pointer px-8 py-3 mt-4 rounded-xl text-white"
      >
        تسجيل خروج
      </button>
    </div>
  );
};

export default UserBlocked;
