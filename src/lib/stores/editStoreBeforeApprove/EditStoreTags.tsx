import EditStoreDialog from "./EditStoreDialog";
import { Controller, useForm } from "react-hook-form";
import BtnLoading from "../../../utils/BtnLoading";
import { useState } from "react";
import axios from "../../../services/axios";
import { errorToast, successToast } from "../../../utils/toastify";
import SelectInputDark from "../../../utils/SelectInputDark";
import useSWR from "swr";

const EditStoreTags = ({ data, mutate }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: tags, isLoading: isTagsLoading } = useSWR(
    "/global/get_all_store_tags",
    async (url) => axios.get(url)
  );

  const editForm = useForm({
    defaultValues: {
      tags: data.StoreTags.map((tag: any) => ({
        value: tag.id,
        label: tag.name,
      })),
      subCategory: null,
    },
  });

  /// on submit
  const onSubmit = async (formData: any) => {
    if (!isLoading) {
      try {
        setIsLoading(true);
        await axios.patch(
          `/stores/update_store_tags_by_branch_admin/${data.id}`,
          {
            tags: formData.tags.map((tag: any) => tag.value),
          }
        );
        setIsLoading(false);
        mutate();
        successToast("تم تغيير الوسوم بنجاح");
      } catch (error) {
        errorToast("يوجد خطأ ما حاول مرة أخرى");
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-between items-center border-b border-dashed p-4">
      <div className="flex gap-1 items-center">
        <h3 className="text-[15px] text-title-light">الوسوم: </h3>
        {data.StoreTags?.map((tag: any) => (
          <div
            key={tag.id}
            className="bg-gray-100 px-3 py-1 rounded-full text-title-light text-[14px]"
          >
            {tag.name}
          </div>
        ))}
      </div>
      <EditStoreDialog text="تغيير الوسوم">
        {isTagsLoading ? (
          <span>تحميل...</span>
        ) : (
          <form onSubmit={editForm.handleSubmit(onSubmit)}>
            <Controller
              control={editForm.control}
              name="tags"
              rules={{ required: "الرجاء اختيار الوسوم" }}
              render={({ field }) => {
                return (
                  <SelectInputDark
                    label="الوسوم"
                    placeholder="يمكنك اختيار اكتر من خيار"
                    isMultiple={true}
                    value={field.value}
                    onChange={(val: any) => {
                      field.onChange(val);
                    }}
                    options={tags?.data.map((tag: any) => ({
                      value: tag.id,
                      label: tag.name,
                    }))}
                  />
                );
              }}
            />
            {editForm.formState.errors.tags ? (
              <span className="text-[12px] text-red-500 block">
                الرجاء اختيار الوسوم
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

export default EditStoreTags;
