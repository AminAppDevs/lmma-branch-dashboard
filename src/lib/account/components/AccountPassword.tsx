import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { useForm } from "react-hook-form";
import { useState } from "react";
import BtnLoading from "../../../utils/BtnLoading";
import { errorToast } from "../../../utils/toastify";
import axios from "../../../services/axios";
import Cookies from "universal-cookie";
import { ToastContainer } from "react-toastify";
const cookies = new Cookies();

const AccountPassword = (props: any) => {
  const adminId: number = cookies.get("adminId");
  const [isLoading, setIsLoading] = useState(false);
  const accountPasswordForm = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  ///// on submit
  const onSubmit = async (data: any) => {
    console.log(data);
    setIsLoading(true);
    axios
      .patch(`/branches/change_admin_password`, {
        phone: props.useUserDetailsStore?.userDetails?.phone,
        newPassword: data.password,
      })
      .then(() => {
        props.useUserDetailsStore.fetch(+adminId);
        setIsLoading(false);
      })
      .catch(() => {
        errorToast("يوجد خطأ ما حاول مرة أخرى");
        setIsLoading(false);
      });
  };
  return (
    <div>
      <ToastContainer />
      <div className="flex justify-between items-center border-b border-dashed py-3 px-3">
        <h4 className="text-title-light text-[15px]">كلمة المرور</h4>
        <div
          className="text-[15px] underline text-primary-color underline-offset-4 text-right"
          dir="rtl"
        >
          <Dialog>
            <DialogTrigger>تغيير كلمة المرور</DialogTrigger>
            <DialogContent className="shadow-none">
              <DialogHeader>
                <DialogTitle className="text-center">
                  تغيير كلمة المرور
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={accountPasswordForm.handleSubmit(onSubmit)}>
                <div className="w-full">
                  <input
                    type="password"
                    placeholder="كلمة المرور الجديدة"
                    {...accountPasswordForm.register("password", {
                      required: "الحقل فارغ",
                    })}
                    className="bg-white p-3 rounded-xl w-full outline-1 outline outline-input-border focus:outline-orange-color placeholder:text-input-placeholder placeholder:text-[15px] leading-6 text-title-light mt-2"
                  />
                  {accountPasswordForm.formState.errors.password && (
                    <span className=" text-red-600 text-[13px] inline-block">
                      {`${accountPasswordForm.formState.errors.password.message}`}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <input
                    type="password"
                    placeholder="تأكيد كلمة المرور"
                    {...accountPasswordForm.register("confirmPassword", {
                      required: "الحقل فارغ",
                      validate: (value: string) => {
                        if (accountPasswordForm.watch("password") !== value) {
                          return "كلمة المرور غير متطابقة";
                        }
                      },
                    })}
                    className="bg-white p-3 rounded-xl w-full outline-1 outline outline-input-border focus:outline-orange-color placeholder:text-input-placeholder placeholder:text-[15px] leading-6 text-title-light mt-2"
                  />
                  {accountPasswordForm.formState.errors.confirmPassword && (
                    <span className=" text-red-600 text-[13px] inline-block">
                      {`${accountPasswordForm.formState.errors.confirmPassword.message}`}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-primary-color flex justify-center hover:bg-primary-color-hover transition-colors ease-in-out rounded-xl w-full py-[15px] text-white  mt-2"
                >
                  {isLoading ? <BtnLoading /> : <>تغيير</>}
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AccountPassword;
