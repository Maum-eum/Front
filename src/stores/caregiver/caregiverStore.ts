import { create } from "zustand";
import { persist } from "zustand/middleware";
// import { WorkRequest } from "../types/caregiver/caregiverRequestType";

/* 요양보호사 간단 정보 */
type CaregiverInfo = {
  userId: number;
  accessToken: string | null;
  name: string;
  img: string | null;
  employmentStatus: boolean | null;
  // requests: WorkRequest[] | null;
  // attuneRequests: WorkRequest[] | null;

  setUserId: (userId: number) => void;
  setAccessToken: (accessToken: string | null) => void;
  setName: (name: string) => void;
  setImg: (img: string | null) => void;
  setEmploymentStatus: (employmentStatus: boolean | null) => void;

  setUserInfo: (userId: number, accessToken: string | null) => void;
  setCaregiverInfo: (name: string, img: string | null, employmentStatus: boolean | null) => void;
  // setRequests: (requests: WorkRequest[] | null) => void;
  // setAttuneRequests: (requests: WorkRequest[] | null) => void;

  logout: () => void;
};

export const useCaregiverStore = create<CaregiverInfo>()(
  persist(
    (set) => ({
      userId: 1,
      accessToken: null,
      name: "김삑뽀",
      img: "https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg",
      employmentStatus: null,
      // requests: [
      //   {
      //     recruitConditionId: 1,
      //     elderId: 1,
      //     centerId: 1,
      //     centerName: "한마음",
      //     imgUrl: null,
      //     desiredHourlyWage: 40000,
      //     rate: "1RATE",
      //     age: 11,
      //     sexual: "qwe",
      //     careTypes: ["방문요양", "방문목욕", "입주요양"],
      //   },
      //   {
      //     recruitConditionId: 1,
      //     elderId: 1,
      //     centerId: 1,
      //     centerName: "한마음",
      //     imgUrl: null,
      //     desiredHourlyWage: 40000,
      //     rate: "1RATE",
      //     age: 11,
      //     sexual: "qwe",
      //     careTypes: ["방문요양", "방문목욕", "입주요양"],
      //   },
      // ],
      // attuneRequests: [],

      setUserId: (userId) => set({ userId }),
      setAccessToken: (accessToken) => set({ accessToken }),
      setName: (name) => set({ name }),
      setImg: (img) => set({ img }),
      setEmploymentStatus: (employmentStatus) => set({ employmentStatus }),

      setUserInfo: (userId, accessToken) => set({ userId, accessToken }),
      setCaregiverInfo: (name, img, employmentStatus) => set({ name, img, employmentStatus }),
      // setRequests: (requests) => set({ requests }),
      // setAttuneRequests: (attuneRequests) => set({ attuneRequests }),

      logout: () => {
        set({
          userId: 0,
          accessToken: null,
          name: "",
          img: null,
          employmentStatus: null,
          // requests: [],
          // attuneRequests: [],
        });
      },
    }),
    {
      name: "CAREGIVER_STORE",
    }
  )
);
