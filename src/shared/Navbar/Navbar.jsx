import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/Parcelpilot-new-newest.png";
import { AuthContext } from "../../providers/AuthProvider";
import { useTheme } from "../../providers/ThemeContext";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();


  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-base-100 bg-opacity-90 shadow-md sticky top-0 z-20">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4">
        {/* Logo Area */}
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-16" />
          </Link>
        </div>

        {/* Menu Items */}
        <div
          className={`transition-all duration-300 ease-in-out flex-1 lg:flex lg:justify-center lg:items-center lg:gap-6 ${
            isMobileMenuOpen
              ? "absolute right-6 top-16 flex flex-col bg-white shadow-md rounded-md p-4"
              : "hidden"
          } lg:static lg:flex`}
        >
          <Link
            to="/"
            className={`btn btn-ghost hover:bg-primary hover:text-white transition-all duration-300 ${
              isActive("/") ? "text-white bg-primary" : ""
            }`}
            onClick={closeMobileMenu}
          >
            Home
          </Link>

          <Link
            to="/about"
            className={`btn btn-ghost hover:bg-primary hover:text-white transition-all duration-300 ${
              isActive("/about") ? "text-white bg-primary" : ""
            }`}
            onClick={closeMobileMenu}
          >
            About
          </Link>

          <Link
            to="/contact"
            className={`btn btn-ghost hover:bg-primary hover:text-white transition-all duration-300 ${
              isActive("/contact") ? "text-white bg-primary" : ""
            }`}
            onClick={closeMobileMenu}
          >
            Contact
          </Link>
        </div>

        {/* Logout/Profile Area */}
        <div className="flex items-center gap-4">
          {/* Conditional Login/Profile */}
          {user?.email ? (
            <div className="relative">
              <button
                className="btn btn-ghost btn-circle avatar hover:scale-105 transition-transform"
                onClick={() => {
                  setIsDropdownOpen(!isDropdownOpen);
                  closeMobileMenu();
                }}
              >
                <div className="w-10 rounded-full">
                  <img
                    src={user?.photoURL || "https://via.placeholder.com/40"}
                    alt="Profile"
                  />
                </div>
              </button>
              {isDropdownOpen && (
                <ul
                  className="absolute right-0 mt-2 bg-base-100 shadow-md rounded-md p-3 w-48 z-10 animate-fadeIn"
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <li className="font-bold p-2">{user?.displayName || "User"}</li>
                  <li>
                    <Link
                      to="dashboard/overView"
                      className="block hover:bg-gray-100 p-2 rounded-md transition-all"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={handleLogOut}
                      className="block hover:bg-gray-100 p-2 rounded-md transition-all"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-primary animate-pulse"
              onClick={closeMobileMenu}
            >
              Login
            </Link>
          )}
        </div>

        <button
        onClick={toggleTheme}
        className="p-2 ml-4 rounded-md bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
      >
        {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

        {/* Hamburger Menu for Mobile */}
        <button
          className="lg:hidden btn btn-ghost btn-circle"
          onClick={handleMobileMenuToggle}
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 6.75h16.5m-16.5 6.75h16.5"
              />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
