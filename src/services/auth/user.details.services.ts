import { toast } from "react-toastify";
import { roleDetailsEndPoint, userDetailsEndPoint } from "../api-endpoints";
import axios from "../axios";

export const getUserDetailsService = async (userId: number) => {
  try {
    const response = await axios.get(`${userDetailsEndPoint}/${userId}`);
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

/// get user role details
export const getUserRoleDetailsService = async (roleId: number) => {
  try {
    const response = await axios.get(`${roleDetailsEndPoint}/${roleId}`);
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
