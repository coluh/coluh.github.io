import { useThemeStore } from "../../stores/useThemeStore";

export default function ThemeToggle() {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <button
      onClick={toggleTheme}
      className="group text-md relative h-9 w-9 rounded-lg bg-white transition-colors hover:bg-black dark:bg-black dark:hover:bg-white"
    >
      <span className="absolute inset-0 flex items-center justify-center transition-opacity group-hover:opacity-0 dark:opacity-0 dark:group-hover:opacity-100">
        ☀️
      </span>
      <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 dark:opacity-100 dark:group-hover:opacity-0">
        🌙
      </span>
    </button>
  );
}
