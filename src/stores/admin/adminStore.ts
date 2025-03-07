import { create } from "zustand";
import { persist } from "zustand/middleware";

type AdminInfo = {
  name: string;
  centerId: number;
  centerName: string;
  setAdminInfo: (name: string, centerId: number, centerName: string) => void;
  setAdminName: (name: string) => void;
  adminLogout: () => void;
}

export const useAdminStore = create(
  persist<AdminInfo>(
    (set) => ({
      name: "",
      centerId: 0,
      centerName: "",
      setAdminInfo: (name, centerId, centerName ) => set({name, centerId, centerName}),
      setAdminName: ( name ) => set({ name }),
      adminLogout: () => set({ name: "", centerId:0, centerName: "" })
    }),
    {
      name: "ADMIN_STORE",
    }
  )
)