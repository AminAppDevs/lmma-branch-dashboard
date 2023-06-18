import { useUserDetailsState } from "../../store/useUserDetailsState";
import useSWR from "swr";
import axios from "../../services/axios";
import { getAllBranchUsersEndPoint } from "../../services/api-endpoints";
import { NavLink } from "react-router-dom";
import { DataTable } from "../../utils/table";
import {
  branchUserColumns,
  getUsersTableData,
} from "./components/users.table.data";
import { Oval } from "react-loader-spinner";

const AllUsers = () => {
  const userDetails = useUserDetailsState((state: any) => state.userDetails);
  const { data, isLoading }: any = useSWR(
    getAllBranchUsersEndPoint,
    async (url) =>
      await axios.get(
        `${url}/${userDetails.branchId ? userDetails.branchId : 0}`
      ),
    { suspense: false }
  );

  return isLoading ? (
    <div className="w-screen mt-10 flex justify-center items-center lg:container lg:mx-auto">
      <Oval
        height={30}
        width={30}
        color="#F1646D"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#F1646D"
        strokeWidth={4}
        strokeWidthSecondary={4}
      />
    </div>
  ) : (
    <div className="mt-2 lg:container lg:mx-auto px-4">
      <div className="bg-white rounded-xl py-2 px-3 flex items-center justify-between">
        <h3 className="text-title-dark text-[18px] font-semibold">الموظفين</h3>
        <NavLink to={"/users/permissions"}>
          <div className="bg-orange-color hover:bg-orange-color-dark rounded-xl px-5 py-2 text-white cursor-pointer">
            الصلاحيات
          </div>
        </NavLink>
      </div>
      <div className="container mx-auto mt-2">
        <DataTable
          columns={branchUserColumns}
          data={getUsersTableData(data?.data)}
        />
      </div>
    </div>
  );
};

export default AllUsers;
