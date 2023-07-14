import AppLoading from "../../utils/AppLoading";
import axios from "../../services/axios";
import { NavLink, useParams } from "react-router-dom";
import useSWR from "swr";
import ApproveMessages from "./components/ApproveMessages";
import { FcFlashOn, FcClock, FcCheckmark } from "react-icons/fc";
import EditStoreName from "./editStoreBeforeApprove/EditStoreName";
import EditManagerName from "./editStoreBeforeApprove/EditManagerName";
import EditStorePhone from "./editStoreBeforeApprove/EditStorePhone";
import EditStoreEmail from "./editStoreBeforeApprove/EditStoreEmail";
import EditStoreRegistrationNo from "./editStoreBeforeApprove/EditStoreRegistrationNo";
import EditStoreTaxNo from "./editStoreBeforeApprove/EditStoreTaxNo";
import EditStoreCity from "./editStoreBeforeApprove/EditStoreCity";
import EditStoreCategory from "./editStoreBeforeApprove/EditStoreCategory";
import EditStoreTags from "./editStoreBeforeApprove/EditStoreTags";
import ApproveStore from "./editStoreBeforeApprove/ApproveStore";

const ReviewStoreJoinDetails = () => {
  const { id }: any = useParams();
  const { data, isLoading, mutate } = useSWR(
    `/branches/get_store_details_from_branch_to_approve/${id}`,
    async (url) => axios.get(url)
  );
  /// handle store status
  const handleStoreStatus = (status: string) => {
    if (status === "PENDING") {
      return (
        <div className="flex items-center gap-1 ml-4">
          <FcFlashOn />
          <h3 className="text-[14px] text-green-color">
            طلب جديد - بحاجة لمراجعتك
          </h3>
        </div>
      );
    } else if (status === "NEEDUPDATE") {
      return (
        <div className="flex items-center gap-1 ml-4">
          <FcClock />
          <h3 className="text-[14px] text-orange-color">
            بإنتظار التعديلات من الأسرة المنتجة
          </h3>
        </div>
      );
    } else if (status === "AFTERUPDATE") {
      return (
        <div className="flex items-center gap-1 ml-4">
          <FcCheckmark />
          <h3 className="text-[14px]">تمت التعديلات - بحاجة لمراجعتك</h3>
        </div>
      );
    }
  };
  return (
    <div className="mt-2 lg:container lg:mx-auto px-3">
      <div className="bg-white rounded-xl py-2 px-3 flex lg:flex-row flex-col items-center justify-between">
        <h3 className="text-title-dark text-[18px] font-semibold">
          مراجعة طلب الإنضمام
        </h3>
        <div className="flex gap-2 items-center lg:flex-row flex-col">
          {handleStoreStatus(data?.data.status)}
          <NavLink to={"/stores/join_request"}>
            <div className="bg-orange-color hover:bg-orange-color-dark rounded-xl px-5 py-2 text-white cursor-pointer">
              كل طلبات الإنضمام
            </div>
          </NavLink>
        </div>
      </div>
      {isLoading ? (
        <AppLoading />
      ) : (
        <div className="">
          {data?.data.status === "ACTIVE" ? (
            <div className="bg-green-100 p-4 rounded-xl text-green-700 text-[16px] mt-2">
              تم قبول: {data?.data.name} بالفعل
            </div>
          ) : (
            <div className="flex lg:flex-row flex-col gap-2 mt-2 mb-20">
              <div className="bg-white rounded-xl w-full">
                {/* title and logo */}
                <EditStoreName data={data?.data} mutate={mutate} />
                {/* category */}
                <EditStoreCategory data={data?.data} mutate={mutate} />
                {/* tags */}
                <EditStoreTags data={data?.data} mutate={mutate} />
                {/* manager name */}
                <EditManagerName data={data?.data} mutate={mutate} />
                {/* city */}
                <EditStoreCity data={data?.data} mutate={mutate} />

                {/* phone */}
                <EditStorePhone data={data?.data} mutate={mutate} />

                {/* email */}
                <EditStoreEmail data={data?.data} mutate={mutate} />
                {/* registration no */}
                <EditStoreRegistrationNo data={data?.data} mutate={mutate} />

                {/* tax no */}
                <EditStoreTaxNo data={data?.data} mutate={mutate} />

                {/* files */}
                <div className="text-title-dark text-[16px] font-semibold p-4 bg-gray-50 bg-opacity-50">
                  الملفات
                </div>
                {/* logo */}
                <div className="flex justify-between items-center border-b border-dashed p-4">
                  <h3 className="text-[15px] text-title-light">ملف الشعار</h3>
                  <a
                    href={data?.data.logo}
                    target="_blank"
                    className="text-green-color underline text-[15px]"
                  >
                    عرض
                  </a>
                </div>
                {/* registration file */}
                <div className="flex justify-between items-center border-b border-dashed p-4">
                  <h3 className="text-[15px] text-title-light">
                    ملف السجل التجاري
                  </h3>
                  <a
                    href={data?.data.registrationFile}
                    target="_blank"
                    className="text-green-color underline text-[15px]"
                  >
                    عرض
                  </a>
                </div>
                {/* tax file */}
                <div className="flex justify-between items-center border-b border-dashed p-4">
                  <h3 className="text-[15px] text-title-light">
                    ملف السجل الضريبي
                  </h3>
                  <a
                    href={data?.data.taxFile}
                    target="_blank"
                    className="text-green-color underline text-[15px]"
                  >
                    عرض
                  </a>
                </div>
                <ApproveStore storeId={data?.data.id} />
              </div>
              {/* Approve messages */}
              <ApproveMessages
                storeName={data?.data.name}
                storeId={data?.data.id}
                accountApproveMessages={data?.data.accountApproveMessages}
                mutate={mutate}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewStoreJoinDetails;
