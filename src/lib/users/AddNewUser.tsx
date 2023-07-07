import { NavLink } from "react-router-dom";
import FromInput from "../auth/components/FromInput";
import { useForm } from "react-hook-form";
import SelectInputDark from "../../utils/SelectInputDark";
import { useEffect, useState } from "react";
import { useUserDetailsState } from "../../store/useUserDetailsState";
import axios from "../../services/axios";
import AppLoading from "../../utils/AppLoading";
import { errorToast } from "../../utils/toastify";
import { ToastContainer } from "react-toastify";
import BtnLoading from "../../utils/BtnLoading";
import { useNavigate } from "react-router-dom";

const AddNewUser = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateUserLoading, setIsCreateUserLoading] = useState(false);
  const useUserDetailsStore: any = useUserDetailsState();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/branches/all_roles/${useUserDetailsStore?.userDetails?.branchId}`)
      .then((value) => {
        setIsLoading(false);
        const result = value?.data?.map((val: any) => {
          return {
            value: val.id,
            label: val.title,
          };
        });
        setRoles(result);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [setIsLoading, setRoles, useUserDetailsStore?.userDetails?.branchId]);

  const newUserForm = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  /// on submit
  const onSubmit = (data: any) => {
    if (selectedRole) {
      setIsCreateUserLoading(true);
      axios
        .post("/branches/create_admin", {
          name: data.name,
          phone: data.phone,
          email: data.email,
          password: data.password,
          branchId: useUserDetailsStore?.userDetails.branchId,
          branchRoleId: selectedRole?.value,
        })
        .then(() => {
          setIsCreateUserLoading(false);
          navigate("/users/all_users");
        })
        .catch((err) => {
          setIsCreateUserLoading(false);
          console.log(err?.response.data.message);
          errorToast(
            `${
              err?.response.data.message === "branch_admin_email_already_exist"
                ? "البريد الإلكتروني مستخدم بالفعل"
                : err?.response.data.message ===
                  "branch_admin_phone_already_exist"
                ? "رقم الجوال مستخدم بالفعل"
                : "يوجد خطأ ما حاول مرة أخرى"
            }`
          );
        });
    } else {
      errorToast("الرجاء اختيار صلاحية الموظف");
    }
  };

  return isLoading ? (
    <AppLoading />
  ) : (
    <div className="mt-2 lg:container lg:mx-auto px-3">
      <ToastContainer />
      <div className="bg-white rounded-xl py-2 px-3 flex items-center justify-between">
        <h3 className="text-title-dark text-[18px] font-semibold">
          أضف موظف جديد
        </h3>
        <NavLink to={"/users/all_users"}>
          <div className="bg-orange-color hover:bg-orange-color-dark rounded-xl px-4 py-2 text-white cursor-pointer">
            كل الموظفين
          </div>
        </NavLink>
      </div>
      <div className="lg:container lg:mx-auto mt-2 bg-white rounded-xl  p-3">
        {/* new user form */}
        <form onSubmit={newUserForm.handleSubmit(onSubmit)} autoComplete="off">
          {/* name and role */}
          <div className="flex gap-2 items-start lg:flex-row flex-col">
            <div className="w-full ">
              <div className="text-[14px] text-title-light mb-1">
                اسم الموظف
              </div>
              <FromInput
                placeholder="اسم الموظف"
                type="text"
                errors={newUserForm.formState?.errors?.name}
                errorMessage={newUserForm.formState.errors?.name?.message}
                register={{
                  ...newUserForm.register("name", {
                    required: "الاسم مطلوب",
                  }),
                }}
              />
            </div>
            <SelectInputDark
              label="صلاحية الموظف"
              placeholder="الصلاحية"
              options={roles}
              value={selectedRole}
              onChange={setSelectedRole}
            />
          </div>
          <div className="w-full border-t border-dashed my-3"></div>
          {/* phone and email */}
          <div className="flex gap-2 lg:flex-row flex-col">
            <div className="w-full ">
              <div className="text-[14px] text-title-light mb-1">
                رقم الجوال
              </div>
              <FromInput
                placeholder="رقم الجوال هنا"
                type="tel"
                errors={newUserForm.formState?.errors?.phone}
                errorMessage={newUserForm.formState.errors?.phone?.message}
                register={{
                  ...newUserForm.register("phone", {
                    required: "رقم الجوال مطلوب",
                    pattern: {
                      value: /^0\d{9}$/,
                      message: "الرجاء ادخال رقم جوال صالح",
                    },
                  }),
                }}
                onKeyPress={(event: any) => {
                  if (
                    !/[0-9]/.test(event.key) ||
                    event.target.value.length >= 10
                  ) {
                    event.preventDefault();
                  }
                }}
              />
            </div>
            <div className="w-full ">
              <div className="text-[14px] text-title-light mb-1">
                البريد الإلكتروني
              </div>
              <FromInput
                placeholder="البريد الإلكتروني هنا"
                type="text"
                errors={newUserForm.formState?.errors?.email}
                errorMessage={newUserForm.formState.errors?.email?.message}
                register={{
                  ...newUserForm.register("email", {
                    required: "البريد الإلكتروني مطلوب",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "الرجاء ادخال بريد إلكتروني صحيح",
                    },
                  }),
                }}
              />
            </div>
          </div>
          {/* password */}
          <div className="flex gap-2 mt-3 lg:flex-row flex-col">
            <div className="w-full ">
              <div className="text-[14px] text-title-light mb-1">
                كلمة المرور
              </div>
              <FromInput
                placeholder="كلمة المرور هنا"
                type="password"
                errors={newUserForm.formState?.errors?.password}
                errorMessage={newUserForm.formState.errors?.password?.message}
                register={{
                  ...newUserForm.register("password", {
                    required: "كلمة المرور مطلوبة",
                    validate: (val: string) => {
                      if (val.length < 8) {
                        return "كلمة المرور يجب أن تكون 8 أحرف على الأقل";
                      }
                    },
                  }),
                }}
              />
            </div>
            <div className="w-full ">
              <div className="text-[14px] text-title-light mb-1">
                تأكيد كلمة المرور
              </div>
              <FromInput
                placeholder="تأكيد كلمة المرور هنا"
                type="password"
                errors={newUserForm.formState?.errors?.confirmPassword}
                errorMessage={
                  newUserForm.formState.errors?.confirmPassword?.message
                }
                register={{
                  ...newUserForm.register("confirmPassword", {
                    required: "تأكيد كلمة المرور مطلوب",
                    validate: (val: string) => {
                      if (newUserForm.watch("password") !== val) {
                        return "كلمة المرور غير متطابقة";
                      }
                    },
                  }),
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            className="h-[50px] w-[150px] mt-3 bg-green-color hover:bg-green-600 transition-colors ease-in-out rounded-xl text-white flex justify-center items-center"
          >
            {isCreateUserLoading ? <BtnLoading /> : <span>إضافة الموظف</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewUser;
