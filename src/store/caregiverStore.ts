import { create } from "zustand";
import { persist } from "zustand/middleware";

{
  /* 요양보호사 근무 요청 목록 */
}
// type CaregiverRequests = {
//   requestList: {
//     name: string;
//     title: string;
//     content: string;
//   }[];
// };

{
  /* 요양보호사 간단 정보 */
}
type CaregiverInfo = {
  userId: number;
  accessToken: string | null;
  name: string;
  img: string | null;
  employmentStatus: boolean | null;
  // requestList: CaregiverRequests | null;

  setName: (name: string) => void;
  setImg: (img: string) => void;
  setEmploymentStatus: (employmentStatus: boolean | null) => void;

  setUserInfo: (userId: number, accessToken: string) => void;
  setCaregiverInfo: (name: string, img: string, employmentStatus: boolean | null) => void;
  // setRequestList: (requestList: CaregiverRequests | null) => void;

  logout: () => void;
};

export const useCaregiverStore = create<CaregiverInfo>()(
  persist(
    (set) => ({
      userId: 0,
      accessToken: null,
      name: "noname",
      img: null,
      employmentStatus: true,
      // requestList: null,

      setName: (name) => set({ name }),
      setImg: (img) => set({ img }),
      setEmploymentStatus: (employmentStatus) => set({ employmentStatus }),

      setUserInfo: (userId, accessToken) => set({ userId, accessToken }),
      setCaregiverInfo: (name, img, employmentStatus) => set({ name, img, employmentStatus }),
      // setRequestList: (requestList) => set({ requestList }),

      logout: () => {
        set({
          userId: 0,
          accessToken: null,
          name: "",
          img: null,
          employmentStatus: null,
          // requestList: null,
        });
      },
    }),
    {
      name: "CAREGIVER_STORE",
    }
  )
);
