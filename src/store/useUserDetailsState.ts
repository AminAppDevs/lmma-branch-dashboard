import { create } from "zustand";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const adminId: number = await cookies.get("adminId");
import {
  getUserDetailsService,
  getUserRoleDetailsService,
} from "../services/auth/user.details.services";

export const useUserDetailsState = create((set) => ({
  userDetails: {},
  roleDetails: {},
  isLoading: false,
  fetch: async () => {
    set({ isLoading: true });
    const userDetails = await getUserDetailsService(adminId);
    const roleDetails = await getUserRoleDetailsService(userDetails?.role?.id);
    set({
      userDetails: userDetails,
      roleDetails: roleDetails,
      isLoading: false,
    });
  },
}));
