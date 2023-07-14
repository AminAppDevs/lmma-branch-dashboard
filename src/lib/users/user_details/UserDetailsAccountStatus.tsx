import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { ToastContainer } from "react-toastify";
import { hasPermissionMethod } from "../../../utils/has_permissionMethod";

const UserDetailsAccountStatus = (props: any) => {
  ///// handle change user role

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-between items-center border-b border-dashed py-3 px-3">
        <h4 className="text-title-light text-[15px]">
          حالة الحساب: {props.userDetails?.role?.isActive}
        </h4>
        <div
          className="text-[15px] underline text-orange-color underline-offset-4 text-right"
          dir="rtl"
        >
          {hasPermissionMethod(props.useUserDetailsStore, "edit_employees") ? (
            <Dialog>
              <DialogTrigger>حظر</DialogTrigger>
              <DialogContent className="shadow-none">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    تغيير صلاحية الموظف
                  </DialogTitle>
                </DialogHeader>
                <div className="w-full"></div>
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

export default UserDetailsAccountStatus;
