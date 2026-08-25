import { create, StateCreator } from "zustand";

interface DashboardState {
  balances: number;
  setBalances: (balances: number) => void;
}

const store: StateCreator<DashboardState> = (set) => ({
  balances: 0,
  setBalances: (balances: number) => set((state) => ({ ...state, balances })),
});

const useDashboardStore = create(store);

export default useDashboardStore;
