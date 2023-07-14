import EditStoreDialog from "./EditStoreDialog";
import { useForm } from "react-hook-form";
import BtnLoading from "../../../utils/BtnLoading";
import { useState } from "react";
import axios from "../../../services/axios";
import { errorToast, successToast } from "../../../utils/toastify";

const EditStoreRegistrationNo = ({ data, mutate }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const editForm = useForm({
    defaultValues: {
      registrationNo: data.registrationNo,
    },
  });
  /// on submit
  const onSubmit = async (formData: any) => {
    console.log(data.id, "xxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    if (!isLoading) {
      try {
        setIsLoading(true);
        await axios.patch(`/stores/update_store_by_branch_admin/${data.id}`, {
          registrationNo: formData.registrationNo,
        });
        setIsLoading(false);
        mutate();
        successToast("تم تغيير السجل التجاري بنجاح");
      } catch (error) {
        errorToast("يوجد خطأ ما حاول مرة أخرى");
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="flex justify-between items-center border-b border-dashed p-4">
      <div className="flex items-center gap-2">
        <h3 className="text-[15px] text-title-light">
          رقم السجل التجاري:{data?.registrationNo}
        </h3>
      </div>
      <EditStoreDialog text="تعديل السجل التجاري">
        <form onSubmit={editForm.handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="رقم السجل التجاري"
            {...editForm.register("registrationNo", {
              required: "الحقل فارغ",
              validate: (value: string) => {
                if (value === data.registrationNo) {
                  return "نفس رقم السجل التجاري القديم";
                }
              },
            })}
            className="bg-white p-3 rounded-xl w-full outline-1 outline outline-input-border focus:outline-orange-color placeholder:text-input-placeholder placeholder:text-[15px] leading-6 text-title-light mt-2"
          />
          {editForm.formState.errors.registrationNo && (
            <span className=" text-red-600 text-[13px] inline-block">
              {`${editForm.formState.errors.registrationNo.message}`}
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

export default EditStoreRegistrationNo;
