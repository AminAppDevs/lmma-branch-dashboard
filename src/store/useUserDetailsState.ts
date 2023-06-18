import { create } from "zustand";

import {
  getUserDetailsService,
  getUserRoleDetailsService,
} from "../services/auth/user.details.services";

export const useUserDetailsState = create((set) => ({
  userDetails: {},
  roleDetails: {},
  isLoading: false,
  fetch: async (adminId: any) => {
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
