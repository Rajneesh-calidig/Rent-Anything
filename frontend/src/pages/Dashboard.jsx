import React, { useState } from 'react'
import { getSessionData } from '../services/session.service'

const Dashboard = () => {
    const [activeSection, setActiveSection] = useState("Account")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Header */}
      {/* <header className="flex flex-wrap justify-between items-center px-4 sm:px-6 py-3 bg-white shadow-sm">
        <div className="flex items-center">
          <div className="text-2xl sm:text-3xl font-bold">
            <span className="text-[#001F5B]">R</span>
            <span className="text-[#FF7A00]">4</span>
            <span className="text-[#001F5B]">ME</span>
          </div>
          <div className="h-6 ml-1 border-l-2 border-[#FF7A00]"></div>
          <span className="text-xs text-gray-500 ml-1">realestate.com</span>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <span className="text-gray-600 hidden sm:inline">Yash Kumar</span>
          <div className="flex items-center text-[#FF7A00]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-[#FF7A00]"
            >
              <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
            </svg>
            <div className="absolute -top-1 -right-1 bg-[#001F5B] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              0
            </div>
          </div>
        </div>

        <button className="block md:hidden ml-4 text-[#001F5B]" onClick={() => setSidebarOpen(!sidebarOpen)}>
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
              d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"}
            />
          </svg>
        </button>
      </header> */}

      <div className="flex flex-col md:flex-row max-h-screen">
        {/* Sidebar - Hidden on mobile unless toggled */}
        <div
          className={`${sidebarOpen ? "block" : "hidden"} md:block w-full md:w-64 p-4 md:p-6 border-b md:border-r md:border-b-0`}
        >
          <div className="mb-6">
            <div
              className="flex items-center justify-between cursor-pointer mb-4"
              onClick={() => setActiveSection(activeSection === "Account" ? "" : "Account")}
            >
              <h2 className="text-lg font-semibold text-[#001F5B]">Account</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-5 h-5 transition-transform ${activeSection === "Account" ? "rotate-180" : ""}`}
              >
                <path
                  fillRule="evenodd"
                  d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {activeSection === "Account" && (
              <div className="pl-2 space-y-4">
                <div className="text-[#001F5B] cursor-pointer">Profile</div>
                <div className="text-[#001F5B] cursor-pointer">KYC</div>
                <div className="text-[#001F5B] cursor-pointer">Bank Detail</div>
                {/* <div className="text-[#001F5B] cursor-pointer">My Listing Plan</div> */}
                <div className="text-[#001F5B] cursor-pointer">Transactions</div>
                <div className="text-[#001F5B] cursor-pointer">Change Password</div>
                <div className="text-[#001F5B] cursor-pointer">Delete Account</div>
              </div>
            )}
          </div>

          <div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setActiveSection(activeSection === "Inbox" ? "" : "Inbox")}
            >
              <h2 className="text-lg font-semibold text-[#001F5B]">Inbox</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-5 h-5 transition-transform ${activeSection === "Inbox" ? "rotate-180" : ""}`}
              >
                <path
                  fillRule="evenodd"
                  d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 max-h-screen overflow-y-auto">
          {/* Profile Header */}
          <div className="bg-[#001F5B] rounded-lg p-4 sm:p-6 text-white">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="relative mb-4 sm:mb-0">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#006080] flex items-center justify-center border-4 border-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-16 h-16 sm:w-24 sm:h-24 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 text-[#006080]"
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                  </svg>
                </div>
              </div>

              <div className="text-center sm:text-left sm:ml-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-1">Hi!</h1>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{getSessionData("name")}</h2>

                {/* <div className="flex justify-center sm:justify-start gap-8 sm:gap-16">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold">0</div>
                    <div className="text-[#FF7A00] text-sm sm:text-base">My Ads</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold">0</div>
                    <div className="text-[#FF7A00] text-sm sm:text-base">Remaining Ads</div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* Basic Details */}
          <div className="mt-6 border rounded-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#001F5B] mb-4 sm:mb-6">Basic Details</h2>

            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center">
                <label className="text-gray-700 font-medium">Name</label>
                <div className="sm:col-span-2 border rounded-md p-2.5 bg-gray-50">Yash Kumar</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center">
                <label className="text-gray-700 font-medium">Email *</label>
                <div className="sm:col-span-2 border rounded-md p-2.5 bg-gray-50">yash.kumar@calidig.com</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center">
                <label className="text-gray-700 font-medium">Phone Number *</label>
                <input
                  type="text"
                  className="sm:col-span-2 w-full border rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-[#001F5B]"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </div>

          {/* KYC Details */}
          <form action="" className="">

          <div className="mt-6 border rounded-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#001F5B] mb-4 sm:mb-6">KYC Details</h2>

            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center">
                <label className="text-gray-700 font-medium">Aadhaar No. *</label>
                <div className="sm:col-span-2 border rounded-md p-2.5 bg-gray-50">Yash Kumar</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center">
                <label className="text-gray-700 font-medium">Aadhaar Doc</label>
                <div className="sm:col-span-2 border rounded-md p-2.5 bg-gray-50">yash.kumar@calidig.com</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center">
                <label className="text-gray-700 font-medium">PAN No. *</label>
                <input
                  type="text"
                  className="sm:col-span-2 w-full border rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-[#001F5B]"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center">
                <label className="text-gray-700 font-medium">PAN Card *</label>
                <input
                  type="text"
                  className="sm:col-span-2 w-full border rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-[#001F5B]"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center">
                <label className="text-gray-700 font-medium">Address Type*</label>
                <input
                  type="text"
                  className="sm:col-span-2 w-full border rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-[#001F5B]"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center">
                <label className="text-gray-700 font-medium">Address Proof *</label>
                <input
                  type="text"
                  className="sm:col-span-2 w-full border rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-[#001F5B]"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </div>
          </form>

          {/* Bank Details */}
          <form action="" className="">

          <div className="mt-6 border rounded-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#001F5B] mb-4 sm:mb-6">Bank Details</h2>

            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center">
                <label className="text-gray-700 font-medium">Account Type</label>
                <div className="sm:col-span-2 border rounded-md p-2.5 bg-gray-50">Yash Kumar</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center">
                <label className="text-gray-700 font-medium">Bank Name</label>
                <div className="sm:col-span-2 border rounded-md p-2.5 bg-gray-50">yash.kumar@calidig.com</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center">
                <label className="text-gray-700 font-medium">Branch Name</label>
                <input
                  type="text"
                  className="sm:col-span-2 w-full border rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-[#001F5B]"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center">
                <label className="text-gray-700 font-medium">IFSC Code</label>
                <input
                  type="text"
                  className="sm:col-span-2 w-full border rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-[#001F5B]"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center">
                <label className="text-gray-700 font-medium">Account No.</label>
                <input
                  type="text"
                  className="sm:col-span-2 w-full border rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-[#001F5B]"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </div>
          </form>

          {/* transactions */}
          <div className="border border-orange-600 rounded-lg mt-6 h-[200px] p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#001F5B] mb-4 sm:mb-6">Transactions</h2>
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-500">No transactions available</div>
            </div>
          </div>

          {/* Change Password */}
          <form action="" className="">

          <div className="mt-6 border rounded-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#001F5B] mb-4 sm:mb-6">Change Password</h2>

            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center">
                <label className="text-gray-700 font-medium">Current Password</label>
                <div className="sm:col-span-2 border rounded-md p-2.5 bg-gray-50">Yash Kumar</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center">
                <label className="text-gray-700 font-medium">New Password</label>
                <div className="sm:col-span-2 border rounded-md p-2.5 bg-gray-50">yash.kumar@calidig.com</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center">
                <label className="text-gray-700 font-medium">Confirm Password</label>
                <input
                  type="text"
                  className="sm:col-span-2 w-full border rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-[#001F5B]"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Dashboard