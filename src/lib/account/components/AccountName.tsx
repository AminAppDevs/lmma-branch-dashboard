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

const AccountName = (props: any) => {
  const adminId: number = cookies.get("adminId");
  const [isLoading, setIsLoading] = useState(false);
  const accountNameForm = useForm({
    defaultValues: {
      name: props.useUserDetailsStore?.userDetails?.name,
    },
  });

  ///// on submit
  const onSubmit = async (data: any) => {
    console.log(data);
    setIsLoading(true);
    axios
      .patch(`/branches/update_admin/${adminId}`, {
        name: data.name,
      })
      .then((val) => {
        props.useUserDetailsStore.fetch(+adminId);
        setIsLoading(false);
        console.log(val);
      })
      .catch((err) => {
        console.log(err);
        errorToast("يوجد خطأ ما حاول مرة أخرى");
        setIsLoading(false);
      });
  };
  return (
    <div>
      <ToastContainer />
      <div className="flex justify-between items-center border-b border-dashed py-3 px-3">
        <h4 className="text-title-light text-[15px]">
          {props.useUserDetailsStore?.userDetails?.name}
        </h4>
        <div
          className="text-[15px] underline text-green-color underline-offset-4 text-right"
          dir="rtl"
        >
          <Dialog>
            <DialogTrigger>تعديل</DialogTrigger>
            <DialogContent className="shadow-none">
              <DialogHeader>
                <DialogTitle className="text-center">تعديل الإسم</DialogTitle>
              </DialogHeader>
              <form onSubmit={accountNameForm.handleSubmit(onSubmit)}>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="الاسم"
                    {...accountNameForm.register("name", {
                      required: "الحقل فارغ",
                      validate: (value: string) => {
                        if (
                          value === props.useUserDetailsStore?.userDetails?.name
                        ) {
                          return "الاسم نفس الاسم القديم";
                        }
                      },
                    })}
                    className="bg-white p-3 rounded-xl w-full outline-1 outline outline-input-border focus:outline-orange-color placeholder:text-input-placeholder placeholder:text-[15px] leading-6 text-title-light mt-2"
                  />
                </div>
                {accountNameForm.formState.errors.name && (
                  <span className=" text-red-600 text-[13px] inline-block">
                    {`${accountNameForm.formState.errors.name.message}`}
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

export default AccountName;
