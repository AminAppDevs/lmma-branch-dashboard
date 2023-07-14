import EditStoreDialog from "./EditStoreDialog";
import { useForm } from "react-hook-form";
import BtnLoading from "../../../utils/BtnLoading";
import { useState } from "react";
import axios from "../../../services/axios";
import { errorToast, successToast } from "../../../utils/toastify";

const EditStoreName = ({ data, mutate }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const editForm = useForm({
    defaultValues: {
      name: data.name,
    },
  });
  /// on submit
  const onSubmit = async (formData: any) => {
    console.log(data.id, "xxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    if (!isLoading) {
      try {
        setIsLoading(true);
        await axios.patch(`/stores/update_store_by_branch_admin/${data.id}`, {
          name: formData.name,
        });
        setIsLoading(false);
        mutate();
        successToast("تم تغيير الاسم بنجاح");
      } catch (error) {
        errorToast("يوجد خطأ ما حاول مرة أخرى");
      }
    }
  };
  return (
    <div className="flex justify-between items-center border-b border-dashed p-4">
      <div className="flex items-center gap-2">
        <img src={data?.logo} alt="" className="w-[50px] h-[50px] rounded-xl" />
        <h3 className="text-[15px] text-title-light">{data?.name}</h3>
      </div>
      <EditStoreDialog text="تعديل اسم الأسرة المنتجة">
        <form onSubmit={editForm.handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="اسم الأسرة المنتجة"
            {...editForm.register("name", {
              required: "الحقل فارغ",
              validate: (value: string) => {
                if (value === data.name) {
                  return "اسم الأسرة المنتجة نفس الإسم القديم";
                }
              },
            })}
            className="bg-white p-3 rounded-xl w-full outline-1 outline outline-input-border focus:outline-orange-color placeholder:text-input-placeholder placeholder:text-[15px] leading-6 text-title-light mt-2"
          />
          {editForm.formState.errors.name && (
            <span className=" text-red-600 text-[13px] inline-block">
              {`${editForm.formState.errors.name.message}`}
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

export default EditStoreName;
