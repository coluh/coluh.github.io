import { Outlet, Link } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="min-h-screen">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">My App</h1>
        <nav>
          <Link to="/" className="mr-4 hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
        </nav>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
