"use client"

import { useState } from "react"
import {
  User,
  Home,
  Package,
  MessageSquare,
  Heart,
  Settings,
  LogOut,
  Plus,
  Search,
  Bell,
  ChevronRight,
  Upload,
  Edit,
  Trash,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Menu,
  X,
} from "lucide-react"

export default function Dashboard() {
  // State for active section
  const [activeSection, setActiveSection] = useState("overview")
  const [activeSidebarItem, setActiveSidebarItem] = useState("overview")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Mock user data
  const [user, setUser] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+91 9876543210",
    profileImage: "/placeholder.svg?height=200&width=200",
    joinedDate: "June 2023",
    kycStatus: "verified", // pending, verified, not-submitted
    itemsListed: 8,
    itemsRented: 3,
    earnings: 24500,
  })

  // Mock listed items
  const [listedItems, setListedItems] = useState([
    {
      id: "1",
      title: "Professional DSLR Camera with 3 Lenses",
      category: "Electronics",
      subcategory: "Cameras",
      price: 1200,
      status: "active",
      views: 245,
      likes: 18,
      image: "/placeholder.svg?height=100&width=150",
      createdAt: "2023-12-15",
    },
    {
      id: "2",
      title: "Mountain Bike - Premium All-Terrain",
      category: "Sports",
      subcategory: "Bicycles",
      price: 800,
      status: "active",
      views: 187,
      likes: 12,
      image: "/placeholder.svg?height=100&width=150",
      createdAt: "2023-12-10",
    },
    {
      id: "3",
      title: "Camping Tent - 4 Person Waterproof",
      category: "Outdoor",
      subcategory: "Camping Gear",
      price: 350,
      status: "inactive",
      views: 95,
      likes: 7,
      image: "/placeholder.svg?height=100&width=150",
      createdAt: "2023-11-28",
    },
    {
      id: "4",
      title: "Professional Power Drill Set",
      category: "Tools",
      subcategory: "Power Tools",
      price: 450,
      status: "active",
      views: 132,
      likes: 9,
      image: "/placeholder.svg?height=100&width=150",
      createdAt: "2023-11-20",
    },
  ])

  // State for profile form
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  })

  // State for password form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // State for KYC form
  const [kycForm, setKycForm] = useState({
    aadhaarNumber: "",
    aadhaarImage: null,
    panNumber: "",
    panImage: null,
  })

  // Handle profile image change
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setUser({
        ...user,
        profileImage: imageUrl,
      })
      // Here you would typically upload the image to your server
    }
  }

  // Handle form input changes
  const handleInputChange = (formSetter, formData) => (e) => {
    const { name, value, files } = e.target
    formSetter({
      ...formData,
      [name]: files ? files[0] : value,
    })
  }

  // Handle profile form submission
  const handleProfileSubmit = (e) => {
    e.preventDefault()
    // Update user data
    setUser({
      ...user,
      name: profileForm.name,
      email: profileForm.email,
      phone: profileForm.phone,
    })
    alert("Profile updated successfully!")
  }

  // Handle password form submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    // Here you would typically send the password update to your server
    alert("Password updated successfully!")
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  // Handle KYC form submission
  const handleKycSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the KYC data to your server
    setUser({
      ...user,
      kycStatus: "pending",
    })
    alert("KYC submitted successfully! It's now under review.")
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
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
          } md:translate-x-0 fixed md:sticky top-0 left-0 z-40 h-screen w-64 transition-transform duration-300 ease-in-out bg-white border-r border-gray-200 md:flex flex-col`}
        >
          {/* Logo */}
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold text-blue-600">RentEase</h1>
          </div>

          {/* User info */}
          <div className="p-4 border-b">
            <div className="flex items-center">
              <div className="relative">
                <img
                  src={user.profileImage || "/placeholder.svg"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${user.kycStatus === "verified" ? "bg-green-500" : user.kycStatus === "pending" ? "bg-yellow-500" : "bg-gray-400"}`}
                ></div>
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">Member since {user.joinedDate}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <button
              onClick={() => {
                setActiveSection("overview")
                setActiveSidebarItem("overview")
                setMobileMenuOpen(false)
              }}
              className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
                activeSidebarItem === "overview" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Home size={18} className="mr-3" />
              Overview
            </button>

            <button
              onClick={() => {
                setActiveSection("my-items")
                setActiveSidebarItem("my-items")
                setMobileMenuOpen(false)
              }}
              className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
                activeSidebarItem === "my-items" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Package size={18} className="mr-3" />
              My Items
            </button>

            <button
              onClick={() => {
                setActiveSection("add-item")
                setActiveSidebarItem("add-item")
                setMobileMenuOpen(false)
              }}
              className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
                activeSidebarItem === "add-item" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Plus size={18} className="mr-3" />
              Add New Item
            </button>

            <button
              onClick={() => {
                setActiveSection("messages")
                setActiveSidebarItem("messages")
                setMobileMenuOpen(false)
              }}
              className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
                activeSidebarItem === "messages" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <MessageSquare size={18} className="mr-3" />
              Messages
              <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">3</span>
            </button>

            <button
              onClick={() => {
                setActiveSection("favorites")
                setActiveSidebarItem("favorites")
                setMobileMenuOpen(false)
              }}
              className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
                activeSidebarItem === "favorites" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Heart size={18} className="mr-3" />
              Favorites
            </button>

            <div className="pt-4 mt-4 border-t border-gray-200">
              <p className="px-3 mb-2 text-xs font-medium text-gray-500 uppercase">Account</p>

              <button
                onClick={() => {
                  setActiveSection("profile")
                  setActiveSidebarItem("profile")
                  setMobileMenuOpen(false)
                }}
                className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
                  activeSidebarItem === "profile" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <User size={18} className="mr-3" />
                Profile
              </button>

              <button
                onClick={() => {
                  setActiveSection("settings")
                  setActiveSidebarItem("settings")
                  setMobileMenuOpen(false)
                }}
                className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
                  activeSidebarItem === "settings" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
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
        <main className="flex-1 p-4 md:p-6 ml-0">
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
            </h1>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hidden md:block"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 hidden md:block" />
              </div>

              <button className="relative p-2 text-gray-600 rounded-full hover:bg-gray-100">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </header>

          {/* Overview Section */}
          {activeSection === "overview" && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Items Listed</p>
                      <h3 className="text-2xl font-bold text-gray-800 mt-1">{user.itemsListed}</h3>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-green-500 font-medium flex items-center">
                      <ChevronRight className="h-4 w-4" />
                      View all
                    </span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Items Rented</p>
                      <h3 className="text-2xl font-bold text-gray-800 mt-1">{user.itemsRented}</h3>
                    </div>
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-green-500 font-medium flex items-center">
                      <ChevronRight className="h-4 w-4" />
                      View history
                    </span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Earnings</p>
                      <h3 className="text-2xl font-bold text-gray-800 mt-1">{formatCurrency(user.earnings)}</h3>
                    </div>
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-purple-600"
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
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-green-500 font-medium flex items-center">
                      <ChevronRight className="h-4 w-4" />
                      View transactions
                    </span>
                  </div>
                </div>
              </div>

              {/* KYC Status */}
              {user.kycStatus !== "verified" && (
                <div
                  className={`p-4 rounded-lg flex items-start space-x-4 ${
                    user.kycStatus === "pending"
                      ? "bg-yellow-50 border border-yellow-200"
                      : "bg-blue-50 border border-blue-200"
                  }`}
                >
                  {user.kycStatus === "pending" ? (
                    <Clock className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {user.kycStatus === "pending" ? "KYC Verification in Progress" : "Complete KYC Verification"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {user.kycStatus === "pending"
                        ? "Your KYC documents are under review. This usually takes 1-2 business days."
                        : "To list items and receive payments, please complete your KYC verification."}
                    </p>
                    {user.kycStatus !== "pending" && (
                      <button
                        onClick={() => setActiveSection("profile")}
                        className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        Complete Verification
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Recent Items */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Recently Listed Items</h2>
                  <button
                    onClick={() => setActiveSection("my-items")}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    View All
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Item
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price/Day
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Listed On
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {listedItems.slice(0, 3).map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.title}
                                    className="h-10 w-10 rounded-md object-cover"
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900 line-clamp-1">{item.title}</div>
                                  <div className="text-xs text-gray-500">ID: {item.id}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{item.category}</div>
                              <div className="text-xs text-gray-500">{item.subcategory}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">₹{item.price}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  item.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {item.status === "active" ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(item.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button className="text-blue-600 hover:text-blue-900">
                                  <Eye size={16} />
                                </button>
                                <button className="text-gray-600 hover:text-gray-900">
                                  <Edit size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* My Items Section */}
          {activeSection === "my-items" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search items..."
                      className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                  <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="all">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="sports">Sports</option>
                    <option value="tools">Tools</option>
                    <option value="outdoor">Outdoor</option>
                  </select>
                </div>
                <button
                  onClick={() => setActiveSection("add-item")}
                  className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={18} className="mr-2" />
                  Add New Item
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Item
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price/Day
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stats
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Listed On
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {listedItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.title}
                                  className="h-10 w-10 rounded-md object-cover"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 line-clamp-1">{item.title}</div>
                                <div className="text-xs text-gray-500">ID: {item.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{item.category}</div>
                            <div className="text-xs text-gray-500">{item.subcategory}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">₹{item.price}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                item.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {item.status === "active" ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center text-xs text-gray-500">
                                <Eye size={14} className="mr-1" />
                                {item.views}
                              </div>
                              <div className="flex items-center text-xs text-gray-500">
                                <Heart size={14} className="mr-1" />
                                {item.likes}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(item.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye size={16} />
                              </button>
                              <button className="text-gray-600 hover:text-gray-900">
                                <Edit size={16} />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Add Item Section */}
          {activeSection === "add-item" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Add a New Item for Rent</h2>
              <p className="text-gray-600 mb-6">
                Fill out the form below to list a new item for rent. Complete all required fields for the best results.
              </p>

              <div className="text-center py-8">
                <button
                  onClick={() => (window.location.href = "/add-item")}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Go to Add Item Form
                </button>
                <p className="mt-4 text-sm text-gray-500">
                  You'll be redirected to our comprehensive item listing form.
                </p>
              </div>
            </div>
          )}

          {/* Profile Section */}
          {activeSection === "profile" && (
            <div className="space-y-6">
              {/* Profile Info */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="relative mb-6 md:mb-0 md:mr-8">
                    <img
                      src={user.profileImage || "/placeholder.svg"}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
                    />
                    <label
                      htmlFor="profile-image-upload"
                      className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
                    >
                      <Edit size={14} />
                    </label>
                    <input
                      id="profile-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      className="hidden"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                    <p className="text-gray-500">Member since {user.joinedDate}</p>
                    <div className="mt-2 flex items-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.kycStatus === "verified"
                            ? "bg-green-100 text-green-800"
                            : user.kycStatus === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.kycStatus === "verified"
                          ? "KYC Verified"
                          : user.kycStatus === "pending"
                            ? "KYC Pending"
                            : "KYC Not Submitted"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Basic Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                <form onSubmit={handleProfileSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={profileForm.name}
                        onChange={handleInputChange(setProfileForm, profileForm)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={profileForm.email}
                        onChange={handleInputChange(setProfileForm, profileForm)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={profileForm.phone}
                        onChange={handleInputChange(setProfileForm, profileForm)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>

              {/* KYC Verification */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">KYC Verification</h3>

                {user.kycStatus === "verified" ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800">Verification Complete</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Your account is fully verified. You can list items and receive payments.
                      </p>
                    </div>
                  </div>
                ) : user.kycStatus === "pending" ? (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
                    <Clock className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800">Verification in Progress</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Your KYC documents are under review. This usually takes 1-2 business days.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleKycSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Card Number</label>
                        <input
                          type="text"
                          name="aadhaarNumber"
                          value={kycForm.aadhaarNumber}
                          onChange={handleInputChange(setKycForm, kycForm)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="XXXX XXXX XXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Card Image</label>
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-7">
                              <Upload className="w-8 h-8 text-gray-400" />
                              <p className="pt-1 text-sm text-gray-500">
                                {kycForm.aadhaarImage ? kycForm.aadhaarImage.name : "Upload Aadhaar Card"}
                              </p>
                            </div>
                            <input
                              type="file"
                              name="aadhaarImage"
                              onChange={handleInputChange(setKycForm, kycForm)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">PAN Card Number</label>
                        <input
                          type="text"
                          name="panNumber"
                          value={kycForm.panNumber}
                          onChange={handleInputChange(setKycForm, kycForm)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="ABCDE1234F"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">PAN Card Image</label>
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-7">
                              <Upload className="w-8 h-8 text-gray-400" />
                              <p className="pt-1 text-sm text-gray-500">
                                {kycForm.panImage ? kycForm.panImage.name : "Upload PAN Card"}
                              </p>
                            </div>
                            <input
                              type="file"
                              name="panImage"
                              onChange={handleInputChange(setKycForm, kycForm)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Submit KYC Documents
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Change Password */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handleInputChange(setPasswordForm, passwordForm)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <div className="h-0.5 bg-gray-100 my-2"></div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handleInputChange(setPasswordForm, passwordForm)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handleInputChange(setPasswordForm, passwordForm)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Settings Section */}
          {activeSection === "settings" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Settings</h3>

                <div className="space-y-6">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h4 className="font-medium text-gray-800">Email Notifications</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Receive email notifications for new messages and bookings
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h4 className="font-medium text-gray-800">SMS Notifications</h4>
                      <p className="text-sm text-gray-500 mt-1">Receive SMS alerts for important updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h4 className="font-medium text-gray-800">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account</p>
                    </div>
                    <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                      Enable
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h4 className="font-medium text-red-600">Delete Account</h4>
                      <p className="text-sm text-gray-500 mt-1">Permanently delete your account and all your data</p>
                    </div>
                    <button className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}


// import React, { useEffect, useState } from 'react';
// import { getSessionData } from '../services/session.service';
// import { useAuth } from '../providers/Auth/AuthProvider';
// import { useUser } from '../providers/User/UserProvider';
// import {toast} from "react-toastify";

// const Dashboard = () => {
//   const [activeSection, setActiveSection] = useState("Account")
//   const {user,updateUser} = useAuth();
//   const { updateProfile, updateDetails, updatePassword, applyKYC, isLoading } = useUser();
//   const [sidebarOpen, setSidebarOpen] = useState(false)

//   const [previewImage, setPreviewImage] = useState(null);

//   const [basicInfo, setBasicInfo] = useState({
//     name: "",
//     email: "",
//     mobileNumber: "",
//   });

//   useEffect(() => {
//     setBasicInfo({
//       name:user.name,email:user.email,mobileNumber:user.mobileNumber
//     });
//   },[user])
  
//   const [kycInfo, setKycInfo] = useState({
//     aadhaarCardNumber: "",
//     aadhaarCardImage: null,
//     panCardNumber: "",
//     panCardImage: null,
//     // addressType: "",
//     // addressProof: "",
//   });
  
//   const [bankInfo, setBankInfo] = useState({
//     accountType: "",
//     bankName: "",
//     branchName: "",
//     ifscCode: "",
//     accountNumber: "",
//   });
  
//   const [passwordInfo, setPasswordInfo] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const handleInputChange = (setter) => (e) => {
//     const { name, value, files } = e.target;
//     setter(prev => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleUpdateProfileImage = async (e) => {
//     e.preventDefault();

//     setPreviewImage(URL.createObjectURL(e.target.files[0]));

//     const formData = new FormData();
//     formData.append("profileImage", e.target.files[0]);
//     try {
//       await updateProfile(user._id, formData);
//       toast.success("Profile image updated successfully!");
//     } catch (err) {
//       toast.error("Error updating profile image");
//     }
//   }

//   const handleSubmitBasicInfo = async (e) => {
//     e.preventDefault();
//     try {
//       console.log(basicInfo,user._id)
//       const response = await updateDetails(user._id, basicInfo);
//       console.log("response",response)
//       toast.success("Basic Info updated successfully!")
//       // alert("Basic Info updated");
//     } catch (err) {
//       alert("Error updating Basic Info");
//     }
//   };

//   const handleSubmitKYC = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("aadhaarCardImage", kycInfo.aadhaarCardImage);
//     formData.append("panCardImage", kycInfo.panCardImage);
//     formData.append("aadhaarCardNumber", kycInfo.aadhaarCardNumber);
//     formData.append("panCardNumber", kycInfo.panCardNumber);

//     try {
//       const response = await applyKYC(user._id, formData);
//       updateUser(response.data.user)
//       toast.success("KYC submitted successfully!");
//     } catch (err) {
//       toast.error("Error submitting KYC");
//     }
//   };

//   const handleSubmitPassword = async (e) => {
//     e.preventDefault();
//     if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     try {
//       await updatePassword(user._id, {
//         currentPassword: passwordInfo.currentPassword,
//         newPassword: passwordInfo.newPassword,
//       });
//       toast.success("Password updated successfully!");
//       // alert("Password updated");
//     } catch (err) {
//       alert("Error updating password");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#FFF8F0]">

//       <div className="flex flex-col md:flex-row max-h-screen">
//         {/* Sidebar - Hidden on mobile unless toggled */}
//         <div
//           className={`${sidebarOpen ? "block" : "hidden"} md:block w-full md:w-64 p-4 md:p-6 border-b md:border-r md:border-b-0`}
//         >
//           <div className="mb-6">
//             <div
//               className="flex items-center justify-between cursor-pointer mb-4"
//               onClick={() => setActiveSection(activeSection === "Account" ? "" : "Account")}
//             >
//               <h2 className="text-lg font-semibold text-[#001F5B]">Account</h2>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 className={`w-5 h-5 transition-transform ${activeSection === "Account" ? "rotate-180" : ""}`}
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>

//             {activeSection === "Account" && (
//               <div className="pl-2 space-y-4">
//                 <div className="text-[#001F5B] cursor-pointer">Profile</div>
//                 <div className="text-[#001F5B] cursor-pointer">KYC</div>
//                 <div className="text-[#001F5B] cursor-pointer">Bank Detail</div>
//                 {/* <div className="text-[#001F5B] cursor-pointer">My Listing Plan</div> */}
//                 <div className="text-[#001F5B] cursor-pointer">Transactions</div>
//                 <div className="text-[#001F5B] cursor-pointer">Change Password</div>
//                 <div className="text-[#001F5B] cursor-pointer">Delete Account</div>
//               </div>
//             )}
//           </div>

//           <div>
//             <div
//               className="flex items-center justify-between cursor-pointer"
//               onClick={() => setActiveSection(activeSection === "Inbox" ? "" : "Inbox")}
//             >
//               <h2 className="text-lg font-semibold text-[#001F5B]">Inbox</h2>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 className={`w-5 h-5 transition-transform ${activeSection === "Inbox" ? "rotate-180" : ""}`}
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 p-4 max-h-screen overflow-y-auto">
//           {/* Profile Header */}
//           <div className="bg-[#001F5B] rounded-lg p-4 sm:p-6 text-white">
//             <div className="flex flex-col sm:flex-row items-center">
//               <label className="" htmlFor='profileImage' >

//               {
//                 user?.profileImage ? (
//                   <img src={previewImage || `${import.meta.env.VITE_FILE_URL}${user?.profileImage}`} alt="Profile" className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white" />
//                 )
//                 :
//                 (

//               <div className="relative mb-4 sm:mb-0">
//                 <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#006080] flex items-center justify-center border-4 border-white">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                     className="w-16 h-16 sm:w-24 sm:h-24 text-white"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </div>
//                 <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 cursor-pointer">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                     className="w-4 h-4 text-[#006080]"
//                   >
//                     <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
//                   </svg>
//                 </div>
//               </div>
//                 )
//               }
//               </label>
//               <input id='profileImage' type="file" accept="image/*" onChange={(e) => handleUpdateProfileImage(e)} className="hidden" />

//               <div className="text-center sm:text-left sm:ml-8">
//                 <h1 className="text-2xl sm:text-3xl font-bold mb-1">Hi!</h1>
//                 <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{getSessionData("name")}</h2>
//               </div>
//             </div>
//           </div>

//           {/* Basic Details */}
//           <div className="mt-6 border rounded-lg p-4 sm:p-6">
//             <h2 className="text-xl sm:text-2xl font-bold text-[#001F5B] mb-4 sm:mb-6">Basic Details</h2>
//             <form onSubmit={handleSubmitBasicInfo} className="space-y-4">
//               <input name="name" value={basicInfo.name} onChange={handleInputChange(setBasicInfo)} placeholder="Name" className="w-full p-2 border rounded" />
//               <input name="email" value={basicInfo.email} onChange={handleInputChange(setBasicInfo)} placeholder="Email" className="w-full p-2 border rounded" />
//               <input name="mobileNumber" value={basicInfo.mobileNumber} onChange={handleInputChange(setBasicInfo)} placeholder="Phone" className="w-full p-2 border rounded" />
//               <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Basic Info</button>
//             </form>
//           </div>

//           {/* KYC Details */}
//           <div className="mt-6 border rounded-lg p-4 sm:p-6">
//             <h2 className="text-xl sm:text-2xl font-bold text-[#001F5B] mb-4 sm:mb-6">KYC Details</h2>
//             {
//               user?.KYCVerified === "VERIFIED" ? (
//                 <div className="">Verification Complete!</div>
//               )
//               :
//               user?.KYCVerified === "PENDING" ? 
//               (
//                 <div className="">Verification Under Process!</div>
//               )
//               :
//               (
//               <form onSubmit={(e) => handleSubmitKYC(e)} enctype="multipart/form-data" className="space-y-4">
//                 <input name="aadhaarCardNumber" value={kycInfo.aadhaarCardNumber} onChange={handleInputChange(setKycInfo)} placeholder="Aadhaar Number" className="w-full p-2 border rounded" />
//                 <input type="file" name="aadhaarCardImage" onChange={handleInputChange(setKycInfo)} className="w-full p-2 border rounded" />
//                 <input name="panCardNumber" value={kycInfo.panCardNumber} onChange={handleInputChange(setKycInfo)} placeholder="PAN Number" className="w-full p-2 border rounded" />
//                 <input type="file" name="panCardImage" onChange={handleInputChange(setKycInfo)} className="w-full p-2 border rounded" />
//                 <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit KYC</button>
//               </form>
//               )
//             }
//           </div>

//           {/* transactions */}
//           <div className="border border-orange-600 rounded-lg mt-6 h-[200px] p-4 sm:p-6">
//             <h2 className="text-xl sm:text-2xl font-bold text-[#001F5B] mb-4 sm:mb-6">Transactions</h2>
//             <div className="flex items-center justify-center h-full">
//               <div className="text-gray-500">No transactions available</div>
//             </div>
//           </div>

//           {/* Change Password */}
//           <div className="mt-6 border rounded-lg p-4 sm:p-6">
//             <h2 className="text-xl sm:text-2xl font-bold text-[#001F5B] mb-4 sm:mb-6">Change Password</h2>
//             <form onSubmit={handleSubmitPassword} className="space-y-4">
//               <input type="password" name="currentPassword" value={passwordInfo.currentPassword} onChange={handleInputChange(setPasswordInfo)} placeholder="Current Password" className="w-full p-2 border rounded" />
//               <input type="password" name="newPassword" value={passwordInfo.newPassword} onChange={handleInputChange(setPasswordInfo)} placeholder="New Password" className="w-full p-2 border rounded" />
//               <input type="password" name="confirmPassword" value={passwordInfo.confirmPassword} onChange={handleInputChange(setPasswordInfo)} placeholder="Confirm Password" className="w-full p-2 border rounded" />
//               <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Change Password</button>
//             </form>
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dashboard