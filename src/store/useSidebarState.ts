import { create } from "zustand";

export const useSidebarState = create((set) => ({
  activeNavLink: 1,
  activeSubMenu: 0,
  isSideBarOpen: false,
  changeActiveLinkId: (by: number) =>
    set(() => ({
      activeNavLink: by,
      activeSubMenu: by,
    })),

  setIsSideBarOpen: (value: boolean) =>
    set(() => ({
      isSideBarOpen: value,
    })),
}));
