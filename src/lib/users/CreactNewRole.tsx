import axios from "../../services/axios";
import { getAllBranchPermissionsEndPoint } from "../../services/api-endpoints";
import { useForm } from "react-hook-form";
import { Oval } from "react-loader-spinner";
import useSWR from "swr";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import FromInput from "../auth/components/FromInput";
import { useUserDetailsState } from "../../store/useUserDetailsState";
import { createBranchRoleService } from "../../services/users/role.services";
import { errorToast } from "../../utils/toastify";
import { ToastContainer } from "react-toastify";

const CreactNewRole = () => {
  const [permissionsIds, setPermissionsIds] = useState<number[]>([]);
  const [isCreateRoleLoading, setIsCreateRoleLoading] =
    useState<boolean>(false);
  const userDetails = useUserDetailsState((state: any) => state.userDetails);
  const navigate = useNavigate();

  /// handle add remove permission
  const handleAddRemovePermission = (permissionId: number) => {
    const isPermissionIdExist = permissionsIds.find((e) => {
      return e === permissionId;
    });
    if (isPermissionIdExist) {
      setPermissionsIds(permissionsIds.filter((e) => e !== permissionId));
    } else {
      setPermissionsIds([...permissionsIds, permissionId]);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      roleTitle: "",
    },
  });

  /// form submit
  const onSubmit: any = async (data: any) => {
    if (permissionsIds.length < 3) {
      errorToast("الرجاء اختيار 3 من خيارات الصلاحية على الأقل");
    } else {
      try {
        setIsCreateRoleLoading(true);
        await createBranchRoleService(
          userDetails.branchId,
          data.roleTitle,
          permissionsIds
        );
        setIsCreateRoleLoading(false);
        navigate("/users/roles");
      } catch (error) {
        setIsCreateRoleLoading(false);
      }
    }
  };

  const { data, isLoading }: any = useSWR(
    getAllBranchPermissionsEndPoint,
    async (url) => await axios.get(url),
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
    <div className="container mx-auto">
      <ToastContainer />
      <div className="bg-white rounded-xl py-2 px-3 flex items-center justify-between mt-3">
        <h3 className="text-title-dark text-[18px] font-semibold">
          إنشاء صلاحية جديدة
        </h3>
        <NavLink to={"/users/roles"}>
          <div className="bg-orange-color hover:bg-orange-color-dark rounded-xl px-5 py-2 text-white cursor-pointer">
            كل الصلاحيات
          </div>
        </NavLink>
      </div>
      <div className="bg-white rounded-xl mt-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="py-6 border-[#F0F4F9] gap-5 border-b border-dashed px-4 flex  justify-between "
        >
          <FromInput
            type="text"
            placeholder="اسم الصلاحية هنا"
            name="roleTitle"
            errorMessage="الرجاء ادخال اسم الصلاحية"
            errors={errors.roleTitle}
            register={{
              ...register("roleTitle", {
                required: { value: true, message: "الحقل مطلوب" },
              }),
            }}
          />
          <button
            type="submit"
            className="bg-green-color h-[49px] py-[14px] rounded-xl text-[15px] text-white w-[200px] flex justify-center"
          >
            {isCreateRoleLoading ? (
              <Oval
                height={15}
                width={15}
                color="#ffffff"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#ffffff"
                strokeWidth={4}
                strokeWidthSecondary={4}
              />
            ) : (
              <span>إنشاء الصلاحية</span>
            )}
          </button>
        </form>
        <h3 className="p-4 text-[18px] font-semibold text-title-dark ">
          خيارات الصلاحية
        </h3>
        {Object.keys(data?.data).map((key: any, index) => {
          return (
            <div
              key={key}
              className={`${
                index % 2 == 0
                  ? "bg-[#F8FAFC] px-3 flex items-center"
                  : " px-3 flex items-center"
              } ${
                index == Object.keys(data?.data).length - 1
                  ? "rounded-b-xl"
                  : ""
              }`}
            >
              <div className="min-w-[120px] border-l border-[#F0F4F9] ml-6 py-3">
                <h2 className="text-title-dark">{key}</h2>
              </div>
              <div className="flex gap-6">
                {data.data[key].map((permission: any, index: number) => {
                  return (
                    <div
                      key={index}
                      onClick={() => handleAddRemovePermission(permission.id)}
                      className="text-title-light leading-6 flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={
                          permissionsIds.find((e) => e === permission.id)
                            ? true
                            : false
                        }
                        onChange={() =>
                          handleAddRemovePermission(permission.id)
                        }
                        className="bg-[#E9EEF9] rounded-[5px] border-none text-primary-color focus:ring-0"
                      />
                      <h5>{permission.name}</h5>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreactNewRole;
