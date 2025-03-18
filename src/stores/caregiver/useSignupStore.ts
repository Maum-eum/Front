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
      profileImg: null,
      jobConditionId: -1,

      setSignupData: (data) =>
        set((state) => ({
          ...state,
          ...data,
        })),

      setJobConditionId: (jobConditionId) => set({ jobConditionId }),
    }),
    {
      name: "CAREGIVER_STORE",
    }
  )
);
