import { DataTable } from "../../utils/table";
import { NavLink } from "react-router-dom";
import {
  getStoreJoinRequestTableData,
  joinStoresColumns,
} from "./components/join_request_stores_column";
import useSWR from "swr";
import axios from "../../services/axios";
import AppLoading from "../../utils/AppLoading";

const StoresRequestJoin = () => {
  const { data, isLoading }: any = useSWR(
    `/branches/stores_of_branch_need_approve/1`,
    async (url) => await axios.get(url),
    { suspense: false }
  );
  return (
    <div className="mt-2 lg:container lg:mx-auto px-3">
      <div className="bg-white rounded-xl py-2 px-3 flex items-center justify-between">
        <h3 className="text-title-dark text-[18px] font-semibold">
          طلبات إنضمام الأسر المنتجة
        </h3>
        <NavLink to={"/stores/all_stores"}>
          <div className="bg-orange-color hover:bg-orange-color-dark rounded-xl px-5 py-2 text-white cursor-pointer">
            كل الأسر المنتجة
          </div>
        </NavLink>
      </div>
      {isLoading ? (
        <AppLoading />
      ) : (
        <div className="lg:container lg:mx-auto mt-2 bg-white rounded-xl overflow-x-auto">
          <DataTable
            columns={joinStoresColumns}
            data={getStoreJoinRequestTableData(data?.data)}
          />
        </div>
      )}
    </div>
  );
};

export default StoresRequestJoin;
