import { useEffect, useState } from "react"
import {
  User,
  Home,
  Package,
  Heart,
  Settings,
  LogOut,
  Plus,
  Search,
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
import AddItem from "../component/items/AddItem"
import { useAuth } from "../providers/Auth/AuthProvider"
import { useUser } from "../providers/User/UserProvider"
import { useItem } from "../providers/Items/ItemProvider"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function Dashboard() {
  // State for active section
  const [activeSection, setActiveSection] = useState("overview")
  const [activeSidebarItem, setActiveSidebarItem] = useState("overview")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { user, updateUser } = useAuth()
  const { myItems } = useItem()

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

  const { updateProfile, updateDetails, updatePassword, applyKYC, isLoading } = useUser()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [previewImage, setPreviewImage] = useState(null)

  const [basicInfo, setBasicInfo] = useState({
    name: "",
    email: "",
    mobileNumber: "",
  })

  useEffect(() => {
    setBasicInfo({
      name: user.name,
      email: user.email,
      mobileNumber: user.mobileNumber,
    })
  }, [user])

  const [kycInfo, setKycInfo] = useState({
    aadhaarCardNumber: "",
    aadhaarCardImage: null,
    panCardNumber: "",
    panCardImage: null,
    // addressType: "",
    // addressProof: "",
  })

  const [bankInfo, setBankInfo] = useState({
    accountType: "",
    bankName: "",
    branchName: "",
    ifscCode: "",
    accountNumber: "",
  })

  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [orders, setOrders] = useState([
    {
      id: "ORD123456",
      itemName: "DSLR Camera",
      owner: "John Doe",
      startDate: "2023-04-15",
      endDate: "2023-04-20",
      totalAmount: 2500,
      status: "completed",
    },
    {
      id: "ORD789012",
      itemName: "Mountain Bike",
      owner: "Jane Smith",
      startDate: "2023-05-10",
      endDate: "2023-05-15",
      totalAmount: 1800,
      status: "active",
    },
    {
      id: "ORD345678",
      itemName: "Camping Tent",
      owner: "Mike Johnson",
      startDate: "2023-06-01",
      endDate: "2023-06-05",
      totalAmount: 1200,
      status: "upcoming",
    },
  ])

  const [transactions, setTransactions] = useState([
    {
      id: "TXN123456",
      date: "2023-04-20",
      description: "Payment for DSLR Camera rental",
      amount: -2500,
      type: "debit",
    },
    {
      id: "TXN789012",
      date: "2023-05-05",
      description: "Earnings from Drone rental",
      amount: 3500,
      type: "credit",
    },
    {
      id: "TXN345678",
      date: "2023-05-15",
      description: "Payment for Mountain Bike rental",
      amount: -1800,
      type: "debit",
    },
    {
      id: "TXN901234",
      date: "2023-05-25",
      description: "Earnings from Projector rental",
      amount: 2200,
      type: "credit",
    },
    {
      id: "TXN567890",
      date: "2023-06-10",
      description: "Earnings from Speaker rental",
      amount: 1500,
      type: "credit",
    },
  ])

  const [editItemId, setEditItemId] = useState(null)
  const [editItemData, setEditItemData] = useState({
    title: "",
    category: "",
    subcategory: "",
    pricePerDay: "",
    description: "",
    status: "",
    images: [],
  })
  const [showEditModal, setShowEditModal] = useState(false)
  const [activeImageTab, setActiveImageTab] = useState(0)
  const [newImages, setNewImages] = useState([])
  const [imagesToDelete, setImagesToDelete] = useState([])

  const handleEditItem = (item) => {
    setEditItemId(item._id)
    setEditItemData({
      title: item.title,
      category: item.category,
      subcategory: item.subcategory || "",
      pricePerDay: item.pricePerDay,
      description: item.description || "",
      status: item.status || "active",
      images: item.images || [],
    })
    setNewImages([])
    setImagesToDelete([])
    setShowEditModal(true)
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const fileObjects = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      isNew: true,
    }))
    setNewImages([...newImages, ...fileObjects])
  }

  const handleRemoveImage = (index, isNew = false) => {
    if (isNew) {
      const updatedNewImages = [...newImages]
      updatedNewImages.splice(index, 1)
      setNewImages(updatedNewImages)
    } else {
      const imageToDelete = editItemData.images[index]
      setImagesToDelete([...imagesToDelete, imageToDelete])

      const updatedImages = [...editItemData.images]
      updatedImages.splice(index, 1)
      setEditItemData({
        ...editItemData,
        images: updatedImages,
      })
    }
  }

  const handleMoveImage = (index, direction, isNew = false) => {
    if (isNew) {
      if ((direction === "up" && index === 0) || (direction === "down" && index === newImages.length - 1)) {
        return
      }

      const updatedNewImages = [...newImages]
      const newIndex = direction === "up" ? index - 1 : index + 1
      const temp = updatedNewImages[index]
      updatedNewImages[index] = updatedNewImages[newIndex]
      updatedNewImages[newIndex] = temp
      setNewImages(updatedNewImages)
    } else {
      if ((direction === "up" && index === 0) || (direction === "down" && index === editItemData.images.length - 1)) {
        return
      }

      const updatedImages = [...editItemData.images]
      const newIndex = direction === "up" ? index - 1 : index + 1
      const temp = updatedImages[index]
      updatedImages[index] = updatedImages[newIndex]
      updatedImages[newIndex] = temp
      setEditItemData({
        ...editItemData,
        images: updatedImages,
      })
    }
  }

  const handleSaveEdit = async (e) => {
    e.preventDefault()

    // Create a FormData object to handle file uploads
    const formData = new FormData()

    // Add all the text fields
    Object.keys(editItemData).forEach((key) => {
      if (key !== "images") {
        formData.append(key, editItemData[key])
      }
    })

    // Add existing images that weren't deleted
    formData.append("existingImages", JSON.stringify(editItemData.images))

    // Add images to delete
    formData.append("imagesToDelete", JSON.stringify(imagesToDelete))

    // Add new images
    newImages.forEach((image, index) => {
      formData.append(`newImage${index}`, image.file)
    })

    // Here you would typically make an API call to update the item
    console.log("Saving edited item:", editItemId)
    console.log("Form data contains:", {
      ...editItemData,
      newImages: newImages.length,
      imagesToDelete,
    })

    // Simulate API call success
    // After saving, close modal and refresh items if needed
    setShowEditModal(false)
    setEditItemId(null)

    // You might want to refresh your items list here
    // await refreshMyItems()
  }

  const handleInputChange = (setter) => (e) => {
    const { name, value, files } = e.target
    setter((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }))
  }

  const handleUpdateProfileImage = async (e) => {
    e.preventDefault()

    setPreviewImage(URL.createObjectURL(e.target.files[0]))

    const formData = new FormData()
    formData.append("profileImage", e.target.files[0])
    try {
      await updateProfile(user._id, formData)
      toast.success("Profile image updated successfully!")
    } catch (err) {
      toast.error("Error updating profile image")
    }
  }

  const handleSubmitBasicInfo = async (e) => {
    e.preventDefault()
    try {
      console.log(basicInfo, user._id)
      const response = await updateDetails(user._id, basicInfo)
      console.log("response", response)
      toast.success("Basic Info updated successfully!")
      // alert("Basic Info updated");
    } catch (err) {
      alert("Error updating Basic Info")
    }
  }

  const handleSubmitKYC = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("aadhaarCardImage", kycInfo.aadhaarCardImage)
    formData.append("panCardImage", kycInfo.panCardImage)
    formData.append("aadhaarCardNumber", kycInfo.aadhaarCardNumber)
    formData.append("panCardNumber", kycInfo.panCardNumber)

    try {
      const response = await applyKYC(user._id, formData)
      updateUser(response.data.user)
      toast.success("KYC submitted successfully!")
    } catch (err) {
      toast.error("Error submitting KYC")
    }
  }

  const handleSubmitPassword = async (e) => {
    e.preventDefault()
    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    try {
      await updatePassword(user._id, {
        currentPassword: passwordInfo.currentPassword,
        newPassword: passwordInfo.newPassword,
      })
      toast.success("Password updated successfully!")
      // alert("Password updated");
    } catch (err) {
      alert("Error updating password")
    }
  }

  return (
    <div className="min-h-screen">
      {/* Mobile menu button */}
      <div
        className={`fixed top-4 left-4 z-50 md:hidden ${mobileMenuOpen ? "translate-x-64" : "translate-x-0"} transition-transform duration-300 ease-in-out`}
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
                  src={`${import.meta.env.VITE_FILE_URL}${user.profileImage}` || "/placeholder.svg"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100"
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
                activeSidebarItem === "overview"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
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
                setActiveSection("my-orders")
                setActiveSidebarItem("my-orders")
                setMobileMenuOpen(false)
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
                setActiveSection("transactions")
                setActiveSidebarItem("transactions")
                setMobileMenuOpen(false)
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
                setActiveSection("add-item")
                setActiveSidebarItem("add-item")
                setMobileMenuOpen(false)
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
                setActiveSection("favorites")
                setActiveSidebarItem("favorites")
                setMobileMenuOpen(false)
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
              <p className="px-3 mb-2 text-xs font-medium text-gray-500 uppercase">Account</p>

              <button
                onClick={() => {
                  setActiveSection("profile")
                  setActiveSidebarItem("profile")
                  setMobileMenuOpen(false)
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
                  setActiveSection("settings")
                  setActiveSidebarItem("settings")
                  setMobileMenuOpen(false)
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

          {/* Overview Section */}
          {activeSection === "overview" && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Items Listed</p>
                      <h3 className="text-2xl font-bold text-gray-800 mt-1">{myItems.length}</h3>
                    </div>
                    <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white">
                      <Package className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span
                      className="text-indigo-600 font-medium flex items-center cursor-pointer"
                      onClick={() => setActiveSection("my-items")}
                    >
                      <ChevronRight className="h-4 w-4" />
                      View all
                    </span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Items Rented</p>
                      <h3 className="text-2xl font-bold text-gray-800 mt-1">{user.itemsRented}</h3>
                    </div>
                    <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-indigo-600 font-medium flex items-center">
                      <ChevronRight className="h-4 w-4" />
                      View history
                    </span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Earnings</p>
                      <h3 className="text-2xl font-bold text-gray-800 mt-1">{formatCurrency(user.earnings)}</h3>
                    </div>
                    <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
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
                    <span
                      className="text-indigo-600 font-medium flex items-center cursor-pointer"
                      onClick={() => setActiveSection("transactions")}
                    >
                      <ChevronRight className="h-4 w-4" />
                      View transactions
                    </span>
                  </div>
                </div>
              </div>

              {/* KYC Status */}
              {user.kycStatus !== "VERIFIED" && (
                <div
                  className={`p-4 rounded-lg flex items-start space-x-4 ${
                    user.kycStatus === "PENDING"
                      ? "bg-yellow-50 border border-yellow-200"
                      : "bg-indigo-50 border border-indigo-200"
                  }`}
                >
                  {user.kycStatus === "PENDING" ? (
                    <Clock className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-indigo-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {user.kycStatus === "PENDING" ? "KYC Verification in Progress" : "Complete KYC Verification"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {user.kycStatus === "PENDING"
                        ? "Your KYC documents are under review. This usually takes 1-2 business days."
                        : "To list items and receive payments, please complete your KYC verification."}
                    </p>
                    {user.kycStatus !== "PENDING" && (
                      <button
                        onClick={() => setActiveSection("profile")}
                        className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                      >
                        Complete Verification
                      </button>
                    )}
                  </div>
                </div>
              )}
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
                      className="pl-9 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                  <select className="border border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="all">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="sports">Sports</option>
                    <option value="tools">Tools</option>
                    <option value="outdoor">Outdoor</option>
                  </select>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
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
                      {myItems?.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  src={`${import.meta.env.VITE_FILE_URL}${item.images[0]}` || "/placeholder.svg"}
                                  alt={item.title}
                                  className="h-10 w-10 rounded-md object-cover"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 line-clamp-1">{item.title}</div>
                                <div className="text-xs text-gray-500">ID: {item._id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{item.category}</div>
                            <div className="text-xs text-gray-500">{item?.subcategory}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-indigo-600">₹{item.pricePerDay}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                item?.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {item?.status === "active" ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center text-xs text-gray-500">
                                <Eye size={14} className="mr-1" />
                                {item?.views}
                              </div>
                              <div className="flex items-center text-xs text-gray-500">
                                <Heart size={14} className="mr-1" />
                                {item?.likes}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(item?.createdAt)}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button
                                className="text-indigo-600 hover:text-indigo-900"
                                onClick={() => navigate("/item/" + item._id)}
                              >
                                <Eye size={16} />
                              </button>
                              <button
                                className="text-gray-600 hover:text-gray-900"
                                onClick={() => handleEditItem(item)}
                              >
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
            // <div className="bg-white rounded-xl shadow-sm p-6">
            //   <h2 className="text-xl font-semibold text-gray-800 mb-6">Add a New Item for Rent</h2>
            //   <p className="text-gray-600 mb-6">
            //     Fill out the form below to list a new item for rent. Complete all required fields for the best results.
            //   </p>

            //   <div className="text-center py-8">
            //     <button
            //       onClick={() => (window.location.href = "/add-item")}
            //       className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-colors"
            //     >
            //       Go to Add Item Form
            //     </button>
            //     <p className="mt-4 text-sm text-gray-500">
            //       You'll be redirected to our comprehensive item listing form.
            //     </p>
            //   </div>
            // </div>
            <AddItem />
          )}

          {/* Profile Section */}
          {activeSection === "profile" && (
            <div className="space-y-6">
              {/* Profile Info */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="relative mb-6 md:mb-0 md:mr-8">
                    <img
                      src={`${import.meta.env.VITE_FILE_URL}${user.profileImage}` || "/placeholder.svg"}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100"
                    />
                    <label
                      htmlFor="profileImage"
                      className="absolute bottom-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-1.5 rounded-full cursor-pointer hover:from-indigo-700 hover:to-purple-700 transition-colors"
                    >
                      <Edit size={14} />
                    </label>
                    <input
                      id="profileImage"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleUpdateProfileImage(e)}
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
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                <form onSubmit={handleSubmitBasicInfo}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={basicInfo.name}
                        onChange={handleInputChange(setBasicInfo)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={basicInfo.email}
                        onChange={handleInputChange(setBasicInfo)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={basicInfo.mobileNumber}
                        onChange={handleInputChange(setBasicInfo)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>

              {/* KYC Verification */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">KYC Verification</h3>

                {user.kycStatus === "VERIFIED" ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800">Verification Complete</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Your account is fully verified. You can list items and receive payments.
                      </p>
                    </div>
                  </div>
                ) : user.kycStatus === "PENDING" ? (
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
                  <form onSubmit={handleSubmitKYC} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Card Number</label>
                        <input
                          type="text"
                          name="aadhaarCardNumber"
                          value={kycInfo.aadhaarCardNumber}
                          onChange={handleInputChange(setKycInfo)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
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
                                {kycInfo.aadhaarCardImage ? kycInfo.aadhaarCardImage.name : "Upload Aadhaar Card"}
                              </p>
                            </div>
                            <input
                              type="file"
                              name="aadhaarCardImage"
                              onChange={handleInputChange(setKycInfo)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">PAN Card Number</label>
                        <input
                          type="text"
                          name="panCardNumber"
                          value={kycInfo.panCardNumber}
                          onChange={handleInputChange(setKycInfo)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
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
                                {kycInfo.panCardImage ? kycInfo.panCardImage.name : "Upload PAN Card"}
                              </p>
                            </div>
                            <input
                              type="file"
                              name="panCardImage"
                              onChange={handleInputChange(setKycInfo)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-colors"
                      >
                        Submit KYC Documents
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Change Password */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>
                <form onSubmit={handleSubmitPassword} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordInfo.currentPassword}
                        onChange={handleInputChange(setPasswordInfo)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
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
                        value={passwordInfo.newPassword}
                        onChange={handleInputChange(setPasswordInfo)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordInfo.confirmPassword}
                        onChange={handleInputChange(setPasswordInfo)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-colors"
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
              <div className="bg-white rounded-xl shadow-sm p-6">
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
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h4 className="font-medium text-gray-800">SMS Notifications</h4>
                      <p className="text-sm text-gray-500 mt-1">Receive SMS alerts for important updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h4 className="font-medium text-gray-800">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account</p>
                    </div>
                    <button className="px-3 py-1 text-sm bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition-colors">
                      Enable
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h4 className="font-medium text-red-600">Delete Account</h4>
                      <p className="text-sm text-gray-500 mt-1">Permanently delete your account and all your data</p>
                    </div>
                    <button className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* My Orders Section */}
          {activeSection === "my-orders" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search orders..."
                      className="pl-9 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                  <select className="border border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-colors">
                  New Rental
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Item
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Owner
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rental Period
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{order.itemName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{order.owner}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatDate(order.startDate)} - {formatDate(order.endDate)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-indigo-600">
                              {formatCurrency(order.totalAmount)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                order.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "completed"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-3">View Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Rental</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Item to Rent</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
                        <option value="">Select an item</option>
                        <option value="camera">DSLR Camera</option>
                        <option value="bike">Mountain Bike</option>
                        <option value="tent">Camping Tent</option>
                        <option value="drone">Drone</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                      <input
                        type="number"
                        min="1"
                        defaultValue="1"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input
                        type="date"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input
                        type="date"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                      <textarea
                        rows="3"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        placeholder="Any special requirements or notes..."
                      ></textarea>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-colors"
                    >
                      Request Rental
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Transactions Section */}
          {activeSection === "transactions" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      className="pl-9 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                  <select className="border border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="all">All Transactions</option>
                    <option value="credit">Credits</option>
                    <option value="debit">Debits</option>
                  </select>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors">
                    Export
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-colors">
                    Filter
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Balance</p>
                      <h3 className="text-2xl font-bold text-gray-800 mt-1">{formatCurrency(user.earnings)}</h3>
                    </div>
                    <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
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
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Income</p>
                      <h3 className="text-2xl font-bold text-green-600 mt-1">{formatCurrency(7200)}</h3>
                    </div>
                    <div className="p-2 bg-green-100 rounded-lg text-green-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 11l5-5m0 0l5 5m-5-5v12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Expenses</p>
                      <h3 className="text-2xl font-bold text-red-600 mt-1">{formatCurrency(4300)}</h3>
                    </div>
                    <div className="p-2 bg-red-100 rounded-lg text-red-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 13l-5 5m0 0l-5-5m5 5V6"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Transaction ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formatDate(transaction.date)}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{transaction.description}</div>
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${
                              transaction.type === "credit" ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {transaction.type === "credit" ? "+" : "-"}
                            {formatCurrency(Math.abs(transaction.amount))}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                transaction.type === "credit"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {transaction.type === "credit" ? "Completed" : "Paid"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 border-t">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{" "}
                      <span className="font-medium">20</span> transactions
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                        Previous
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showEditModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">Edit Item</h2>
                  <button onClick={() => setShowEditModal(false)} className="p-1 rounded-full hover:bg-gray-100">
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6">
                  <form onSubmit={handleSaveEdit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Item Title</label>
                        <input
                          type="text"
                          name="title"
                          value={editItemData.title}
                          onChange={(e) => setEditItemData({ ...editItemData, title: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                          name="category"
                          value={editItemData.category}
                          onChange={(e) => setEditItemData({ ...editItemData, category: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        >
                          <option value="">Select Category</option>
                          <option value="electronics">Electronics</option>
                          <option value="sports">Sports</option>
                          <option value="tools">Tools</option>
                          <option value="outdoor">Outdoor</option>
                          <option value="clothing">Clothing</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                        <input
                          type="text"
                          name="subcategory"
                          value={editItemData.subcategory}
                          onChange={(e) => setEditItemData({ ...editItemData, subcategory: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Day (₹)</label>
                        <input
                          type="number"
                          name="pricePerDay"
                          value={editItemData.pricePerDay}
                          onChange={(e) => setEditItemData({ ...editItemData, pricePerDay: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          name="description"
                          value={editItemData.description}
                          onChange={(e) => setEditItemData({ ...editItemData, description: e.target.value })}
                          rows="4"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          name="status"
                          value={editItemData.status}
                          onChange={(e) => setEditItemData({ ...editItemData, status: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>

                    {/* Image Management Section */}
                    <div className="mt-8">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">Manage Images</h3>

                      <div className="flex border-b">
                        <button
                          type="button"
                          className={`px-4 py-2 font-medium ${activeImageTab === 0 ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"}`}
                          onClick={() => setActiveImageTab(0)}
                        >
                          Current Images
                        </button>
                        <button
                          type="button"
                          className={`px-4 py-2 font-medium ${activeImageTab === 1 ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"}`}
                          onClick={() => setActiveImageTab(1)}
                        >
                          Add New Images
                        </button>
                      </div>

                      <div className="mt-4">
                        {activeImageTab === 0 && (
                          <div>
                            {editItemData.images && editItemData.images.length > 0 ? (
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {editItemData.images.map((image, index) => (
                                  <div key={index} className="relative group border rounded-lg overflow-hidden">
                                    <img
                                      src={`${import.meta.env.VITE_FILE_URL}${image}`}
                                      alt={`Item image ${index + 1}`}
                                      className="w-full h-32 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                      <button
                                        type="button"
                                        onClick={() => handleMoveImage(index, "up")}
                                        className="p-1 bg-white rounded-full text-gray-700 hover:text-indigo-600"
                                        disabled={index === 0}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-5 w-5"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleMoveImage(index, "down")}
                                        className="p-1 bg-white rounded-full text-gray-700 hover:text-indigo-600"
                                        disabled={index === editItemData.images.length - 1}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-5 w-5"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="p-1 bg-white rounded-full text-red-600 hover:text-red-800"
                                      >
                                        <Trash size={16} />
                                      </button>
                                    </div>
                                    {index === 0 && (
                                      <div className="absolute top-0 left-0 bg-indigo-600 text-white text-xs px-2 py-1 rounded-br-lg">
                                        Main
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-8 text-gray-500">
                                No images available. Add some new images.
                              </div>
                            )}
                          </div>
                        )}

                        {activeImageTab === 1 && (
                          <div>
                            <div className="mb-4">
                              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                  <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
                                </div>
                                <input
                                  type="file"
                                  className="hidden"
                                  accept="image/*"
                                  multiple
                                  onChange={handleImageUpload}
                                />
                              </label>
                            </div>

                            {newImages.length > 0 && (
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {newImages.map((image, index) => (
                                  <div key={index} className="relative group border rounded-lg overflow-hidden">
                                    <img
                                      src={image.preview || "/placeholder.svg"}
                                      alt={`New image ${index + 1}`}
                                      className="w-full h-32 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                      <button
                                        type="button"
                                        onClick={() => handleMoveImage(index, "up", true)}
                                        className="p-1 bg-white rounded-full text-gray-700 hover:text-indigo-600"
                                        disabled={index === 0}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-5 w-5"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleMoveImage(index, "down", true)}
                                        className="p-1 bg-white rounded-full text-gray-700 hover:text-indigo-600"
                                        disabled={index === newImages.length - 1}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-5 w-5"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index, true)}
                                        className="p-1 bg-white rounded-full text-red-600 hover:text-red-800"
                                      >
                                        <Trash size={16} />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-4 pt-4 border-t">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowEditModal(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
