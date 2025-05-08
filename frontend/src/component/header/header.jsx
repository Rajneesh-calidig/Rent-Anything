import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  Search,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  Package,
} from "lucide-react";
import Logo from "../../assets/img/logo.png";
import { clearSessionData } from "../../services/session.service";
import { routes } from "../../routes/routes";
import { useAuth } from "../../providers/Auth/AuthProvider";
import { toast } from "react-toastify";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setkeyword] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest(".user-menu-container")) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await logout();
      toast.success("Logged out successfully!");
    } catch (err) {
      console.error(err);
    }
    clearSessionData();
    navigate(routes.landing);
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
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Notification Bell - Only for logged in users */}
            {/* {user?.email && (
              <button className="relative p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-gray-100 transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
            )} */}

            {/* Auth Buttons */}
            {user?.email ? (
              <div className="hidden sm:block user-menu-container relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 p-1.5 rounded-full hover:bg-gray-100 transition-all"
                >
                  <div className="relative">
                    {user.avatar ? (
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-medium text-sm">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium text-sm text-gray-900 leading-tight">
                      {user.name}
                    </span>
                    <span className="text-xs text-gray-500 leading-tight">
                      View profile
                    </span>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg py-2 z-10 border border-gray-100">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <LayoutDashboard className="w-4 h-4 mr-3 text-gray-500" />
                        Dashboard
                      </Link>
                      <Link
                        to="/my-rentals"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Package className="w-4 h-4 mr-3 text-gray-500" />
                        My Rentals
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Settings className="w-4 h-4 mr-3 text-gray-500" />
                        Settings
                      </Link>
                    </div>

                    <div className="py-1 border-t border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
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
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
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
                <Search className="w-4 h-4" />
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
              <div>
                {/* Mobile User Profile Summary */}
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg mb-3">
                  {user.avatar ? (
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-medium">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link
                    to="/dashboard"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-3 text-gray-500" />
                    Dashboard
                  </Link>
                  <Link
                    to="/my-rentals"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg"
                  >
                    <Package className="w-4 h-4 mr-3 text-gray-500" />
                    My Rentals
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg"
                  >
                    <Settings className="w-4 h-4 mr-3 text-gray-500" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center mt-2 bg-red-50 text-red-600 font-medium py-2 px-4 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
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
