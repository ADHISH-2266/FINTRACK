import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
      relative
      w-16
      h-8
      rounded-full
      transition-all
      duration-300
      bg-slate-700
      flex
      items-center
      px-1
      "
    >
      <div
        className={`
        absolute
        w-6
        h-6
        rounded-full
        bg-white
        transition-all
        duration-300
        flex
        items-center
        justify-center
        ${
          darkMode
            ? "translate-x-0"
            : "translate-x-8"
        }
      `}
      >
        {darkMode ? (
          <FaMoon className="text-slate-700 text-xs" />
        ) : (
          <FaSun className="text-yellow-500 text-xs" />
        )}
      </div>
    </button>
  );
}