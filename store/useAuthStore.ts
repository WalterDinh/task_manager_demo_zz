import { create } from "zustand";

type User = {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
};
type AuthStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  // add other properties if needed
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),
}));
