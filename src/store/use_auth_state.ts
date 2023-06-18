import { create } from "zustand";

export const useAuthState: any = create((set: any) => ({
  phone: null,
  loginPhone: null,
  loginPassword: null,
  setPhone: (value: number) => {
    set(() => ({
      phone: value,
    }));
  },
  setLoginPhone: (value: any) => {
    set(() => ({
      loginPhone: value,
    }));
  },
  setLoginPassword: (value: any) => {
    set(() => ({
      loginPassword: value,
    }));
  },
}));
