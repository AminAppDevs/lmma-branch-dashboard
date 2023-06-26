import { useUserDetailsState } from "../../store/useUserDetailsState";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

const AdminAccountDetails = () => {
  const useUserDetailsStore: any = useUserDetailsState();
  return (
    <div className="lg:container lg:mx-auto px-3 mt-3">
      {/* Header */}
      <div className="p-2 bg-white rounded-xl flex justify-between items-center">
        <h3 className="text-title-dark text-[18px] font-semibold pr-1">
          تفاصيل حسابك
        </h3>
        <div className="flex gap-2 items-center">
          <div className="bg-orange-color hover:bg-orange-color-dark rounded-xl px-4 py-[10px] cursor-pointer transition-colors ease-in-out text-white text-[15px]">
            تغيير صورتك الشخصية
          </div>
          <div className="w-[50px] h-[50px] rounded-xl bg-gray-300"></div>
        </div>
      </div>
      {/* Info */}
      <div className="bg-white rounded-xl mt-2">
        <div className="flex justify-between items-center border-b border-dashed py-3 px-3">
          <h4 className="text-title-light text-[15px]">
            الإسم: {useUserDetailsStore?.userDetails?.name}
          </h4>
          <div
            className="text-[16px] underline text-green-color underline-offset-4 text-right"
            dir="rtl"
          >
            <Dialog>
              <DialogTrigger>تعديل</DialogTrigger>
              <DialogContent className="shadow-none">
                <DialogHeader>
                  <DialogTitle className="text-center">تعديل الإسم</DialogTitle>
                </DialogHeader>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="الاسم"
                    className="bg-white p-3 rounded-xl w-full outline-1 outline outline-input-border focus:outline-orange-color placeholder:text-input-placeholder placeholder:text-[15px] leading-6 text-title-light mt-2"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary-color hover:bg-primary-color-hover transition-colors ease-in-out rounded-xl w-full py-[15px] text-white"
                >
                  تحديث
                </button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAccountDetails;
