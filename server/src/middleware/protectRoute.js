import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-user"];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const decoded_data=jwt.decode(token)
    console.log("data",decoded_data);
    if(decoded){
      const user = await User.findById(decoded.userId)
      if(user?.status === "INACTIVE"){
        res.clearCookie("jwt-user");
        return res.status(401).json({success:false,message:"Unauthorized user"})
      }
    }

    if (!decoded) {
      res.clearCookie("jwt-user");
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid Token" });
    }

    req.user = decoded;

    next();
  } catch (err) {
    console.log("Error in protectRoute middleware: ", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};