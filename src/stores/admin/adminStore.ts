import { create } from "zustand";
import { persist } from "zustand/middleware";

type AdminInfo = {
  userId: number;
  role: string;
  accessToken: string;
  center_id: number;
  setAdminInfo: (userId: number, role: string, center_id: number, accessToken: string) => void;
  logout: () => void;
}

export const useAdminStore = create(
  persist<AdminInfo>(
    (set) => ({
      userId: 0,
      role: "",
      center_id: 0,
      accessToken: "",
      setAdminInfo: (userId, role, center_id, accessToken) => set({userId, role, center_id, accessToken}),
      logout: () => set({userId: 0, role: "", center_id:0, accessToken: ""})
    }),
    {
      name: "ADMIN_STORE",
    }
  )
)