import logo from "../../assets/logo.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import { useCookies } from "react-cookie";
import FromInput from "./components/FromInput";
import { loginService } from "../../services/auth/login.services";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../../services/firebase.config";
declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}

export type LoginInput = {
  phone: string;
  password: string;
};
const Login = () => {
  const [, setCookie] = useCookies(["isLogin", "adminId", "token"]);
  const navigate = useNavigate();
  const [isLoginLoading, setLoginLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  /// send otp code
  ///// OTP Func
  const requestOtp: any = (phone: string) => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "login-otp",
        {
          size: "invisible",
          callback: (response: any) => {
            console.log(response);
          },
        },
        auth
      );
    }
    signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
      .then((confirmationResult: ConfirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult);
        console.log("codesend");
      })
      .catch((error) => console.log(error));
  };

  /// form submit
  const onSubmit: SubmitHandler<LoginInput> = (data: LoginInput) => {
    setLoginLoading(true);
    loginService(data)
      .then((value) => {
        // setLoginLoading(false);
        // setCookie("isLogin", true, { expires: new Date(Date.now() + 10000) });
        // setCookie("adminId", value.adminId, {
        //   expires: new Date(Date.now() + 10000),
        // });
        // setCookie("token", value.token, {
        //   expires: new Date(Date.now() + 10000),
        // });
        requestOtp(`+966${data.phone}`);
        navigate("/login_otp", {
          state: { phone: data.phone, password: data.password },
        });
      })
      .catch((error) => {
        setLoginLoading(false);
        console.log(error);
      });
  };
  return (
    <div className="h-screen w-full flex flex-col justify-center p-4 items-center">
      <img src={logo} className="mb-4" alt="React logo" />
      <h3 className="text-[25px] text-title-dark font-semibold">
        تسجيل الدخول للفرع
      </h3>
      <h5 className="text-[15px] text-title-light">
        سجل الدخول لحسابك عن طريق رقم الجوال
      </h5>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-[400px]">
        <div className="h-[22px]" />
        <ToastContainer />
        <FromInput
          register={register}
          errors={errors.phone}
          type="text"
          placeholder="رقم الجوال"
          name="phone"
          errorMessage="الرجاء ادخال رقم جوال صالح"
        />
        <div className="h-[8px]" />
        <FromInput
          register={register}
          errors={errors.password}
          type="password"
          placeholder="كلمة المرور"
          name="password"
          errorMessage="الرجاء إدخال كلمة المرور"
        />
        <div className="h-[13px]" />
        <button
          type="submit"
          className="p-3 bg-primary-color w-full inline-block rounded-xl text-white text-[16px] font-medium hover:bg-primary-color-hover transition-colors"
        >
          {isLoginLoading ? <>تحميل...</> : <>تسجيل</>}
        </button>
      </form>
    </div>
  );
};

export default Login;
