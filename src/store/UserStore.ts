import { User } from "@/services/user/type";
import { create, StateCreator } from "zustand";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}

const store: StateCreator<UserState> = (set) => ({
  user: null,
  setUser: (user: User) => set((state) => ({ ...state, user })),
});

const useUserStore = create(store);

export default useUserStore;
