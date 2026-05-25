import { create } from 'zustand';

interface AppState {
  isInitialized: boolean;
  setIsInitialized: (value: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isInitialized: false,
  setIsInitialized: (value: boolean) => set({ isInitialized: value }),
}));
