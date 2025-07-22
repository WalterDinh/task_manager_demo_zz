import { create } from "zustand";
import { FlatList } from "react-native";

interface RegisterState {
  step: number;
  formData: {
    email: string;
    username: string;
    job: string;
    password: string;
    prePassword: string;
  };
  setStep: (step: number) => void;
  handleChange: (field: string, value: string) => void;
  handleNextStep: (ref: React.RefObject<FlatList<any>>) => void;
  handlePreviousStep: (ref: React.RefObject<FlatList<any>>) => void;
}

export const useRegisterStore = create<RegisterState>((set, get) => ({
  step: 0,
  formData: {
    email: "",
    username: "",
    job: "",
    password: "",
    prePassword: "",
  },
  setStep: (step) => set({ step }),
  handleChange: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),
  handleNextStep: (ref) => {
    const { step } = get();
    if (step < 2) {
      set({ step: step + 1 });
      ref.current?.scrollToIndex({ index: step + 1, animated: true });
    }
  },
  handlePreviousStep: (ref) => {
    const { step } = get();
    if (step > 0) {
      set({ step: step - 1 });
      ref.current?.scrollToIndex({ index: step - 1, animated: true });
    }
  },
}));
