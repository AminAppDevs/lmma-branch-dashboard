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
import axios from "../../../services/axios";
import Cookies from "universal-cookie";
import { errorToast } from "../../../utils/toastify";
import { ToastContainer } from "react-toastify";
const cookies = new Cookies();

const AccountPhone = (props: any) => {
  const adminId: number = cookies.get("adminId");
  const [isLoading, setIsLoading] = useState(false);
  const accountPhoneForm = useForm({
    defaultValues: {
      phone: props.useUserDetailsStore?.userDetails?.phone,
    },
  });

  ///// on submit
  const onSubmit = async (data: any) => {
    console.log(data);
    setIsLoading(true);
    axios
      .patch(`/branches/update_admin/${adminId}`, {
        phone: data.phone,
      })
      .then((val) => {
        props.useUserDetailsStore.fetch(+adminId);
        setIsLoading(false);
        console.log(val);
      })
      .catch((err: any) => {
        console.log(err);
        setIsLoading(false);
        errorToast(
          `${
            err?.response?.status === 409
              ? "رقم الجوال مستخدم بالفعل"
              : "يوجد حطأ ما حاول مرة أخرى"
          }`
        );
      });
  };
  return (
    <div>
      <ToastContainer />
      <div className="flex justify-between items-center border-b border-dashed py-3 px-3">
        <h4 className="text-title-light text-[15px]">
          {props.useUserDetailsStore?.userDetails?.phone}
        </h4>
        <div
          className="text-[15px] underline text-green-color underline-offset-4 text-right"
          dir="rtl"
        >
          <Dialog>
            <DialogTrigger>تعديل</DialogTrigger>
            <DialogContent className="shadow-none">
              <DialogHeader>
                <DialogTitle className="text-center">
                  تعديل رقم الجوال
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={accountPhoneForm.handleSubmit(onSubmit)}>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="رقم الجوال"
                    {...accountPhoneForm.register("phone", {
                      required: "الحقل فارغ",
                      validate: (value: string) => {
                        if (
                          value ===
                          props.useUserDetailsStore?.userDetails?.phone
                        ) {
                          return "رقم الجوال نفس رقم الجوال القديم";
                        }
                      },
                    })}
                    className="bg-white p-3 rounded-xl w-full outline-1 outline outline-input-border focus:outline-orange-color placeholder:text-input-placeholder placeholder:text-[15px] leading-6 text-title-light mt-2"
                  />
                </div>
                {accountPhoneForm.formState.errors.phone && (
                  <span className=" text-red-600 text-[13px] inline-block">
                    {`${accountPhoneForm.formState.errors.phone.message}`}
                  </span>
                )}
                <button
                  type="submit"
                  className="bg-primary-color flex justify-center hover:bg-primary-color-hover transition-colors ease-in-out rounded-xl w-full py-[15px] text-white  mt-2"
                >
                  {isLoading ? <BtnLoading /> : <>تحديث</>}
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AccountPhone;
