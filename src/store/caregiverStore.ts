import { create } from "zustand";
import { persist } from "zustand/middleware";

{
  /* 요양보호사에게 요청된 근무 조건 */
}
type CaregiverRequests = {
  elderId: number;
  name: string;
  centerName: string | null;
  gender: number;
  birth: string;
  inmateTypes: string[];
  rate: string;
  img: string | null;
  desiredHourlyWage: number;
};

{
  /* 요양보호사 간단 정보 */
}
type CaregiverInfo = {
  userId: number;
  accessToken: string | null;
  name: string;
  img: string | null;
  employmentStatus: boolean | null;
  requests: CaregiverRequests[] | null;
  attuneRequests: CaregiverRequests[] | null;

  setUserId: (userId: number) => void;
  setAccessToken: (accessToken: string | null) => void;
  setName: (name: string) => void;
  setImg: (img: string | null) => void;
  setEmploymentStatus: (employmentStatus: boolean | null) => void;

  setUserInfo: (userId: number, accessToken: string | null) => void;
  setCaregiverInfo: (name: string, img: string | null, employmentStatus: boolean | null) => void;
  setRequests: (requests: CaregiverRequests[] | null) => void;
  setAttuneRequests: (requests: CaregiverRequests[] | null) => void;

  logout: () => void;
};

export const useCaregiverStore = create<CaregiverInfo>()(
  persist(
    (set) => ({
      userId: 1,
      accessToken: null,
      name: "noname",
      img: null,
      employmentStatus: null,
      requests: [
        {
          elderId: 2,
          name: "김뽀삐",
          centerName: "성모병원",
          gender: 1,
          birth: "1999.10.11",
          inmateTypes: ["방문요양", "방문목욕", "입주요양"],
          rate: "1RATE",
          img: "img",
          desiredHourlyWage: 40,
        },
        {
          elderId: 2,
          name: "김뽀삐",
          centerName: "성모병원",
          gender: 1,
          birth: "1999.10.11",
          inmateTypes: ["방문요양"],
          rate: "1RATE",
          img: "img",
          desiredHourlyWage: 40,
        },
        {
          elderId: 2,
          name: "김뽀삐",
          centerName: "성모병원",
          gender: 1,
          birth: "1999.10.11",
          inmateTypes: ["방문요양"],
          rate: "1RATE",
          img: "img",
          desiredHourlyWage: 40,
        },
      ],
      attuneRequests: [
        {
          elderId: 2,
          name: "김뽀삐",
          centerName: "성모병원",
          gender: 1,
          birth: "1999.10.11",
          inmateTypes: ["방문요양"],
          rate: "1RATE",
          img: "img",
          desiredHourlyWage: 40,
        },
      ],

      setUserId: (userId) => set({ userId }),
      setAccessToken: (accessToken) => set({ accessToken }),
      setName: (name) => set({ name }),
      setImg: (img) => set({ img }),
      setEmploymentStatus: (employmentStatus) => set({ employmentStatus }),

      setUserInfo: (userId, accessToken) => set({ userId, accessToken }),
      setCaregiverInfo: (name, img, employmentStatus) => set({ name, img, employmentStatus }),
      setRequests: (requests) => set({ requests }),
      setAttuneRequests: (attuneRequests) => set({ attuneRequests }),

      logout: () => {
        set({
          userId: 0,
          accessToken: null,
          name: "",
          img: null,
          employmentStatus: null,
          requests: [],
          attuneRequests: [],
        });
      },
    }),
    {
      name: "CAREGIVER_STORE",
    }
  )
);
