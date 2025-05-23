import User from "../models/User.js";
import httpStatus from "../utils/httpStatus.js";
import bcrypt from "bcrypt";

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { cloudinaryUrl } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User Not Found!" });
    }

    user.profileImage = cloudinaryUrl;

    await user.save();

    res.status(httpStatus.SUCCESS).json({ message: "Profile Updated", user });
  } catch (err) {
    console.error(err);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "server error!" });
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const userId = req.params.id;

    const { name, email, mobileNumber, address } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (mobileNumber) user.mobileNumber = mobileNumber;
    if (address) user.address = address;

    const updatedUser = await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        mobileNumber: updatedUser.mobileNumber,
        address: updatedUser.address,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, error: err.message });
  }
};

export const updateUserPassword = async (req, res) => {
  try {
    const userId = req.params.id;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    // console.log(user.password,newPassword)

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const applyKYC = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.aadhaarCardImage = req.body.aadhaarCardImage;
    user.panCardImage = req.body.panCardImage;

    if (req.body.aadhaarCardNumber) {
      user.aadhaarCardNumber = req.body.aadhaarCardNumber;
    }

    if (req.body.panCardNumber) {
      user.panCardNumber = req.body.panCardNumber;
    }

    user.kycStatus = "PENDING";

    await user.save();
    res.status(200).json({ message: "Documents uploaded successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
