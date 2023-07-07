import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { useEffect, useState } from "react";
import BtnLoading from "../../../utils/BtnLoading";
import { errorToast } from "../../../utils/toastify";
import axios from "../../../services/axios";
import Cookies from "universal-cookie";
import { ToastContainer } from "react-toastify";
import { hasPermissionMethod } from "../../../utils/has_permissionMethod";
import { useUserDetailsState } from "../../../store/useUserDetailsState";
import SelectInputDark from "../../../utils/SelectInputDark";
const cookies = new Cookies();

const UserDetailsRole = (props: any) => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const useUserDetailsStore: any = useUserDetailsState();
  const adminId: number = cookies.get("adminId");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`/branches/all_roles/${useUserDetailsStore?.userDetails?.branchId}`)
      .then((value) => {
        const result = value?.data?.map((val: any) => {
          return {
            value: val.id,
            label: val.title,
          };
        });
        setRoles(result);
        const userCurrentRole = result.find(
          (item: any) => item.value === props.userDetails?.role?.id
        );
        setSelectedRole(userCurrentRole);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [
    setRoles,
    useUserDetailsStore?.userDetails?.branchId,
    props.userDetails?.role?.id,
  ]);

  ///// handle change user role
  const handleChangeUserRole = async () => {
    const isSameRole = props.userDetails?.role?.id === selectedRole.value;
    if (isSameRole) {
      errorToast("الصلاحية المختارة نفس الصلاحية القديمة");
    } else {
      setIsLoading(true);
      axios
        .patch(`/branches/update_admin/${props.userDetails?.id}`, {
          branchRoleId: selectedRole.value,
        })
        .then((val) => {
          setIsLoading(false);
          props.useUserDetailsStore.fetch(+adminId);
          console.log(val);
        })
        .catch((err) => {
          console.log(err);
          errorToast("يوجد خطأ ما حاول مرة أخرى");
          setIsLoading(false);
        });
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-between items-center border-b border-dashed py-3 px-3">
        <h4 className="text-title-light text-[15px]">
          الصلاحية: {props.userDetails?.role?.title}
        </h4>
        <div
          className="text-[15px] underline text-orange-color underline-offset-4 text-right"
          dir="rtl"
        >
          {hasPermissionMethod(props.useUserDetailsStore, "edit_employees") ? (
            <Dialog>
              <DialogTrigger>تغيير الصلاحية</DialogTrigger>
              <DialogContent className="shadow-none">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    تغيير صلاحية الموظف
                  </DialogTitle>
                </DialogHeader>
                <div className="w-full">
                  <SelectInputDark
                    value={selectedRole}
                    options={roles}
                    onChange={setSelectedRole}
                    placeholder="اختر الصلاحية"
                  />
                  <button
                    type="button"
                    onClick={handleChangeUserRole}
                    className="h-[50px] w-full mt-3 bg-primary-color hover:bg-primary-color-hovertransition-colors ease-in-out rounded-xl text-white flex justify-center items-center"
                  >
                    {isLoading ? <BtnLoading /> : <span>تغيير الصلاحية</span>}
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsRole;
