import { create, StateCreator } from "zustand";
import { Auth, AuthInfo } from "@/services/auth/type";
import localStorageKey from "@/common/constant/storage";

interface AuthState {
  auth: Auth;
  setAuth: (auth: Auth) => void;
  resetAuth: () => void;
}

const defaultAuth: Auth = { expired: 0, info: {} as AuthInfo, isAuth: false };

const authPayload = () => {
  let authStorage: Auth = defaultAuth;
  if (typeof window === "undefined") return authStorage;
  if (localStorage.getItem(localStorageKey.AUTH)) {
    authStorage = JSON.parse(localStorage.getItem(localStorageKey.AUTH) ?? "");
  }
  return authStorage;
};

const store: StateCreator<AuthState> = (set) => ({
  auth: authPayload(),
  setAuth: (auth) => set((state) => ({ ...state, auth: { ...auth } })),
  resetAuth: () => set((state) => ({ ...state, auth: { ...defaultAuth } })),
});

const useAuthStore = create(store);

export default useAuthStore;
