import { create } from "zustand";

export const useSidebarState = create((set) => ({
  activeNavLink: 1,
  activeSubMenu: 0,
  changeActiveLinkId: (by: number) =>
    set((state: any) => ({
      activeNavLink: by,
      activeSubMenu: by,
    })),
}));
