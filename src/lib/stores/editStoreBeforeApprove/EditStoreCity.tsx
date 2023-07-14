import EditStoreDialog from "./EditStoreDialog";
import { Controller, useForm } from "react-hook-form";
import BtnLoading from "../../../utils/BtnLoading";
import { useState } from "react";
import axios from "../../../services/axios";
import { errorToast, successToast } from "../../../utils/toastify";
import SelectInputDark from "../../../utils/SelectInputDark";
import useSWR from "swr";

const EditStoreCity = ({ data, mutate }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: cities, isLoading: isCitiesLoading } = useSWR(
    "/global/all_cities",
    async (url) => axios.get(url)
  );
  const editForm = useForm({
    defaultValues: {
      city: {
        value: data.cityId,
        label: data.city,
      },
    },
  });
  /// on submit
  const onSubmit = async (formData: any) => {
    if (!isLoading) {
      try {
        setIsLoading(true);
        await axios.patch(`/stores/update_store_by_branch_admin/${data.id}`, {
          cityId: formData.city.value,
        });
        setIsLoading(false);
        mutate();
        successToast("تم تغيير المدينة بنجاح");
      } catch (error) {
        errorToast("يوجد خطأ ما حاول مرة أخرى");
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="flex justify-between items-center border-b border-dashed p-4">
      <div className="flex items-center gap-2">
        <h3 className="text-[15px] text-title-light">المدينة: {data?.city}</h3>
      </div>
      <EditStoreDialog text="تغيير المدينة">
        {isCitiesLoading ? (
          <span>تحميل...</span>
        ) : (
          <form onSubmit={editForm.handleSubmit(onSubmit)}>
            <Controller
              control={editForm.control}
              name="city"
              rules={{ required: "الرجاء اختيار المدينة" }}
              render={({ field }) => {
                return (
                  <SelectInputDark
                    label="المدينة"
                    value={field.value}
                    onChange={field.onChange}
                    options={cities?.data.map((city: any) => ({
                      value: city.id,
                      label: city.name,
                    }))}
                  />
                );
              }}
            />
            <button
              type="submit"
              className="bg-primary-color flex justify-center hover:bg-primary-color-hover transition-colors ease-in-out rounded-xl w-full py-[15px] text-white  mt-2"
            >
              {isLoading ? <BtnLoading /> : <>تحديث</>}
            </button>
          </form>
        )}
      </EditStoreDialog>
    </div>
  );
};

export default EditStoreCity;
