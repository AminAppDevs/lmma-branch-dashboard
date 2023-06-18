import logo from "../../assets/logo.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
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
import { Oval } from "react-loader-spinner";
import { useAuthState } from "../../store/use_auth_state";
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
  const useAuthStore = useAuthState();
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

  ///// OTP Func
  const requestOtp: any = async (phone: string) => {
    try {
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
      const confirmationResult: ConfirmationResult =
        await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      window.confirmationResult = confirmationResult;
      return confirmationResult;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  /// form submit
  const onSubmit: SubmitHandler<LoginInput> = (data: LoginInput) => {
    setLoginLoading(true);
    if (!isLoginLoading) {
      loginService(data)
        .then((value: any) => {
          console.log(value);
          requestOtp(`+966${data.phone}`)
            .then(() => {
              setLoginLoading(false);
              useAuthStore.setLoginPhone(data.phone);
              useAuthStore.setLoginPassword(data.password);
              navigate("/login_otp", {
                state: { phone: data.phone, password: data.password },
              });
            })
            .catch((err: any) => {
              console.log(err);
              setLoginLoading(false);
            });
        })
        .catch((error) => {
          setLoginLoading(false);
          console.log(error);
        });
    }
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
          register={{
            ...register("phone", {
              required: {
                value: true,
                message: "الحقل مطلوب",
              },
              pattern: {
                value: /^0\d{9}$/,
                message: "الرجاء ادخال رقم جوال صالح",
              },
            }),
          }}
          onKeyPress={(event: any) => {
            if (!/[0-9]/.test(event.key) || event.target.value.length >= 10) {
              event.preventDefault();
            }
          }}
          errors={errors.phone}
          type="text"
          placeholder="رقم الجوال"
          name="phone"
          errorMessage="الرجاء ادخال رقم جوال صالح"
        />
        <div className="h-[8px]" />
        <FromInput
          register={{
            ...register("password", {
              required: {
                value: true,
                message: "الحقل مطلوب",
              },
            }),
          }}
          errors={errors.password}
          type="password"
          placeholder="كلمة المرور"
          name="password"
          errorMessage="الرجاء إدخال كلمة المرور"
        />
        <div className="h-[13px]" />
        <button
          type="submit"
          className="h-[55px] bg-primary-color w-full flex items-center justify-center rounded-xl text-white text-[16px] font-medium hover:bg-primary-color-hover transition-colors fl"
        >
          {isLoginLoading ? (
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
            <>تسجيل</>
          )}
        </button>
        <div className="h-[20px]" />
        <div className="flex gap-1 justify-center w-full">
          <h5 className="text-[16px] text-title-light">نسيت كلمة المرور؟</h5>
          <h5
            className="text-[16px] text-orange-color cursor-pointer"
            onClick={() => navigate("/forget_password")}
          >
            استعادة
          </h5>
        </div>
      </form>
    </div>
  );
};

export default Login;
