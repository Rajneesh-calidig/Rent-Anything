import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  ChevronDown,
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
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const mobileMenuRef = useRef(null);
  const searchInputRef = useRef(null);

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

  // Focus search input when mobile search is shown
  useEffect(() => {
    if (showMobileSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showMobileSearch]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setShowMobileSearch(false);
  }, [location.pathname]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await logout();
      setShowUserMenu(false);
      toast.success("Logged out successfully!");
    } catch (err) {
      console.error(err);
    }
    clearSessionData();
    navigate(routes.landing);
  };

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/search?keyword=${keyword}`);
      setShowMobileSearch(false);
    }
  };

  return (
    <header
      className={`w-full top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isOpen || showMobileSearch
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      } ${location.pathname === "/dashboard" ? "" : "fixed"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Search Bar - Slide down when active */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            showMobileSearch ? "max-h-16 mb-3" : "max-h-0"
          }`}
        >
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              value={keyword}
              onChange={(e) => setkeyword(e.target.value)}
              placeholder="What are you looking for?"
              className="w-full py-2 pl-4 pr-10 rounded-full border border-[#D9D9D9] outline-none bg-white  transition-all"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
              onClick={handleSearch}
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

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

          {/* Desktop Search Bar */}
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
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
              onClick={() => navigate(`/search?keyword=${keyword}`)}
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Auth Buttons */}
            {user?.email ? (
              <div className="user-menu-container relative">
                {/* Desktop User Menu */}
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="hidden sm:flex items-center space-x-3 p-1.5 rounded-full hover:bg-gray-100 transition-all"
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

                {/* Mobile User Avatar */}
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="sm:hidden flex items-center p-1 rounded-full hover:bg-gray-100 transition-all"
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
                        onClick={() => setShowUserMenu(false)}
                      >
                        <LayoutDashboard className="w-4 h-4 mr-3 text-gray-500" />
                        Dashboard
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
              <>
                {/* Desktop Auth Buttons */}
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

                {/* Mobile Auth Button */}
                <Link
                  to="/signin"
                  className="sm:hidden p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition-colors"
                >
                  <User className="w-5 h-5" />
                </Link>
              </>
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

      {/* Mobile Menu - Version 2: Completely Redesigned */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white shadow-inner border-t border-gray-100 mt-2">
          <nav className="flex flex-col divide-y divide-gray-100">
            <Link
              to="/"
              className="flex items-center justify-between px-6 py-4 text-gray-800 hover:bg-gray-50"
            >
              <span className="font-medium">Home</span>
              <ChevronDown className="w-4 h-4 text-gray-400 transform -rotate-90" />
            </Link>
            <Link
              to="/about"
              className="flex items-center justify-between px-6 py-4 text-gray-800 hover:bg-gray-50"
            >
              <span className="font-medium">About</span>
              <ChevronDown className="w-4 h-4 text-gray-400 transform -rotate-90" />
            </Link>
            <Link
              to="/blog"
              className="flex items-center justify-between px-6 py-4 text-gray-800 hover:bg-gray-50"
            >
              <span className="font-medium">Blog</span>
              <ChevronDown className="w-4 h-4 text-gray-400 transform -rotate-90" />
            </Link>
          </nav>

          {/* Mobile Auth Section */}
          {!user?.email && (
            <div className="px-6 py-4 bg-gray-50">
              <div className="flex flex-col space-y-3">
                <Link
                  to="/signin"
                  className="w-full text-center py-3 text-gray-700 hover:text-indigo-600 font-medium border border-gray-300 rounded-lg hover:bg-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="w-full text-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
