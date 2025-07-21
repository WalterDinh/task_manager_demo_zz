import { create } from "zustand";

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: "light",
  toggleTheme: () =>
    set((state: { theme: string }) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
}));

interface ThemeStore {
  theme: "light" | "dark";
  toggleTheme: () => void;
  // add other properties if needed
}
