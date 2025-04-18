import React, { useEffect, useState } from 'react';
import { getSessionData } from '../services/session.service';
import { useAuth } from '../providers/Auth/AuthProvider';
import { useUser } from '../providers/User/UserProvider';
import {toast} from "react-toastify";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("Account")
  const {user,updateUser} = useAuth();
  const { updateProfile, updateDetails, updatePassword, applyKYC, isLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [previewImage, setPreviewImage] = useState(null);

  const [basicInfo, setBasicInfo] = useState({
    name: "",
    email: "",
    mobileNumber: "",
  });

  useEffect(() => {
    setBasicInfo({
      name:user.name,email:user.email,mobileNumber:user.mobileNumber
    });
  },[user])
  
  const [kycInfo, setKycInfo] = useState({
    aadhaarCardNumber: "",
    aadhaarCardImage: null,
    panCardNumber: "",
    panCardImage: null,
    // addressType: "",
    // addressProof: "",
  });
  
  const [bankInfo, setBankInfo] = useState({
    accountType: "",
    bankName: "",
    branchName: "",
    ifscCode: "",
    accountNumber: "",
  });
  
  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (setter) => (e) => {
    const { name, value, files } = e.target;
    setter(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleUpdateProfileImage = async (e) => {
    e.preventDefault();

    setPreviewImage(URL.createObjectURL(e.target.files[0]));

    const formData = new FormData();
    formData.append("profileImage", e.target.files[0]);
    try {
      await updateProfile(user._id, formData);
      toast.success("Profile image updated successfully!");
    } catch (err) {
      toast.error("Error updating profile image");
    }
  }

  const handleSubmitBasicInfo = async (e) => {
    e.preventDefault();
    try {
      console.log(basicInfo,user._id)
      const response = await updateDetails(user._id, basicInfo);
      console.log("response",response)
      toast.success("Basic Info updated successfully!")
      // alert("Basic Info updated");
    } catch (err) {
      alert("Error updating Basic Info");
    }
  };

  const handleSubmitKYC = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("aadhaarCardImage", kycInfo.aadhaarCardImage);
    formData.append("panCardImage", kycInfo.panCardImage);
    formData.append("aadhaarCardNumber", kycInfo.aadhaarCardNumber);
    formData.append("panCardNumber", kycInfo.panCardNumber);

    try {
      const response = await applyKYC(user._id, formData);
      updateUser(response.data.user)
      toast.success("KYC submitted successfully!");
    } catch (err) {
      toast.error("Error submitting KYC");
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await updatePassword(user._id, {
        currentPassword: passwordInfo.currentPassword,
        newPassword: passwordInfo.newPassword,
      });
      toast.success("Password updated successfully!");
      // alert("Password updated");
    } catch (err) {
      alert("Error updating password");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0]">

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
              <label className="" htmlFor='profileImage' >

              {
                user?.profileImage ? (
                  <img src={previewImage || `${import.meta.env.VITE_FILE_URL}${user?.profileImage}`} alt="Profile" className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white" />
                )
                :
                (

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
                )
              }
              </label>
              <input id='profileImage' type="file" accept="image/*" onChange={(e) => handleUpdateProfileImage(e)} className="hidden" />

              <div className="text-center sm:text-left sm:ml-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-1">Hi!</h1>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{getSessionData("name")}</h2>
              </div>
            </div>
          </div>

          {/* Basic Details */}
          <div className="mt-6 border rounded-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#001F5B] mb-4 sm:mb-6">Basic Details</h2>
            <form onSubmit={handleSubmitBasicInfo} className="space-y-4">
              <input name="name" value={basicInfo.name} onChange={handleInputChange(setBasicInfo)} placeholder="Name" className="w-full p-2 border rounded" />
              <input name="email" value={basicInfo.email} onChange={handleInputChange(setBasicInfo)} placeholder="Email" className="w-full p-2 border rounded" />
              <input name="mobileNumber" value={basicInfo.mobileNumber} onChange={handleInputChange(setBasicInfo)} placeholder="Phone" className="w-full p-2 border rounded" />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Basic Info</button>
            </form>
          </div>

          {/* KYC Details */}
          <div className="mt-6 border rounded-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#001F5B] mb-4 sm:mb-6">KYC Details</h2>
            {
              user?.KYCVerified === "VERIFIED" ? (
                <div className="">Verification Complete!</div>
              )
              :
              user?.KYCVerified === "PENDING" ? 
              (
                <div className="">Verification Under Process!</div>
              )
              :
              (
              <form onSubmit={(e) => handleSubmitKYC(e)} enctype="multipart/form-data" className="space-y-4">
                <input name="aadhaarCardNumber" value={kycInfo.aadhaarCardNumber} onChange={handleInputChange(setKycInfo)} placeholder="Aadhaar Number" className="w-full p-2 border rounded" />
                <input type="file" name="aadhaarCardImage" onChange={handleInputChange(setKycInfo)} className="w-full p-2 border rounded" />
                <input name="panCardNumber" value={kycInfo.panCardNumber} onChange={handleInputChange(setKycInfo)} placeholder="PAN Number" className="w-full p-2 border rounded" />
                <input type="file" name="panCardImage" onChange={handleInputChange(setKycInfo)} className="w-full p-2 border rounded" />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit KYC</button>
              </form>
              )
            }
          </div>

          {/* transactions */}
          <div className="border border-orange-600 rounded-lg mt-6 h-[200px] p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#001F5B] mb-4 sm:mb-6">Transactions</h2>
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-500">No transactions available</div>
            </div>
          </div>

          {/* Change Password */}
          <div className="mt-6 border rounded-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#001F5B] mb-4 sm:mb-6">Change Password</h2>
            <form onSubmit={handleSubmitPassword} className="space-y-4">
              <input type="password" name="currentPassword" value={passwordInfo.currentPassword} onChange={handleInputChange(setPasswordInfo)} placeholder="Current Password" className="w-full p-2 border rounded" />
              <input type="password" name="newPassword" value={passwordInfo.newPassword} onChange={handleInputChange(setPasswordInfo)} placeholder="New Password" className="w-full p-2 border rounded" />
              <input type="password" name="confirmPassword" value={passwordInfo.confirmPassword} onChange={handleInputChange(setPasswordInfo)} placeholder="Confirm Password" className="w-full p-2 border rounded" />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Change Password</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard