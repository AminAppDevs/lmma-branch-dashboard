const ApproveMessages = ({ storeName }: any) => {
  return (
    <div className="w-[40%] bg-white rounded-xl">
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
      <form className="p-4 border-t border-b border-dashed w-full">
        <textarea
          rows={4}
          placeholder="مثلاً: الرجاء تعديل رقم السجل التجاري أو الرجاء ارفاق صورة واضحة للشعار"
          className="bg-[#FEFEFF] p-3 rounded-xl w-full outline-1 outline outline-input-border focus:outline-orange-color placeholder:text-input-placeholder placeholder:text-[15px] leading-7 text-title-light "
        />
        <button
          type="submit"
          className="px-6 py-[10px] mt-1 bg-green-color rounded-xl text-white"
        >
          إرسال طلب التعديل
        </button>
      </form>
      {/* approve messages history */}
      <div className="p-4">
        <h3 className="text-title-dark tex-[16px] font-semibold">
          سجل طلبات التعديل
        </h3>
      </div>
    </div>
  );
};

export default ApproveMessages;
