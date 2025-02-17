import { create } from "zustand";

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

  setSignupData: (data: Partial<SignupState>) => void;
}

export const useSignupStore = create<SignupState>((set) => ({
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

  setSignupData: (data) => set((state) => ({ ...state, ...data })),
}));
