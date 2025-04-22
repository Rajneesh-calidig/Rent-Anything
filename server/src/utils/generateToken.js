import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res, rememberMe = true) => {
  const expiresIn = rememberMe ? "30d" : "3h";
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn });

  const cookieOptions = {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    domain: "rent-anything.vercel.app",
  };

  if (rememberMe) {
    cookieOptions.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
  }

  // res.cookie("jwt-user", token, {
  //   maxAge: 15 * 24 * 60 * 1000,
  //   httpOnly: true,
  //   sameSite: "strict",
  //   secure: false // if true only allows request over https
  // });

  // Without `maxAge`, the cookie becomes a session cookie
  res.cookie("jwt-user", token, cookieOptions);

  return token;
};
