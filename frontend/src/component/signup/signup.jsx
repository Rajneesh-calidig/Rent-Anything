// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../providers/Auth/AuthProvider";
// import { toast } from "react-toastify";
// import { useLoader } from "../../providers/Loader/LoaderProvider";
// import { Eye, EyeOff } from "lucide-react";

// export const Signup = () => {
//   const initialUserDetails = {
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//     mobileNumber: "",
//     confirmPassword: "",
//   };

//   const [userDetails, setUserDetails] = useState(initialUserDetails);
//   const [showPassword, setShowPassword] = useState(false);
//   const { register } = useAuth();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const loader = useLoader();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       loader.start();
//       if (userDetails.password !== userDetails.confirmPassword) {
//         alert("Password and Confirm Password do not match");
//         return;
//       }
//       // console.log(userDetails);
//       const data = {
//         ...userDetails,
//         name: `${userDetails.firstname} ${userDetails.lastname}`,
//         email: userDetails.email,
//         mobileNumber: userDetails.mobileNumber,
//         password: userDetails.password,
//       };
//       console.log(data);
//       const response = await register(data);
//       if (response?.data?.success) {
//         toast.success("User registered successfully");
//       }
//       console.log(response);

//       setUserDetails(initialUserDetails);
//     } catch (err) {
//       toast.error(err.response.data.message);
//       console.log("sign up error", err);
//     } finally {
//       loader.stop();
//     }
//   };

//   return (
//     <>
//       <div className="flex pt-5 justify-center ">
//         <div className=" my-15 inline-block w-1/2 max-sm:w-full max-sm:px-6 max-sm:mx-auto max-w-xl border-white shadow-2xl rounded">
//           <div className="p-10">
//             <h2 className=" text-3xl font-bold  text-center max-md:text-xl max-sm:p-3 max-xs:p-0 mx-auto">
//               Create your account
//             </h2>
//             <p className=" text-lg  text-center max-md:text-xl max-sm:p-0 max-xs:p-0 mx-auto text-gray-400 my-2 font-medium">
//               It’s totally free and super easy
//             </p>
//           </div>

//           <div className="flex justify-center">
//             <button
//               type="button"
//               className="text-gray-400 border-gray-200 border text-lg bg-gray-100  focus:ring-4 focus:outline-none hover:border-blue-400 hover:text-blue-400 font-medium rounded-md  px-25 py-3 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2 cursor-pointer max-md:px-15 max-sm:px-8 max-lg:px-20"
//             >
//               <svg
//                 width="20"
//                 height="20"
//                 viewBox="0 0 20 20"
//                 className="mx-4"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <g clip-path="url(#clip0_95:967)">
//                   <path
//                     d="M20.0001 10.2216C20.0122 9.53416 19.9397 8.84776 19.7844 8.17725H10.2042V11.8883H15.8277C15.7211 12.539 15.4814 13.1618 15.1229 13.7194C14.7644 14.2769 14.2946 14.7577 13.7416 15.1327L13.722 15.257L16.7512 17.5567L16.961 17.5772C18.8883 15.8328 19.9997 13.266 19.9997 10.2216"
//                     fill="#4285F4"
//                   ></path>
//                   <path
//                     d="M10.2042 20.0001C12.9592 20.0001 15.2721 19.1111 16.9616 17.5778L13.7416 15.1332C12.88 15.7223 11.7235 16.1334 10.2042 16.1334C8.91385 16.126 7.65863 15.7206 6.61663 14.9747C5.57464 14.2287 4.79879 13.1802 4.39915 11.9778L4.27957 11.9878L1.12973 14.3766L1.08856 14.4888C1.93689 16.1457 3.23879 17.5387 4.84869 18.512C6.45859 19.4852 8.31301 20.0005 10.2046 20.0001"
//                     fill="#34A853"
//                   ></path>
//                   <path
//                     d="M4.39911 11.9777C4.17592 11.3411 4.06075 10.673 4.05819 9.99996C4.0623 9.32799 4.17322 8.66075 4.38696 8.02225L4.38127 7.88968L1.19282 5.4624L1.08852 5.51101C0.372885 6.90343 0.00012207 8.4408 0.00012207 9.99987C0.00012207 11.5589 0.372885 13.0963 1.08852 14.4887L4.39911 11.9777Z"
//                     fill="#FBBC05"
//                   ></path>
//                   <path
//                     d="M10.2042 3.86663C11.6663 3.84438 13.0804 4.37803 14.1498 5.35558L17.0296 2.59996C15.1826 0.901848 12.7366 -0.0298855 10.2042 -3.6784e-05C8.3126 -0.000477834 6.45819 0.514732 4.8483 1.48798C3.2384 2.46124 1.93649 3.85416 1.08813 5.51101L4.38775 8.02225C4.79132 6.82005 5.56974 5.77231 6.61327 5.02675C7.6568 4.28118 8.91279 3.87541 10.2042 3.86663Z"
//                     fill="#EB4335"
//                   ></path>
//                 </g>
//                 <defs>
//                   <clipPath id="clip0_95:967">
//                     <rect width="20" height="20" fill="white"></rect>
//                   </clipPath>
//                 </defs>
//               </svg>
//               Sign in with Google
//             </button>
//           </div>
//           <div className="flex mx-auto justify-center items-center my-5">
//             <hr className="w-1/5 text-gray-400 text max-sm:hidden"></hr>
//             <span className="mx-4 text-gray-400 text-lg font-medium">
//               register with email
//             </span>
//             <hr className="w-1/5 text-gray-400 max-sm:hidden"></hr>
//           </div>
//           <form class="max-w-md mx-auto py-5" onSubmit={(e) => handleSubmit(e)}>
//             <div class="grid md:grid-cols-2 md:gap-6">
//               <div class="relative z-0 w-full mb-5 group">
//                 <input
//                   type="text"
//                   name="firstname"
//                   onChange={(e) => handleChange(e)}
//                   value={userDetails.firstname}
//                   id="floating_first_name"
//                   class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                   placeholder=" "
//                   required
//                 />
//                 <label
//                   for="floating_first_name"
//                   class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                 >
//                   First name
//                 </label>
//               </div>
//               <div class="relative z-0 w-full mb-5 group">
//                 <input
//                   type="text"
//                   name="lastname"
//                   onChange={(e) => handleChange(e)}
//                   value={userDetails.lastname}
//                   id="floating_last_name"
//                   class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                   placeholder=" "
//                   required
//                 />
//                 <label
//                   for="floating_last_name"
//                   class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                 >
//                   Last name
//                 </label>
//               </div>
//             </div>
//             <div class="grid md:grid-cols-2 md:gap-6">
//               <div class="relative z-0 w-full mb-5 group">
//                 <input
//                   type="email"
//                   name="email"
//                   onChange={(e) => handleChange(e)}
//                   value={userDetails.email}
//                   id="floating_email"
//                   class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                   placeholder=" "
//                   required
//                 />
//                 <label
//                   for="floating_email"
//                   class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                 >
//                   Email address
//                 </label>
//               </div>
//               <div class="relative z-0 w-full mb-5 group">
//                 <input
//                   type="tel"
//                   name="mobileNumber"
//                   onChange={(e) => handleChange(e)}
//                   value={userDetails.mobileNumber}
//                   id="floating_phone"
//                   class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                   placeholder=" "
//                   required
//                 />
//                 <label
//                   for="floating_phone"
//                   class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                 >
//                   Phone number (123-456-7890)
//                 </label>
//               </div>
//             </div>
//             <div class="relative z-0 w-full mb-5 group">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 onChange={(e) => handleChange(e)}
//                 value={userDetails.password}
//                 id="floating_password"
//                 class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                 placeholder=" "
//                 required
//               />
//               {showPassword ? (
//                 <Eye
//                   className="absolute right-3 top-4 text-gray-500"
//                   onClick={() => setShowPassword(false)}
//                   size={20}
//                 />
//               ) : (
//                 <EyeOff
//                   className="absolute right-3 top-4 text-gray-500"
//                   onClick={() => setShowPassword(true)}
//                   size={20}
//                 />
//               )}
//               <label
//                 for="floating_password"
//                 class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//               >
//                 Password
//               </label>
//             </div>
//             <div class="relative z-0 w-full mb-5 group">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 onChange={(e) => handleChange(e)}
//                 value={userDetails.confirmPassword}
//                 id="floating_repeat_password"
//                 class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                 placeholder=" "
//                 required
//               />
//               <label
//                 for="floating_repeat_password"
//                 class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//               >
//                 Confirm password
//               </label>
//             </div>
//             <button
//               type="submit"
//               class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-4"
//             >
//               Sign Up
//             </button>
//             <div class="relative z-0 w-full mb-5 group text-gray-400 font-semibold text-lg text-center my-1">
//               Already have an account?
//               <Link to="/signin" className="text-blue-500 mx-2 font-sans">
//                 Sign in
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };
"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../providers/Auth/AuthProvider";
import { toast } from "react-toastify";
import { useLoader } from "../../providers/Loader/LoaderProvider";
import { Eye, EyeOff } from "lucide-react";

export const Signup = () => {
  const initialUserDetails = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobileNumber: "",
    confirmPassword: "",
  };

  const [userDetails, setUserDetails] = useState(initialUserDetails);
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const loader = useLoader();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      loader.start();
      if (userDetails.password !== userDetails.confirmPassword) {
        toast.error("Password and Confirm Password do not match");
        return;
      }

      const data = {
        ...userDetails,
        name: `${userDetails.firstname} ${userDetails.lastname}`,
        email: userDetails.email,
        mobileNumber: userDetails.mobileNumber,
        password: userDetails.password,
      };

      const response = await register(data);
      if (response?.data?.success) {
        toast.success("User registered successfully");
      }

      setUserDetails(initialUserDetails);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log("sign up error", err);
    } finally {
      loader.stop();
    }
  };

  return (
    <div className="w-full min-h-screen font-sans bg-gradient-to-b from-white to-gray-50 py-12 mt-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Create your account
          </h2>
          <p className="mt-2 text-center text-gray-600">
            It's totally free and super easy
          </p>
        </div>

        {/* Google Sign Up Button */}
        <div className="px-8 pt-6">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-700 font-medium hover:bg-gray-50 hover:border-indigo-300 transition-all"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_95:967)">
                <path
                  d="M20.0001 10.2216C20.0122 9.53416 19.9397 8.84776 19.7844 8.17725H10.2042V11.8883H15.8277C15.7211 12.539 15.4814 13.1618 15.1229 13.7194C14.7644 14.2769 14.2946 14.7577 13.7416 15.1327L13.722 15.257L16.7512 17.5567L16.961 17.5772C18.8883 15.8328 19.9997 13.266 19.9997 10.2216"
                  fill="#4285F4"
                ></path>
                <path
                  d="M10.2042 20.0001C12.9592 20.0001 15.2721 19.1111 16.9616 17.5778L13.7416 15.1332C12.88 15.7223 11.7235 16.1334 10.2042 16.1334C8.91385 16.126 7.65863 15.7206 6.61663 14.9747C5.57464 14.2287 4.79879 13.1802 4.39915 11.9778L4.27957 11.9878L1.12973 14.3766L1.08856 14.4888C1.93689 16.1457 3.23879 17.5387 4.84869 18.512C6.45859 19.4852 8.31301 20.0005 10.2046 20.0001"
                  fill="#34A853"
                ></path>
                <path
                  d="M4.39911 11.9777C4.17592 11.3411 4.06075 10.673 4.05819 9.99996C4.0623 9.32799 4.17322 8.66075 4.38696 8.02225L4.38127 7.88968L1.19282 5.4624L1.08852 5.51101C0.372885 6.90343 0.00012207 8.4408 0.00012207 9.99987C0.00012207 11.5589 0.372885 13.0963 1.08852 14.4887L4.39911 11.9777Z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M10.2042 3.86663C11.6663 3.84438 13.0804 4.37803 14.1498 5.35558L17.0296 2.59996C15.1826 0.901848 12.7366 -0.0298855 10.2042 -3.6784e-05C8.3126 -0.000477834 6.45819 0.514732 4.8483 1.48798C3.2384 2.46124 1.93649 3.85416 1.08813 5.51101L4.38775 8.02225C4.79132 6.82005 5.56974 5.77231 6.61327 5.02675C7.6568 4.28118 8.91279 3.87541 10.2042 3.86663Z"
                  fill="#EB4335"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_95:967">
                  <rect width="20" height="20" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
            Sign up with Google
          </button>
        </div>

        <div className="px-8 py-4">
          <div className="flex items-center gap-2">
            <div className="h-px bg-gray-300 flex-1"></div>
            <p className="text-sm text-gray-500">or register with email</p>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>
        </div>

        <form className="px-8 pb-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First name
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={userDetails.firstname}
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last name
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={userDetails.lastname}
                required
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={userDetails.email}
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="mobileNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone number
              </label>
              <input
                type="tel"
                name="mobileNumber"
                id="mobileNumber"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={userDetails.mobileNumber}
                required
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={userDetails.password}
                required
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={userDetails.confirmPassword}
              required
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all"
          >
            Sign Up
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-indigo-600 font-medium hover:text-indigo-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
