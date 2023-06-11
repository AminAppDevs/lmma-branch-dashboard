import { toast } from "react-toastify";
import { LoginInput } from "../../lib/auth/Login";

import {
  changeBranchAdminPasswordEndPoint,
  checkBranchAdminExistEndPoint,
  loginEndPoint,
} from "../api-endpoints";
import axios from "../axios";

export const loginService = async (data: LoginInput) => {
  try {
    const response = await axios.post(loginEndPoint, {
      phone: data.phone,
      password: data.password,
    });
    return response.data;
  } catch (error: any) {
    // Handle the error here
    if (error.response) {
      const errorMessage = error.response.data.message;
      toast.error(
        errorMessage == "credentials_incorrect"
          ? "رقم الجوال أو كلمة السر غير صحيحة"
          : errorMessage,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );

      console.error(errorMessage);
    } else if (error.request) {
      toast.error(`${error.request}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      // The request was made but no response was received
      console.error("Request Error:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
      toast.error(`${error.request}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    // Throw the error to propagate it to the caller or handle it as needed
    throw error;
  }
};

export const checkBranchAdminExistService = async (phone: string) => {
  try {
    const response = await axios.get(
      `${checkBranchAdminExistEndPoint}/${phone}`
    );
    return response.data;
  } catch (error: any) {
    // Handle the error here
    if (error.response) {
      const errorMessage = error.response.data.message;
      toast.error(
        errorMessage == "branch_admin_not_found"
          ? "لا يوجد حساب مرتبط برقم الهاتف"
          : errorMessage,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );

      console.error(errorMessage);
    } else if (error.request) {
      toast.error(`${error.request}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      // The request was made but no response was received
      console.error("Request Error:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
      toast.error(`${error.request}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    // Throw the error to propagate it to the caller or handle it as needed
    throw error;
  }
};

export const changeBranchAdminPasswordService = async (
  password: string,
  phone: string
) => {
  try {
    console.log("phoooooone", phone);
    //// get admin id when check is exist
    const response = await axios.patch(`${changeBranchAdminPasswordEndPoint}`, {
      phone: phone,
      newPassword: password,
    });
    return response.data;
  } catch (error: any) {
    // Handle the error here
    if (error.response) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      console.error(errorMessage);
    } else if (error.request) {
      toast.error(`${error.request}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      // The request was made but no response was received
      console.error("Request Error:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
      toast.error(`${error.request}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    // Throw the error to propagate it to the caller or handle it as needed
    throw error;
  }
};
