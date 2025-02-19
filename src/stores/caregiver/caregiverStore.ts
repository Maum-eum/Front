import { create } from "zustand";
import { persist } from "zustand/middleware";
// import { WorkRequest } from "../types/caregiver/caregiverRequestType";

/* 요양보호사 간단 정보 */
type CaregiverInfo = {
  userId: number;
  accessToken: string;
  username: string;
  img: string | null;

  setUserId: (userId: number) => void;
  setAccessToken: (accessToken: string) => void;
  setUsername: (name: string) => void;
  setImg: (img: string | null) => void;

  setCaregiverInfo: (userId: number, accessToken: string) => void;
  setUserInfo: (username: string, img: string | null) => void;

  logout: () => void;
};

export const useCaregiverStore = create(
  persist<CaregiverInfo>(
    (set) => ({
      userId: 0,
      accessToken: "",
      username: "",
      img: null,

      setUserId: (userId) => set({ userId }),
      setAccessToken: (accessToken) => set({ accessToken }),
      setUsername: (username) => set({ username }),
      setImg: (img) => set({ img }),

      setCaregiverInfo: (userId, accessToken) => set({ userId, accessToken }),
      setUserInfo: (username, img) => set({ username, img }),

      logout: () => {
        set({
          userId: 0,
          accessToken: "",
          username: "",
          img: null,
        });
      },
    }),
    {
      name: "CAREGIVER_STORE",
    }
  )
);
