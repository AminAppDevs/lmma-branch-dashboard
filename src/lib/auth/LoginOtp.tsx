import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import logo from "../../assets/logo.svg";
import AuthCode from "react-auth-code-input";
import { loginService } from "../../services/auth/login.services";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../../services/firebase.config";
import { errorToast } from "../../utils/toastify";

const LoginOtp = (props: any) => {
  const [loading, setLoading] = React.useState(false);
  const [otpCode, setOtpCode] = React.useState("");
  const [, setCookie] = useCookies(["isLogin", "adminId", "token"]);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [resendCountdown, setResendCountdown] = useState(10);
  const [isResendShow, setIsResenShow] = useState(false);
  const [isResendLoading, setIsResendLoading] = useState(false);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(
        () => setResendCountdown(resendCountdown - 1),
        1000
      );
      return () => clearTimeout(timer);
    } else {
      setIsResenShow(true);
    }
  }, [resendCountdown]);

  /// handle resend otp code
  const handleResendOtpCode = () => {
    setIsResendLoading(true);
    console.log("cccccccccccccccccccccccccccccc", state.phone);
    requestOtp(state.phone)
      .then(() => {
        setIsResendLoading(false);
        setIsResenShow(false);
        setResendCountdown(10);
      })
      .catch(() => {
        errorToast("يوجد خطأ ما الرجاء المحاولة مرة أخرى");
        setIsResendLoading(false);
        setIsResenShow(false);
        setResendCountdown(10);
      });
  };

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
        await signInWithPhoneNumber(
          auth,
          `+966${phone}`,
          window.recaptchaVerifier
        );
      window.confirmationResult = confirmationResult;
      return confirmationResult;
    } catch (error) {
      console.log(error);
      errorToast("يوجد خطأ ما الرجاء المحاولة مرة أخرى");
      setIsResendLoading(false);
      setIsResenShow(false);
      setResendCountdown(10);
      throw error;
    }
  };

  const handleConfirmCode = () => {
    if (!loading) {
      const confirmationResult = window.confirmationResult;
      if (confirmationResult) {
        setLoading(true);
        confirmationResult
          .confirm(otpCode)
          .then((result: any) => {
            console.log(result);
            toast.success("تهانيا! الرمز صحيح", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setLoading(false);

            loginService({ phone: state.phone, password: state.password })
              .then((value) => {
                const expirationDate = new Date(
                  Date.now() + 30 * 24 * 60 * 60 * 1000
                );
                setLoading(false);
                setCookie("isLogin", true, {
                  expires: expirationDate,
                });
                setCookie("adminId", value.adminId, {
                  expires: expirationDate,
                });
                setCookie("token", value.token, {
                  expires: expirationDate,
                });
                navigate("/");
              })
              .catch((error) => {
                errorToast("يوجد خطأ ما الرجاء المحاولة مرة أخرى");
                setLoading(false);
                console.log(error);
              });
            console.log(props.location.state);
          })
          .catch((error: any) => {
            errorToast("الرمز غير صحيح");
            setLoading(false);
            console.log(error);
          });
      } else {
        console.log(" otp not send");
        errorToast("يوجد خطأ ما الرجاء المحاولة مرة أخرى");
      }
    }
  };
  return (
    <div className="h-screen w-full flex flex-col justify-center p-4 items-center">
      <img src={logo} className="mb-4" alt="React logo" />
      <h3 className="text-[25px] text-title-dark font-semibold">تأكيد الرمز</h3>
      <h5 className="text-[15px] text-title-light">
        ادخل الرمز المرسل لرقم الجوال: {state.phone}
      </h5>
      <form className="w-full md:w-[450px]">
        <div className="h-[22px]" />
        <ToastContainer />
        <div dir="ltr">
          <AuthCode
            onChange={(res) => setOtpCode(res)}
            allowedCharacters="numeric"
            containerClassName="w-full flex gap-3"
            disabled={loading}
            inputClassName="h-[75px] grow text-center bg-white p-3 rounded-xl w-full outline-1 outline outline-input-border focus:outline-orange-color placeholder:text-input-placeholder placeholder:text-[15px] leading-6 text-title-light text-[20px] "
          />
        </div>
        <div className="h-[13px]" />
        <div
          onClick={handleConfirmCode}
          className="h-[55px] text-center bg-primary-color w-full flex items-center justify-center rounded-xl text-white text-[16px] font-medium hover:bg-primary-color-hover transition-colors cursor-pointer"
        >
          {loading ? (
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
        </div>
        <div className="h-[20px]" />
        {isResendLoading ? (
          <div className="flex justify-center">
            <Oval
              height={25}
              width={25}
              color="#F5A225"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#F5A225"
              strokeWidth={4}
              strokeWidthSecondary={4}
            />
          </div>
        ) : !isResendShow ? (
          <h5 className="text-center text-[14px] text-title-lighter">
            لم يصلك الرمز؟ يمكنك إعادة ارسال الرمز بعد {resendCountdown} ثانية
          </h5>
        ) : (
          <h5
            className="text-center text-orange-color underline cursor-pointer"
            onClick={handleResendOtpCode}
          >
            إعادة ارسال الرمز
          </h5>
        )}
      </form>
    </div>
  );
};

export default LoginOtp;
