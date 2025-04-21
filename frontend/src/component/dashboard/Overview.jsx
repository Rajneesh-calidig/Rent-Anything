import React from 'react'
import {Package,ChevronRight,Clock,CheckCircle,AlertCircle} from "lucide-react"

const Overview = ({setActiveSection,user,myItemsLength,setActiveSidebarItem}) => {

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount)
    }

  return (
    <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium text-gray-500">Items Listed</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{myItemsLength}</h3>
            </div>
            <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white">
                <Package className="h-6 w-6" />
            </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
            <span
                className="text-indigo-600 font-medium flex items-center cursor-pointer"
                onClick={() => {setActiveSection("my-items"); setActiveSidebarItem("my-items")}}
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
  )
}

export default Overview