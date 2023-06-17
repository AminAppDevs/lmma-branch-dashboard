import { create } from "zustand";

export const useAuthState: any = create((set: any) => ({
  phone: null,
  setPhone: (value: number) => {
    console.log(value);
    set((state: any) => ({
      phone: value,
    }));
  },
}));
