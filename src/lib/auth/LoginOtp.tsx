import React from "react";
import { ToastContainer, toast } from "react-toastify";
import logo from "../../assets/logo.svg";
import AuthCode from "react-auth-code-input";
import { loginService } from "../../services/auth/login.services";

const LoginOtp = (props: any) => {
  const [loading, setLoading] = React.useState(false);
  const [otpCode, setOtpCode] = React.useState("");
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
            // loginService({ phone: "", password: "" });
            console.log(props.location.state);
          })
          .catch((error: any) => {
            toast.error("الرمز غير صحيح", {
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
            console.log(error);
          });
      } else {
        console.log(" otp not send");
      }
    }
  };
  return (
    <div className="h-screen w-full flex flex-col justify-center p-4 items-center">
      <img src={logo} className="mb-4" alt="React logo" />
      <h3 className="text-[25px] text-title-dark font-semibold">تأكيد الرمز</h3>
      <h5 className="text-[15px] text-title-light">
        ادخل الرمز المرسل لرقم الجوال: 0530305441
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
          className="p-4 text-center bg-primary-color w-full inline-block rounded-xl text-white text-[16px] font-medium hover:bg-primary-color-hover transition-colors cursor-pointer"
        >
          {loading ? <>تحميل...</> : <>ارسال الرمز</>}
        </div>
      </form>
    </div>
  );
};

export default LoginOtp;
