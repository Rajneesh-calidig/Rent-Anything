// import { useEffect, useState } from "react";
// import {
//   User,
//   Home,
//   Package,
//   Heart,
//   Settings,
//   LogOut,
//   Plus,
//   Menu,
//   X,
// } from "lucide-react";
// import AddItem from "../component/items/AddItem";
// import { useAuth } from "../providers/Auth/AuthProvider";
// import { useUser } from "../providers/User/UserProvider";
// import { useItem } from "../providers/Items/ItemProvider";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import Overview from "../component/dashboard/Overview";
// import MyItems from "../component/dashboard/MyItems";
// import Profile from "../component/dashboard/Profile";
// import UserSettings from "../component/dashboard/Settings";
// import MyOrders from "../component/dashboard/MyOrders";
// import Transactions from "../component/dashboard/Transactions";
// import EditMyItem from "../component/Modals/dashboard/EditMyItem";
// import { formatTime, formatDate } from "../utils/date-utils";
// import { routes } from "../routes/routes";
// // import { differenceInMinutes, formatDate } from "date-fns";

// export default function Dashboard() {
//   // State for active section
//   const [activeSection, setActiveSection] = useState("overview");
//   const [activeSidebarItem, setActiveSidebarItem] = useState("overview");
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     setActiveSidebarItem(
//       sessionStorage.getItem("activeSidebarItem") || "overview"
//     );
//     setActiveSection(sessionStorage.getItem("activeSidebarItem") || "overview");
//   }, []);

//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const { myItems } = useItem();

//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const [previewImage, setPreviewImage] = useState(null);

//   const [editItemId, setEditItemId] = useState(null);
//   const [editItemData, setEditItemData] = useState({
//     _id: "",
//     title: "",
//     category: "",
//     subcategory: "",
//     pricePerDay: "",
//     condition: "",
//     description: "",
//     status: "",
//     images: [],
//   });
//   const [showEditModal, setShowEditModal] = useState(false);

//   const [newImages, setNewImages] = useState([]);
//   const [imagesToDelete, setImagesToDelete] = useState([]);

//   const { logout } = useAuth();
//   const handleLogout = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await logout();
//       toast.success("Logged out successfully!");
//     } catch (err) {
//       console.error(err);
//     }
//     clearSessionData();
//     navigate(routes.landing);
//   };
//   const handleRenderSection = () => {
//     switch (activeSection) {
//       case "overview":
//         return (
//           <Overview
//             setActiveSection={setActiveSection}
//             user={user}
//             myItemsLength={myItems.length}
//             setActiveSidebarItem={setActiveSidebarItem}
//           />
//         );
//       case "my-items":
//         return (
//           <MyItems
//             setEditItemData={setEditItemData}
//             setEditItemId={setEditItemId}
//             setNewImages={setNewImages}
//             setImagesToDelete={setImagesToDelete}
//             setShowEditModal={setShowEditModal}
//           />
//         );
//       case "add-item":
//         return <AddItem />;
//       case "profile":
//         return (
//           <Profile
//             user={user}
//             previewImage={previewImage}
//             setPreviewImage={setPreviewImage}
//           />
//         );
//       case "settings":
//         return <UserSettings />;
//       case "my-orders":
//         return <MyOrders />;
//       case "transactions":
//         return <Transactions user={user} />;
//       default:
//         return (
//           <Overview
//             setActiveSection={setActiveSection}
//             user={user}
//             myItemsLength={myItems.length}
//             setActivesidebarItem={setActiveSidebarItem}
//           />
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen">
//       {/* Mobile menu button */}
//       <div
//         className={`fixed top-4 left-4 z-50 md:hidden ${
//           mobileMenuOpen ? "translate-x-64" : "translate-x-0"
//         } transition-transform duration-300 ease-in-out`}
//       >
//         <button
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           className="p-2 rounded-full bg-white shadow-md text-gray-700"
//         >
//           {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       <div className="flex">
//         {/* Sidebar */}
//         <aside
//           className={`${
//             mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
//           } md:translate-x-0 fixed md:sticky top-0 left-0 z-40 h-screen w-64 transition-transform duration-300 ease-in-out bg-white shadow-lg md:shadow-none md:flex flex-col`}
//         >
//           {/* User info */}
//           <div className="p-4 border-b">
//             <div className="flex items-center">
//               <div className="relative">
//                 <img
//                   src={
//                     previewImage ||
//                     `${import.meta.env.VITE_FILE_URL}${user.profileImage}` ||
//                     "/placeholder.svg"
//                   }
//                   alt="Profile"
//                   className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100"
//                 />
//                 <div
//                   className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
//                     user.kycStatus === "verified"
//                       ? "bg-green-500"
//                       : user.kycStatus === "pending"
//                       ? "bg-yellow-500"
//                       : "bg-gray-400"
//                   }`}
//                 ></div>
//               </div>
//               <div className="ml-3">
//                 <p className="font-medium text-gray-800">{user.name}</p>
//                 <p className="text-xs text-gray-500">
//                   Member since {user?.createdAt && formatDate(user.createdAt)}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
//             <button
//               onClick={() => {
//                 setActiveSection("overview");
//                 setActiveSidebarItem("overview");
//                 sessionStorage.setItem("activeSidebarItem", "overview");
//                 setMobileMenuOpen(false);
//               }}
//               className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
//                 activeSidebarItem === "overview"
//                   ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
//                   : "text-gray-700 hover:bg-gray-100"
//               }`}
//             >
//               <Home size={18} className="mr-3" />
//               Analytics
//             </button>

//             <button
//               onClick={() => {
//                 setActiveSection("my-items");
//                 setActiveSidebarItem("my-items");
//                 sessionStorage.setItem("activeSidebarItem", "my-items");
//                 setMobileMenuOpen(false);
//               }}
//               className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
//                 activeSidebarItem === "my-items"
//                   ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
//                   : "text-gray-700 hover:bg-gray-100"
//               }`}
//             >
//               <Package size={18} className="mr-3" />
//               My Items
//             </button>
//             <button
//               onClick={() => {
//                 setActiveSection("my-orders");
//                 setActiveSidebarItem("my-orders");
//                 sessionStorage.setItem("activeSidebarItem", "my-orders");
//                 setMobileMenuOpen(false);
//               }}
//               className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
//                 activeSidebarItem === "my-orders"
//                   ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
//                   : "text-gray-700 hover:bg-gray-100"
//               }`}
//             >
//               <Package size={18} className="mr-3" />
//               My Orders
//             </button>

//             <button
//               onClick={() => {
//                 setActiveSection("transactions");
//                 setActiveSidebarItem("transactions");
//                 sessionStorage.setItem("activeSidebarItem", "transactions");
//                 setMobileMenuOpen(false);
//               }}
//               className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
//                 activeSidebarItem === "transactions"
//                   ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
//                   : "text-gray-700 hover:bg-gray-100"
//               }`}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-[18px] w-[18px] mr-3"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//               Transactions
//             </button>

//             <button
//               onClick={() => {
//                 // Navigate('/add-item')
//                 setActiveSection("add-item");
//                 setActiveSidebarItem("add-item");
//                 sessionStorage.setItem("activeSidebarItem", "add-item");
//                 setMobileMenuOpen(false);
//               }}
//               className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
//                 activeSidebarItem === "add-item"
//                   ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
//                   : "text-gray-700 hover:bg-gray-100"
//               }`}
//             >
//               <Plus size={18} className="mr-3" />
//               Add New Item
//             </button>

//             {/* <button
//               onClick={() => {
//                 setActiveSection("messages")
//                 setActiveSidebarItem("messages")
//                 setMobileMenuOpen(false)
//               }}
//               className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
//                 activeSidebarItem === "messages"
//                   ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
//                   : "text-gray-700 hover:bg-gray-100"
//               }`}
//             >
//               <MessageSquare size={18} className="mr-3" />
//               Messages
//               <span
//                 className={`ml-auto px-2 py-0.5 rounded-full text-xs font-medium ${
//                   activeSidebarItem === "messages" ? "bg-white text-indigo-600" : "bg-indigo-100 text-indigo-800"
//                 }`}
//               >
//                 3
//               </span>
//             </button> */}

//             <button
//               onClick={() => {
//                 setActiveSection("favorites");
//                 setActiveSidebarItem("favorites");
//                 sessionStorage.setItem("activeSidebarItem", "favorites");
//                 setMobileMenuOpen(false);
//               }}
//               className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
//                 activeSidebarItem === "favorites"
//                   ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
//                   : "text-gray-700 hover:bg-gray-100"
//               }`}
//             >
//               <Heart size={18} className="mr-3" />
//               Favorites
//             </button>

//             <div className="pt-4 mt-4 border-t border-gray-200">
//               <p className="px-3 mb-2 text-xs font-medium text-gray-500 uppercase">
//                 Account
//               </p>

//               <button
//                 onClick={() => {
//                   setActiveSection("profile");
//                   setActiveSidebarItem("profile");
//                   sessionStorage.setItem("activeSidebarItem", "profile");
//                   setMobileMenuOpen(false);
//                 }}
//                 className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
//                   activeSidebarItem === "profile"
//                     ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`}
//               >
//                 <User size={18} className="mr-3" />
//                 Profile
//               </button>

//               <button
//                 onClick={() => {
//                   setActiveSection("settings");
//                   setActiveSidebarItem("settings");
//                   sessionStorage.setItem("activeSidebarItem", "settings");
//                   setMobileMenuOpen(false);
//                 }}
//                 className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
//                   activeSidebarItem === "settings"
//                     ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`}
//               >
//                 <Settings size={18} className="mr-3" />
//                 Settings
//               </button>
//             </div>
//           </nav>

//           {/* Logout */}
//           <div className="p-4 border-t">
//             <button
//               className="flex items-center w-full px-3 py-2 text-red-600 rounded-lg hover:bg-red-50"
//               onClick={handleLogout}
//             >
//               <LogOut size={18} className="mr-3" />
//               Logout
//             </button>
//           </div>
//         </aside>

//         {/* Main content */}
//         <main className="flex-1 p-4 md:p-6 ml-0 pt-20 md:pt-6 bg-gray-100 rounded-xl overflow-hidden">
//           {/* Header */}
//           <header className="flex justify-between items-center mb-6">
//             <h1 className="text-2xl font-bold text-gray-800">
//               {activeSection === "overview" && "Dashboard Overview"}
//               {activeSection === "my-items" && "My Listed Items"}
//               {activeSection === "add-item" && "Add New Item"}
//               {activeSection === "messages" && "Messages"}
//               {activeSection === "favorites" && "Favorites"}
//               {activeSection === "profile" && "Profile Settings"}
//               {activeSection === "settings" && "Account Settings"}
//               {activeSection === "my-orders" && "My Past Orders"}
//               {activeSection === "transactions" && "Transaction History"}
//             </h1>
//           </header>

//           {/* Render the active section */}
//           {handleRenderSection()}

//           {showEditModal && (
//             <EditMyItem
//               setShowEditModal={setShowEditModal}
//               editItemData={editItemData}
//               setEditItemData={setEditItemData}
//               newImages={newImages}
//               setNewImages={setNewImages}
//               setEditItemId={setEditItemId}
//               setImagesToDelete={setImagesToDelete}
//               imagesToDelete={imagesToDelete}
//             />
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import {
  User,
  Home,
  Package,
  Heart,
  Settings,
  LogOut,
  Plus,
  ChevronRight,
  ChevronLeft,
  DollarSign,
  DollarSignIcon,
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
// import { differenceInMinutes, formatDate } from "date-fns";

export default function Dashboard() {
  // State for active section
  const [activeSection, setActiveSection] = useState("overview");
  const [activeSidebarItem, setActiveSidebarItem] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
  const { user } = useAuth();
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
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="min-w-[18px] min-h-[18px]"
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
            </svg> */}

            <DollarSignIcon size={18} className="min-w-[18px] min-h-[18px]" />
            {sidebarOpen && <span className="ml-3">Transactions</span>}
          </button>

          <button
            onClick={() => {
              setActiveSection("add-item");
              setActiveSidebarItem("add-item");
              sessionStorage.setItem("activeSidebarItem", "add-item");
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

          <button
            onClick={() => {
              setActiveSection("settings");
              setActiveSidebarItem("settings");
              sessionStorage.setItem("activeSidebarItem", "settings");
            }}
            className={`flex items-center w-full py-2 rounded-lg text-left transition-colors ${
              activeSidebarItem === "settings"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            } ${!sidebarOpen ? "justify-center px-2" : "px-3"}`}
          >
            <Settings size={18} className="min-w-[18px] min-h-[18px]" />
            {sidebarOpen && <span className="ml-3">Settings</span>}
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
