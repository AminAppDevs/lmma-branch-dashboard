import EditStoreDialog from "./EditStoreDialog";
import { Controller, useForm } from "react-hook-form";
import BtnLoading from "../../../utils/BtnLoading";
import { useState } from "react";
import axios from "../../../services/axios";
import { errorToast, successToast } from "../../../utils/toastify";
import SelectInputDark from "../../../utils/SelectInputDark";
import useSWR from "swr";

const EditStoreCategory = ({ data, mutate }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const { data: categories, isLoading: isCategoriesLoading } = useSWR(
    "/global/get_all_store_categories",
    async (url) => axios.get(url)
  );

  const editForm = useForm({
    defaultValues: {
      category: null,
      subCategory: null,
    },
  });

  /// handle change category
  const handleChangeCategory = (val: any) => {
    const subs = categories?.data.find((cat: any) => cat.id == val.value);
    editForm.setValue("subCategory", null);
    const subsOptions = subs?.subCategories?.map((sub: any) => ({
      value: sub.id,
      label: sub.name,
    }));
    setSubCategories(subsOptions);
  };

  /// on submit
  const onSubmit = async (formData: any) => {
    if (!isLoading) {
      try {
        setIsLoading(true);
        await axios.patch(`/stores/update_store_by_branch_admin/${data.id}`, {
          storeCategoryId: formData.subCategory.value,
        });
        setIsLoading(false);
        mutate();
        successToast("تم تغيير القسم بنجاح");
      } catch (error) {
        errorToast("يوجد خطأ ما حاول مرة أخرى");
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-between items-center border-b border-dashed p-4">
      <div className="flex gap-1">
        <img
          src={data.parentCategoryIcon}
          alt=""
          className="w-[25px] h-[25px]"
        />
        <h3 className="text-[15px] text-title-light">
          القسم: {data.parentCategory} - {data.subCategory}
        </h3>
      </div>
      <EditStoreDialog text="تغيير القسم">
        {isCategoriesLoading ? (
          <span>تحميل...</span>
        ) : (
          <form onSubmit={editForm.handleSubmit(onSubmit)}>
            <Controller
              control={editForm.control}
              name="category"
              rules={{ required: "الرجاء اختيار القسم" }}
              render={({ field }) => {
                return (
                  <SelectInputDark
                    label="القسم"
                    placeholder="القسم الرئيسي"
                    value={field.value}
                    onChange={(val: any) => {
                      field.onChange(val);
                      handleChangeCategory(val);
                    }}
                    options={categories?.data.map((cat: any) => ({
                      value: cat.id,
                      label: cat.name,
                    }))}
                  />
                );
              }}
            />
            {editForm.formState.errors.category ? (
              <span className="text-[12px] text-red-500 block">
                الرجاء اختيار القسم
              </span>
            ) : (
              <></>
            )}
            <Controller
              control={editForm.control}
              name="subCategory"
              rules={{ required: "الرجاء اختيار القسم الفرعي" }}
              render={({ field }) => {
                return (
                  <SelectInputDark
                    label="القسم الفرعي"
                    placeholder="القسم الفرعي"
                    value={field.value}
                    onChange={field.onChange}
                    options={subCategories}
                  />
                );
              }}
            />
            {editForm.formState.errors.subCategory ? (
              <span className="text-[12px] text-red-500 block">
                الرجاء اختيار القسم الفرعي
              </span>
            ) : (
              <></>
            )}
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

export default EditStoreCategory;
