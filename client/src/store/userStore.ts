import { create } from "zustand";

interface iStoreState {
  email: string | null;
  isLoggedIn: boolean;
  randomNum: string | null;
  storeLogin: (token: string, userid: number, email: string) => void;
  storeLogout: () => void;
  setRandomNum: (randomNum: string) => void;
  checkEmailNumber: (randomNum: string, checkRandomNum: string) => boolean;
}

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};
export const setUser = (userId: number) => {
  localStorage.setItem("userId", String(userId));
};
export const setEmail = (email: string) => {
  localStorage.setItem("email", email);
};
export const getToken = () => {
  return localStorage.getItem("token");
};

export const useUserStore = create<iStoreState>((set) => ({
  email: null,
  isLoggedIn: false,
  randomNum: null,
  storeLogin: (token: string, userId: number, email: string) => {
    setToken(token);
    setUser(userId);
    setEmail(email);
    set({ isLoggedIn: true });
  },
  storeLogout: () => {},
  setRandomNum: (randomNum: string) => {
    set({ randomNum: randomNum });
  },
  checkEmailNumber: (randomNum: string, checkRandomNum: string) => {
    if (randomNum === checkRandomNum) return true;
    return false;
  },
}));
