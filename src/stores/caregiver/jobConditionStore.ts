import { create } from "zustand";
import { JobConditionRequest } from "../../types/caregiver/jobCondition";

interface JobConditionState {
  jobCondition: Partial<JobConditionRequest>;
  setJobCondition: (data: Partial<JobConditionRequest>) => void;
  resetJobCondition: () => void;
}

export const useJobConditionStore = create<JobConditionState>((set) => ({
  jobCondition: {},
  setJobCondition: (data) =>
    set((state) => ({ jobCondition: { ...state.jobCondition, ...data } })),
  resetJobCondition: () => set({ jobCondition: {} }),
}));
