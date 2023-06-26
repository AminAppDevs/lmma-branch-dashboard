import { GetAllBranchRolesEndPoint } from "../../services/api-endpoints";
import { useUserDetailsState } from "../../store/useUserDetailsState";
import { DataTable } from "../../utils/table";
import axios from "../../services/axios";
import { Oval } from "react-loader-spinner";
import { NavLink } from "react-router-dom";
import useSWR from "swr";
import { getRolesTableData, rolesColumns } from "./components/roles.table.data";

const UserRoles = () => {
  const userDetails = useUserDetailsState((state: any) => state.userDetails);
  const { data, isLoading }: any = useSWR(
    `${GetAllBranchRolesEndPoint}`,
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
    <div className="lg:container lg:mx-auto mt-3 px-3">
      <div className="bg-white rounded-xl py-2 px-3 flex items-center justify-between mt-3">
        <h3 className="text-title-dark text-[18px] font-semibold">
          كل الصلاحيات
        </h3>
        <NavLink to={"/users/create_branch_role"}>
          <div className="bg-orange-color hover:bg-orange-color-dark rounded-xl px-5 py-2 text-white cursor-pointer">
            أضف صلاحية جديدة
          </div>
        </NavLink>
      </div>
      <div className="mt-2 bg-white rounded-xl overflow-x-auto">
        <DataTable
          columns={rolesColumns}
          data={getRolesTableData(data?.data)}
        />
      </div>
    </div>
  );
};

export default UserRoles;
