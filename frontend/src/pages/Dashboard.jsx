import { useEffect, useState } from "react";
import {
  User,
  Home,
  Package,
  Heart,
  LogOut,
  Plus,
  ChevronRight,
  ChevronLeft,
  DollarSignIcon,
  AlertCircle,
} from "lucide-react";
import AddItem from "../component/items/AddItem";
import { useAuth } from "../providers/Auth/AuthProvider";
import { useItem } from "../providers/Items/ItemProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Overview from "../component/dashboard/Overview";
import MyItems from "../component/dashboard/MyItems";
import Profile from "../component/dashboard/Profile";
import UserSettings from "../component/dashboard/Settings";
import MyOrders from "../component/dashboard/MyOrders";
import Transactions from "../component/dashboard/Transactions";
import EditMyItem from "../component/Modals/dashboard/EditMyItem";
import Favorites from "../component/dashboard/Favorites";
import { formatDate } from "../utils/date-utils";
import { routes } from "../routes/routes";

export default function Dashboard() {
  // State for active section
  const [activeSection, setActiveSection] = useState("overview");
  const [activeSidebarItem, setActiveSidebarItem] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // New states for Stripe account confirmation
  const [showStripeConfirmation, setShowStripeConfirmation] = useState(false);
  const [stripeFormData, setStripeFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    setActiveSidebarItem(
      sessionStorage.getItem("activeSidebarItem") || "overview"
    );
    setActiveSection(sessionStorage.getItem("activeSidebarItem") || "overview");

    // Set sidebar state based on screen size
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { myItems } = useItem();

  const [previewImage, setPreviewImage] = useState(null);

  const [editItemId, setEditItemId] = useState(null);
  const [editItemData, setEditItemData] = useState({
    _id: "",
    title: "",
    category: "",
    subcategory: "",
    pricePerDay: "",
    condition: "",
    description: "",
    status: "",
    images: [],
  });
  const [showEditModal, setShowEditModal] = useState(false);

  const [newImages, setNewImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);

  const { logout } = useAuth();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await logout();
      toast.success("Logged out successfully!");
    } catch (err) {
      console.error(err);
    }
    const clearSessionData = () => {
      sessionStorage.removeItem("activeSidebarItem");
    };
    clearSessionData();
    navigate(routes.landing);
  };

  // Handle Stripe account form submission
  const handleStripeFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here you would typically send the data to your backend
      // For now, we'll just update the user's isLister status
      await updateUser({
        ...user,
        isLister: "pending",
      });

      toast.success("Your seller account request has been submitted!");
      setShowStripeConfirmation(false);
    } catch (error) {
      console.error("Error submitting seller request:", error);
      toast.error("Failed to submit seller request. Please try again.");
    }
  };

  // Handle Stripe confirmation dialog
  const handleStripeConfirmation = (confirmed) => {
    if (confirmed) {
      // Pre-fill form with user data if available
      setShowStripeConfirmation(true);
      setStripeFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        dateOfBirth: "",
      });
    } else {
      setShowStripeConfirmation(false);
    }
  };

  // Update the handleRenderSection function to check KYC status first
  const handleRenderSection = () => {
    // Check if user wants to add an item but doesn't have a Stripe account
    if (activeSection === "add-item") {
      // First check if KYC is completed or pending
      if (user.kycStatus === "NOT SUBMITTED") {
        // KYC not completed, show KYC requirement message
        return (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-start mb-4">
              <AlertCircle className="text-amber-600 mr-3 mt-0.5" />
              <div>
                <h2 className="text-xl font-semibold">
                  KYC Verification Required
                </h2>
                <p className="text-gray-600 mt-2">
                  Before you can become a seller, you need to complete your KYC
                  (Know Your Customer) verification. This helps us maintain a
                  secure marketplace for all users.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-800 mb-2">
                How to complete KYC verification:
              </h3>
              <ol className="list-decimal list-inside text-gray-600 space-y-1 ml-2">
                <li>Go to your profile section</li>
                <li>Click on "Verify Identity"</li>
                <li>Upload the required documents (ID proof, address proof)</li>
                <li>Submit for verification</li>
              </ol>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setActiveSection("profile");
                  setActiveSidebarItem("profile");
                  sessionStorage.setItem("activeSidebarItem", "profile");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Go to Profile
              </button>
            </div>
          </div>
        );
      }

      // KYC is verified or pending, now check isLister status
      if (user.isLister === "false") {
        if (showStripeConfirmation) {
          // Show the Stripe account form
          return (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                Create a Seller Account
              </h2>
              <p className="mb-6 text-gray-600">
                To list items for rent, you need to create a seller account
                connected with Stripe for payments.
              </p>

              <form onSubmit={handleStripeFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={stripeFormData.name}
                    onChange={(e) =>
                      setStripeFormData({
                        ...stripeFormData,
                        name: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={stripeFormData.email}
                    onChange={(e) =>
                      setStripeFormData({
                        ...stripeFormData,
                        email: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={stripeFormData.phone}
                    onChange={(e) =>
                      setStripeFormData({
                        ...stripeFormData,
                        phone: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={stripeFormData.dateOfBirth}
                    onChange={(e) =>
                      setStripeFormData({
                        ...stripeFormData,
                        dateOfBirth: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowStripeConfirmation(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          );
        } else {
          // Show the confirmation dialog
          return (
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start mb-4">
                <AlertCircle className="text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h2 className="text-xl font-semibold">
                    Seller Account Required
                  </h2>
                  <p className="text-gray-600 mt-2">
                    To list items for rent, you need to have a seller account on
                    our platform. This requires connecting with Stripe for
                    secure payments.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => handleStripeConfirmation(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Not Now
                </button>
                <button
                  onClick={() => handleStripeConfirmation(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Seller Account
                </button>
              </div>
            </div>
          );
        }
      } else if (user.isLister === "pending") {
        // Show pending status message
        return (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <AlertCircle className="text-yellow-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  Account Verification in Progress
                </h2>
                <p className="text-gray-600 mt-2">
                  Your seller account is currently under review. Once approved,
                  you'll be able to list items for rent. This process typically
                  takes 1-2 business days.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-800 mb-2">
                What happens next?
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Our team will review your application</li>
                <li>
                  You may receive an email requesting additional information
                </li>
                <li>Once approved, you'll be able to list items immediately</li>
                <li>
                  You'll receive a notification when your account is approved
                </li>
              </ul>
            </div>
          </div>
        );
      } else {
        // User is approved, show the add item form
        return <AddItem />;
      }
    }

    // For other sections, render as usual
    switch (activeSection) {
      case "overview":
        return (
          <Overview
            setActiveSection={setActiveSection}
            user={user}
            myItemsLength={myItems.length}
            setActiveSidebarItem={setActiveSidebarItem}
          />
        );
      case "my-items":
        return (
          <MyItems
            setEditItemData={setEditItemData}
            setEditItemId={setEditItemId}
            setNewImages={setNewImages}
            setImagesToDelete={setImagesToDelete}
            setShowEditModal={setShowEditModal}
          />
        );
      case "profile":
        return (
          <Profile
            user={user}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
          />
        );
      case "settings":
        return <UserSettings />;
      case "my-orders":
        return <MyOrders />;
      case "transactions":
        return <Transactions user={user} />;
      case "favorites":
        return <Favorites />;
      default:
        return (
          <Overview
            setActiveSection={setActiveSection}
            user={user}
            myItemsLength={myItems.length}
            setActivesidebarItem={setActiveSidebarItem}
          />
        );
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar with responsive behavior */}
      <div
        className={`transition-all duration-300 ease-in-out fixed md:sticky top-0 left-0 z-40 h-screen flex flex-col bg-white shadow-lg ${
          sidebarOpen ? "w-64" : "w-[86px]"
        }`}
      >
        {/* Toggle button - visible on small screens */}
        <button
          className="absolute -right-4 top-6 bg-white rounded-full p-1 shadow-md border text-gray-600 hover:text-indigo-600 z-50"
          onClick={toggleSidebar}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>

        {/* User info */}
        <div
          className={`p-4 border-b ${!sidebarOpen && "flex justify-center"}`}
        >
          <div
            className={`flex ${
              sidebarOpen ? "items-center" : "justify-center"
            }`}
          >
            <div className="relative">
              <img
                src={previewImage || user.profileImage || "/placeholder.svg"}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100"
              />
              {/* <div
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  user.kycStatus === "verified"
                    ? "bg-green-500"
                    : user.kycStatus === "pending"
                    ? "bg-yellow-500"
                    : "bg-gray-400"
                }`}
              ></div> */}
            </div>
            {sidebarOpen && (
              <div className="ml-3">
                <p className="font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">
                  Member since: {user?.createdAt && formatDate(user.createdAt)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <button
            onClick={() => {
              setActiveSection("overview");
              setActiveSidebarItem("overview");
              sessionStorage.setItem("activeSidebarItem", "overview");
            }}
            className={`flex items-center w-full py-2 rounded-lg text-left transition-colors ${
              activeSidebarItem === "overview"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            } ${!sidebarOpen ? "justify-center px-2" : "px-3"}`}
          >
            <Home size={18} className="min-w-[18px] min-h-[18px]" />
            {sidebarOpen && <span className="ml-3">Analytics</span>}
          </button>

          <button
            onClick={() => {
              setActiveSection("my-items");
              setActiveSidebarItem("my-items");
              sessionStorage.setItem("activeSidebarItem", "my-items");
            }}
            className={`flex items-center w-full py-2 rounded-lg text-left transition-colors ${
              activeSidebarItem === "my-items"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            } ${!sidebarOpen ? "justify-center px-2" : "px-3"}`}
          >
            <Package size={18} className="min-w-[18px] min-h-[18px]" />
            {sidebarOpen && <span className="ml-3">My Items</span>}
          </button>

          <button
            onClick={() => {
              setActiveSection("my-orders");
              setActiveSidebarItem("my-orders");
              sessionStorage.setItem("activeSidebarItem", "my-orders");
            }}
            className={`flex items-center w-full py-2 rounded-lg text-left transition-colors ${
              activeSidebarItem === "my-orders"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            } ${!sidebarOpen ? "justify-center px-2" : "px-3"}`}
          >
            <Package size={18} className="min-w-[18px] min-h-[18px]" />
            {sidebarOpen && <span className="ml-3">My Orders</span>}
          </button>

          <button
            onClick={() => {
              setActiveSection("transactions");
              setActiveSidebarItem("transactions");
              sessionStorage.setItem("activeSidebarItem", "transactions");
            }}
            className={`flex items-center w-full py-2 rounded-lg text-left transition-colors ${
              activeSidebarItem === "transactions"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            } ${!sidebarOpen ? "justify-center px-2" : "px-3"}`}
          >
            <DollarSignIcon size={18} className="min-w-[18px] min-h-[18px]" />
            {sidebarOpen && <span className="ml-3">Transactions</span>}
          </button>

          <button
            onClick={() => {
              setActiveSection("add-item");
              setActiveSidebarItem("add-item");
              sessionStorage.setItem("activeSidebarItem", "add-item");
              // If user is not a lister, show the confirmation
              if (user.isLister === "notapplied") {
                setShowStripeConfirmation(true);
              }
            }}
            className={`flex items-center w-full py-2 rounded-lg text-left transition-colors ${
              activeSidebarItem === "add-item"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            } ${!sidebarOpen ? "justify-center px-2" : "px-3"}`}
          >
            <Plus size={18} className="min-w-[18px] min-h-[18px]" />
            {sidebarOpen && <span className="ml-3">Add New Item</span>}
          </button>

          <button
            onClick={() => {
              setActiveSection("favorites");
              setActiveSidebarItem("favorites");
              sessionStorage.setItem("activeSidebarItem", "favorites");
            }}
            className={`flex items-center w-full py-2 rounded-lg text-left transition-colors ${
              activeSidebarItem === "favorites"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            } ${!sidebarOpen ? "justify-center px-2" : "px-3"}`}
          >
            <Heart size={18} className="min-w-[18px] min-h-[18px]" />
            {sidebarOpen && <span className="ml-3">Favorites</span>}
          </button>

          {sidebarOpen && (
            <div className="pt-4 mt-4 border-t border-gray-200">
              <p className="px-3 mb-2 text-xs font-medium text-gray-500 uppercase">
                Account
              </p>
            </div>
          )}

          <button
            onClick={() => {
              setActiveSection("profile");
              setActiveSidebarItem("profile");
              sessionStorage.setItem("activeSidebarItem", "profile");
            }}
            className={`flex items-center w-full py-2 rounded-lg text-left transition-colors ${
              activeSidebarItem === "profile"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            } ${!sidebarOpen ? "justify-center px-2" : "px-3"}`}
          >
            <User size={18} className="min-w-[18px] min-h-[18px]" />
            {sidebarOpen && <span className="ml-3">Profile</span>}
          </button>
        </nav>

        {/* Logout */}
        <div
          className={`p-4 border-t ${
            !sidebarOpen ? "flex justify-center" : ""
          }`}
        >
          <button
            className={`flex items-center w-full py-2 text-red-600 rounded-lg hover:bg-red-50 transition-colors ${
              !sidebarOpen ? "justify-center px-2" : "px-3"
            }`}
            onClick={handleLogout}
          >
            <LogOut size={18} className="min-w-[18px] min-h-[18px]" />
            {sidebarOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main content */}
      <main
        className={`flex-1 p-4 md:p-6 bg-gray-100 rounded-xl overflow-hidden transition-all duration-300 ${
          sidebarOpen ? "md:ml-0" : "md:ml-0"
        }`}
      >
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {activeSection === "overview" && "Dashboard Overview"}
            {activeSection === "my-items" && "My Listed Items"}
            {activeSection === "add-item" && "Add New Item"}
            {activeSection === "messages" && "Messages"}
            {activeSection === "favorites" && "Favorites"}
            {activeSection === "profile" && "Profile Settings"}
            {activeSection === "settings" && "Account Settings"}
            {activeSection === "my-orders" && "My Past Orders"}
            {activeSection === "transactions" && "Transaction History"}
          </h1>
        </header>

        {/* Render the active section */}
        {handleRenderSection()}

        {showEditModal && (
          <EditMyItem
            setShowEditModal={setShowEditModal}
            editItemData={editItemData}
            setEditItemData={setEditItemData}
            newImages={newImages}
            setNewImages={setNewImages}
            setEditItemId={setEditItemId}
            setImagesToDelete={setImagesToDelete}
            imagesToDelete={imagesToDelete}
          />
        )}
      </main>
    </div>
  );
}
