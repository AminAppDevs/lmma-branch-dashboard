import React from "react";
import logo from "../../assets/logo.svg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SubmitHandler, useForm } from "react-hook-form";
import FromInput from "./components/FromInput";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { changeBranchAdminPasswordService } from "../../services/auth/login.services";
import { useAuthState } from "../../store/use_auth_state";

export type NewPasswordInputs = {
  password: string;
  confirmPassword: string;
};

const NewPAssword = () => {
  const [isLoading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const useAuthStore = useAuthState();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordInputs>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  /// form submit
  const onSubmit: SubmitHandler<NewPasswordInputs> = (
    data: NewPasswordInputs
  ) => {
    setLoading(true);
    if (!isLoading) {
      changeBranchAdminPasswordService(data.password, useAuthStore.phone)
        .then((value) => {
          console.log(value);
          navigate("/login");
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div className="h-screen w-full flex flex-col justify-center p-4 items-center">
      <img src={logo} className="mb-4" alt="React logo" />
      <h3 className="text-[25px] text-title-dark font-semibold">
        استعادة كلمة المرور
      </h3>
      <h5 className="text-[15px] text-title-light">
        أدخل كلمة المرور الجديدة{" "}
      </h5>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-[400px]">
        <div className="h-[22px]" />
        <ToastContainer />
        <FromInput
          register={{
            ...register("password", {
              required: true,
              min: 8,
            }),
          }}
          errors={errors.password}
          type="password"
          placeholder="كلمة المرور الجديدة"
          name="password"
          errorMessage="أدخل كلمة مرور لا تقل عن 8 أحرف"
        />
        <div className="h-[8px]" />
        <FromInput
          register={{
            ...register("confirmPassword", {
              required: true,
              validate: (val: string) => {
                if (watch("password") != val) {
                  return "Your passwords do no match";
                }
              },
            }),
          }}
          errors={errors.confirmPassword}
          type="password"
          placeholder="تأكيد كلمة المرور"
          name="confirm_password"
          errorMessage="يجب أن تكون كلمة المرور متطابقة"
        />
        <div className="h-[13px]" />
        <button
          type="submit"
          className="h-[55px] bg-primary-color w-full flex items-center justify-center rounded-xl text-white text-[16px] font-medium hover:bg-primary-color-hover transition-colors fl"
        >
          {isLoading ? (
            <Oval
              height={25}
              width={25}
              color="#ffffff"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#FFFFFF5B"
              strokeWidth={4}
              strokeWidthSecondary={4}
            />
          ) : (
            <>تأكيد</>
          )}
        </button>
      </form>
    </div>
  );
};

export default NewPAssword;
