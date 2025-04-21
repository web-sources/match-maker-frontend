// store/onboardingStore.ts
import { create } from "zustand";

type OnboardingData = {
  date_of_birth?: string;
  gender?: string;
  sexual_orientation?: string;
  education_level?: string;
  occupation?: string;
  height_cm?: number;
  body_type?: string;
  height?: number;
  relationship_goal?: string;
  smoking?: boolean;
  drinking?: boolean;
  languages?: string;
  turn_ons?: string;
  turn_offs?: string;
  kinks?: string;
  ideal_first_date?: string;
  love_language?: string;
};

type OnboardingStore = {
  data: OnboardingData;
  updateData: (newData: Partial<OnboardingData>) => void;
  resetData: () => void;
};

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  data: {},
  updateData: (newData) =>
    set((state) => ({ data: { ...state.data, ...newData } })),
  resetData: () => set({ data: {} }),
}));
