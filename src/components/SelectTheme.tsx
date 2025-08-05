"use client";
import { useTheme } from "./ThemeProvider";

export default function ThemeSelect() {
  const { theme, setTheme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  return (
    <select
      id="theme"
      name="theme"
      value={theme}
      onChange={handleChange}
      className="block w-full rounded-md bg-white px-3 py-1.5 pr-8 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-gray-800 dark:text-gray-100 sm:text-sm/6"
    >
      <option value="light">Clair</option>
      <option value="dark">Sombre</option>
    </select>
  );
}