import { create } from "zustand";
import { persist } from "zustand/middleware";

type AdminInfo = {
  accessToken: string;
  userId: number;
  role: string;
  name: string;
  centerId: number;
  centerName: string;
  setAdminInfo: (accessToken: string, userId: number, role: string, name: string, centerId: number, centerName: string) => void;
  logout: () => void;
}

export const useAdminStore = create(
  persist<AdminInfo>(
    (set) => ({
      accessToken: "",
      userId: 0,
      role: "",
      name: "",
      centerId: 0,
      centerName: "",
      setAdminInfo: (accessToken, userId, role, name, centerId, centerName ) => set({accessToken, userId, role, name, centerId, centerName}),
      logout: () => set({ accessToken: "", userId: 0, role: "", name: "", centerId:0, centerName: "" })
    }),
    {
      name: "ADMIN_STORE",
    }
  )
)