import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react"; // icons

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const { theme, toggleTheme } = useContext(ThemeContext);

  // ✅ Safely parse user
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b bg-white dark:bg-gray-900 dark:border-gray-700 shadow-sm">
      {/* Left: Logo + Links */}
      <div className="flex gap-4 items-center">
        <Link
          to="/"
          className="text-xl font-bold text-brand hover:text-brand-dark transition"
        >
          Mini LinkedIn
        </Link>

        {isLoggedIn && user && (
          <Link
            to={`/profile/${user._id}`}
            className="text-gray-700 dark:text-gray-300 hover:text-brand transition"
          >
            Profile
          </Link>
        )}
      </div>

      {/* Right: Auth Buttons + Theme Toggle */}
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-4 py-1.5 rounded-md bg-brand text-white hover:bg-brand-dark transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-700 dark:text-gray-300 hover:text-brand transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-gray-700 dark:text-gray-300 hover:text-brand transition"
            >
              Register
            </Link>
          </>
        )}

        {/* Dark mode toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          aria-label="Toggle Theme"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
