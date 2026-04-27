import { create } from "zustand";

type Theme = "light" | "dark";

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: (localStorage.getItem("theme") as Theme) || "light",
  setTheme: (theme: Theme) => {
    localStorage.setItem("theme", theme);
    set({ theme });
  },
  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return { theme: newTheme };
    });
  },
}));
