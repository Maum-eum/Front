import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserInfo = {
  accessToken: string;
  userId: number;
  role: string;
  setAccessToken: (accessToken: string) => void;
  setUserInfo: (userId: number, role: string) => void;
  userLogout: () => void;
}

export const useUserStore = create(
  persist<UserInfo>(
    (set) => ({
      accessToken: "",
      userId: 0,
      role: "",
      setAccessToken: (accessToken) => set({accessToken}),
      setUserInfo: (userId, role) => set({userId, role}),
      userLogout: () => set({ accessToken: "", userId: 0, role: "" })
    }),
    {
      name: "USER_STORE",
    }
  )
)