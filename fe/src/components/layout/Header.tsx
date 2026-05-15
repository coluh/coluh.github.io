import { Link, useLocation } from "react-router-dom";

import Avatar from "../common/Avatar";
import ServerStatus from "../common/ServerStatus";
import ThemeToggle from "../common/ThemeToggle";

const navItems = [
  { to: "/", label: "主页" },
  // { to: "/about", label: "About" },
  { to: "/translate", label: "翻译" },
];

export default function Header() {
  const location = useLocation();

  return (
    <header className="flex flex-row gap-2 bg-pink-200 p-2 transition-colors md:w-32 md:flex-col md:p-4 dark:bg-purple-700 dark:text-gray-200">
      <Avatar className="size-14 text-blue-400 md:mx-auto md:my-2 md:size-16" />
      <nav className="flex flex-row gap-2 rounded-lg bg-black/10 p-2 md:flex-col dark:bg-white/20">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`rounded-lg p-2 text-center hover:text-blue-500 dark:hover:text-blue-300 ${location.pathname === item.to ? "bg-white/50 dark:bg-black/40" : ""}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <ServerStatus />
      <ThemeToggle className="my-auto mr-0 ml-auto md:mx-auto md:mt-auto md:mb-0" />
    </header>
  );
}
