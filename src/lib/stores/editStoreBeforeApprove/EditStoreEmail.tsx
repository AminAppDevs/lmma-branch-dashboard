import EditStoreDialog from "./EditStoreDialog";
import { useForm } from "react-hook-form";
import BtnLoading from "../../../utils/BtnLoading";
import { useState } from "react";
import axios from "../../../services/axios";
import { errorToast, successToast } from "../../../utils/toastify";

const EditStoreEmail = ({ data, mutate }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const editForm = useForm({
    defaultValues: {
      email: data.email,
    },
  });
  /// on submit
  const onSubmit = async (formData: any) => {
    console.log(data.id, "xxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    if (!isLoading) {
      try {
        setIsLoading(true);
        await axios.patch(`/stores/update_store_by_branch_admin/${data.id}`, {
          email: formData.email,
        });
        setIsLoading(false);
        mutate();
        successToast("تم تغيير البريد الإلكتروني بنجاح");
      } catch (error) {
        errorToast("يوجد خطأ ما حاول مرة أخرى - ببريد إلكتروني مختلف");
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="flex justify-between items-center border-b border-dashed p-4">
      <div className="flex items-center gap-2">
        <h3 className="text-[15px] text-title-light">
          البريد الإلكتروني:{data?.email}
        </h3>
      </div>
      <EditStoreDialog text="تعديل البريد الإلكتروني للأسرة المنتجة">
        <form onSubmit={editForm.handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="البريد الإلكتروني ببأسرة المنتجة"
            {...editForm.register("email", {
              required: "الحقل فارغ",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                message: "الرجاء إدخال بريد إلكتروني صحيح",
              },
              validate: (value: string) => {
                if (value === data.email) {
                  return "نفس البريد الإلكتروني القديم";
                }
              },
            })}
            className="bg-white p-3 rounded-xl w-full outline-1 outline outline-input-border focus:outline-orange-color placeholder:text-input-placeholder placeholder:text-[15px] leading-6 text-title-light mt-2"
          />
          {editForm.formState.errors.email && (
            <span className=" text-red-600 text-[13px] inline-block">
              {`${editForm.formState.errors.email.message}`}
            </span>
          )}
          <button
            type="submit"
            className="bg-primary-color flex justify-center hover:bg-primary-color-hover transition-colors ease-in-out rounded-xl w-full py-[15px] text-white  mt-2"
          >
            {isLoading ? <BtnLoading /> : <>تحديث</>}
          </button>
        </form>
      </EditStoreDialog>
    </div>
  );
};

export default EditStoreEmail;
