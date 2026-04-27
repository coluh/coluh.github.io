import { Link, useLocation } from "react-router-dom";

import { ServerStatus } from "../common/ServerStatus";
import ThemeToggle from "../common/ThemeToggle";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
];

export default function Header() {
  const location = useLocation();

  return (
    <header className="flex flex-row items-center gap-4 overflow-x-auto bg-pink-200 p-4 transition-colors md:flex-col dark:bg-purple-700 dark:text-gray-200">
      <h1 className="text-xl font-bold">coluh</h1>
      <nav className="mx-auto flex flex-row items-center gap-2 md:flex-col">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`hover:text-blue-500 hover:underline ${location.pathname === item.to ? "font-bold" : ""}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <ServerStatus />
      <ThemeToggle />
    </header>
  );
}
