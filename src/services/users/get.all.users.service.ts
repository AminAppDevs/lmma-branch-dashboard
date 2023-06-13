import axios from "axios";
import { toast } from "react-toastify";
import { getAllBranchUsersEndPoint } from "../api-endpoints";

export const getAllBranchUsersService = async (branchId: any) => {
  try {
    const response = await axios.get(
      `${getAllBranchUsersEndPoint}/${branchId}`
    );
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
