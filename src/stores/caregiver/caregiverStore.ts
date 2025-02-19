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

  setUserInfo: (userId: number, accessToken: string) => void;
  setCaregiverInfo: (username: string, img: string | null) => void;

  logout: () => void;
};

export const useCaregiverStore = create<CaregiverInfo>()(
  persist(
    (set) => ({
      userId: 0,
      accessToken: "",
      username: "",
      img: null,

      setUserId: (userId) => set({ userId }),
      setAccessToken: (accessToken) => set({ accessToken }),
      setUsername: (username) => set({ username }),
      setImg: (img) => set({ img }),

      setUserInfo: (userId, accessToken) => set({ userId, accessToken }),
      setCaregiverInfo: (username, img) => set({ username, img }),

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
