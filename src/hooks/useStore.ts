import { create } from 'zustand';

interface IState {
  isReady: boolean;
  setIsReady: () => void;
}

export const useStore = create<IState>((set) => ({
  isReady: false,
  setIsReady: () => set(() => ({ isReady: true })),
}));
