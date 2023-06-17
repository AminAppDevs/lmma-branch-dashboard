import React from "react";
import logo from "../../assets/logo.svg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { checkBranchAdminExistService } from "../../services/auth/login.services";
import FromInput from "./components/FromInput";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../../services/firebase.config";
import { useAuthState } from "../../store/use_auth_state";

export type ResetPasswordPhoneInput = {
  phone: string;
};

const ForgetPasswordPhonePage = () => {
  const [isLoading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const useAuthStore = useAuthState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordPhoneInput>({
    defaultValues: {
      phone: "",
    },
  });

  ///// OTP Func
  const requestOtp: any = async (phone: string) => {
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "rest-password-otp",
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
  const onSubmit: SubmitHandler<ResetPasswordPhoneInput> = (
    data: ResetPasswordPhoneInput
  ) => {
    console.log(data);
    setLoading(true);
    if (!isLoading) {
      checkBranchAdminExistService(data.phone)
        .then((value) => {
          requestOtp(`+966${data.phone}`)
            .then(() => {
              setLoading(false);
              useAuthStore.setPhone(data.phone);
              navigate("/forget_password_otp", {
                state: { phone: data.phone },
              });
              console.log(value);
            })
            .catch((err: any) => {
              setLoading(false);
              console.log(err);
            });
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };
  return (
    <div className="h-screen w-full flex flex-col justify-center p-4 items-center">
      <img src={logo} className="mb-4" alt="React logo" />
      <h3 className="text-[25px] text-title-dark font-semibold">
        استعادة كلمة المرور
      </h3>
      <h5 className="text-[15px] text-title-light">
        ادخل رقم الجوال لاستعادة كلمة المرور
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

export default ForgetPasswordPhonePage;
