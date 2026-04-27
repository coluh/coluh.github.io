import { Outlet, Link, useLocation } from "react-router-dom";

import ThemeToggle from "../common/ThemeToggle";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
];

export default function RootLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-row">
      <header className="flex flex-col gap-4 bg-pink-200 p-4 transition-colors dark:bg-purple-700 dark:text-white">
        <h1 className="text-xl font-bold">Index</h1>
        <nav className="flex flex-col gap-2">
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
        <ThemeToggle />
      </header>
      <main className="flex-1 bg-purple-50 p-4 transition-colors dark:bg-black dark:text-gray-200">
        <Outlet />
      </main>
    </div>
  );
}
