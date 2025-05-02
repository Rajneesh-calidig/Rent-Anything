import { useEffect, useState } from "react";
import {
  User,
  Home,
  Package,
  Heart,
  Settings,
  LogOut,
  Plus,
  Menu,
  X,
} from "lucide-react";
import AddItem from "../component/items/AddItem";
import { useAuth } from "../providers/Auth/AuthProvider";
import { useUser } from "../providers/User/UserProvider";
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

export default function Dashboard() {
  // State for active section
  const [activeSection, setActiveSection] = useState("overview");
  const [activeSidebarItem, setActiveSidebarItem] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();
  const { myItems } = useItem();

  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const handleRenderSection = () => {
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
      case "add-item":
        return <AddItem />;
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

  return (
    <div className="min-h-screen">
      {/* Mobile menu button */}
      <div
        className={`fixed top-4 left-4 z-50 md:hidden ${
          mobileMenuOpen ? "translate-x-64" : "translate-x-0"
        } transition-transform duration-300 ease-in-out`}
      >
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-full bg-white shadow-md text-gray-700"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:sticky top-0 left-0 z-40 h-screen w-64 transition-transform duration-300 ease-in-out bg-white shadow-lg md:shadow-none md:flex flex-col`}
        >
          {/* User info */}
          <div className="p-4 border-b">
            <div className="flex items-center">
              <div className="relative">
                <img
                  src={
                    previewImage ||
                    `${import.meta.env.VITE_FILE_URL}${user.profileImage}` ||
                    "/placeholder.svg"
                  }
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100"
                />
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    user.kycStatus === "verified"
                      ? "bg-green-500"
                      : user.kycStatus === "pending"
                      ? "bg-yellow-500"
                      : "bg-gray-400"
                  }`}
                ></div>
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">
                  Member since {user.joinedDate}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <button
              onClick={() => {
                setActiveSection("overview");
                setActiveSidebarItem("overview");
                setMobileMenuOpen(false);
              }}
              className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
                activeSidebarItem === "overview"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Home size={18} className="mr-3" />
              Analytics
            </button>

            <button
              onClick={() => {
                setActiveSection("my-items");
                setActiveSidebarItem("my-items");
                setMobileMenuOpen(false);
              }}
              className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
                activeSidebarItem === "my-items"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Package size={18} className="mr-3" />
              My Items
            </button>
            <button
              onClick={() => {
                setActiveSection("my-orders");
                setActiveSidebarItem("my-orders");
                setMobileMenuOpen(false);
              }}
              className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
                activeSidebarItem === "my-orders"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Package size={18} className="mr-3" />
              My Orders
            </button>

            <button
              onClick={() => {
                setActiveSection("transactions");
                setActiveSidebarItem("transactions");
                setMobileMenuOpen(false);
              }}
              className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
                activeSidebarItem === "transactions"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-[18px] w-[18px] mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Transactions
            </button>

            <button
              onClick={() => {
                // Navigate('/add-item')
                setActiveSection("add-item");
                setActiveSidebarItem("add-item");
                setMobileMenuOpen(false);
              }}
              className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
                activeSidebarItem === "add-item"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Plus size={18} className="mr-3" />
              Add New Item
            </button>

            {/* <button
              onClick={() => {
                setActiveSection("messages")
                setActiveSidebarItem("messages")
                setMobileMenuOpen(false)
              }}
              className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
                activeSidebarItem === "messages"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <MessageSquare size={18} className="mr-3" />
              Messages
              <span
                className={`ml-auto px-2 py-0.5 rounded-full text-xs font-medium ${
                  activeSidebarItem === "messages" ? "bg-white text-indigo-600" : "bg-indigo-100 text-indigo-800"
                }`}
              >
                3
              </span>
            </button> */}

            <button
              onClick={() => {
                setActiveSection("favorites");
                setActiveSidebarItem("favorites");
                setMobileMenuOpen(false);
              }}
              className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
                activeSidebarItem === "favorites"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Heart size={18} className="mr-3" />
              Favorites
            </button>

            <div className="pt-4 mt-4 border-t border-gray-200">
              <p className="px-3 mb-2 text-xs font-medium text-gray-500 uppercase">
                Account
              </p>

              <button
                onClick={() => {
                  setActiveSection("profile");
                  setActiveSidebarItem("profile");
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
                  activeSidebarItem === "profile"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <User size={18} className="mr-3" />
                Profile
              </button>

              <button
                onClick={() => {
                  setActiveSection("settings");
                  setActiveSidebarItem("settings");
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
                  activeSidebarItem === "settings"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Settings size={18} className="mr-3" />
                Settings
              </button>
            </div>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button className="flex items-center w-full px-3 py-2 text-red-600 rounded-lg hover:bg-red-50">
              <LogOut size={18} className="mr-3" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 ml-0 pt-20 md:pt-6 bg-gray-100 rounded-xl overflow-hidden">
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
    </div>
  );
}
