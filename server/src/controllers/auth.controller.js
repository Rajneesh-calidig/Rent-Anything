import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import { createUser, findUserByEmail, findUserById, findUserByMobile } from "../services/auth.service.js";
import httpStatus from "../utils/httpStatus.js";
// import { logger } from "../config/logger/logger.js";

export async function signup(req, res) {
  try {
    const { email, password,name,mobileNumber } = req.body;

    if (!email || !password || !name || !mobileNumber) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ success: false, message: "All fields are required" });
    }

    // if (password.length < 8) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Password must be at least 8 characters",
    //   });
    // }

    const existingUserByEmail = await findUserByEmail(email);
    const existingUserByMobile = await findUserByMobile(mobileNumber)

    if(existingUserByMobile){
      return res.status(httpStatus.BAD_REQUEST).json({ success: false, message: "Mobile number already exists" });
    }

    if (existingUserByEmail) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ success: false, message: "Email already exists" });
    }

    const newUser = await createUser(email,password,name,mobileNumber);

    generateTokenAndSetCookie(newUser._id, res);

    res.status(httpStatus.SUCCESS).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (err) {
    console.log("Error in signup controller", err.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: "Internal server error" });
  }
}

export async function getUser(req, res) {
  try {
    const userId = req.user._id;
    const user = await findUserById(userId);

    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user: {...user._doc,password:""} });
  } catch (err) {
    console.error("Error in login controller", err.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: "Internal server error" });
  }
}

export async function login(req, res) {
  try {
    const { emailOrNumber, password, rememberMe } = req.body;

    if (!emailOrNumber || !password) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ success: false, message: "All field are required" });
    }

    let user;
    if(parseInt(emailOrNumber) && emailOrNumber.length === 10){
      user = await findUserByMobile(emailOrNumber);
    }else{
      user = await findUserByEmail(emailOrNumber);
    }

    if(user.status === "INACTIVE"){
      return res.status(httpStatus.UNAUTHORIZED).json({success:false,message:"Account is deactivated"})
    }

    if (!user) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ success: false, message: "Password is incorrect" });
    }

    generateTokenAndSetCookie(user._id, res, rememberMe);

    res
      .status(httpStatus.SUCCESS)
      .json({ success: true, user: { ...user._doc, password: "" } });
  } catch (err) {
    console.error("Error in login controller", err.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: "Internal server error" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt-user");
    res.status(httpStatus.SUCCESS).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: "Internal server error" });
  }
}

export async function authCheck(req, res) {
  try {
    console.log("req.user:", req.user);
    res.status(httpStatus.SUCCESS).json({ success: true, user: req.user });
  } catch (error) {
    console.log("Error in authCheck controller", error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: "Internal server error" });
  }
}