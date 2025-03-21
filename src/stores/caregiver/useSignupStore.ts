import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SignupState {
  username: string;
  password: string;
  name: string;
  contact: string;
  car: boolean;
  education: boolean;
  intro: string;
  address: string;
  employmentStatus: boolean;
  certificateRequestDTOList: { certNum: string; certType: string; certRate: string }[];
  experienceRequestDTOList: { duration: number; title: string; description: string }[];
  profileImg: File | null;
  jobConditionId: number;

  setSignupData: (data: Partial<SignupState>) => void;
  setJobConditionId: (jobConditionId: number) => void;
}

export const useSignupStore = create(
  persist<SignupState>(
    (set) => ({
      username: "",
      password: "",
      name: "",
      contact: "",
      car: false,
      education: false,
      intro: "",
      address: "",
      employmentStatus: false,
      certificateRequestDTOList: [],
      experienceRequestDTOList: [],
      profileImg: null, // ✅ 기존 이미지 URL도 저장할 수 있도록 유지
      jobConditionId: -1,

      setSignupData: (data) =>
        set((state) => {
          // ✅ profileImg가 null이 아닐 때만 업데이트
          if ("profileImg" in data && data.profileImg === null) {
            delete data.profileImg;
          }
          return { ...state, ...data };
        }),

      setJobConditionId: (jobConditionId) => set({ jobConditionId }),
    }),
    {
      name: "CAREGIVER_STORE",
    }
  )
);
