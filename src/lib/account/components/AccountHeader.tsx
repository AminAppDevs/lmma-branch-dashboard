import BtnLoading from "../../../utils/BtnLoading";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import axios from "../../../services/axios";
import { errorToast } from "../../../utils/toastify";
import Cookies from "universal-cookie";
import { ToastContainer } from "react-toastify";
const cookies = new Cookies();

const AccountHeader = (props: any) => {
  const adminId: number = cookies.get("adminId");
  const [avatarImage, setAvatarImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];

    if (file && file.size <= 1024 * 1024) {
      setAvatarImage(file);
      // Perform additional actions with the file if needed
    } else {
      errorToast("حجم الصورة يجب أن لا يتجاوز 1 ميجابايت");
    }
  };

  const handleAvatarChange = () => {
    if (avatarImage) {
      setIsLoading(true);
      const form = new FormData();
      form.append("avatar", avatarImage);
      axios
        .post(`/branches/change_admin_avatar/${adminId}`, form)
        .then(() => {
          setIsLoading(false);
          props.useUserDetailsStore.fetch(+adminId);
        })
        .catch(() => {
          setIsLoading(false);
          errorToast("يوجد خطأ ما حاول مرة أخرى");
        });
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="p-2 bg-white rounded-xl flex justify-between items-center">
        <h3 className="text-title-dark text-[18px] font-semibold pr-1">
          تفاصيل حسابك
        </h3>
        <div className="flex gap-1 items-center">
          <div className="bg-orange-color hover:bg-orange-color-dark rounded-xl px-4 py-[8px] cursor-pointer transition-colors ease-in-out text-white text-[15px]">
            <Dialog>
              <DialogTrigger>تغيير الصورة</DialogTrigger>
              <DialogContent className="shadow-none">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    تغيير صورتك الشخصية
                  </DialogTitle>
                </DialogHeader>
                <div className="flex w-full justify-center flex-col items-center gap-2 border-b border-dashed pb-5">
                  <div className=" w-[100px] h-[100px] rounded-xl bg-gray-200 flex justify-center items-center overflow-hidden">
                    {avatarImage ? (
                      <img
                        src={URL.createObjectURL(avatarImage)}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <IoImageOutline size={80} color="#ffffff" />
                    )}
                    <input
                      type="file"
                      name={"cover_image"}
                      id={"cover_image"}
                      hidden
                      onChange={(event: any) => handleImageChange(event)}
                      accept=".jpg, .jpeg, .png"
                    />
                  </div>
                  <label htmlFor={"cover_image"}>
                    <div className="px-4 py-2 rounded-xl inline-block text-white text-[14px] bg-primary-color cursor-pointer hover:bg-primary-color-hover transition-colors ease-in-out">
                      {avatarImage ? "استبدال الصورة" : " رفع الصورة"}
                    </div>
                  </label>
                </div>
                <div
                  onClick={handleAvatarChange}
                  className="bg-green-color hover:bg-green-600 transition-colors rounded-xl flex justify-center items-center h-[55px] text-center text-white font-medium cursor-pointer"
                >
                  {isLoading ? <BtnLoading /> : <span>حفظ وتغيير</span>}
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="w-[50px] h-[50px] rounded-xl bg-gray-300 overflow-hidden">
            <img
              src={props.useUserDetailsStore?.userDetails?.avatar?.url}
              alt=""
              className="rounded-xl h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountHeader;
