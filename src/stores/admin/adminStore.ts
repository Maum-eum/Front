import { create } from "zustand";
import { persist } from "zustand/middleware";

type AdminInfo = {
  userId: number;
  role: string;
  accessToken: string;
  setAdminInfo: (userId: number, role: string, accessToken: string) => void;
  logout: () => void;
}

export const useAdminStore = create(
  persist<AdminInfo>(
    (set) => ({
      userId: 0,
      role: "",
      accessToken: "",
      setAdminInfo: (userId, role, accessToken) => set({userId, role, accessToken}),
      logout: () => set({userId: 0, role: "", accessToken: ""})
    }),
    {
      name: "ADMIN_STORE",
    }
  )
)