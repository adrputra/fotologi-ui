import { create } from 'zustand';

interface LayoutStore {
  sidebarStudioOpen: boolean;
  mobileOpened: boolean;
  isLoading: boolean;
  setSidebarStudioOpen: () => void;
  setMobileOpened: () => void;
  showLoading: () => void;
  hideLoading: () => void;
};

export const useLayoutStore = create<LayoutStore>()((set) => ({
  sidebarStudioOpen: false,
  mobileOpened: false,
  isLoading: false,
  setSidebarStudioOpen: () => set(({ sidebarStudioOpen }) => ({ sidebarStudioOpen: !sidebarStudioOpen })),
  setMobileOpened: () => set(({ mobileOpened }) => ({ mobileOpened: !mobileOpened })),
  showLoading: () => set(() => ({ isLoading: true })),
  hideLoading: () => set(() => ({ isLoading: false })),
}));
