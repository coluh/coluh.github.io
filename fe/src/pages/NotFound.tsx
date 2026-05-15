import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-5xl">404 - Page Not Found</h1>
      <p>
        <code>{location.pathname}</code>
      </p>
      <Link to="/" className="hover:text-blue-500 hover:underline">
        Go back home
      </Link>
    </div>
  );
}
