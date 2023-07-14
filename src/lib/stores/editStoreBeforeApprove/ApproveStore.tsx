import axios from "../../../services/axios";
import BtnLoading from "../../../utils/BtnLoading";
import { errorToast, successToast } from "../../../utils/toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ApproveStore = ({ storeId }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  ///// handle approve store
  const handleApproveStore = async () => {
    if (!isLoading) {
      try {
        setIsLoading(true);
        await axios.patch(`/stores/approve_store/${storeId}`);
        successToast("تم قبول الأسرة المنتجة بنجاح");
        setIsLoading(false);
        navigate("/stores/join_request", { replace: true });
      } catch (error) {
        setIsLoading(false);
        errorToast("يوجد خطأ ما حاول مرة أخرى");
      }
    }
  };
  return (
    <div className="w-full p-4">
      <button
        type="button"
        onClick={handleApproveStore}
        className=" w-full h-[50px] bg-green-color rounded-xl text-white flex items-center justify-center"
      >
        {isLoading ? <BtnLoading /> : <span>الموافقة على طلب الإنضمام</span>}
      </button>
    </div>
  );
};

export default ApproveStore;
