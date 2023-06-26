import { useUserDetailsState } from "../../store/useUserDetailsState";
import AccountEmail from "./components/AccountEmail";
import AccountHeader from "./components/AccountHeader";
import AccountName from "./components/AccountName";
import AccountPassword from "./components/AccountPassword";
import AccountPhone from "./components/AccountPhone";
import AccountRole from "./components/AccountRole";

const AdminAccountDetails = () => {
  const useUserDetailsStore: any = useUserDetailsState();
  return (
    <div className="lg:container lg:mx-auto px-3 mt-3">
      {/* Header */}
      <AccountHeader useUserDetailsStore={useUserDetailsStore} />
      {/* Info */}
      <div className="bg-white rounded-xl mt-2">
        <AccountName useUserDetailsStore={useUserDetailsStore} />
        <AccountPhone useUserDetailsStore={useUserDetailsStore} />
        <AccountEmail useUserDetailsStore={useUserDetailsStore} />
        <AccountPassword useUserDetailsStore={useUserDetailsStore} />
        <AccountRole useUserDetailsStore={useUserDetailsStore} />
      </div>
    </div>
  );
};

export default AdminAccountDetails;
