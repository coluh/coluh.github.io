import { Outlet } from "react-router-dom";

import Header from "./Header";

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Header />
      <main className="flex-1 bg-purple-50 p-4 transition-colors dark:bg-black dark:text-gray-200">
        <Outlet />
      </main>
    </div>
  );
}
