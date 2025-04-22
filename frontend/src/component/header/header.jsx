import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faBars,
  faMagnifyingGlass,
  faUser,
  faHeart,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/img/logo.png";
import { clearSessionData } from "../../services/session.service";
import { routes } from "../../routes/routes";
import { useAuth } from "../../providers/Auth/AuthProvider";
import { toast } from "react-toastify";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setkeyword] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async (e) => {
    // e.preventDefault();
    // try {
    //   const response = await logout();
    //   toast.success("Logged out successfully!");
    // } catch (err) {
    //   console.error(err);
    // }
    // clearSessionData();
    // navigate(routes.landing);
    alert("loggin out automatically");
  };

  return (
    <header
      className={`w-full top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      } ${location.pathname === "/dashboard" ? "" : "fixed"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src={Logo || "/placeholder.svg"}
                alt="Rent Anything"
                className="h-10 w-auto mr-2"
              />
              {/* <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hidden sm:inline-block">
                RentAnything
              </span> */}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium rounded-lg transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium rounded-lg transition-colors"
            >
              About
            </Link>
            <Link
              to="/blog"
              className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium rounded-lg transition-colors"
            >
              Blog
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block relative w-1/3">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setkeyword(e.target.value)}
              placeholder="What are you looking for?"
              className="w-full py-2 pl-4 pr-10 rounded-full border border-[#D9D9D9] bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  navigate(`/search?keyword=${keyword}`);
                }
              }}
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            {/* Wishlist and Cart - visible on all screen sizes */}
            {user?.email && (
              <button className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-gray-100 transition-all">
                <FontAwesomeIcon icon={faHeart} size="lg" />
              </button>
            )}
            {/* <button className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-gray-100 transition-all">
              <FontAwesomeIcon icon={faShoppingCart} />
            </button> */}

            {/* Auth Buttons */}
            {user?.email ? (
              <div className="hidden sm:flex items-center space-x-3">
                <div className="relative group">
                  <button className="flex items-center justify-center gap-3 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:bg-gray-100 transition-all">
                    <FontAwesomeIcon icon={faUser} className="" />
                    <span className="hidden md:inline-block font-medium">
                      {user.email.split("@")[0]}
                    </span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/my-rentals"
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      My Rentals
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      Logout
                    </button>
                  </div>
                </div>
                {/* <button
                  onClick={handleLogout}
                  className="hidden md:block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-full transition-all"
                >
                  Logout
                </button> */}
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-3">
                <Link
                  to="/signin"
                  className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2 px-6 rounded-full transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none transition-colors"
            >
              <FontAwesomeIcon
                icon={isOpen ? faTimes : faBars}
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="bg-white shadow-lg rounded-b-lg mx-4 mt-2">
          {/* Mobile Search */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full py-2 pl-4 pr-10 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="py-2">
            <Link
              to="/"
              className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium"
            >
              About
            </Link>
            <Link
              to="/categories"
              className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium"
            >
              Categories
            </Link>
            <Link
              to="/blog"
              className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium"
            >
              Blog
            </Link>
            <Link
              to="/support"
              className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium"
            >
              Support
            </Link>
          </nav>

          {/* Mobile Auth */}
          <div className="border-t border-gray-100 py-4 px-4">
            {user?.email ? (
              <div className="space-y-2">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg"
                >
                  My Profile
                </Link>
                <Link
                  to="/my-rentals"
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg"
                >
                  My Rentals
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  to="/signin"
                  className="text-center py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="text-center py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
