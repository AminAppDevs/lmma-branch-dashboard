import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "../../services/axios";
import { useUserDetailsState } from "../../store/useUserDetailsState";
import AppLoading from "../../utils/AppLoading";
import UserDetailsName from "./user_details/UserDetailsName";
import UserDetailsPhone from "./user_details/UserDetailsPhone";
import UserDetailsEmail from "./user_details/UserDetailsEmail";
import UserDetailsRole from "./user_details/UserDetailsRole";
import UserDetailsAccountStatus from "./user_details/UserDetailsAccountStatus";
const UserDetails = () => {
  const { id }: any = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<any>(null);
  const useUserDetailsStore: any = useUserDetailsState();

  useEffect(() => {
    setIsLoading(true);
    axios.get(`/branches/admin_details/${id}`).then((val) => {
      setIsLoading(false);
      setUserDetails(val.data);
    });
  }, [setIsLoading, setUserDetails, id]);

  return isLoading ? (
    <AppLoading />
  ) : (
    <div className="px-3 lg:container lg:mx-auto mt-3">
      <div className="bg-white rounded-xl py-2 px-3 flex items-center justify-between">
        <h3 className="text-title-dark text-[18px] font-semibold">
          تفاصيل الموظف: #{userDetails?.id}
        </h3>
        <div className="flex gap-2 items-center">
          <h4 className="text-[14px] text-title-lighter">
            تاريخ الإنشاء:
            {userDetails?.createdAt ? (
              new Intl.DateTimeFormat("ar").format(
                new Date(userDetails?.createdAt)
              )
            ) : (
              <></>
            )}
          </h4>
          <NavLink to={"/users/all_users"}>
            <div className="bg-orange-color hover:bg-orange-color-dark rounded-xl px-4 py-2 text-white cursor-pointer">
              كل الموظفين
            </div>
          </NavLink>
        </div>
      </div>
      <div className="bg-white rounded-xl mt-2">
        <UserDetailsName
          userDetails={userDetails}
          useUserDetailsStore={useUserDetailsStore}
        />
        <UserDetailsPhone
          userDetails={userDetails}
          useUserDetailsStore={useUserDetailsStore}
        />
        <UserDetailsEmail
          userDetails={userDetails}
          useUserDetailsStore={useUserDetailsStore}
        />
        <UserDetailsRole
          userDetails={userDetails}
          useUserDetailsStore={useUserDetailsStore}
        />
        <UserDetailsAccountStatus
          userDetails={userDetails}
          useUserDetailsStore={useUserDetailsStore}
        />
      </div>
    </div>
  );
};

export default UserDetails;
