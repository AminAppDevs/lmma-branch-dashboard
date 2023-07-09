import AppLoading from "../../utils/AppLoading";
import axios from "../../services/axios";
import { NavLink, useParams } from "react-router-dom";
import useSWR from "swr";
import StoreApproveDetailsRow from "./components/StoreApproveDetailsRow";
import ApproveMessages from "./components/ApproveMessages";

const ReviewStoreJoinDetails = () => {
  const { id }: any = useParams();
  const { data, isLoading, error } = useSWR(
    `/branches/get_store_details_from_branch_to_approve/${id}`,
    async (url) => axios.get(url)
  );
  return (
    <div className="mt-2 lg:container lg:mx-auto px-3">
      <div className="bg-white rounded-xl py-2 px-3 flex items-center justify-between">
        <h3 className="text-title-dark text-[18px] font-semibold">
          مراجعة طلب الإنضمام
        </h3>
        <NavLink to={"/stores/join_request"}>
          <div className="bg-orange-color hover:bg-orange-color-dark rounded-xl px-5 py-2 text-white cursor-pointer">
            كل طلبات الإنضمام
          </div>
        </NavLink>
      </div>
      {isLoading ? (
        <AppLoading />
      ) : (
        <div className="flex gap-2 mt-2">
          <div className="bg-white rounded-xl w-full">
            {/* title and logo */}
            <div className="flex justify-between items-center border-b border-dashed p-4">
              <div className="flex items-center gap-2">
                <img
                  src={data?.data.logo}
                  alt=""
                  className="w-[50px] h-[50px] rounded-xl"
                />
                <h3 className="text-[15px] text-title-light">
                  {data?.data.name}
                </h3>
              </div>
              <button
                type="button"
                className="text-green-color underline text-[15px]"
              >
                تعديل
              </button>
            </div>
            {/* category */}
            <div className="flex justify-between items-center border-b border-dashed p-4">
              <div className="flex gap-1">
                <img
                  src={data?.data.parentCategoryIcon}
                  alt=""
                  className="w-[25px] h-[25px]"
                />
                <h3 className="text-[15px] text-title-light">
                  القسم: {data?.data.parentCategory} - {data?.data.subCategory}
                </h3>
              </div>
              <button
                type="button"
                className="text-green-color underline text-[15px]"
              >
                تعديل
              </button>
            </div>
            {/* tags */}
            <div className="flex justify-between items-center border-b border-dashed p-4">
              <div className="flex gap-1 items-center">
                <h3 className="text-[15px] text-title-light">الوسوم: </h3>
                {data?.data.StoreTags?.map((tag: any) => (
                  <div
                    key={tag.id}
                    className="bg-gray-100 px-3 py-1 rounded-full text-title-light text-[14px]"
                  >
                    {tag.name}
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="text-green-color underline text-[15px]"
              >
                تعديل
              </button>
            </div>
            {/* manager name */}
            <StoreApproveDetailsRow
              data={data?.data.managerName}
              text="إسم مقدم الطلب:"
            />
            {/* city */}
            <StoreApproveDetailsRow data={data?.data.city} text="المدينة" />

            {/* phone */}
            <StoreApproveDetailsRow data={data?.data.phone} text="رقم الجوال" />

            {/* email */}
            <StoreApproveDetailsRow
              data={data?.data.email}
              text="البريد الإلكتروني"
            />
            {/* registration no */}
            <StoreApproveDetailsRow
              data={data?.data.registrationNo}
              text="رقم السجل التجاري"
            />
            {/* tax no */}
            <StoreApproveDetailsRow
              data={data?.data.taxNo}
              text="الرقم الضريبي:"
            />
            {/* files */}
            <div className="text-title-dark text-[16px] font-semibold p-4 bg-gray-50 bg-opacity-50">
              الملفات
            </div>
            {/* logo */}
            <div className="flex justify-between items-center border-b border-dashed p-4">
              <h3 className="text-[15px] text-title-light">ملف الشعار</h3>
              <div className="flex gap-6">
                <button
                  type="button"
                  className="text-green-color underline text-[15px]"
                >
                  عرض
                </button>
                <button
                  type="button"
                  className="text-green-color underline text-[15px]"
                >
                  تعديل
                </button>
              </div>
            </div>
            {/* registration file */}
            <div className="flex justify-between items-center border-b border-dashed p-4">
              <h3 className="text-[15px] text-title-light">
                ملف السجل التجاري
              </h3>
              <div className="flex gap-6">
                <button
                  type="button"
                  className="text-green-color underline text-[15px]"
                >
                  عرض
                </button>
                <button
                  type="button"
                  className="text-green-color underline text-[15px]"
                >
                  تعديل
                </button>
              </div>
            </div>
            {/* tax file */}
            <div className="flex justify-between items-center border-b border-dashed p-4">
              <h3 className="text-[15px] text-title-light">
                ملف السجل الضريبي
              </h3>
              <div className="flex gap-6">
                <button
                  type="button"
                  className="text-green-color underline text-[15px]"
                >
                  عرض
                </button>
                <button
                  type="button"
                  className="text-green-color underline text-[15px]"
                >
                  تعديل
                </button>
              </div>
            </div>
          </div>
          {/* Approve messages */}
          <ApproveMessages storeName={data?.data.name} />
        </div>
      )}
    </div>
  );
};

export default ReviewStoreJoinDetails;
