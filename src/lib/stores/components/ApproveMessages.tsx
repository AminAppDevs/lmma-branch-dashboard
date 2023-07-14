import { BiTimeFive } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "../../../services/axios";
import { errorToast, successToast } from "../../../utils/toastify";

import BtnLoading from "../../../utils/BtnLoading";
const ApproveMessages = ({
  storeName,
  accountApproveMessages,
  storeId,
  mutate,
}: any) => {
  /// states
  const [isLoading, setIsLoading] = useState(false);
  const approveMessageForm = useForm({
    defaultValues: {
      content: "",
    },
  });
  const onSubmit = async (data: any) => {
    if (!isLoading) {
      try {
        setIsLoading(true);
        const res = await axios.post(
          "/stores/create_store_account_approve_message_by_branch_admin",
          {
            storeId: storeId,
            content: data.content,
          }
        );
        console.log(res.data);
        successToast("تم ارسال طلب التعديل بنجاح");
        mutate();
        setIsLoading(false);
      } catch (error) {
        errorToast("يوجد خطأ ما حاول مرة أخرى");
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="lg:w-[40%] w-full bg-white rounded-xl">
      {/* title */}
      <div className="p-4">
        <h3 className="text-title-dark tex-[16px] font-semibold">
          إرسال طلب تعديل
        </h3>
        <p className="text-title-light text-[15px] mt-1">
          ارسل طلب تعديل لـ:{" "}
          <span className="text-orange-color underline">{storeName}</span>{" "}
          لتعديل المعلومات الأساسة أو الملفات المرفقة مع الطلب
        </p>
      </div>
      {/* form */}
      <form
        className="p-4 border-t border-b border-dashed w-full"
        onSubmit={approveMessageForm.handleSubmit(onSubmit)}
      >
        <h3 className="text-[15px] text-title-dark mb-2">تفاصيل طلب التعديل</h3>
        <textarea
          rows={4}
          placeholder={
            "مثلاً: الرجاء تعديل رقم السجل التجاري أو الرجاء ارفاق صورة واضحة للشعار"
          }
          className={`bg-[#FEFEFF] p-3 rounded-xl w-full outline-1 outline outline-input-border focus:outline-orange-color placeholder:text-input-placeholder placeholder:text-[15px] leading-7 text-title-light ${
            approveMessageForm.formState.errors.content
              ? "outline-red-500 focus:outline-red-500"
              : ""
          }`}
          {...approveMessageForm.register("content", {
            required: "الحقل مطلوب",
          })}
        />
        {approveMessageForm.formState.errors.content ? (
          <span className="text-[13px] text-red-500 p-0 mb-2 block">
            {approveMessageForm.formState.errors.content.message}
          </span>
        ) : (
          <></>
        )}
        <button
          type="submit"
          className="w-full h-[50px] mt-1 bg-green-color rounded-xl text-white flex items-center justify-center"
        >
          {isLoading ? <BtnLoading /> : <span>إرسال طلب التعديل</span>}
        </button>
      </form>
      {/* approve messages history */}
      <div className="p-4">
        <h3 className="text-title-dark tex-[16px] font-semibold">
          سجل طلبات التعديل
        </h3>
        {accountApproveMessages.map((message: any) => {
          return (
            <div key={message.id} className="py-3 border-b border-dashed">
              <h3 className="text-title-light mb-1">{message.content}</h3>
              <div className="flex gap-1 items-center mt-2 text-title-lighter ">
                <BiTimeFive />
                <span className="text-[14px]">
                  {new Intl.DateTimeFormat("ar", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  }).format(new Date(message.createdAt))}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApproveMessages;
