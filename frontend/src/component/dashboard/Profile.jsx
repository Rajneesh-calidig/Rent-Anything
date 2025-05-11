import React, { useEffect, useState } from "react";
import { Upload, Edit, Clock, CheckCircle, Cross } from "lucide-react";
import { useUser } from "../../providers/User/UserProvider";
import { toast } from "react-toastify";
import { useLoader } from "../../providers/Loader/LoaderProvider";
import axios from "axios";
import { useAuth } from "../../providers/Auth/AuthProvider";

const Profile = ({ user, previewImage, setPreviewImage }) => {
  const { updateUser } = useAuth();
  const { updateProfile, updateDetails, updatePassword, applyKYC, isLoading } =
    useUser();
  const [aadhaarPreview, setAadhaarPreview] = useState(null);
  const [panPreview, setPanPreview] = useState(null);
  const loader = useLoader();

  const [basicInfo, setBasicInfo] = useState({
    name: "",
    email: "",
    mobileNumber: "",
  });

  useEffect(() => {
    setBasicInfo({
      name: user.name,
      email: user.email,
      mobileNumber: user.mobileNumber,
    });
  }, [user]);

  const [kycInfo, setKycInfo] = useState({
    aadhaarCardNumber: "",
    aadhaarCardImage: null,
    panCardNumber: "",
    panCardImage: null,
    // addressType: "",
    // addressProof: "",
  });

  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (setter) => (e) => {
    const { name, value, files } = e.target;
    if (name === "aadhaarCardImage") {
      setAadhaarPreview(URL.createObjectURL(e.target.files[0]));
    } else if (name === "panCardImage") {
      setPanPreview(URL.createObjectURL(e.target.files[0]));
    }
    setter((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleUpdateProfileImage = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "hackathon");
    formData.append("folder", "user/profile");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/diexwvrnq/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // const data = await res.json();
      // console.log(res);

      await updateProfile(user._id, res.data.secure_url);
      setPreviewImage(res.data.secure_url);
      toast.success("Profile image updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error updating profile image");
    }
  };

  const handleSubmitBasicInfo = async (e) => {
    e.preventDefault();
    try {
      loader.start();
      console.log(basicInfo, user._id);
      const response = await updateDetails(user._id, basicInfo);
      console.log("response", response);
      toast.success("Basic Info updated successfully!");
      // alert("Basic Info updated");
    } catch (err) {
      toast.error(err.response.data.message);
      console.log("Error updating Basic Info", err);
    } finally {
      loader.stop();
    }
  };

  const handleSubmitKYC = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("aadhaarCardImage", kycInfo.aadhaarCardImage);
    // formData.append("panCardImage", kycInfo.panCardImage);
    // formData.append("aadhaarCardNumber", kycInfo.aadhaarCardNumber);
    // formData.append("panCardNumber", kycInfo.panCardNumber);

    const files = [kycInfo.aadhaarCardImage, kycInfo.panCardImage];

    try {
      const uploadPromises = files.map(async (file, index) => {
        const formData = new FormData();
        formData.append("file", file);

        // Choose correct preset and folder based on index
        if (index === 0) {
          formData.append("upload_preset", "hackathon1");
          formData.append("folder", "user/aadhaarImages");
        } else {
          formData.append("upload_preset", "hackathon2");
          formData.append("folder", "user/panImages");
        }

        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/diexwvrnq/image/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return res.data;
      });

      const uploadedImages = await Promise.all(uploadPromises);
      // console.log("upuploadedImages);
      const imageUrls = uploadedImages.map((img) => img.secure_url);

      // console.log('uploaded urls: ',imageUrls)

      const response = await applyKYC(user._id, {
        aadhaarCardImage: imageUrls[0],
        panCardImage: imageUrls[1],
        aadhaarCardNumber: kycInfo.aadhaarCardNumber,
        panCardNumber: kycInfo.panCardNumber,
      });
      updateUser(response.data.user);
      toast.success("KYC submitted successfully!");
    } catch (err) {
      console.error(err);
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
    <div className="space-y-6">
      {/* Profile Info */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="relative mb-6 md:mb-0 md:mr-8">
            <img
              src={previewImage || user.profileImage || "/placeholder.svg"}
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
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Basic Information
        </h3>
        <form onSubmit={handleSubmitBasicInfo}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={basicInfo.name}
                onChange={handleInputChange(setBasicInfo)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={basicInfo.email}
                onChange={handleInputChange(setBasicInfo)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
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
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          KYC Verification
        </h3>

        {user.kycStatus === "VERIFIED" ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-800">
                Verification Complete
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Your account is fully verified. You can list items and receive
                payments.
              </p>
            </div>
          </div>
        ) : user.kycStatus === "PENDING" ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
            <Clock className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-800">
                Verification in Progress
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Your KYC documents are under review. This usually takes 1-2
                business days.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitKYC} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Aadhaar Card Number
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Aadhaar Card Image
                </label>
                <div className="flex items-center justify-center w-full">
                  {aadhaarPreview ? (
                    <div className="relative">
                      <img
                        src={aadhaarPreview}
                        alt="Aadhaar Preview"
                        className="w-32 h-32 object-cover rounded-lg mb-2"
                      />
                      <Cross
                        className="absolute -top-1 -right-6 rotate-45 text-red-500 cursor-pointer"
                        onClick={() => setAadhaarPreview(null)}
                      />
                    </div>
                  ) : (
                    <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-7">
                        <Upload className="w-8 h-8 text-gray-400" />
                        <p className="pt-1 text-sm text-gray-500">
                          {kycInfo.aadhaarCardImage
                            ? kycInfo.aadhaarCardImage.name
                            : "Upload Aadhaar Card"}
                        </p>
                      </div>
                      <input
                        type="file"
                        name="aadhaarCardImage"
                        onChange={handleInputChange(setKycInfo)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PAN Card Number
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PAN Card Image
                </label>
                <div className="flex items-center justify-center w-full">
                  {panPreview ? (
                    <div className="relative">
                      <img
                        src={panPreview}
                        alt="PAN Preview"
                        className="w-32 h-32 object-cover rounded-lg mb-2"
                      />
                      <Cross
                        className="absolute -top-1 -right-6 rotate-45 text-red-500 cursor-pointer"
                        onClick={() => setPanPreview(null)}
                      />
                    </div>
                  ) : (
                    <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-7">
                        <Upload className="w-8 h-8 text-gray-400" />
                        <p className="pt-1 text-sm text-gray-500">
                          {kycInfo.panCardImage
                            ? kycInfo.panCardImage.name
                            : "Upload PAN Card"}
                        </p>
                      </div>
                      <input
                        type="file"
                        name="panCardImage"
                        onChange={handleInputChange(setKycInfo)}
                        className="hidden"
                      />
                    </label>
                  )}
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
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Change Password
        </h3>
        <form onSubmit={handleSubmitPassword} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwordInfo.newPassword}
                onChange={handleInputChange(setPasswordInfo)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
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
  );
};

export default Profile;
