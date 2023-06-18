import { create } from "zustand";

export const useSidebarState = create((set) => ({
  activeNavLink: 1,
  activeSubMenu: 0,
  changeActiveLinkId: (by: number) =>
    set(() => ({
      activeNavLink: by,
      activeSubMenu: by,
    })),
}));
